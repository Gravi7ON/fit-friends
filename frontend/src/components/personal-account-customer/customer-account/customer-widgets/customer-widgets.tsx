import { Link } from 'react-router-dom';
import { WidgetTheme } from 'src/components/constant-components';

type CustomerWidgetProps = {
  iconPath: string;
  title: string;
  linkTo: string;
  theme: string;
  isPurchases?: boolean;
};

export default function CustomerWidget({
  title,
  iconPath,
  linkTo,
  theme,
  isPurchases = false,
}: CustomerWidgetProps): JSX.Element {
  return (
    <Link
      className={`thumbnail-link ${
        theme === WidgetTheme.Light
          ? 'thumbnail-link--theme-light'
          : 'thumbnail-link--theme-dark'
      } ${isPurchases ? 'personal-account-user__shop' : ''}`}
      to={linkTo}
    >
      <div
        className={`thumbnail-link__icon ${
          theme === WidgetTheme.Light
            ? 'thumbnail-link__icon--theme-light'
            : 'thumbnail-link__icon--theme-dark'
        }`}
      >
        <svg
          width="30"
          height="26"
          aria-hidden="true"
        >
          <use xlinkHref={iconPath}></use>
        </svg>
      </div>
      <span className="thumbnail-link__text">{title}</span>
    </Link>
  );
}
