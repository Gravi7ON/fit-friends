import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PersonalCustomerRoute } from 'src/constant';
import { UserRole } from 'src/types/user';

type UserCardProps = {
  role: string;
  userId: string;
  location: string;
  name: string;
  specializations: string[];
};

export default memo(function UserCard({
  role,
  userId,
  location,
  name,
  specializations,
}: UserCardProps): JSX.Element {
  return (
    <li className="users-catalog__item">
      <div
        className={`thumbnail-user ${
          role === UserRole.Customer
            ? 'thumbnail-user--role-user'
            : 'thumbnail-user--role-coach'
        }`}
      >
        <div className="thumbnail-user__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/user-01.webp, img/content/thumbnails/user-01@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/user-01.jpg"
              srcSet="img/content/thumbnails/user-01@2x.jpg 2x"
              width="82"
              height="82"
              alt=""
            />
          </picture>
        </div>
        {/* <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
          <svg
            width="12"
            height="12"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-crown"></use>
          </svg>
        </div> */}
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg
              width="14"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">
              {location}
            </address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {specializations.map((specialization) => (
            <li
              key={specialization}
              className="thumbnail-user__hashtags-item"
            >
              <div className="hashtag thumbnail-user__hashtag">
                <span>#{specialization}</span>
              </div>
            </li>
          ))}
        </ul>
        <Link
          className="btn btn--medium thumbnail-user__button"
          to={`${PersonalCustomerRoute.Users}/${userId}`}
        >
          Подробнее
        </Link>
      </div>
    </li>
  );
});
