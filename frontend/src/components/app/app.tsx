import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AppRoute,
  AuthorizationStatus,
  PersonalCoachRoute,
  PersonalCustomerRoute,
} from 'src/constant';
import Intro from 'src/pages/intro/intro';
import PersonalCoach from 'src/pages/personal-coach-account/personal-coach';
import SignIn from 'src/pages/sign-on/sign-in/sign-in';
import SignUp from 'src/pages/sign-on/sign-up/sign-up';
import { useAppSelector } from 'src/hooks/store.hooks';
import {
  getAuthorizationStatus,
  getUserRole,
} from 'src/store/user-proccess/selectors';
import PrivateCustomerRoute from '../helpers/private-routes/private-customer-route';
import PrivateCoachRoute from '../helpers/private-routes/private-coach-route';
import { UserRole } from 'src/types/user';
import QuestionnaireCoach from 'src/pages/sign-on/questionnaire-coach/questionnaire-coach';
import QuestionnaireCustomer from 'src/pages/sign-on/questionnaire-customer/questionnaire-customer';
import CoachAccountMain from '../personal-account-coach/coach-account-main/coach-account-main';
import CoachAccountFriends from '../personal-account-coach/coach-account-friends/coach-account-friends';
import NotFound from 'src/pages/not-found/not-found';
import CoachAccountCreateTraining from '../personal-account-coach/coach-account-create-training/coach-account-create-training';
import CoachAccountTrainings from '../personal-account-coach/coach-account-trainings/coach-account-trainings';
import CoachAccountOrders from '../personal-account-coach/coach-account-orders/coach-account-orders';
import PersonalCustomer from 'src/pages/personal-customer-account/personal-customer';
import { CustomerMain } from '../personal-account-customer/customer-main/customer-main';
import CustomerAccount from '../personal-account-customer/customer-account/customer-account';
import CustomerAccountFriends from '../personal-account-customer/customer-account-friends/customer-account-friends';
import WorkoutsCatalogue from '../personal-account-customer/workouts-catalogue/workouts-catalogue';
import UsersCatalogue from '../personal-account-customer/users-catalogue/users-catalogue';
import GymsCatalogue from '../personal-account-customer/gyms-catalogue/gyms-catalogue';
import UserScreen from '../common-ui/user/user-screen';
import GymScreen from '../common-ui/gym/gym-screen';
import WorkoutScreenCustomer from '../common-ui/workout/workout-screen-customer';
import WorkoutScreenCoach from '../common-ui/workout/workout-screen-coach';
import CustomerAccountGyms from '../personal-account-customer/customer-account-gyms/customer-account-gyms';
import CustomerAccountPurchases from '../personal-account-customer/customer-account-purchases/customer-account-purchases';
import CustomerAccountFoodDiary from '../personal-account-customer/customer-account-food-diary/customer-account-food-diary';
import CustomerAccountTrainingDiary from '../personal-account-customer/cistomer-account-training-diary/customer-account-training-diary';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userRole = useAppSelector(getUserRole);

  const redirectInOrderRole = (
    authStatus: string,
    role: string,
    defaultPage: JSX.Element
  ) => {
    if (authStatus === AuthorizationStatus.Auth) {
      switch (role) {
        case UserRole.Customer:
          return (
            <Navigate
              to={AppRoute.PersonalCustomer}
              replace
            />
          );
        case UserRole.Coach:
          return (
            <Navigate
              to={AppRoute.PersonalCoach}
              replace
            />
          );
      }
    }

    return defaultPage;
  };

  return (
    <Routes>
      <Route
        path={AppRoute.Intro}
        element={<Intro />}
      />
      <Route
        path={AppRoute.SignIn}
        element={redirectInOrderRole(authorizationStatus, userRole, <SignIn />)}
      />
      <Route
        path={AppRoute.SignUp}
        element={redirectInOrderRole(authorizationStatus, userRole, <SignUp />)}
      />
      <Route
        path={AppRoute.PersonalCustomer}
        element={
          <PrivateCustomerRoute
            authorizationStatus={authorizationStatus}
            role={userRole}
            toNavigate={AppRoute.PersonalCoach}
          >
            <PersonalCustomer />
          </PrivateCustomerRoute>
        }
      >
        <Route
          index
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CustomerMain />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.Workouts}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <WorkoutsCatalogue />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={`${PersonalCustomerRoute.Workouts}/:workoutId`}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <WorkoutScreenCustomer />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.Users}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <UsersCatalogue />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={`${PersonalCustomerRoute.Users}/:userId`}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <UserScreen />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={`${PersonalCustomerRoute.Gyms}/:gymId`}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <GymScreen />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.Gyms}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <GymsCatalogue />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.Account}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CustomerAccount />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.Friends}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CustomerAccountFriends />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.MyGyms}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CustomerAccountGyms />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.Purchases}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CustomerAccountPurchases />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.FoodDiary}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CustomerAccountFoodDiary />
            </PrivateCustomerRoute>
          }
        />
        <Route
          path={PersonalCustomerRoute.TrainingsDiary}
          element={
            <PrivateCustomerRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CustomerAccountTrainingDiary />
            </PrivateCustomerRoute>
          }
        />
      </Route>
      <Route
        path={AppRoute.PersonalCoach}
        element={
          <PrivateCoachRoute
            authorizationStatus={authorizationStatus}
            role={userRole}
          >
            <PersonalCoach />
          </PrivateCoachRoute>
        }
      >
        <Route
          index
          element={
            <PrivateCoachRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CoachAccountMain />
            </PrivateCoachRoute>
          }
        />
        <Route
          path={PersonalCoachRoute.Account}
          element={
            <PrivateCoachRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CoachAccountMain />
            </PrivateCoachRoute>
          }
        />
        <Route
          path={PersonalCoachRoute.Friends}
          element={
            <PrivateCoachRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CoachAccountFriends />
            </PrivateCoachRoute>
          }
        />
        <Route
          path={PersonalCoachRoute.CreateTraining}
          element={
            <PrivateCoachRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CoachAccountCreateTraining />
            </PrivateCoachRoute>
          }
        />
        <Route
          path={PersonalCoachRoute.Trainings}
          element={
            <PrivateCoachRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CoachAccountTrainings />
            </PrivateCoachRoute>
          }
        />
        <Route
          path={PersonalCoachRoute.Orders}
          element={
            <PrivateCoachRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <CoachAccountOrders />
            </PrivateCoachRoute>
          }
        />
        <Route
          path={`${PersonalCoachRoute.Workouts}/:workoutId`}
          element={
            <PrivateCoachRoute
              authorizationStatus={authorizationStatus}
              role={userRole}
            >
              <WorkoutScreenCoach />
            </PrivateCoachRoute>
          }
        />
      </Route>
      <Route
        path={AppRoute.QuestionnaireCoach}
        element={
          <PrivateCoachRoute
            authorizationStatus={authorizationStatus}
            role={userRole}
          >
            <QuestionnaireCoach />
          </PrivateCoachRoute>
        }
      />
      <Route
        path={AppRoute.QuestionnaireCustomer}
        element={
          <PrivateCustomerRoute
            authorizationStatus={authorizationStatus}
            role={userRole}
          >
            <QuestionnaireCustomer />
          </PrivateCustomerRoute>
        }
      />
      <Route
        path={'*'}
        element={<NotFound />}
      />
    </Routes>
  );
}
