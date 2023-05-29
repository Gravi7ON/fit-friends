import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWRInfinite from 'swr/infinite';
import Error from 'src/components/animate-ui/error/error';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import ButtonMoveUp from 'src/components/common-ui/button-move-up/button-move-up';
import GymCard from 'src/components/common-ui/gym/gym-card';
import { APIRoute } from 'src/constant';
import { RESTService, createAppApi } from 'src/services/app.api';
import { Gym } from 'src/types/gym';
import { isEqual, uniqWith } from 'lodash';

const FAVORITE_GYMS_COUNT_CARD = 4;

const apiAccount = createAppApi(RESTService.PersonalAccount);
const myGymsFetcher = async (endPoint: string) =>
  (await apiAccount.get(endPoint)).data;

const getKey = (pageIndex: number, previousPageData: Gym[] | undefined) => {
  ++pageIndex;
  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `${APIRoute.FavotiteGyms}?limit=${FAVORITE_GYMS_COUNT_CARD}&page=${pageIndex}`;
};

export default function CustomerAccountGyms(): JSX.Element {
  const navigate = useNavigate();

  const [isShowButtonScrollUp, setIsShowButtonScrollUp] = useState(false);

  const {
    data: favoriteGyms,
    error: favoriteGymsError,
    size,
    setSize,
    mutate,
    isLoading: favoriteGymsIsLoading,
  } = useSWRInfinite(getKey, myGymsFetcher, { revalidateFirstPage: false });

  const gyms = favoriteGyms ? uniqWith([...favoriteGyms.flat()], isEqual) : [];
  const isLoadingMore =
    favoriteGymsIsLoading ||
    (size > 0 && favoriteGyms && typeof favoriteGyms[size - 1] === 'undefined');
  const isEmpty = favoriteGyms?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (favoriteGyms &&
      favoriteGyms[favoriteGyms.length - 1]?.length < FAVORITE_GYMS_COUNT_CARD);

  return favoriteGymsIsLoading ? (
    <Spinner spinnerScreen />
  ) : favoriteGymsError ? (
    <Error
      errorMessage={
        favoriteGymsError.message || favoriteGymsError.response.data.message
      }
    />
  ) : (
    <section className="my-gyms">
      <div className="container">
        <div className="my-gyms__wrapper">
          <button
            className="btn-flat my-gyms__back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <svg
              width="14"
              height="10"
              aria-hidden="true"
            >
              <use xlinkHref="#arrow-left"></use>
            </svg>
            <span>Назад</span>
          </button>
          <div className="my-gyms__title-wrapper">
            <h1 className="my-gyms__title">Мои залы</h1>
            <div
              className="custom-toggle custom-toggle--switch custom-toggle--switch-right"
              data-validate-type="checkbox"
            ></div>
          </div>
          <ul className="my-gyms__list">
            {gyms &&
              gyms.map((gym: Gym) => (
                <GymCard
                  key={gym.id}
                  id={gym.id}
                  title={gym.title}
                  description={gym.description}
                  isOficial={gym.isOriginal}
                  location={gym.location}
                  backgroundimage={gym.image}
                  isFavoriteGym
                  mutateCache={mutate}
                />
              ))}
          </ul>
          <div className="show-more my-gyms__show-more">
            <button
              className="btn show-more__button show-more__button--more"
              type="button"
              style={isReachingEnd ? { display: 'none' } : undefined}
              disabled={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              {isLoadingMore ? <Spinner /> : 'Показать еще'}
            </button>
            <ButtonMoveUp
              isShowButtonScrollUp={isShowButtonScrollUp}
              setIsShowButtonScrollUp={setIsShowButtonScrollUp}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
