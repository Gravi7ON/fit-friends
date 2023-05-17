import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PersonalCoachRoute } from 'src/constant';

type WorkoutCardProps = {
  cost: number;
  title: string;
  specialization: string;
  rating: number;
  description: string;
  calories: number;
  id: number;
  backgroundImage: string;
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
}: WorkoutCardProps): JSX.Element {
  return (
    <li className="my-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/thumbnails/training-02.webp, img/content/thumbnails/training-02@2x.webp 2x"
              />
              <img
                src={backgroundImage}
                srcSet="img/content/thumbnails/training-02@2x.jpg 2x"
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          <p className="thumbnail-training__price">{cost}</p>
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
          <div className="thumbnail-training__button-wrapper">
            <Link
              className="btn btn--small thumbnail-training__button-catalog"
              to={`${PersonalCoachRoute.Workout}/${id}`}
            >
              Подробнее
            </Link>
            <Link
              className="btn btn--small btn--outlined thumbnail-training__button-catalog"
              to="#"
            >
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
});
