import dayjs from "dayjs";
import { useLayoutEffect, useMemo, useState } from "react";
import type { ICalenderDate } from "../../types/calender.interface";

export default function useCalender() {
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
  }, []);

  const computeCalenderDates = () => {
    let idx = 0;
    const prevDates: ICalenderDate[] = Array.from({ length: startDay })
      .map((_, i) => {
        idx++;
        return {
          value: DATE_OF_MONTH[dayjs().month() - 1] - i,
          backgroundColor: "white",
          color: "#D0D0D0",
        };
      })
      .reverse();
    const currentDates = Array.from({
      length: DATE_OF_MONTH[dayjs().month()],
    }).map((_, i) => {
      idx++;
      return {
        value: i + 1,
        backgroundColor: "white",
        color: idx % 7 === 0 ? "blue" : idx % 7 === 1 ? "red" : "black",
      };
    });
    const tempArr = prevDates.concat(currentDates);

    const nextDates = Array.from({ length: 42 - tempArr.length }).map(
      (_, i) => ({
        value: i + 1,
        backgroundColor: "white",
        color: "#D0D0D0",
      })
    );
    return tempArr.concat(nextDates);
  };

  return { DATE_OF_MONTH, calenderDates };
}
