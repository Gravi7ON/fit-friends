import { Link } from 'react-router-dom';

export default function Logo(): JSX.Element {
  return (
    <Link
      className="header__logo"
      to="/"
      aria-label="Переход на главную"
    >
      <svg
        width="187"
        height="70"
        aria-hidden="true"
      >
        <use xlinkHref="#logo"></use>
      </svg>
    </Link>
  );
}
