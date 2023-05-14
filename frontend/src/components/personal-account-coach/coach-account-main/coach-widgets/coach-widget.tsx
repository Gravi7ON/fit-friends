import { Link } from 'react-router-dom';

type CoachWidgetProps = {
  iconPath: string;
  title: string;
  linkTo: string;
};

export default function CoachWidget({
  title,
  iconPath,
  linkTo,
}: CoachWidgetProps): JSX.Element {
  return (
    <Link
      className="thumbnail-link thumbnail-link--theme-light"
      to={linkTo}
    >
      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
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
