import { WeekWorkoutDiary } from '@backend/shared-types';

const INDEX_DAY_OF_WEEK = 1;

export class WeekWorkoutDiaryEntity {
  public diary?: object | undefined;
  public calory: string;
  public trainingTime: string;
  public date: string;
  public workoutId: number;

  constructor(diary: WeekWorkoutDiary) {
    this.fillEntity(diary);
  }

  public toObject() {
    return {
      ...this.diary,
    };
  }

  public fillEntity({
    calory,
    date,
    workoutId,
    trainingTime,
    diary,
  }: WeekWorkoutDiary) {
    this.diary = diary;
    if (!diary) {
      this.diary = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };
    }

    this.diary[date.split(',')[INDEX_DAY_OF_WEEK].trim()]?.push({
      calory,
      trainingTime,
      workoutId,
      date,
    });
  }
}
