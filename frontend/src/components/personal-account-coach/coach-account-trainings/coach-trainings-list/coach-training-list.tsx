import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import ButtonMoveUp from 'src/components/common-ui/button-move-up/button-move-up';
import WorkoutCard from 'src/components/common-ui/workout/workout-card';
import {
  CARDS_FOR_PAGE,
  SHOW_ERROR_TIME,
  TRAINING_TIMES,
} from 'src/components/constant-components';
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
import { hideButtonMoreByCondition } from 'src/utils/helpers';

const ABORT_SIGNAL_MESSAGE = 'canceled';

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

  useEffect(() => {
    const controller = new AbortController();

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
            filterValue?.trainingTimes?.length === 0
              ? TRAINING_TIMES
              : filterValue?.trainingTimes
          }`,
          {
            signal: controller.signal,
          }
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
          dispatch(
            setStateErrorServer(
              errorResponse.data.message === ABORT_SIGNAL_MESSAGE
                ? ''
                : errorResponse.data.message
            )
          );
        }

        if (errorResponse && isLoadingServer) {
          setIsServerError(errorResponse.data.message);
        }

        if (!errorResponse && isFirstLoadingServer) {
          dispatch(
            setStateErrorServer(
              error.message === ABORT_SIGNAL_MESSAGE ? '' : error.message
            )
          );
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

      dispatch(setStateErrorServer(null));
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClickCount, filterValue]);

  return (
    <div className="my-trainings">
      {isFirstLoadingServer ? (
        <Spinner spinnerScreen />
      ) : isFirstServerError ? (
        <p className="server-coach-training__error">{isFirstServerError}</p>
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
              style={hideButtonMoreByCondition(
                workouts.length,
                CARDS_FOR_PAGE,
                pageNumber,
                errorPageNumber,
                successPageNumber
              )}
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
            <ButtonMoveUp
              isShowButtonScrollUp={isShowButtonScrollUp}
              setIsShowButtonScrollUp={setIsShowButtonScrollUp}
            />
          </div>
        </>
      )}
    </div>
  );
}
