import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PersonalCoachRoute, PersonalCustomerRoute } from 'src/constant';
import { UserRole } from 'src/types/user';

type WorkoutCardProps = {
  cost: number;
  title: string;
  specialization: string;
  rating: number;
  description: string;
  calories: number;
  id: number;
  backgroundImage: string;
  role: string;
  isForOrder?: boolean;
  boughtWorkout?: number;
  totalSumOfBought?: number;
};

export default memo(function WorkoutCard({
  cost,
  title,
  specialization,
  rating,
  description,
  calories,
  backgroundImage,
  id,
  role,
  isForOrder = false,
  boughtWorkout = 0,
  totalSumOfBought = 0,
}: WorkoutCardProps): JSX.Element {
  return (
    <li className="my-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source
                type="image/webp"
                srcSet={backgroundImage}
              />
              <img
                src={backgroundImage}
                srcSet={backgroundImage}
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">
              {cost === 0 ? 'Бесплатно' : cost}
            </span>
            {cost > 0 && <span>₽</span>}
          </p>
          <h3 className="thumbnail-training__title">{title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{specialization}</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{calories}ккал</span>
                </div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-star"></use>
              </svg>
              <span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          {isForOrder && (
            <Link
              className="btn-flat btn-flat--underlined thumbnail-training__button-orders"
              to={`${PersonalCoachRoute.Workouts}/${id}`}
            >
              <svg
                width="18"
                height="18"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-info"></use>
              </svg>
              <span>Подробнее</span>
            </Link>
          )}
          <div className="thumbnail-training__button-wrapper">
            {!isForOrder && (
              <>
                <Link
                  className="btn btn--small thumbnail-training__button-catalog"
                  to={
                    role === UserRole.Coach
                      ? `${PersonalCoachRoute.Workouts}/${id}`
                      : `${PersonalCustomerRoute.Workouts}/${id}`
                  }
                >
                  Подробнее
                </Link>
                <Link
                  className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                  to="#"
                >
                  Отзывы
                </Link>
              </>
            )}
          </div>
        </div>
        {isForOrder && (
          <div className="thumbnail-training__total-info">
            <div className="thumbnail-training__total-info-card">
              <svg
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-chart"></use>
              </svg>
              <p className="thumbnail-training__total-info-value">
                {boughtWorkout}
              </p>
              <p className="thumbnail-training__total-info-text">
                Куплено тренировок
              </p>
            </div>
            <div className="thumbnail-training__total-info-card">
              <svg
                width="31"
                height="28"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-wallet"></use>
              </svg>
              <p className="thumbnail-training__total-info-value">
                {totalSumOfBought}
                <span>₽</span>
              </p>
              <p className="thumbnail-training__total-info-text">Общая сумма</p>
            </div>
          </div>
        )}
      </div>
    </li>
  );
});
