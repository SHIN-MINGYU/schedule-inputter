export interface IPreset {
  title: string;
  schedules: ISchedules;
  createdAt: Date;
}

export interface ISchedules {
  [key: string]: ISchedule;
}

export interface ISchedule {
  time: string;
  type: ILessonType;
  people: string;
}

export interface IMonthSchdules {
  [key: string]: ISchedules;
}

export type ILessonType = "PV" | "GL";
