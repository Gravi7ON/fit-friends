import { UserRole } from 'src/types/user';
import { AppRoute, AuthorizationStatus } from '../../../constant';
import { Navigate } from 'react-router-dom';

type PrivateCoachRouteProps = {
  authorizationStatus: AuthorizationStatus;
  role: string;
  children: JSX.Element;
};

export default function PrivateCoachRoute({
  authorizationStatus,
  children,
  role,
}: PrivateCoachRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth &&
    role === UserRole.Coach ? (
    children
  ) : (
    <Navigate
      to={AppRoute.Intro}
      replace
    />
  );
}
