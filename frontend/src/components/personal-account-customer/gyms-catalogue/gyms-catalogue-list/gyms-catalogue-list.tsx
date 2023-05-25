import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import ButtonMoveUp from 'src/components/common-ui/button-move-up/button-move-up';
import {
  CARDS_FOR_PAGE,
  SHOW_ERROR_TIME,
} from 'src/components/constant-components';
import { useAppDispatch, useAppSelector } from 'src/hooks/store.hooks';
import { RESTService, createAppApi } from 'src/services/app.api';
import {
  getPageNumber,
  getServerErrorStatus,
  getServerLoadingStatus,
  getGyms,
} from 'src/store/gyms/selectors';
import {
  setStateErrorServer,
  setStateLoadingServer,
} from 'src/store/gyms/gyms';
import { setStatePageNumber, setStateGyms } from 'src/store/gyms/gyms';
import { ErrorResponse } from 'src/types/error-response';
import { hideButtonMoreByCondition } from 'src/utils/helpers';
import { getGymFilterValue } from 'src/store/gym-filter/selectors';
import { APIRoute } from 'src/constant';
import GymCard from 'src/components/common-ui/gym/gym-card';
import Error from 'src/components/animate-ui/error/error';

const ABORT_SIGNAL_MESSAGE = 'canceled';

export default function GymsCatalogueList(): JSX.Element {
  const dispatch = useAppDispatch();

  const filterValue = useAppSelector(getGymFilterValue);
  const gyms = useAppSelector(getGyms);
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

    const getGyms = async () => {
      try {
        const api = createAppApi(RESTService.Workouts);
        const { data: partGyms } = await api.get(
          `${APIRoute.Gyms}?limit=${CARDS_FOR_PAGE}&page=${pageNumber}&costs=${
            filterValue?.costs
          }${
            filterValue.features.length
              ? `&features=${filterValue.features}`
              : ''
          }${
            filterValue.locations.length
              ? `&locations=${filterValue.locations}`
              : ''
          }${
            filterValue.isOficial ? `&isOriginal=${filterValue.isOficial}` : ''
          }`,
          {
            signal: controller.signal,
          }
        );
        dispatch(setStateGyms([...gyms, ...partGyms]));
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

    getGyms();

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
        <Error errorMessage={isFirstServerError} />
      ) : (
        <>
          <ul className="gyms-catalog__list">
            {gyms.map((gym) => (
              <GymCard
                key={gym.id}
                id={gym.id}
                location={gym.location}
                isOficial={gym.isOriginal}
                backgroundimage={gym.image}
                description={gym.description}
                title={gym.title}
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
                gyms.length,
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
