import styled from "styled-components";
import { FlexColBox, FlexRowBox } from "../common/FlexBox";
import { Letter } from "../common/TypoGraphy";
import day_of_a_week from "../../utils/json/day-of-a-week.json";
import { useMemo } from "react";
import dayjs from "dayjs";

export default function ScheduleCalender() {
  const startDay = useMemo(() => dayjs().set("date", 1).day(), []);
  return (
    <ScheduleCalenderContainer>
      <ScheduleCalenderHeader>
        <Letter size="4xl" weight="bold">
          1月
        </Letter>
      </ScheduleCalenderHeader>
      <ScheduelCalenderBody>
        {Object.keys(day_of_a_week).map((day: string) => (
          <ScheduleCalenderDay color={(day_of_a_week as any)[day]}>
            <Letter>{day}</Letter>
          </ScheduleCalenderDay>
        ))}
        {Array.from({ length: 42 }).map((_, i) => {
          return (
            <>
              <ScheduleCalenderDay
                style={{
                  textAlign: "start",
                  height: "3rem",
                }}
              >
                <Letter size={"xs"} m={"0.125rem"} style={{}}>
                  {i}
                </Letter>
              </ScheduleCalenderDay>
            </>
          );
        })}
      </ScheduelCalenderBody>
    </ScheduleCalenderContainer>
  );
}

const ScheduleCalenderContainer = styled(FlexColBox)`
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  margin: 0.5rem;
  flex: 1 1 0%;
`;

const ScheduleCalenderHeader = styled(FlexRowBox)``;

const ScheduelCalenderBody = styled(FlexRowBox)`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
`;

const ScheduleCalenderDay = styled.div<{ bgColor?: string }>`
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
`;
