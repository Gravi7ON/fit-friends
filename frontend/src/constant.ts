export enum AppRoute {
  Intro = '/',
  SignIn = '/login',
  SignUp = '/register',
  PersonalCoach = '/personal-coach',
  PersonalCustomer = '/personal-customer',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireCustomer = '/questionnaire-customer',
  NotFound = '/not-found',
}

export enum PersonalCustomerRoute {
  Friends = '/personal-customer/friends',
  Account = '/personal-customer/account',
  Purchases = '/personal-customer/purshases',
  TrainingsDiary = '/personal-customer/trainings-diary',
  FoodDiary = '/personal-customer/food-diary',
  Workouts = '/personal-customer/workouts',
  Users = '/personal-customer/users',
  Gyms = '/personal-customer/gyms',
}

export enum PersonalCoachRoute {
  Friends = '/personal-coach/friends',
  Account = '/personal-coach/account',
  Trainings = '/personal-coach/trainings',
  Orders = '/personal-coach/orders',
  CreateTraining = '/personal-coach/create-training',
  Workouts = '/personal-coach/workouts',
}

export enum NameSpaceStore {
  WorkoutFilter = 'WORKOUT_FILTER',
  UserFilter = 'USER_FILTER',
  GymsFilter = 'GYMS_FILTER',
  Workouts = 'WORKOUTS',
  User = 'USER_PROCCES',
  Users = 'USERS',
  Gyms = 'GYMS',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'No auth',
  Unknown = 'Unknown',
}

export enum APIRoute {
  SignUp = '/register',
  SignIn = '/login',
  RefreshToken = '/refresh-token',
  AdditionalInfo = '/additional-info',
  MyFriends = '/my-friends',
  Coach = '/coach',
  CoachOrders = '/coach-orders',
  PersonalTrainingRequests = '/personal-training',
  Gyms = '/gyms',
}
