import { Outlet } from 'react-router-dom';
import Logo from 'src/components/common-ui/personal-account-header/logo/logo';
import NavBar from 'src/components/common-ui/personal-account-header/nav-bar/nav-bar';
import SearchBar from 'src/components/common-ui/personal-account-header/search-bar/search-bar';

export default function PersonalCoach(): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <Logo />
          <NavBar />
          <SearchBar />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
