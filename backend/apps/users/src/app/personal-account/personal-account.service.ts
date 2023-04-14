import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { UserFoodDiaryDto } from './dto/user-food-diary.dto';
import { WeekFoodDiary, WeekWorkoutDiary } from '@backend/shared-types';
import { UserWorkoutDiaryDto } from './dto/user-workout-diary.dto';
import { WeekWorkoutDiaryEntity } from './entities/week-workout-diary.entity';
import { PersonalAccountMessageException } from './personal-account.constant';
import axios from 'axios';
import { FavoriteGymsQuery } from './queries/favorite-gyms.query';
import { PersonalAccountRepository } from './personal-account.repository';
import { MyPurchaseQuery } from './queries/my-purchase.query';
import { MyNotifiesQuery } from './queries/my-notifies.query';

dayjs.extend(isoWeek);

@Injectable()
export class PersonalAccountService {
  constructor(
    private readonly personalAccountRepository: PersonalAccountRepository
  ) {}

  async saveFoodDiary(userId: string, dto: UserFoodDiaryDto) {
    const foodDiary: WeekFoodDiary = {
      ...dto,
      userId,
      year: dayjs().year(),
      weekOfYear: dayjs().isoWeek(),
    };

    const currentWeekDiary = await this.personalAccountRepository.findFoodDiary(
      {
        userId,
        year: foodDiary.year,
        weekOfYear: foodDiary.weekOfYear,
      }
    );

    if (!currentWeekDiary) {
      const newFoodDiary = await this.personalAccountRepository.saveFoodDiary(
        foodDiary
      );

      return newFoodDiary;
    }

    return this.personalAccountRepository.updateFoodDiary(foodDiary);
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

    const currentWeekDiary =
      await this.personalAccountRepository.findWorkoutDiary({
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

      const newWorkoutDiary =
        await this.personalAccountRepository.saveWorkoutDiary({
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

    return this.personalAccountRepository.updateWorkoutDiary({
      ...workoutDiary,
      diary: updateDiaryEntity,
    });
  }

  async findWorkoutDiary(userId: string) {
    const weekDiary = await this.personalAccountRepository.findWorkoutDiary({
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
    const weekDiary = await this.personalAccountRepository.findFoodDiary({
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

  async addFavoriteGym(userId: string, gymId: number, authorization: string) {
    try {
      await axios.get(
        `http://localhost:${process.env.WORKOUTS_PORT}/api/workouts/gym/${gymId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
    } catch (err) {
      throw new NotFoundException(err.response.data.message);
    }
    const existedFavorite =
      await this.personalAccountRepository.findFavoriteGym(gymId);

    if (existedFavorite) {
      throw new ConflictException(
        PersonalAccountMessageException.FavoriteAlreadyAdded
      );
    }
    const favoriteGym = await this.personalAccountRepository.addFavoriteGym(
      userId,
      gymId
    );

    return favoriteGym;
  }

  async findFavoriteGyms(
    userId: string,
    authorization: string,
    query: FavoriteGymsQuery
  ) {
    const favoriteGyms = await this.personalAccountRepository.findFavoriteGyms(
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
              Authorization: authorization,
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
    const removedFavoriteGym =
      await this.personalAccountRepository.removeFavoriteGym(gymId);

    if (!removedFavoriteGym) {
      Logger.error(PersonalAccountMessageException.NotFoundFavorite);
    }
  }

  async addPurchaseWorkout(
    userId: string,
    workoutId: number,
    authorization: string
  ) {
    try {
      await axios.get(
        `http://localhost:${process.env.WORKOUTS_PORT}/api/workouts/${workoutId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
    } catch (err) {
      throw new NotFoundException(err.response.data.message);
    }
    const existedPurchases =
      await this.personalAccountRepository.findMyPurchase(userId);

    if (!existedPurchases) {
      const newPurchase =
        await this.personalAccountRepository.addPurchaseWorkout(
          userId,
          workoutId
        );

      return newPurchase;
    }

    const newPurchasedWorkoutIds = [
      ...new Set([...existedPurchases.purchasedWorkoutIds, workoutId]),
    ];
    const updatedPurchase =
      await this.personalAccountRepository.updateWorkoutPurchase(
        userId,
        newPurchasedWorkoutIds
      );

    return updatedPurchase;
  }

  async addPurchaseGym(userId: string, gymId: number, authorization: string) {
    try {
      await axios.get(
        `http://localhost:${process.env.WORKOUTS_PORT}/api/workouts/gym/${gymId}`,
        {
          headers: {
            Authorization: authorization,
          },
        }
      );
    } catch (err) {
      throw new NotFoundException(err.response.data.message);
    }
    const existedPurchases =
      await this.personalAccountRepository.findMyPurchase(userId);

    if (!existedPurchases) {
      const newPurchase = await this.personalAccountRepository.addPurchaseGym(
        userId,
        gymId
      );

      return newPurchase;
    }

    const newPurchasedGymIds = [
      ...new Set([...existedPurchases.purchasedGymIds, gymId]),
    ];
    const updatedPurchase =
      await this.personalAccountRepository.updatePurchaseGym(
        userId,
        newPurchasedGymIds
      );

    return updatedPurchase;
  }

  async findMyPurchases(
    userId: string,
    authorization: string,
    { limit, page, purchaseType }: MyPurchaseQuery
  ) {
    const myExistedPurchases =
      await this.personalAccountRepository.findMyPurchase(userId);

    if (!myExistedPurchases) {
      throw new NotFoundException(
        PersonalAccountMessageException.NotFoundPurchase
      );
    }

    const workoutIds = myExistedPurchases.purchasedWorkoutIds;
    const gymIds = myExistedPurchases.purchasedGymIds;

    try {
      const purchases = await Promise.all([
        axios.get(
          `http://localhost:${process.env.WORKOUTS_PORT}/api/workouts/gyms/${gymIds}?limit=${limit}&page=${page}`,
          {
            headers: {
              Authorization: authorization,
            },
          }
        ),
        axios.get(
          `http://localhost:${process.env.WORKOUTS_PORT}/api/workouts?workoutIds=${workoutIds}&limit=${limit}&page=${page}`,
          {
            headers: {
              Authorization: authorization,
            },
          }
        ),
      ]);

      switch (purchaseType) {
        case 'gyms':
          myExistedPurchases.purchasedGymIds = purchases[0].data;
          return myExistedPurchases;
        case 'workouts':
          myExistedPurchases.purchasedWorkoutIds = purchases[1].data;
          return myExistedPurchases;
        default:
          myExistedPurchases.purchasedGymIds = purchases[0].data;
          myExistedPurchases.purchasedWorkoutIds = purchases[1].data;
          return myExistedPurchases;
      }
    } catch {
      throw new BadRequestException(
        PersonalAccountMessageException.WorkoutsFailed
      );
    }
  }

  async removePurchaseWorkout(userId: string, workoutId: number) {
    const existedPurchases =
      await this.personalAccountRepository.findMyPurchase(userId);

    if (!existedPurchases?.purchasedWorkoutIds.includes(workoutId)) {
      throw new NotFoundException(
        PersonalAccountMessageException.NotFoundPurchaseWorkout
      );
    }
    const updatedPurchaseWorkout =
      await this.personalAccountRepository.updateWorkoutPurchase(
        userId,
        existedPurchases.purchasedWorkoutIds.filter((id) => id !== workoutId)
      );

    return updatedPurchaseWorkout;
  }

  async removePurchaseGym(userId: string, gymId: number) {
    const existedPurchases =
      await this.personalAccountRepository.findMyPurchase(userId);

    if (!existedPurchases?.purchasedGymIds.includes(gymId)) {
      throw new NotFoundException(
        PersonalAccountMessageException.NotFoundPurchaseGym
      );
    }
    const updatedPurchaseWorkout =
      await this.personalAccountRepository.updatePurchaseGym(
        userId,
        existedPurchases.purchasedGymIds.filter((id) => id !== gymId)
      );

    return updatedPurchaseWorkout;
  }

  async findMyNotifies(userId: string, query: MyNotifiesQuery) {
    const myExistedNotifies =
      await this.personalAccountRepository.findMyNotifies(userId, query);

    return myExistedNotifies;
  }

  async removeMyNotify(notifyId: string, userId: string) {
    const removedMyNotify = await this.personalAccountRepository.removeMyNotify(
      notifyId,
      userId
    );

    if (!removedMyNotify) {
      Logger.error(PersonalAccountMessageException.NotFoundNotify);
    }
  }
}
