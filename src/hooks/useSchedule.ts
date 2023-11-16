import { RefObject } from "react";
import { IMonthSchdules } from "../../types/schedule.interface";
import dayjs from "dayjs";

export default function useSchedule() {
  const scheduleToText = (
    monthSchedules: IMonthSchdules,
    ref: RefObject<HTMLTextAreaElement>
  ) => {
    let str = "";
    let temp = "";
    Object.keys(monthSchedules)
      .sort((a, b) => {
        let tempA = a;
        let tempB = b;
        tempA = tempA.replace("年", "-");
        tempA = tempA.replace("月", "-");
        tempA = tempA.replace("日", "");
        tempB = tempB.replace("年", "-");
        tempB = tempB.replace("月", "-");
        tempB = tempB.replace("日", "");

        return dayjs(tempA, "YYYY-MM-DD").diff(dayjs(tempB, "YYYY-MM-DD"));
      })
      .map((monthDate: string) => {
        temp += monthDate.split("月")[1];

        Object.keys(monthSchedules[monthDate]).map((hour: string) => {
          if (Object.keys(monthSchedules[monthDate][hour]).length != 0) {
            const s = monthSchedules[monthDate][hour];
            let blankCount = 0;
            let people = s.people;
            if (s.time.length === 1) s.time = "0" + s.time;
            if (s.people != "満席") people = s.people + "名";
            blankCount = temp.getBlankCountForGmail();

            if (temp.includes("\n")) {
              for (let c = 0; c < 10; c++) {
                temp += " ";
              }
            }

            temp = temp.addBlank(10 - blankCount);
            blankCount = 0;
            hour = hour.length === 1 ? "0" + hour : hour;
            const time = hour + ":" + s.time;
            temp += time;
            blankCount = time.getBlankCountForGmail();
            temp = temp.addBlank(12 - blankCount);
            blankCount = 0;
            temp += s.type;
            blankCount = s.type.getBlankCountForGmail();
            temp = temp.addBlank(7 - blankCount);
            temp += people + "\n";
          }
        });
        if (temp === monthDate.split("月")[1]) temp = "";
        str += temp;
        temp = "";
      });
    ref.current!.value = str;
  };

  const saveMonthSchedule = (monthSchedules: IMonthSchdules) => {
    window.api.saveData(JSON.stringify(monthSchedules));
  };

  const loadMonthSchedule = () => {
    return window.api.loadData();
  };

  return { scheduleToText, saveMonthSchedule, loadMonthSchedule };
}
