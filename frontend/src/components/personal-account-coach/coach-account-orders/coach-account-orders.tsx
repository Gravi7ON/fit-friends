import { useNavigate } from 'react-router-dom';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { useEffect, useState } from 'react';
import WorkoutCard from 'src/components/common-ui/workout/workout-card';
import { Workout } from 'src/types/workout';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'src/types/error-response';
import { RESTService, createAppApi } from 'src/services/app.api';
import { APIRoute } from 'src/constant';
import { SHOW_ERROR_TIME } from 'src/components/constant-components';
import ButtonMoveUp from 'src/components/common-ui/button-move-up/button-move-up';
import { hideButtonMoreByCondition } from 'src/utils/helpers';
import { isEqual, uniqWith } from 'lodash';
import Error from 'src/components/animate-ui/error/error';
import { useAppSelector } from 'src/hooks/store.hooks';
import { getUserRole } from 'src/store/user-proccess/selectors';

const CARDS_FOR_PAGE = 4;
enum SortButtonName {
  Sum = 'sum',
  AmountWorkout = 'amountWorkout',
}

const ABORT_SIGNAL_MESSAGE = 'canceled';

export default function CoachAccountOrders(): JSX.Element {
  const navigate = useNavigate();
  const userRole = useAppSelector(getUserRole);

  const [isFirstLoadingServer, setIsFirstLoadingServer] = useState(true);
  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const [isFirstServerError, setIsFirstServerError] = useState<null | string>(
    null
  );
  const [isServerError, setIsServerError] = useState<null | string>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [successPageNumber, setSuccessPageNumber] = useState(pageNumber);
  const [errorPageNumber, setErrorPageNumber] = useState(0);
  const [isShowButtonScrollUp, setIsShowButtonScrollUp] = useState(false);
  const [orderedWorkouts, setOrderedWorkouts] = useState<Workout[]>([]);
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [buttonsSortState, setButtonsSortState] = useState<{
    [SortButtonName.Sum]: { isActive: boolean; sortDirection: string };
    [SortButtonName.AmountWorkout]: {
      isActive: boolean;
      sortDirection: string;
    };
  }>({
    [SortButtonName.Sum]: { isActive: false, sortDirection: 'desc' },
    [SortButtonName.AmountWorkout]: { isActive: true, sortDirection: 'desc' },
  });

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

    const getOrderedWorkots = async () => {
      try {
        const api = createAppApi(RESTService.Workouts);
        const { data: partOrderedWorkouts } = await api.get(
          `${APIRoute.CoachOrders}?limit=${CARDS_FOR_PAGE}&page=${pageNumber}${
            buttonsSortState.sum.isActive
              ? `&sortField=${SortButtonName.Sum}&sortDirection=${
                  buttonsSortState[SortButtonName.Sum].sortDirection
                }`
              : buttonsSortState.amountWorkout.isActive
              ? `&sortField=${SortButtonName.AmountWorkout}&sortDirection=${
                  buttonsSortState[SortButtonName.AmountWorkout].sortDirection
                }`
              : ''
          }`,
          {
            signal: controller.signal,
          }
        );

        setOrderedWorkouts(() =>
          uniqWith([...orderedWorkouts, ...partOrderedWorkouts], isEqual)
        );
        setSuccessPageNumber(pageNumber);
        setIsFirstLoadingServer(false);
        setIsLoadingServer(false);
        setIsServerError(null);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

        if (errorResponse && isFirstLoadingServer) {
          setIsFirstServerError(
            errorResponse.data.message === ABORT_SIGNAL_MESSAGE
              ? ''
              : errorResponse.data.message
          );
        }

        if (errorResponse && isLoadingServer) {
          setIsServerError(errorResponse.data.message);
        }

        if (!errorResponse && isFirstLoadingServer) {
          setIsFirstServerError(
            error.message === ABORT_SIGNAL_MESSAGE ? '' : error.message
          );
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
    getOrderedWorkots();

    return () => {
      if (timerError.timerId) {
        clearTimeout(timerError.timerId);
      }
      setIsFirstServerError(null);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClickCount, buttonsSortState]);

  const buttonSortClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = evt.currentTarget.name;

    setIsFirstLoadingServer(true);
    setPageNumber(1);
    setOrderedWorkouts([]);

    if (buttonName === SortButtonName.Sum) {
      setButtonsSortState((prev) => ({
        [SortButtonName.AmountWorkout]: {
          ...prev[SortButtonName.AmountWorkout],
          isActive: false,
        },
        [SortButtonName.Sum]: {
          isActive: true,
          sortDirection:
            prev[SortButtonName.Sum].sortDirection === 'desc' ? 'asc' : 'desc',
        },
      }));
    } else {
      setButtonsSortState((prev) => ({
        [SortButtonName.Sum]: {
          ...prev[SortButtonName.Sum],
          isActive: false,
        },
        [SortButtonName.AmountWorkout]: {
          isActive: true,
          sortDirection:
            prev[SortButtonName.AmountWorkout].sortDirection === 'desc'
              ? 'asc'
              : 'desc',
        },
      }));
    }
  };

  return (
    <section className="my-orders">
      <div className="container">
        <div className="my-orders__wrapper">
          <button
            className="btn-flat btn-flat--underlined my-orders__back"
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
          <div className="my-orders__title-wrapper">
            <h1 className="my-orders__title">Мои заказы</h1>
            <div className="sort-for">
              <p>Сортировать по:</p>
              <div className="sort-for__btn-container">
                <button
                  className="btn-filter-sort"
                  type="button"
                  name="sum"
                  style={
                    buttonsSortState.sum.isActive
                      ? { fontWeight: '500', color: 'black' }
                      : {}
                  }
                  onClick={buttonSortClickHandler}
                >
                  <span>Сумме</span>
                  <svg
                    width="16"
                    height="10"
                    aria-hidden="true"
                  >
                    {buttonsSortState.sum.sortDirection === 'desc' ? (
                      <use xlinkHref="#icon-sort-up"></use>
                    ) : (
                      <use xlinkHref="#icon-sort-down"></use>
                    )}
                  </svg>
                </button>
                <button
                  className="btn-filter-sort"
                  type="button"
                  name="amountWorkout"
                  style={
                    buttonsSortState.amountWorkout.isActive
                      ? { fontWeight: '500', color: 'black' }
                      : {}
                  }
                  onClick={buttonSortClickHandler}
                >
                  <span>Количеству</span>
                  <svg
                    width="16"
                    height="10"
                    aria-hidden="true"
                  >
                    {buttonsSortState.amountWorkout.sortDirection === 'desc' ? (
                      <use xlinkHref="#icon-sort-up"></use>
                    ) : (
                      <use xlinkHref="#icon-sort-down"></use>
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {isFirstLoadingServer ? (
            <Spinner spinnerScreen />
          ) : isFirstServerError ? (
            <Error errorMessage={isFirstServerError} />
          ) : (
            <>
              <ul className="my-orders__list">
                {orderedWorkouts.map((orderedWorkout) => (
                  <WorkoutCard
                    key={orderedWorkout.id}
                    cost={orderedWorkout.cost}
                    title={orderedWorkout.title}
                    specialization={orderedWorkout.specialization}
                    rating={orderedWorkout.rating}
                    description={orderedWorkout.description}
                    calories={orderedWorkout.calories}
                    backgroundImage={orderedWorkout.backgroundImage}
                    id={orderedWorkout.id}
                    role={userRole}
                    isForOrder
                    boughtWorkout={orderedWorkout.orders?.amountWorkout}
                    totalSumOfBought={orderedWorkout.orders?.sum}
                  />
                ))}
              </ul>
              <div className="show-more my-orders__show-more">
                <button
                  className={
                    isServerError
                      ? 'show-more__button--error'
                      : 'btn show-more__button show-more__button--more'
                  }
                  type="button"
                  style={hideButtonMoreByCondition(
                    orderedWorkouts.length,
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
                      setPageNumber(errorPageNumber);
                      return;
                    }

                    setPageNumber((prev) => (prev += 1));
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
      </div>
    </section>
  );
}
