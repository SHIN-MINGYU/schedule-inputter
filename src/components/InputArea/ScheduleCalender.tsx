import styled from "styled-components";
import { FlexRowBox } from "../common/FlexBox";
import { Letter } from "../common/TypoGraphy";
import day_of_a_week from "../../utils/json/day-of-a-week.json";
import { Dispatch, SetStateAction, useContext } from "react";
import useCalender from "../../hooks/useCalender";
import { ICalenderDate } from "../../../types/calender.interface";
import { Button } from "../common/Button";
import dayjs from "dayjs";
import { AppContext } from "../../App";

interface IProps {
  setDate: Dispatch<SetStateAction<string>>;
}

export default function ScheduleCalender({ setDate }: IProps) {
  const { calenderDates } = useCalender();
  const { setMode } = useContext(AppContext);
  return (
    <ScheduleCalenderContainer>
      <ScheduleCalenderHeader>
        <Letter size="7xl">{dayjs().month() + 1}月</Letter>
        <PresetContainer>
          <PresetArea>
            {/* {presetList.map((title) => (
          <PresetButton>{title}</PresetButton>
        ))} */}
            <Button
              onClick={() =>
                setMode((prev) => ({
                  ...prev,
                  ...{ right: prev.right === "preset" ? "result" : "preset" },
                }))
              }
              style={{ padding: "0.25rem 0.75rem", margin: 0 }}
            >
              プリセット
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
            onClick={() => {
              if (!el.vaild) return;
              setMode((prev) => ({ ...prev, ...{ left: "schedule" } }));
              setDate(
                String(dayjs().month() + 1) + "月" + String(el.value) + "日"
              );
            }}
            style={{
              margin: "0.125rem",
              textAlign: "start",
              backgroundColor: el.backgroundColor,
              borderRadius: "10%",
              color: el.color,
              cursor: el.vaild ? "pointer" : "auto",
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

// const PresetButton = styled(Button)``;
