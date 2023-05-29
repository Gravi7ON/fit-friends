import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from 'src/components/animate-ui/error/error';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import ButtonMoveUp from 'src/components/common-ui/button-move-up/button-move-up';
import GymCard from 'src/components/common-ui/gym/gym-card';
import WorkoutCard from 'src/components/common-ui/workout/workout-card';
import { APIRoute } from 'src/constant';
import { useAppSelector } from 'src/hooks/store.hooks';
import { RESTService, createAppApi } from 'src/services/app.api';
import { getUserRole } from 'src/store/user-proccess/selectors';
import { Gym } from 'src/types/gym';
import { MyBalance } from 'src/types/my-balance';
import { Workout } from 'src/types/workout';
import useSWR from 'swr';

enum SortTab {
  Sub = 'subscription',
  Workout = 'workout',
}

const COUNT_CARD_PER_PAGE = 4;

const apiAccount = createAppApi(RESTService.PersonalAccount);
const myBalanceFetcher = async (endPoint: string) =>
  (await apiAccount.get(endPoint)).data;
const myGymsFetcher = async (endPoint: string) =>
  (await apiAccount.get(endPoint)).data;

const apiWorkout = createAppApi(RESTService.Workouts);
const workoutFetcher = async (endPoint: string) =>
  (await apiWorkout.get(endPoint)).data;
const gymFetcher = async (endPoint: string) =>
  (await apiWorkout.get(endPoint)).data;

export default function CustomerAccountPurchases(): JSX.Element {
  const navigate = useNavigate();
  const userRole = useAppSelector(getUserRole);

  const [sortTab, setSortTab] = useState(SortTab.Workout as string);
  const [isShowButtonScrollUp, setIsShowButtonScrollUp] = useState(false);
  const [buttonClickCount, setButtonClickCount] = useState(1);
  const [slicedWorkouts, setSlicedWorkouts] = useState<Workout[]>([]);
  const [slicedGyms, setSlicedGyms] = useState<Gym[]>([]);

  const { data: myBalance, isLoading: myBalanceIsLoading } = useSWR<MyBalance>(
    APIRoute.MyBalance,
    myBalanceFetcher
  );

  const { data: favoriteGyms, isLoading: favoriteGymsIsLoading } = useSWR<
    Gym[]
  >(`${APIRoute.FavotiteGyms}`, myGymsFetcher);

  const {
    data: workouts,
    isLoading: workoutsIsLoading,
    error: workoutsError,
  } = useSWR<Workout[]>(
    myBalance && sortTab === SortTab.Workout
      ? `?workoutIds=${myBalance.purchasedWorkoutIds}`
      : null,
    workoutFetcher,
    {
      onSuccess(data) {
        if (!slicedWorkouts.length) {
          setSlicedWorkouts(data.slice(0, COUNT_CARD_PER_PAGE));
        }
      },
    }
  );

  const {
    data: gyms,
    isLoading: gymsIsLoading,
    error: gymsError,
  } = useSWR<Gym[]>(
    myBalance && sortTab === SortTab.Sub
      ? `${APIRoute.Gyms}/${myBalance.purchasedGymIds}`
      : null,
    gymFetcher,
    {
      onSuccess(data) {
        if (!slicedGyms.length) {
          setSlicedGyms(data.slice(0, COUNT_CARD_PER_PAGE));
        }
      },
    }
  );

  return workoutsIsLoading ||
    gymsIsLoading ||
    myBalanceIsLoading ||
    favoriteGymsIsLoading ? (
    <Spinner spinnerScreen />
  ) : workoutsError || gymsError ? (
    <Error
      errorMessage={
        workoutsError
          ? workoutsError.message || workoutsError.response.data.message
          : gymsError.message || gymsError.response.data.message
      }
    />
  ) : (
    <section className="my-purchases">
      <div className="container">
        <div className="my-purchases__wrapper">
          <button
            className="btn-flat my-purchases__back"
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
          {((gyms && gyms?.length > 0) ||
            (workouts && workouts.length > 0)) && (
            <div className="my-purchases__title-wrapper">
              <h1 className="my-purchases__title">Мои покупки</h1>
              <div className="my-purchases__controls">
                <div
                  className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
                  data-validate-type="checkbox"
                >
                  <label>
                    <input
                      type="checkbox"
                      value="user-agreement-1"
                      name="user-agreement"
                    />
                    <span className="custom-toggle__icon">
                      <svg
                        width="9"
                        height="6"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      Только активные
                    </span>
                  </label>
                </div>
                <div className="btn-radio-sort">
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      value={SortTab.Sub}
                      disabled={workoutsIsLoading}
                      onChange={(evt) => {
                        setSortTab(evt.currentTarget.value);
                        setButtonClickCount(1);
                        setSlicedWorkouts([]);
                      }}
                    />
                    <span className="btn-radio-sort__label">Абонементы</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      value={SortTab.Workout}
                      disabled={gymsIsLoading}
                      defaultChecked
                      onChange={(evt) => {
                        setSortTab(evt.currentTarget.value);
                        setButtonClickCount(1);
                        setSlicedGyms([]);
                      }}
                    />
                    <span className="btn-radio-sort__label">Тренировки</span>
                  </label>
                </div>
              </div>
            </div>
          )}
          <ul className="my-purchases__list">
            {[
              slicedWorkouts?.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  cost={workout.cost}
                  specialization={workout.specialization}
                  title={workout.title}
                  rating={workout.rating}
                  description={workout.description}
                  id={workout.id}
                  calories={workout.calories}
                  backgroundImage={workout.backgroundImage}
                  role={userRole}
                />
              )),
              slicedGyms?.map((gym) => (
                <GymCard
                  key={gym.id}
                  id={gym.id}
                  isOficial={gym.isOriginal}
                  title={gym.title}
                  location={gym.location}
                  backgroundimage={gym.image}
                  description={gym.description}
                  isFavoriteGym={favoriteGyms?.some(
                    (favoriteGym) => favoriteGym.id === gym.id
                  )}
                />
              )),
            ]}
          </ul>
          <div className="show-more my-purchases__show-more">
            <button
              className="btn show-more__button show-more__button--more"
              style={
                slicedWorkouts.length === workouts?.length ||
                slicedGyms.length === gyms?.length
                  ? { display: 'none' }
                  : undefined
              }
              type="button"
              onClick={() => {
                if (workouts && sortTab === SortTab.Workout) {
                  setSlicedWorkouts((prev) => {
                    return [
                      ...prev,
                      ...workouts.slice(
                        COUNT_CARD_PER_PAGE * buttonClickCount,
                        COUNT_CARD_PER_PAGE * buttonClickCount +
                          COUNT_CARD_PER_PAGE
                      ),
                    ];
                  });
                }

                if (gyms && sortTab === SortTab.Sub) {
                  setSlicedGyms((prev) => {
                    return [
                      ...prev,
                      ...gyms.slice(
                        COUNT_CARD_PER_PAGE * buttonClickCount,
                        COUNT_CARD_PER_PAGE * buttonClickCount +
                          COUNT_CARD_PER_PAGE
                      ),
                    ];
                  });
                }
                setButtonClickCount((prev) => (prev += 1));
              }}
            >
              Показать еще
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
