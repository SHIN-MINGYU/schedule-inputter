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

import DownArrowImg from "../../../public/down_arrow.png";
import UpArrowImg from "../../../public/up_arrow.png";

export default function ScheduleCalender() {
  const { mode, setMode, currentPreset, date, setDate } =
    useContext(AppContext);

  const { calenderDates, m, y, goNextMonth, goPrevMonth } = useCalender(date);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <ScheduleCalenderContainer>
      {isVisible && <ApplyModal hide={() => setIsVisible(false)} />}
      <ScheduleCalenderHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginRight: "1rem",
            }}
          >
            <Letter color="#EF5390" size="xs">
              {y}年
            </Letter>
            <Letter
              style={{
                color: "#EF5390",
              }}
              size="7xl"
            >
              {m + 1}月
            </Letter>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              onClick={goNextMonth}
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              src={UpArrowImg}
            ></img>
            <img
              onClick={goPrevMonth}
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
              src={DownArrowImg}
            ></img>
          </div>
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
              color="transparents"
              style={{
                padding: "0.25rem 0.75rem",
                margin: 0,
                backgroundColor: "#EF53903B",
              }}
            >
              <Letter color="#EF5390">プリセット</Letter>
            </Button>
          </PresetArea>
        </PresetContainer>
      </ScheduleCalenderHeader>
      <ScheduelCalenderBody>
        {Object.keys(day_of_a_week).map((day: string) => (
          <ScheduleCalenderDay
            style={{ marginBottom: "0.125rem", backgroundColor: "white" }}
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
              backgroundImage: el.vaild
                ? `url(../../../public/hachiware${
                    el.value > 20 ? el.value - 20 : el.value
                  }.png)`
                : "",
              backgroundSize: "50%",
              backgroundPosition: "100% 100%",
              backgroundRepeat: "no-repeat",
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

const ApplyModal = ({ hide }: { hide: () => void }) => {
  const { setMonthSchedules, currentPreset, date } = useContext(AppContext);
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
  margin-bottom: 0.5rem;
`;

const ScheduelCalenderBody = styled(FlexRowBox)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 40px repeat(6, 1fr);
  height: 85%;
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
