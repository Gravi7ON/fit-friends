import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import ButtonMoveUp from 'src/components/common-ui/button-move-up/button-move-up';
import {
  CARDS_FOR_PAGE,
  SHOW_ERROR_TIME,
} from 'src/components/constant-components';
import { RESTService, createAppApi } from 'src/services/app.api';
import { ErrorResponse } from 'src/types/error-response';
import { hideButtonMoreByCondition } from 'src/utils/helpers';
import UserCard from 'src/components/common-ui/user/user-card';
import { useAppDispatch, useAppSelector } from 'src/hooks/store.hooks';
import {
  getPageNumber,
  getServerLoadingStatus,
  getUsers,
} from 'src/store/users/selectors';
import { setStateLoadingServer } from 'src/store/users/users';
import { setStatePageNumber } from 'src/store/users/users';
import { setStateUsers } from 'src/store/users/users';
import { getUserFilterValue } from 'src/store/user-filter/selectors';
import Error from 'src/components/animate-ui/error/error';

const ABORT_SIGNAL_MESSAGE = 'canceled';

export default function UsersCatalogueList(): JSX.Element {
  const dispatch = useAppDispatch();

  const filterFormState = useAppSelector(getUserFilterValue);
  const users = useAppSelector(getUsers);
  const pageNumber = useAppSelector(getPageNumber);
  const isFirstLoadingServer = useAppSelector(getServerLoadingStatus);

  const [isFirstServerError, setIsFirstServerError] = useState<string | null>(
    null
  );
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

    const getUsers = async () => {
      const locationsQuery = filterFormState.locations;
      const experiencesQuery = filterFormState.experiences;
      const specializationsQuery = filterFormState.specializations;
      const sortsQuery = filterFormState.sorts;

      try {
        const api = createAppApi(RESTService.Users);
        const { data: partUsers } = await api.get(
          `?limit=${CARDS_FOR_PAGE}&page=${pageNumber}${
            locationsQuery.length ? `&locations=${locationsQuery}` : ''
          }${experiencesQuery.length ? `&experience=${experiencesQuery}` : ''}${
            specializationsQuery.length
              ? `&specializations=${specializationsQuery}`
              : ''
          }${sortsQuery.length ? `&role=${sortsQuery[0]}` : ''}`,
          {
            signal: controller.signal,
          }
        );

        dispatch(setStateUsers([...users, ...partUsers]));
        setSuccessPageNumber(pageNumber);
        dispatch(setStateLoadingServer(false));
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
        dispatch(setStateLoadingServer(false));
        setIsLoadingServer(false);

        timerError.setTimer();
      }
    };

    getUsers();

    return () => {
      if (timerError.timerId) {
        clearTimeout(timerError.timerId);
      }

      setIsFirstServerError(null);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClickCount, filterFormState]);

  return (
    <div className="my-trainings">
      {isFirstLoadingServer ? (
        <Spinner spinnerScreen />
      ) : isFirstServerError ? (
        <Error errorMessage={isFirstServerError} />
      ) : (
        <>
          <ul className="my-trainings__list">
            {users.map((user) => (
              <UserCard
                key={user.id}
                userId={user.id}
                name={user.name}
                location={user.location}
                specializations={user.specializations}
                role={user.role}
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
                users.length,
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
