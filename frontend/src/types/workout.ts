export type Workout = {
  id: number;
  title: string;
  backgroundImage: string;
  experience: string;
  specialization: string;
  cost: number;
  calories: number;
  description: string;
  sex: string;
  trainingTime: string;
  workoutVideo: string;
  rating: number;
  coachId: string;
  isSpecialOffer: boolean;
  reviews: Record<string, unknown>[];
  orders?: Record<string, number>;
};
