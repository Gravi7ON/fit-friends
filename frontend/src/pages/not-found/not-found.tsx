import NavBar from 'src/components/common-ui/personal-account-header/nav-bar/nav-bar';
import SearchBar from 'src/components/common-ui/personal-account-header/search-bar/search-bar';
import './not-found.css';
import { useNavigate } from 'react-router-dom';

export default function NotFound(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <div
            className="header__logo"
            style={{ visibility: 'hidden' }}
          ></div>
          <NavBar />
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
          </div>
        </main>
      </div>
      ;
    </div>
  );
}
