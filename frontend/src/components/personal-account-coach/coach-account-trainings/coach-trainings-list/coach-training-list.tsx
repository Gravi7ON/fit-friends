import { AxiosError, AxiosResponse } from 'axios';
import { isEqual, throttle } from 'lodash';
import { useEffect, useState } from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import WorkoutCard from 'src/components/common-ui/workout/workout-card';
import { TRAINING_TIMES } from 'src/components/constant-components';
import { APIRoute } from 'src/constant';
import { useAppDispatch, useAppSelector } from 'src/hooks/store.hooks';
import { RESTService, createAppApi } from 'src/services/app.api';
import { getWorkoutFilterValue } from 'src/store/workout-filter/selectors';
import {
  getPageNumber,
  getServerErrorStatus,
  getServerLoadingStatus,
  getWorkouts,
} from 'src/store/workouts/selectors';
import {
  setStateErrorServer,
  setStateLoadingServer,
} from 'src/store/workouts/workouts';
import {
  setStatePageNumber,
  setStateWorkouts,
} from 'src/store/workouts/workouts';
import { ErrorResponse } from 'src/types/error-response';

const CARDS_FOR_PAGE = 6;
const SHOW_ERROR_TIME = 600;

export default function CoachTrainingList(): JSX.Element {
  const dispatch = useAppDispatch();

  const filterValue = useAppSelector(getWorkoutFilterValue);
  const workouts = useAppSelector(getWorkouts);
  const pageNumber = useAppSelector(getPageNumber);
  const isFirstLoadingServer = useAppSelector(getServerLoadingStatus);
  const isFirstServerError = useAppSelector(getServerErrorStatus);

  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const [isShowButtonScrollUp, setIsShowButtonScrollUp] = useState(false);
  const [isServerError, setIsServerError] = useState<null | string>(null);
  const [successPageNumber, setSuccessPageNumber] = useState(pageNumber);
  const [errorPageNumber, setErrorPageNumber] = useState(0);
  const [buttonClickCount, setButtonClickCount] = useState(0);

  const hideButtonMoreByCondition = () => {
    if (
      workouts.length < CARDS_FOR_PAGE ||
      workouts.length % CARDS_FOR_PAGE !== 0
    ) {
      return { display: 'none' };
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

    if (
      isEqual(filterValue, {
        costs: [],
        ratings: [],
        calories: [],
        trainingTimes: [],
      })
    ) {
      return;
    }

    const getFriends = async () => {
      try {
        const api = createAppApi(RESTService.Workouts);
        const { data: partWorkouts } = await api.get(
          `${
            APIRoute.Coach
          }?limit=${CARDS_FOR_PAGE}&page=${pageNumber}&rating=${
            filterValue?.ratings
          }&costs=${filterValue?.costs}&calories=${
            filterValue?.calories
          }&trainingTimes=${
            filterValue?.trainingTimes.length === 0
              ? TRAINING_TIMES
              : filterValue?.trainingTimes
          }`
        );
        dispatch(setStateWorkouts([...workouts, ...partWorkouts]));
        setSuccessPageNumber(pageNumber);
        dispatch(setStateLoadingServer(false));
        setIsLoadingServer(false);
        setIsServerError(null);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

        if (errorResponse && isFirstLoadingServer) {
          dispatch(setStateErrorServer(errorResponse.data.message));
        }

        if (errorResponse && isLoadingServer) {
          setIsServerError(errorResponse.data.message);
        }

        if (!errorResponse && isFirstLoadingServer) {
          dispatch(setStateErrorServer(error.message));
        }

        if (!errorResponse && isLoadingServer) {
          setIsServerError(error.message);
        }

        setErrorPageNumber(pageNumber);
        dispatch(setStateLoadingServer(false));
        setIsLoadingServer(false);

        timerError.setTimer();
      }
    };

    getFriends();

    return () => {
      if (timerError.timerId) {
        clearTimeout(timerError.timerId);
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
              style={hideButtonMoreByCondition()}
              disabled={isLoadingServer}
              onClick={async () => {
                setButtonClickCount((prev) => (prev += 1));
                setIsLoadingServer(true);

                if (errorPageNumber > successPageNumber) {
                  dispatch(setStatePageNumber(errorPageNumber));
                  return;
                }

                dispatch(setStatePageNumber(pageNumber + 1));
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
