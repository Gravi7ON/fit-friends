export interface WeekWorkoutDiary {
  userId?: string;
  year?: number;
  weekOfYear?: number;
  workoutId?: number;
  calory?: string;
  trainingTime?: string;
  date?: string;
  diary?: object | undefined;
}
