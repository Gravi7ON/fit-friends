import { UserRole } from 'src/types/user';
import { AppRoute, AuthorizationStatus } from '../../../constant';
import { Navigate } from 'react-router-dom';

type PrivateCustomerRouteProps = {
  authorizationStatus: AuthorizationStatus;
  role: string;
  children: JSX.Element;
};

export default function PrivateCustomerRoute({
  authorizationStatus,
  children,
  role,
}: PrivateCustomerRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth &&
    role === UserRole.Customer ? (
    children
  ) : (
    <Navigate
      to={AppRoute.Intro}
      replace
    />
  );
}
