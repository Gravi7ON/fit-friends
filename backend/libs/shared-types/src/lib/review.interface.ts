export interface Review {
  id?: number;
  customerId: string;
  text: string;
  rating: number;
  workoutId: number;
  createdAt?: Date;
}
