import NavBar from 'src/components/common-ui/personal-account-header/nav-bar/nav-bar';
import SearchBar from 'src/components/common-ui/personal-account-header/search-bar/search-bar';
import './not-found.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/store.hooks';
import { getUserRole } from 'src/store/user-proccess/selectors';
import { UserRole } from 'src/types/user';
import {
  AppRoute,
  PersonalCoachRoute,
  PersonalCustomerRoute,
} from 'src/constant';

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();
  const userRole = useAppSelector(getUserRole);

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <div
            className="header__logo"
            style={{ visibility: 'hidden' }}
          ></div>
          <NavBar
            toMain={
              userRole === UserRole.Customer
                ? AppRoute.PersonalCustomer
                : AppRoute.PersonalCoach
            }
            toAccount={
              userRole === UserRole.Customer
                ? PersonalCustomerRoute.Account
                : PersonalCoachRoute.Account
            }
            toFriends={
              userRole === UserRole.Customer
                ? PersonalCustomerRoute.Friends
                : PersonalCoachRoute.Friends
            }
          />
          <SearchBar />
        </div>
      </header>
      <div className="background-logo">
        <svg
          className="background-logo__logo"
          width="750"
          height="284"
          aria-hidden="true"
        >
          <use xlinkHref="#logo-big"></use>
        </svg>
        <svg
          className="background-logo__icon"
          width="343"
          height="343"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-logotype"></use>
        </svg>
        <main>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <h1>Sorry, page not found</h1>
            <button
              className="btn-return-back"
              style={{ marginTop: '20px' }}
              onClick={() => navigate(-1)}
            >
              return back
            </button>
            <button
              className="btn-return-back"
              style={{ marginTop: '20px' }}
              onClick={() => navigate(AppRoute.Intro)}
            >
              return intro
            </button>
          </div>
        </main>
      </div>
      ;
    </div>
  );
}
