import { AxiosError, AxiosResponse } from 'axios';
import { throttle } from 'lodash';
import {
  useEffect,
  useInsertionEffect,
  useLayoutEffect,
  useState,
} from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import WorkoutCard from 'src/components/common-ui/workout/workout-card';
import { APIRoute } from 'src/constant';
import { useAppDispatch, useAppSelector } from 'src/hooks/store.hooks';
import { RESTService, createAppApi } from 'src/services/app.api';
import { getWorkoutFilterValue } from 'src/store/workout-filter/selectors';
import { getWorkouts } from 'src/store/workouts/selectors';
import { setStateWorkouts } from 'src/store/workouts/workouts';
import { ErrorResponse } from 'src/types/error-response';

const CARDS_FOR_PAGE = 6;
const SHOW_ERROR_TIME = 600;

export default function CoachTrainingList(): JSX.Element {
  const dispatch = useAppDispatch();

  const filterValue = useAppSelector(getWorkoutFilterValue);
  const workouts = useAppSelector(getWorkouts);

  const [isFirstLoadingServer, setIsFirstLoadingServer] = useState(true);
  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const [isFirstServerError, setIsFirstServerError] = useState<null | string>(
    null
  );
  const [isShowButtonScrollUp, setIsShowButtonScrollUp] = useState(false);
  const [isServerError, setIsServerError] = useState<null | string>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [successPageNumber, setSuccessPageNumber] = useState(pageNumber);
  const [errorPageNumber, setErrorPageNumber] = useState(0);
  const [buttonClickCount, setButtonClickCount] = useState(0);

  const isHideButtonMore = () => {
    if (
      workouts.length < CARDS_FOR_PAGE ||
      workouts.length % CARDS_FOR_PAGE !== 0
    ) {
      return { display: 'none' };
    }

    if (pageNumber > 1 && workouts.length % CARDS_FOR_PAGE !== 0) {
      return {};
    }
  };

  useEffect(() => {
    const timerError: {
      timerId: null | NodeJS.Timeout;
      setTimer: () => void;
    } = {
      timerId: null,
      setTimer() {
        this.timerId = setTimeout(() => {
          setIsServerError(null);
        }, SHOW_ERROR_TIME);
      },
    };

    for (const filter of Object.entries(filterValue)) {
      if (
        !filter[1].length ||
        (filter[0] === 'costs' && filter[1].includes(0))
      ) {
        return;
      }
    }

    const getFriends = async () => {
      try {
        const api = createAppApi(RESTService.Workouts);
        const { data: partWorkouts } = await api.get(
          `${APIRoute.Coach}?limit=${CARDS_FOR_PAGE}&page=${pageNumber}&rating=${filterValue?.rating}&costs=${filterValue?.costs}&calories=${filterValue?.calories}`
        );
        dispatch(setStateWorkouts([...workouts, ...partWorkouts]));
        setSuccessPageNumber(pageNumber);
        setIsFirstLoadingServer(false);
        setIsLoadingServer(false);
        setIsServerError(null);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

        if (errorResponse && isFirstLoadingServer) {
          setIsFirstServerError(errorResponse.data.message);
        }

        if (errorResponse && isLoadingServer) {
          setIsServerError(errorResponse.data.message);
        }

        if (!errorResponse && isFirstLoadingServer) {
          setIsFirstServerError(error.message);
        }

        if (!errorResponse && isLoadingServer) {
          setIsServerError(error.message);
        }

        setErrorPageNumber(pageNumber);
        setIsFirstLoadingServer(false);
        setIsLoadingServer(false);

        timerError.setTimer();
      }
    };

    getFriends();

    return () => {
      if (timerError.timerId) {
        clearTimeout(timerError.timerId);
      }
      console.log(pageNumber);

      if (workouts.length === 0) {
        setPageNumber(() => 1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClickCount, filterValue]);

  useEffect(() => {
    const scroll = throttle(() => {
      if (window.scrollY > 1000) {
        setIsShowButtonScrollUp(true);
      }
      if (window.scrollY < 1000) {
        setIsShowButtonScrollUp(false);
      }
    }, 300);

    window.addEventListener('scroll', scroll);
    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, []);

  return (
    <div className="my-trainings">
      {isFirstLoadingServer ? (
        <Spinner spinnerScreen />
      ) : isFirstServerError ? (
        <p className="server-coach-friends__error">{isFirstServerError}</p>
      ) : (
        <>
          <ul className="my-trainings__list">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                specialization={workout.specialization}
                title={workout.title}
                cost={workout.cost}
                rating={workout.rating}
                description={workout.description}
                calories={workout.calories}
                id={workout.id}
                backgroundImage={workout.backgroundImage}
              />
            ))}
          </ul>
          <div className="show-more my-trainings__show-more">
            <button
              className={
                isServerError
                  ? 'show-more__button--error'
                  : 'btn show-more__button show-more__button--more'
              }
              type="button"
              style={isHideButtonMore()}
              disabled={isLoadingServer}
              onClick={async () => {
                setButtonClickCount((prev) => (prev += 1));
                setIsLoadingServer(true);

                if (errorPageNumber > successPageNumber) {
                  setPageNumber(errorPageNumber);
                  return;
                }

                setPageNumber((prev) => (prev += 1));
              }}
            >
              {isLoadingServer ? <Spinner /> : 'Показать еще'}
            </button>
            <button
              className="btn show-more__button show-more__button--to-top"
              type="button"
              style={
                isShowButtonScrollUp
                  ? { display: 'inline-flex' }
                  : { display: 'none' }
              }
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            >
              Вернуться в начало
            </button>
          </div>
        </>
      )}
    </div>
  );
}
