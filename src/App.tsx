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
import "./utils/string.extention";
import { Letter } from "./components/common/TypoGraphy";
import useSchedule from "./hooks/useSchedule";
import xButtonImg from "../public/pc_exit.png";
import minButtonImg from "../public/pc_minimalize.png";
import rightArrowImg from "../public/right_arrow.png";

export const AppContext = createContext<{
  monthSchedules: IMonthSchdules;
  setMonthSchedules: Dispatch<SetStateAction<IMonthSchdules>>;
  mode: IMode;
  setMode: Dispatch<SetStateAction<IMode>>;
  isPresetPending: boolean;
  setIsPresetPending: Dispatch<SetStateAction<boolean>>;
  currentPreset: string;
  setCurrentPreset: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}>({
  monthSchedules: {},
  setMonthSchedules: () => {},
  mode: { left: "calender", right: "result" },
  setMode: () => {},
  isPresetPending: false,
  setIsPresetPending: () => {},
  currentPreset: "",
  setCurrentPreset: () => {},
  date: "",
  setDate: () => {},
});

function App() {
  const [mode, setMode] = useState<IMode>({
    left: "calender",
    right: "result",
  });
  const [date, setDate] = useState<string>("");
  const [currentPreset, setCurrentPreset] = useState<string>("");
  const [monthSchedules, setMonthSchedules] = useState<IMonthSchdules>({});
  const [isPresetPending, setIsPresetPending] = useState<boolean>(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const { scheduleToText, saveMonthSchedule, loadMonthSchedule } =
    useSchedule();

  useEffect(() => {
    const schedule = loadMonthSchedule();
    schedule && setMonthSchedules(() => ({ ...JSON.parse(schedule) }));
  }, []);

  useEffect(() => {
    console.log(date);
  }, [date]);
  useEffect(() => {
    Object.keys(monthSchedules).length && saveMonthSchedule(monthSchedules);

    console.log("result : ", monthSchedules);
  }, [monthSchedules]);
  return (
    <AppContext.Provider
      value={{
        date,
        setDate,
        monthSchedules,
        setMonthSchedules,
        mode,
        setMode,
        isPresetPending,
        setIsPresetPending,
        currentPreset,
        setCurrentPreset,
      }}
    >
      <AppTitleBar>
        <AppTitleBarWrapper>
          <AppTitle>
            <Letter
              style={{ letterSpacing: "-3px", padding: "1px 2px" }}
              color="#EF5390"
              size="lg"
            >
              芽生のスケジュール作成アプリ
            </Letter>
          </AppTitle>
          <AppTitleBarButtonWraper>
            <img
              onClick={window.electron.minimalizeWindow}
              src={minButtonImg}
            ></img>
            <img onClick={window.electron.closeWindow} src={xButtonImg}></img>
          </AppTitleBarButtonWraper>
        </AppTitleBarWrapper>
      </AppTitleBar>
      <AppContainer>
        <AppInputArea mode={mode}>
          <InputArea />
        </AppInputArea>

        <div
          style={{
            width: "5%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: "1rem",
          }}
        >
          {mode.left != "schedule" && mode.right === "result" && (
            <Button
              onClick={() => {
                console.log("Date", date);
                scheduleToText(monthSchedules, date, taRef);
              }}
              style={{
                height: "2rem",
                lineHeight: "0px",
                color: "transparent",
                backgroundColor: "#EF53903B",
              }}
            >
              <img style={{ width: "12px" }} src={rightArrowImg}></img>
            </Button>
          )}
        </div>

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
  height: 32px;
  min-width: 100vw;
  background-color: #ffb0cf;
`;
const AppTitleBarWrapper = styled(FlexRowBox)`
  width: 100%;
`;
const AppTitle = styled.div`
  margin-left: 0.5rem;
  width: 100%;
  -webkit-app-region: drag;
`;

const AppTitleBarButtonWraper = styled(FlexRowBox)`
  cursor: pointer;
  margin-right: 0.5rem;
`;

const AppContainer = styled.div`
  margin: 0 auto;
  min-height: calc(100vh - 2rem - 32px);
  min-width: calc(100vw - 2rem);
  display: flex;
  padding: 1rem;
  background-color: #ef539047;
`;

const AppInputArea = styled(FlexColBox)<{ mode: IMode }>`
  width: 67.5%;
  user-select: none;
`;

const AppResultArea = styled(FlexColBox)<{ mode: IMode }>`
  width: ${(props) => (props.mode.left != "schedule" ? "27.5%" : "27.5%")};
  padding: 1rem;
  height: calc(100vh - 4rem - 32px);
`;
