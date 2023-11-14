export interface IPreset {
  title: string;
  schedules: ISchedule[];
  createdAt: Date;
}

export interface ISchedules {
  [key: string]: { [key: string]: ISchedule };
}

export interface ISchedule {
  time: string;
  type: ILessonType;
  people: string;
}

export type ILessonType = "PV" | "GR";
