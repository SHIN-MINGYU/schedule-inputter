export interface IPreset {
  title: string;
  schedules: ISchedule[];
  createdAt: Date;
}

export interface ISchedule {
  time: number;
  type: string;
  people: number;
}
