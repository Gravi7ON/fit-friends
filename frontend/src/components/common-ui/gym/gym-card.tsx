import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { APIRoute, PersonalCustomerRoute } from 'src/constant';
import { RESTService, createAppApi } from 'src/services/app.api';
import { Gym } from 'src/types/gym';
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';

type GymCardProps = {
  id: number;
  backgroundimage: string;
  isOficial: boolean;
  title: string;
  location: string;
  description: string;
  isFavoriteGym?: boolean;
  mutateCache?: KeyedMutator<Gym[]>;
};

const apiWorkout = createAppApi(RESTService.PersonalAccount);
const gymsRemoveFetcher = async (endPoint: string) =>
  (await apiWorkout.delete(endPoint)).data;
const gymsAddFetcher = async (endPoint: string) =>
  (await apiWorkout.post(endPoint)).data;

export default memo(function GymCard({
  id,
  backgroundimage,
  isOficial,
  title,
  location,
  description,
  isFavoriteGym = false,
  mutateCache,
}: GymCardProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(isFavoriteGym);

  const {
    trigger: removeFavoriteTrigger,
    isMutating: isMutatingRemoveFavorite,
  } = useSWRMutation(`${APIRoute.FavotiteGyms}/${id}`, gymsRemoveFetcher);

  const { trigger: addFavoriteTrigger, isMutating: isMutatingAddFavorite } =
    useSWRMutation(`${APIRoute.FavotiteGyms}/${id}`, gymsAddFetcher);

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
          disabled={isMutatingRemoveFavorite || isMutatingAddFavorite}
          onClick={async () => {
            if (isFavorite) {
              await removeFavoriteTrigger();
              if (mutateCache) {
                mutateCache();
              }
            } else {
              await addFavoriteTrigger();
            }
            setIsFavorite((prev) => !prev);
          }}
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
