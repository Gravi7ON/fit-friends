import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from 'src/constant';
import Intro from 'src/pages/intro/intro';
import Main from 'src/pages/personal-customer-account/main/main';
import PersonalCoach from 'src/pages/personal-coach-account/personal-coach/personal-coach';
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
      ></Route>
      <Route
        path={AppRoute.SignIn}
        element={redirectInOrderRole(authorizationStatus, userRole, <SignIn />)}
      ></Route>
      <Route
        path={AppRoute.SignUp}
        element={redirectInOrderRole(authorizationStatus, userRole, <SignUp />)}
      ></Route>
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
      ></Route>
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
    </Routes>
  );
}
