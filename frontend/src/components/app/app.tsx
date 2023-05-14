import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AppRoute,
  AuthorizationStatus,
  PersonalCoachRoute,
} from 'src/constant';
import Intro from 'src/pages/intro/intro';
import Main from 'src/pages/personal-customer-account/main';
import PersonalCoach from 'src/pages/personal-coach-account/personal-coach';
import SignIn from 'src/pages/sign-on/sign-in/sign-in';
import SignUp from 'src/pages/sign-on/sign-up/sign-up';
import { useAppSelector } from 'src/hooks/store.hooks';
import {
  getAuthorizationStatus,
  getUserRole,
} from 'src/store/user-proccess/selectors';
import PrivateCustomerRoute from '../ui-helpers/private-routes/private-customer-route';
import PrivateCoachRoute from '../ui-helpers/private-routes/private-coach-route';
import { UserRole } from 'src/types/user';
import QuestionnaireCoach from 'src/pages/sign-on/questionnaire-coach/questionnaire-coach';
import QuestionnaireCustomer from 'src/pages/sign-on/questionnaire-customer/questionnaire-customer';
import CoachAccountMain from '../personal-account-coach/coach-account-main/coach-account-main';
import CoachAccountFriends from '../personal-account-coach/coach-account-friends/coach-account-friends';
import NotFound from 'src/pages/not-found/not-found';

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
              to={AppRoute.Main}
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
        path={AppRoute.Main}
        element={
          <PrivateCustomerRoute
            authorizationStatus={authorizationStatus}
            role={userRole}
          >
            <Main />
          </PrivateCustomerRoute>
        }
      ></Route>
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
