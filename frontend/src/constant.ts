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
}
