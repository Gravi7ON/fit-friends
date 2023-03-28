export interface OrderWorkout {
  id?: number;
  type?: string;
  workoutId?: number;
  customerId?: string;
  cost?: number;
  amountWorkout?: number;
  sum?: number;
  payment?: string;
  createdAt?: Date;
}
