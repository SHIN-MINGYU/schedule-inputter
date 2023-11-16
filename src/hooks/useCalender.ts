import dayjs from "dayjs";
import { useContext, useLayoutEffect, useMemo, useState } from "react";
import type { ICalenderDate } from "../../types/calender.interface";
import { AppContext } from "../App";

export default function useCalender() {
  const { monthSchedules } = useContext(AppContext);
  const [y, setY] = useState(dayjs().year());
  const [m, setM] = useState(dayjs().month());
  // constant
  const startDay = useMemo(() => dayjs().set("date", 1).day(), []);

  const DATE_OF_MONTH: { [key: number]: number } = useMemo(
    () => [
      31,
      (dayjs().year() % 4 == 0 && dayjs().year() % 100 != 0) ||
      dayjs().year() % 400 == 0
        ? 29
        : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ],
    [dayjs().year()]
  );

  //variable
  const [calenderDates, setCalenderDates] = useState<ICalenderDate[]>([]);

  useLayoutEffect(() => {
    setCalenderDates(computeCalenderDates());
  }, [monthSchedules, m]);

  const computeCalenderDates = () => {
    let idx = 0;
    const prevDates: ICalenderDate[] = Array.from({ length: startDay })
      .map((_, i) => {
        idx++;
        return {
          value: DATE_OF_MONTH[m - 1] - i,
          backgroundColor: "white",
          color: "#D0D0D0",
          vaild: false,
        };
      })
      .reverse();
    const currentDates = Array.from({
      length: DATE_OF_MONTH[m],
    }).map((_, i) => {
      idx++;
      let backgroundColor = "white";
      const currentDate =
        y + "年" + String(m + 1) + "月" + String(i + 1) + "日";
      let color = idx % 7 === 0 ? "blue" : idx % 7 === 1 ? "red" : "black";
      if (
        Object.keys(monthSchedules).length != 0 &&
        currentDate in monthSchedules
      ) {
        Object.keys(monthSchedules[currentDate]).forEach((hour) => {
          if (Object.keys(monthSchedules[currentDate][hour]).length != 0) {
            if (!monthSchedules[currentDate][hour].preset)
              backgroundColor = "blue";
            if (backgroundColor != "blue") backgroundColor = "violet";
            color = "white";
          }
        });
      }
      return {
        value: i + 1,
        backgroundColor,
        color,
        vaild: true,
      };
    });
    const tempArr = prevDates.concat(currentDates);

    const nextDates = Array.from({ length: 42 - tempArr.length }).map(
      (_, i) => ({
        value: i + 1,
        backgroundColor: "white",
        color: "#D0D0D0",
        vaild: false,
      })
    );
    return tempArr.concat(nextDates);
  };

  const goNextMonth = () => {
    if (m === 11) setY((prev) => prev + 1);
    setM((prev) => {
      if (prev === 11) return 0;
      return prev + 1;
    });
  };

  const goPrevMonth = () => {
    if (m === 0) setY((prev) => prev - 1);
    setM((prev) => {
      if (prev === 0) return 11;
      return prev - 1;
    });
  };

  return { DATE_OF_MONTH, calenderDates, m, y, goNextMonth, goPrevMonth };
}
