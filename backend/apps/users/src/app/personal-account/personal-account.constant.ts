export enum PersonalAccountMessageException {
  FoodDiaryNotFound = `This week user haven't food diary yet`,
  WorkoutDiaryNotFound = `This week user haven't workout diary yet`,
  FavoriteAlreadyAdded = `You already add to favorite this gym`,
  NotFoundFavorite = `You haven't added this gym to favorite`,
}

export enum DefaultFavoriteGymsQuery {
  Limit = 8,
}
