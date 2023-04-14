import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { WeekFoodDiary, WeekWorkoutDiary } from '@backend/shared-types';
import { FoodDiaryModel } from './models/food-diary.model';
import { WorkoutDiaryModel } from './models/workout-diary.model';
import { FavoriteGymsModel } from './models/favorite-gyms.model';
import { FavoriteGymsQuery } from './queries/favorite-gyms.query';
import { MyPurchaseModel } from './models/my-purchase.model';
import { MyNotifiesQuery } from './queries/my-notifies.query';
import { MyNotifyModel } from './models/my-notify.model';

@Injectable()
export class PersonalAccountRepository {
  constructor(
    @InjectModel(FoodDiaryModel.name)
    private readonly foodDiaryModel: Model<FoodDiaryModel>,
    @InjectModel(WorkoutDiaryModel.name)
    private readonly workoutDiaryModel: Model<WorkoutDiaryModel>,
    @InjectModel(FavoriteGymsModel.name)
    private readonly favoriteGymsModel: Model<FavoriteGymsModel>,
    @InjectModel(MyPurchaseModel.name)
    private readonly myPurchaseModel: Model<MyPurchaseModel>,
    @InjectModel(MyNotifyModel.name)
    private readonly myNotifyModel: Model<MyNotifyModel>
  ) {}

  public async saveFoodDiary(foodDiary: WeekFoodDiary): Promise<WeekFoodDiary> {
    const currentWeekDiary = this.foodDiaryModel.create({ ...foodDiary });

    return currentWeekDiary;
  }

  public async saveWorkoutDiary({
    year,
    userId,
    weekOfYear,
    diary,
  }: WeekWorkoutDiary): Promise<WeekWorkoutDiary> {
    const currentWeekDiary = this.workoutDiaryModel.create({
      userId,
      weekOfYear,
      year,
      diary,
    });

    return currentWeekDiary;
  }

  public async updateFoodDiary({
    calories,
    userId,
    year,
    weekOfYear,
  }: WeekFoodDiary): Promise<WeekFoodDiary | null> {
    const currentWeekDiary = this.foodDiaryModel.findOneAndUpdate(
      {
        userId,
        year,
        weekOfYear,
      },
      { calories: calories },
      { new: true }
    );

    return currentWeekDiary;
  }

  public async updateWorkoutDiary({
    year,
    userId,
    weekOfYear,
    diary,
  }: WeekWorkoutDiary): Promise<WeekWorkoutDiary | null> {
    const currentWeekDiary = this.workoutDiaryModel.findOneAndUpdate(
      {
        userId,
        year,
        weekOfYear,
      },
      { diary: { ...diary } },
      { new: true }
    );

    return currentWeekDiary;
  }

  public async findFoodDiary({
    userId,
    weekOfYear,
    year,
  }: WeekFoodDiary): Promise<WeekFoodDiary | null> {
    const currentWeekDiary = this.foodDiaryModel
      .findOne({
        userId,
        year,
        weekOfYear,
      })
      .exec();

    return currentWeekDiary;
  }

  public async findWorkoutDiary({
    userId,
    weekOfYear,
    year,
  }: WeekWorkoutDiary): Promise<WeekWorkoutDiary | null> {
    const currentWeekDiary = this.workoutDiaryModel
      .findOne({
        userId,
        year,
        weekOfYear,
      })
      .exec();

    return currentWeekDiary;
  }

  public async addFavoriteGym(
    userId: string,
    gymId: number
  ): Promise<{ userId: string; favoriteGymId: number }> {
    return this.favoriteGymsModel.create({
      userId,
      favoriteGymId: gymId,
    });
  }

  public async findFavoriteGym(
    gymId: number
  ): Promise<{ userId: string; favoriteGymId: number }> {
    return this.favoriteGymsModel.findOne({
      favoriteGymId: gymId,
    });
  }

  public async findFavoriteGyms(
    userId: string,
    { limit, page }: FavoriteGymsQuery
  ): Promise<{ userId: string; favoriteGymId: number }[]> {
    return this.favoriteGymsModel.aggregate([
      { $match: { userId } },
      { $skip: page > 0 ? limit * (page - 1) : 0 },
      { $limit: limit },
    ]);
  }

  public async removeFavoriteGym(
    gymId: number
  ): Promise<{ userId: string; favoriteGymId: number }> {
    return this.favoriteGymsModel
      .findOneAndDelete({
        favoriteGymId: gymId,
      })
      .exec();
  }

  public async addPurchaseWorkout(
    userId: string,
    workoutId: number
  ): Promise<{
    userId: string;
    purchasedGymIds: number[];
    purchasedWorkoutIds: number[];
  }> {
    const newPurchase = await this.myPurchaseModel.create({
      userId,
      purchasedWorkoutIds: [workoutId],
    });

    return newPurchase;
  }

  public async updateWorkoutPurchase(
    userId: string,
    newPurchasedWorkoutIds: number[]
  ): Promise<{
    userId: string;
    purchasedGymIds: number[];
    purchasedWorkoutIds: number[];
  }> {
    const updatedPurchase = this.myPurchaseModel.findOneAndUpdate(
      {
        userId,
      },
      { purchasedWorkoutIds: newPurchasedWorkoutIds },
      { new: true }
    );

    return updatedPurchase;
  }

  public async addPurchaseGym(
    userId: string,
    gymId: number
  ): Promise<{
    userId: string;
    purchasedGymIds: number[];
    purchasedWorkoutIds: number[];
  }> {
    const newPurchase = await this.myPurchaseModel.create({
      userId,
      purchasedGymIds: [gymId],
    });

    return newPurchase;
  }

  public async updatePurchaseGym(
    userId: string,
    newPurchasedGymIds: number[]
  ): Promise<{
    userId: string;
    purchasedGymIds: number[];
    purchasedWorkoutIds: number[];
  }> {
    const updatedPurchase = this.myPurchaseModel.findOneAndUpdate(
      {
        userId,
      },
      { purchasedGymIds: newPurchasedGymIds },
      { new: true }
    );

    return updatedPurchase;
  }

  public async findMyPurchase(userId: string): Promise<{
    userId: string;
    purchasedGymIds: number[];
    purchasedWorkoutIds: number[];
  }> {
    return this.myPurchaseModel.findOne({
      userId,
    });
  }

  public async findMyNotifies(
    userId: string,
    { limit, page }: MyNotifiesQuery
  ): Promise<{ userId: string; textNotify: number }[]> {
    return this.myNotifyModel.aggregate([
      { $match: { userId } },
      { $skip: page > 0 ? limit * (page - 1) : 0 },
      { $limit: limit },
    ]);
  }

  public async removeMyNotify(notifyId: string, userId: string) {
    return this.myNotifyModel
      .findOneAndDelete({
        _id: notifyId,
        userId,
      })
      .exec();
  }
}
