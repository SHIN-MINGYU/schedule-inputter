import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { InputAreaContext } from ".";
import styled from "styled-components";
import { FlexRowBox } from "../common/FlexBox";
import { Letter } from "../common/TypoGraphy";
import { ILessonType, ISchedules } from "../../../types/schedule.interface";
import useInput from "../../hooks/useInput";
import useEvent from "../../hooks/useEvent";

interface IProps {
  date: string;
}

export default function ScheduleInputter({ date }: IProps) {
  const { setMode } = useContext(InputAreaContext);
  const { publish } = useEvent();

  const [schedules, setSchedules] = useState<ISchedules>({});

  useLayoutEffect(() => {
    setSchedules((prev: ISchedules) => {
      const newObj: ISchedules = {};
      newObj[date] = {};
      return { ...prev, ...newObj };
    });
  }, []);

  useEffect(() => {
    console.log(schedules);
  }, [schedules]);

  return (
    <>
      <Letter size="2xl" m="0.25rem">
        {date}
      </Letter>
      <ScheduleInputterHeader>
        {["時間", "レッスン", "人数"]
          .concat(["時間", "レッスン", "人数"])
          .map((el) => (
            <Letter size="lg" style={{ textAlign: "center" }}>
              {el}
            </Letter>
          ))}
      </ScheduleInputterHeader>

      <ScheduleContainer>
        {Array.from({ length: 12 }).map((_, i) => (
          <Schedule setSchedules={setSchedules} date={date} time={i + 9} />
        ))}
      </ScheduleContainer>
      <button
        onClick={() => {
          for (let i = 0; i < 12; i++) {
            publish("saveSchedulesData" + String(i));
          }
          setMode("calender");
        }}
      >
        돌아가기
      </button>
    </>
  );
}
const Schedule = ({
  date,
  time,
  setSchedules,
}: {
  date: string;
  time: number;
  setSchedules: Dispatch<SetStateAction<any>>;
}) => {
  const minute = useInput();
  const people = useInput();
  const peopleRef = useRef<HTMLInputElement>(null);
  const [lessonType, setLessonType] = useState<ILessonType>("PV");

  useEffect(() => {
    setSchedules((prev: ISchedules) => {
      const newObj: any = {};
      newObj[String(time)] = {};

      const temp: any = {};
      temp[date] = { ...prev[date], ...newObj };
      return temp;
    });
  }, []);

  useEffect(() => {
    if (minute.value && (people.value || lessonType)) {
      setSchedules((prev: ISchedules) => {
        const newObj: any = {};
        newObj[String(time)] = {
          time: String(time) + ":" + String(minute.value),
          type: lessonType,
          people: String(people.value),
        };
        const temp: any = {};
        temp[date] = { ...prev[date], ...newObj };
        return temp;
      });
    }
  }, [minute.value, people.value, lessonType]);

  useEffect(() => {
    if (!minute.value) {
      setSchedules((prev: ISchedules) => {
        const newObj: any = {};
        newObj[String(time)] = {};
        const temp: any = {};
        temp[date] = { ...prev[date], ...newObj };
        return temp;
      });
    }
  }, [minute.value]);

  useEffect(() => {
    if (lessonType === "PV") {
      people.onChange("満員");
      peopleRef.current!.readOnly = true;
    } else if (lessonType === "GR") {
      people.onChange("");
      peopleRef.current!.readOnly = false;
    }
  }, [lessonType]);

  return (
    <ScheduleInput>
      <ScheduleTime>
        <Letter style={{ width: "48px" }} my="auto">
          {time}:
        </Letter>
        <ScheduleMinuteInput maxLength={2} {...minute} />
      </ScheduleTime>
      <ScheduleLesson>
        <ScheduleLessonType
          onClick={() => setLessonType("PV")}
          type="PV"
          currentLessonType={lessonType}
        >
          <Letter>PV</Letter>
        </ScheduleLessonType>
        <ScheduleLessonType
          onClick={() => setLessonType("GR")}
          type="GR"
          currentLessonType={lessonType}
        >
          <Letter>GR</Letter>
        </ScheduleLessonType>
      </ScheduleLesson>
      <ScheduleLessonPeople>
        <ScheduleLessonPeopleInput ref={peopleRef} maxLength={2} {...people} />
        <Letter my="auto">名</Letter>
      </ScheduleLessonPeople>
    </ScheduleInput>
  );
};

const ScheduleInputterHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  grid-auto-flow: row;
  justify-content: center;
  align-items: center;
`;

const ScheduleContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, minmax(0, 1fr));
  grid-auto-flow: column;
`;

const ScheduleInput = styled.div`
  margin: 0.25rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  * {
    justify-content: center;
  }
`;

const ScheduleTime = styled(FlexRowBox)``;

const ScheduleMinuteInput = styled.input`
  width: 32px;
  font-family: "ChiikawaFont";
`;

const ScheduleLesson = styled(FlexRowBox)`
  width: 100%;
`;

const ScheduleLessonType = styled.div<{
  type?: ILessonType;
  currentLessonType: ILessonType;
}>`
  ${(props) =>
    props.type === "PV"
      ? "border-top-left-radius: 12.5%;border-bottom-left-radius: 12.5%;"
      : "border-top-right-radius: 12.5%;border-bottom-right-radius: 12.5%;"}

  padding: 0.25rem;
  color: ${(props) =>
    props.currentLessonType === props.type ? "#0000CD" : "#B0C4DE"};
  border: 1px solid
    ${(props) =>
      props.currentLessonType === props.type ? "#0000CD" : "#B0C4DE"};
  cursor: pointer;
`;

const ScheduleLessonPeople = styled(FlexRowBox)``;
const ScheduleLessonPeopleInput = styled.input`
  width: 32px;
  font-family: "ChiikawaFont";
`;
