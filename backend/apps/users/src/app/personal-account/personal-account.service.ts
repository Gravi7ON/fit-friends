import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { UserRepository } from '../user/user.repository';
import { UserFoodDiaryDto } from './dto/user-food-diary.dto';
import {
  RequestWithTokenPayload,
  WeekFoodDiary,
  WeekWorkoutDiary,
} from '@backend/shared-types';
import { UserWorkoutDiaryDto } from './dto/user-workout-diary.dto';
import { WeekWorkoutDiaryEntity } from './week-workout-diary.entity';
import { PersonalAccountMessageException } from './personal-account.constant';
import axios from 'axios';
import { FavoriteGymsQuery } from './queries/favorite-gyms.query';

dayjs.extend(isoWeek);

@Injectable()
export class PersonalAccountService {
  constructor(private readonly userRepository: UserRepository) {}

  async saveFoodDiary(userId: string, dto: UserFoodDiaryDto) {
    const foodDiary: WeekFoodDiary = {
      ...dto,
      userId,
      year: dayjs().year(),
      weekOfYear: dayjs().isoWeek(),
    };

    const currentWeekDiary = await this.userRepository.findFoodDiary({
      userId,
      year: foodDiary.year,
      weekOfYear: foodDiary.weekOfYear,
    });

    if (!currentWeekDiary) {
      const newFoodDiary = await this.userRepository.saveFoodDiary(foodDiary);

      return newFoodDiary;
    }

    return this.userRepository.updateFoodDiary(foodDiary);
  }

  async saveWorkoutDiary(
    userId: string,
    { calory, date, trainingTime, workoutId }: UserWorkoutDiaryDto
  ) {
    const workoutDiary: WeekWorkoutDiary = {
      userId,
      year: dayjs().year(),
      weekOfYear: dayjs().isoWeek(),
    };

    const currentWeekDiary = await this.userRepository.findWorkoutDiary({
      userId,
      year: workoutDiary.year,
      weekOfYear: workoutDiary.weekOfYear,
    });

    if (!currentWeekDiary) {
      const diaryEntity = new WeekWorkoutDiaryEntity({
        calory,
        trainingTime,
        workoutId,
        date,
      }).toObject();

      const newWorkoutDiary = await this.userRepository.saveWorkoutDiary({
        ...workoutDiary,
        diary: diaryEntity,
      });

      return newWorkoutDiary;
    }

    const updateDiaryEntity = new WeekWorkoutDiaryEntity({
      calory,
      trainingTime,
      workoutId,
      date,
      diary: currentWeekDiary.diary,
    }).toObject();

    return this.userRepository.updateWorkoutDiary({
      ...workoutDiary,
      diary: updateDiaryEntity,
    });
  }

  async findWorkoutDiary(userId: string) {
    const weekDiary = await this.userRepository.findWorkoutDiary({
      userId,
      year: dayjs().year(),
      weekOfYear: dayjs().isoWeek(),
    });

    if (!weekDiary) {
      throw new NotFoundException(
        PersonalAccountMessageException.WorkoutDiaryNotFound
      );
    }

    return weekDiary;
  }

  async findFoodDiary(userId: string) {
    const weekDiary = await this.userRepository.findFoodDiary({
      userId,
      year: dayjs().year(),
      weekOfYear: dayjs().isoWeek(),
    });

    if (!weekDiary) {
      throw new NotFoundException(
        PersonalAccountMessageException.FoodDiaryNotFound
      );
    }

    return weekDiary;
  }

  async addFavoriteGym(
    userId: string,
    gymId: number,
    request: RequestWithTokenPayload
  ) {
    try {
      await axios.get(
        `http://localhost:${process.env.WORKOUTS_PORT}/api/workouts/gyms/${gymId}`,
        {
          headers: {
            Authorization: request.headers.authorization,
          },
        }
      );
    } catch (err) {
      throw new NotFoundException(err.cause);
    }
    const existedFavorite = await this.userRepository.findFavoriteGym(gymId);

    if (existedFavorite) {
      throw new ConflictException(
        PersonalAccountMessageException.FavoriteAlreadyAdded
      );
    }
    const favoriteGym = await this.userRepository.addFavoriteGym(userId, gymId);

    return favoriteGym;
  }

  async findFavoriteGyms(
    userId: string,
    request: RequestWithTokenPayload,
    query: FavoriteGymsQuery
  ) {
    const favoriteGyms = await this.userRepository.findFavoriteGyms(
      userId,
      query
    );

    if (favoriteGyms.length > 0) {
      const favoriteGymsIds = favoriteGyms.map((gym) => gym.favoriteGymId);
      try {
        const favoriteGyms = await axios.get(
          `http://localhost:${process.env.WORKOUTS_PORT}/api/workouts/gyms/${favoriteGymsIds}`,
          {
            headers: {
              Authorization: request.headers.authorization,
            },
          }
        );

        return favoriteGyms.data;
      } catch (err) {
        throw new NotFoundException(err.cause);
      }
    }

    return favoriteGyms;
  }

  async removeFavoriteGym(gymId: number) {
    const removedFavoriteGym = await this.userRepository.removeFavoriteGym(
      gymId
    );

    if (!removedFavoriteGym) {
      Logger.error(PersonalAccountMessageException.NotFoundFavorite);
    }
  }
}
