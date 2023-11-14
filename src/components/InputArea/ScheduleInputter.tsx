import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { FlexRowBox } from "../common/FlexBox";
import { Letter } from "../common/TypoGraphy";
import {
  ILessonType,
  IMonthSchdules,
  ISchedules,
} from "../../../types/schedule.interface";
import useInput from "../../hooks/useInput";
import useEvent from "../../hooks/useEvent";
import { AppContext } from "../../App";

interface IProps {
  date: string;
}

export default function ScheduleInputter({ date }: IProps) {
  const { setMode } = useContext(AppContext);
  const { setMonthSchedules } = useContext(AppContext);
  const { publish } = useEvent();

  const [schedules, setSchedules] = useState<ISchedules>({});

  useEffect(() => {
    return () => {
      setMonthSchedules((prev: IMonthSchdules) => {
        const newObj: any = {};
        newObj[date] = schedules;
        return { ...prev, ...newObj };
      });
    };
  }, [schedules]);

  return (
    <>
      <ScheduleInputterHeader>
        <Letter size="7xl">{date}</Letter>
      </ScheduleInputterHeader>

      <ScheduleInputterTheme>
        {["時間", "レッスン", "人数"]
          .concat(["時間", "レッスン", "人数"])
          .map((el) => (
            <Letter
              size="md"
              style={{
                textAlign: "center",
                marginLeft: el === "時間" ? "0rem" : "1.75rem",
              }}
            >
              {el}
            </Letter>
          ))}
      </ScheduleInputterTheme>

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
  const { monthSchedules: ms } = useContext(AppContext);
  const minute = useInput(
    ms[date] ? (ms[date][time] ? ms[date][time]?.time : "") : ""
  );
  const people = useInput(
    ms[date] ? (ms[date][time] ? ms[date][time].people : "") : ""
  );
  const peopleRef = useRef<HTMLInputElement>(null);
  const [lessonType, setLessonType] = useState<ILessonType>(
    ms[date]
      ? ms[date][time]
        ? ms[date][time].type
          ? ms[date][time].type
          : "PV"
        : "PV"
      : "PV"
  );

  useEffect(() => {
    setSchedules((prev: ISchedules) => {
      const newObj: any = {};
      newObj[String(time)] = {};

      return { ...prev, ...newObj };
    });
  }, []);

  useEffect(() => {
    if (minute.value && (people.value || lessonType)) {
      setSchedules((prev: ISchedules) => {
        const newObj: any = {};
        newObj[String(time)] = {
          time: String(minute.value),
          type: lessonType,
          people: String(people.value),
        };
        return { ...prev, ...newObj };
      });
    }
  }, [minute.value, people.value, lessonType]);

  useEffect(() => {
    if (!minute.value) {
      setSchedules((prev: ISchedules) => {
        const newObj: any = {};
        newObj[String(time)] = {};
        return { ...prev, ...newObj };
      });
    }
  }, [minute.value]);

  useEffect(() => {
    if (lessonType === "PV") {
      people.onChange("満席");
      peopleRef.current!.readOnly = true;
    } else if (lessonType === "GL") {
      peopleRef.current!.readOnly = false;
    }
  }, [lessonType]);

  return (
    <ScheduleInput>
      <ScheduleTime>
        <Letter my="auto" m="0">
          {time === 9 && 0}
          {time}
        </Letter>
        <Letter m="0">:</Letter>
        <ScheduleMinuteInput
          style={{ height: "50%" }}
          maxLength={2}
          {...minute}
        />
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
          onClick={() => {
            people.onChange("");

            setLessonType("GL");
          }}
          type="GL"
          currentLessonType={lessonType}
        >
          <Letter>GL</Letter>
        </ScheduleLessonType>
      </ScheduleLesson>
      <ScheduleLessonPeople>
        <ScheduleLessonPeopleInput
          style={{ height: "50%" }}
          ref={peopleRef}
          maxLength={2}
          {...people}
        />
        <Letter my="auto" m="0">
          名
        </Letter>
      </ScheduleLessonPeople>
    </ScheduleInput>
  );
};

const ScheduleInputterHeader = styled(FlexRowBox)`
  justify-content: space-between;
  width: 100%;
  height: 10%;
`;

const ScheduleInputterTheme = styled.div`
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
  margin: 0.75rem;
  display: flex;
  flex-direction: rows;

  * {
    justify-content: center;
  }
`;

const ScheduleTime = styled(FlexRowBox)`
  justify-content: center;
  align-items: center;
`;

const ScheduleMinuteInput = styled.input`
  width: 32px;
  font-family: "ChiikawaFont";
  padding: 0.45rem 0.25rem;
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

  color: ${(props) =>
    props.currentLessonType === props.type ? "#0000CD" : "#B0C4DE"};
  border: 1px solid
    ${(props) =>
      props.currentLessonType === props.type ? "#0000CD" : "#B0C4DE"};
  cursor: pointer;
`;

const ScheduleLessonPeople = styled(FlexRowBox)`
  align-items: center;
`;
const ScheduleLessonPeopleInput = styled.input`
  width: 32px;
  font-family: "ChiikawaFont";
  padding: 0.45rem 0.25rem;
`;
