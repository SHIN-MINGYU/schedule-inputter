import styled from "styled-components";
import "./App.css";
import { FlexColBox, FlexRowBox } from "./components/common/FlexBox";
import { Result } from "./components/TextArea";
import InputArea from "./components/InputArea";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IMonthSchdules } from "../types/schedule.interface";
import { Button } from "./components/common/Button";
import type { IMode } from "../types/common.interface";
import PresetArea from "./components/PresetArea";

export const AppContext = createContext<{
  monthSchedules: IMonthSchdules;
  setMonthSchedules: Dispatch<SetStateAction<IMonthSchdules>>;
  mode: IMode;
  setMode: Dispatch<SetStateAction<IMode>>;
  isPresetPending: boolean;
  setIsPresetPending: Dispatch<SetStateAction<boolean>>;
}>({
  monthSchedules: {},
  setMonthSchedules: () => {},
  mode: { left: "calender", right: "result" },
  setMode: () => {},
  isPresetPending: false,
  setIsPresetPending: () => {},
});

function App() {
  const [mode, setMode] = useState<IMode>({
    left: "calender",
    right: "result",
  });
  const [monthSchedules, setMonthSchedules] = useState<IMonthSchdules>({});
  const [isPresetPending, setIsPresetPending] = useState<boolean>(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {}, []);

  const scheduleToText = () => {
    let str = "";
    let temp = "";
    Object.keys(monthSchedules).map((monthDate: string) => {
      temp += monthDate.split("月")[1];
      let i = 0;
      Object.keys(monthSchedules[monthDate]).map((hour: string) => {
        if (Object.keys(monthSchedules[monthDate][hour]).length != 0) {
          const s = monthSchedules[monthDate][hour];
          let people = s.people;
          if (s.time.length === 1) s.time = "0" + s.time;
          if (s.people != "満席") people = s.people + "名";
          if (i != 0) temp += "   ";
          let timeBlank = "   ";
          if (hour === "9") {
            timeBlank += " ";
            if (i != 0) timeBlank += "    ";
          }

          let nichiBlank = "   ";
          if (Object.keys(monthSchedules[monthDate])[0] === "9" && i != 0) {
            nichiBlank += "   ";
          }
          if (Object.keys(monthSchedules[monthDate])[0] === "10" && i != 0) {
            nichiBlank += "    ";
          }
          if (monthDate.split("月")[1].length === 2) {
            nichiBlank += " ";
          }
          if (monthDate.split("月")[1].length === 3)
            if (i != 0) nichiBlank += " ";

          temp +=
            nichiBlank +
            hour +
            ":" +
            s.time +
            timeBlank +
            s.type +
            "    " +
            people +
            "\n";
          i++;
        }
      });
      i = 0;
      if (temp === monthDate.split("月")[1]) temp = "";
      str += temp;
      temp = "";
    });
    taRef.current!.value = str;
  };

  useEffect(() => {
    console.log("result : ", monthSchedules);
  }, [monthSchedules]);
  return (
    <AppContext.Provider
      value={{
        monthSchedules,
        setMonthSchedules,
        mode,
        setMode,
        isPresetPending,
        setIsPresetPending,
      }}
    >
      {/* <AppTitleBar>
        <div>
          <Letter>title</Letter>
        </div>
        <div>button</div>
      </AppTitleBar> */}
      <AppContainer>
        <AppInputArea mode={mode}>
          <InputArea />
        </AppInputArea>
        {mode.left != "schedule" && mode.right === "result" && (
          <div
            style={{
              width: "5%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              onClick={scheduleToText}
              style={{ height: "2rem", lineHeight: "0px" }}
            >
              →
            </Button>
          </div>
        )}

        <AppResultArea mode={mode}>
          {mode.right === "result" && <Result _ref={taRef} />}
          {mode.right === "preset" && <PresetArea />}
        </AppResultArea>
      </AppContainer>
    </AppContext.Provider>
  );
}

export default App;

const AppTitleBar = styled(FlexRowBox)`
  height: 64px;
  min-width: 100vw;
  background-color: pink;
  justify-content: space-between;
`;

const AppContainer = styled.div`
  margin: 0 auto;
  min-height: calc(100vh - 2rem);
  min-width: calc(100vw - 2rem);
  display: flex;
  padding: 1rem;
`;

const AppInputArea = styled(FlexColBox)<{ mode: IMode }>`
  width: ${(props) => (props.mode.left != "schedule" ? "67.5%" : "72.5%")};
`;

const AppResultArea = styled(FlexColBox)<{ mode: IMode }>`
  width: ${(props) => (props.mode.left != "schedule" ? "27.5%" : "27.5%")};
  padding: 1rem;
`;
