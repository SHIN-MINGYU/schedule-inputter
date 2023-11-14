import styled from "styled-components";
import { FlexColBox, FlexRowBox } from "../common/FlexBox";
import { Letter } from "../common/TypoGraphy";
import day_of_a_week from "../../utils/json/day-of-a-week.json";
import { useContext, useMemo } from "react";
import dayjs from "dayjs";
import useCalender from "../../hooks/useCalender";
import { ICalenderDate } from "../../../types/calender.interface";
import { InputAreaContext } from ".";
import { Button } from "../common/Button";

export default function ScheduleCalender() {
  const { DATE_OF_MONTH, calenderDates } = useCalender();
  const { setMode } = useContext(InputAreaContext);
  const startDay = useMemo(() => dayjs().set("date", 1).day(), []);
  return (
    <ScheduleCalenderContainer>
      <ScheduleCalenderHeader>
        <Letter size="7xl" weight="bold" style={{ height: "10%" }}>
          1月
        </Letter>
        <PresetContainer>
          <PresetArea>
            {/* {presetList.map((title) => (
          <PresetButton>{title}</PresetButton>
        ))} */}
            <Button style={{ padding: "0.25rem 0.75rem", margin: 0 }}>
              추가
            </Button>
          </PresetArea>
        </PresetContainer>
      </ScheduleCalenderHeader>
      <ScheduelCalenderBody>
        {Object.keys(day_of_a_week).map((day: string) => (
          <ScheduleCalenderDay
            style={{ marginBottom: "0.125rem" }}
            color={(day_of_a_week as any)[day]}
          >
            <Letter>{day}</Letter>
          </ScheduleCalenderDay>
        ))}
        {calenderDates.map((el: ICalenderDate) => (
          <ScheduleCalenderDay
            onClick={() => setMode("schedule")}
            style={{
              margin: "0.125rem",
              textAlign: "start",
              backgroundColor: el.backgroundColor,
              borderRadius: "10%",
              color: el.color,
              cursor: "pointer",
            }}
          >
            <Letter size={"xs"} m={"0.125rem"} style={{}}>
              {el.value}
            </Letter>
          </ScheduleCalenderDay>
        ))}
      </ScheduelCalenderBody>
    </ScheduleCalenderContainer>
  );
}

const ScheduleCalenderContainer = styled.div`
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  height: 100%;
  padding: 0 1rem;
`;

const ScheduleCalenderHeader = styled(FlexRowBox)`
  justify-content: space-between;
  width: 100%;
  align-items: end;
`;

const ScheduelCalenderBody = styled(FlexRowBox)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 40px repeat(6, 1fr);
  height: 90%;
`;

const ScheduleCalenderDay = styled.div<{ bgColor?: string }>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  border: 1px solid #cccccc;
`;

const PresetContainer = styled.div`
  min-height: 10vh;
  margin: 0;
  display: flex;
`;
const PresetArea = styled(FlexRowBox)`
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  padding: 0.75rem;
`;

const PresetButton = styled(Button)``;
