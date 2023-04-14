export enum PersonalAccountMessageException {
  FoodDiaryNotFound = `This week user haven't food diary yet`,
  WorkoutDiaryNotFound = `This week user haven't workout diary yet`,
  FavoriteAlreadyAdded = `You already add to favorite this gym`,
  NotFoundFavorite = `You haven't added this gym to favorite`,
  NotFoundPurchase = `You haven't any purchased yet`,
  NotFoundNotify = `Notify with this id not found`,
  NotFoundPurchaseWorkout = `Purchase workout with this id not found`,
  NotFoundPurchaseGym = `Purchase gym with this id not found`,
  WorkoutsFailed = 'The workouts service failed to fetch, you can try later',
}

export enum DefaultFavoriteGymsQuery {
  Limit = 8,
}

export enum DefaultMyPurchaseQuery {
  Limit = 8,
}

export enum DefaultMyNotifyQuery {
  Limit = 50,
}
