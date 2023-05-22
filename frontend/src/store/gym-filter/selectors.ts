import { NameSpaceStore } from 'src/constant';
import { GymFilterValue, State } from 'src/types/state';

export const getGymFilterValue = (state: State): GymFilterValue =>
  state[NameSpaceStore.GymsFilter];
