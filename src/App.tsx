import styled from "styled-components";
import "./App.css";
import { FlexColBox, FlexRowBox } from "./components/common/FlexBox";
import { Result } from "./components/TextArea";
import InputArea from "./components/InputArea";
import { createContext, useContext, useEffect, useState } from "react";
import { ISchedule } from "../types/schedule.interface";
import { Button } from "./components/common/Button";

export const AppContext = createContext<{
  schedules: { [key: string]: ISchedule[] };
  setSchedules: (
    cb: (schedules: { [key: string]: ISchedule[] }) => void
  ) => void;
}>({ schedules: {}, setSchedules: () => {} });

function App() {
  const [schedules, setSchedules] = useState({});

  useEffect(() => {
    console.log("result : ", schedules);
  }, [schedules]);
  return (
    <AppContext.Provider value={{ schedules, setSchedules }}>
      <AppContainer>
        <AppInputArea>
          <InputArea />
        </AppInputArea>
        <div
          style={{
            width: "5%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button style={{ height: "2rem", lineHeight: "0px" }}>→</Button>
        </div>

        <AppResultArea>
          <Result />
        </AppResultArea>
      </AppContainer>
    </AppContext.Provider>
  );
}

export default App;

const AppContainer = styled.div`
  margin: 0 auto;
  min-height: calc(100vh - 2rem);
  min-width: calc(100vw - 2rem);
  display: flex;
  padding: 1rem;
`;

const AppInputArea = styled(FlexColBox)`
  width: 62.5%;
`;

const AppResultArea = styled(FlexColBox)`
  width: 32.5%;
`;
