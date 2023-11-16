import styled from "styled-components";
// import usePreset from "../../hooks/usePreset";
import ScheduleCalender from "./ScheduleCalender";
import { useContext, useEffect, useState } from "react";
import ScheduleInputter from "./ScheduleInputter";
import { AppContext } from "../../App";

export default function InputArea() {
  const { mode } = useContext(AppContext);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (mode.left === "preset") setDate("");
  }, [mode]);

  return (
    <>
      {mode.left === "calender" && (
        <ScheduleCalenderArea>
          <ScheduleCalender date={date} setDate={setDate}></ScheduleCalender>
        </ScheduleCalenderArea>
      )}
      {(mode.left === "schedule" || mode.left === "preset") && (
        <ScheduleArea>
          <ScheduleInputter date={date}></ScheduleInputter>
        </ScheduleArea>
      )}
    </>
  );
}

const ScheduleCalenderArea = styled.div`
  height: 100%;
  width: 100%;
`;

const ScheduleArea = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
`;
