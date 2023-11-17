import styled from "styled-components";
import ScheduleCalender from "./ScheduleCalender";
import { useContext, useEffect } from "react";
import ScheduleInputter from "./ScheduleInputter";
import { AppContext } from "../../App";

export default function InputArea() {
  const { mode, setDate } = useContext(AppContext);

  useEffect(() => {
    if (mode.left === "preset") setDate("");
  }, [mode]);

  return (
    <>
      {mode.left === "calender" && (
        <ScheduleCalenderArea>
          <ScheduleCalender></ScheduleCalender>
        </ScheduleCalenderArea>
      )}
      {(mode.left === "schedule" || mode.left === "preset") && (
        <ScheduleArea>
          <ScheduleInputter></ScheduleInputter>
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
