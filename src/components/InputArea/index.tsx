import styled from "styled-components";
import { Button } from "../common/Button";
import { FlexColBox, FlexRowBox } from "../common/FlexBox";
import usePreset from "../../hooks/usePreset";
import ScheduleCalender from "./ScheduleCalender";
import { createContext, useEffect, useState } from "react";
import ScheduleInputter from "./ScheduleInputter";
import { Letter } from "../common/TypoGraphy";
export const InputAreaContext = createContext({
  mode: "default",
  setMode: function (mode: string) {
    this.mode = mode;
  },
});

export default function InputArea() {
  const [mode, setMode] = useState("default");
  useEffect(() => {
    console.log(mode);
  }, [mode]);
  // const { presetList, createPrest, deletePreset } = usePreset();
  return (
    <InputAreaContext.Provider value={{ mode, setMode }}>
      {mode != "schedule" && (
        <ScheduleCalenderArea>
          <ScheduleCalender></ScheduleCalender>
        </ScheduleCalenderArea>
      )}
      {mode === "schedule" && (
        <ScheduleArea>
          <ScheduleInputter date="11月14日"></ScheduleInputter>
        </ScheduleArea>
      )}
    </InputAreaContext.Provider>
  );
}

const PresetArea = styled(FlexRowBox)`
  margin: 0.25rem;
  border-bottom: 1px solid #d9d9d9;
  padding: 0.5rem;
`;

const PresetButton = styled(Button)``;

const ScheduleCalenderArea = styled.div`
  align-items: center;
  height: 100%;
  display: inline;
  width: 100%;
`;

const ScheduleArea = styled(FlexColBox)``;
