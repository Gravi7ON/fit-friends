import { Outlet } from 'react-router-dom';
import Logo from 'src/components/common-ui/personal-account-header/logo/logo';
import NavBar from 'src/components/common-ui/personal-account-header/nav-bar/nav-bar';
import SearchBar from 'src/components/common-ui/personal-account-header/search-bar/search-bar';
import { AppRoute, PersonalCustomerRoute } from 'src/constant';

export default function PersonalCustomer(): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <Logo />
          <NavBar
            toMain={AppRoute.PersonalCustomer}
            toAccount={PersonalCustomerRoute.Account}
            toFriends={PersonalCustomerRoute.Friends}
          />
          <SearchBar />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
