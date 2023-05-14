export enum AppRoute {
  Intro = '/',
  Main = '/main',
  SignIn = '/login',
  SignUp = '/register',
  LogOut = '/logout',
  PersonalCoach = '/personal-coach',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireCustomer = '/questionnaire-customer',
}

export enum PersonalCoachRoute {
  Friends = '/personal-coach/friends',
  Account = '/personal-coach/account',
  Trainings = '/personal-coach/trainings',
  Orders = '/personal-coach/orders',
  CreateTraining = '/personal-coach/create-training',
}

export enum NameSpaceStore {
  Workout = 'WORKOUT',
  User = 'USER',
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
}
