import styled from "styled-components";
import { FlexRowBox } from "../common/FlexBox";
import { Letter } from "../common/TypoGraphy";
import day_of_a_week from "../../utils/json/day-of-a-week.json";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import useCalender from "../../hooks/useCalender";
import { ICalenderDate } from "../../../types/calender.interface";
import { Button } from "../common/Button";
import { AppContext } from "../../App";
import Modal from "../common/Modal";

interface IProps {
  setDate: Dispatch<SetStateAction<string>>;
  date: string;
}

export default function ScheduleCalender({ setDate, date }: IProps) {
  const { calenderDates, m, y } = useCalender();
  const { mode, setMode, currentPreset } = useContext(AppContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <ScheduleCalenderContainer>
      {isVisible && <ApplyModal hide={() => setIsVisible(false)} date={date} />}
      <ScheduleCalenderHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Letter size="7xl">{m + 1}月</Letter>
          <div></div>
        </div>
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

              setDate(
                String(y) +
                  "年" +
                  String(m + 1) +
                  "月" +
                  String(el.value) +
                  "日"
              );
              if (mode.right === "preset" && currentPreset) {
                setIsVisible(true);
              } else {
                setMode((prev) => ({ ...prev, ...{ left: "schedule" } }));
              }
            }}
            style={{
              margin: "0.125rem",
              textAlign: "start",
              backgroundColor: el.backgroundColor,
              borderRadius: "10%",
              color: el.color,
              cursor: el.vaild ? "pointer" : "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Letter size={"xs"} m={"0.125rem"} style={{}}>
              {el.value}
            </Letter>
            {el.backgroundColor != "white" && (
              <Letter size="xs" style={{ textAlign: "center" }}>
                {el.backgroundColor === "violet" ? "プリセット" : "完了"}
              </Letter>
            )}
          </ScheduleCalenderDay>
        ))}
      </ScheduelCalenderBody>
    </ScheduleCalenderContainer>
  );
}

const ApplyModal = ({ hide, date }: { hide: () => void; date: string }) => {
  const { setMonthSchedules, currentPreset } = useContext(AppContext);
  const applyPreset = () => {
    const presetSchedules = JSON.parse(
      window.api.readPreset(currentPreset)
    ).schedules;
    const newObj: any = {};
    newObj[date] = presetSchedules;
    setMonthSchedules((prev) => ({
      ...prev,
      ...newObj,
    }));
    hide();
  };
  return (
    <Modal qs="#root" hide={hide}>
      <Modal.Header>
        「{currentPreset}」 プリセットを適応するってこど…？
      </Modal.Header>
      <Modal.Footer>
        <Button
          onClick={applyPreset}
          color="blue"
          style={{
            padding: 0,
            height: "fit-content",
            width: "80px",
          }}
        >
          <Letter size="xs">ル！</Letter>
        </Button>
        <Button
          color="red"
          onClick={hide}
          style={{ padding: 0, height: "fit-content", width: "80px" }}
        >
          <Letter size="xs">フ！</Letter>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

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
