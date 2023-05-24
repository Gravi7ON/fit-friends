import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonalCustomerRoute } from 'src/constant';

type GymCardProps = {
  id: number;
  backgroundimage: string;
  isOficial: boolean;
  title: string;
  location: string;
  description: string;
};

export default memo(function GymCard({
  id,
  backgroundimage,
  isOficial,
  title,
  location,
  description,
}: GymCardProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <li className="gyms-catalog__item">
      <div className="thumbnail-gym">
        <div className="thumbnail-gym__image">
          <picture>
            <source
              type="image/webp"
              srcSet={backgroundimage}
            />
            <img
              src={backgroundimage}
              srcSet={backgroundimage}
              width="330"
              height="190"
              alt=""
            />
          </picture>
        </div>
        {isOficial && (
          <div className="thumbnail-gym__verified">
            <svg
              width="14"
              height="14"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-verify"></use>
            </svg>
          </div>
        )}
        <button
          className={`thumbnail-gym__favourite-button ${
            isFavorite ? 'is-active' : ''
          }`}
          onClick={() => setIsFavorite((prev) => !prev)}
        >
          <span className="visually-hidden">
            {isFavorite ? 'Удалить из Избранного' : 'Добавить в Избранное'}
          </span>
          <svg
            width="12"
            height="11"
            aria-hidden="true"
          >
            <use
              xlinkHref={isFavorite ? '#icon-heart-filled' : '#icon-heart'}
            ></use>
          </svg>
        </button>
        <div className="thumbnail-gym__header">
          <h4 className="thumbnail-gym__title">{title}</h4>
          <div className="thumbnail-gym__location">
            <svg
              width="14"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-gym__location-address">
              м. {location}
            </address>
          </div>
        </div>
        <div className="thumbnail-gym__text-wrapper">
          <p className="thumbnail-gym__text">{description}</p>
        </div>
        <div className="thumbnail-gym__buttons-wrapper">
          <Link
            className="btn btn--small thumbnail-gym__button"
            to={`${PersonalCustomerRoute.Gyms}/${id}`}
          >
            Подробнее
          </Link>
        </div>
      </div>
    </li>
  );
});
