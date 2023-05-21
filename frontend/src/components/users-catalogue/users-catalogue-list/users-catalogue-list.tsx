import { AxiosError, AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import ButtonMoveUp from 'src/components/common-ui/button-move-up/button-move-up';
import {
  CARDS_FOR_PAGE,
  SHOW_ERROR_TIME,
} from 'src/components/constant-components';
import { RESTService, createAppApi } from 'src/services/app.api';
import { ErrorResponse } from 'src/types/error-response';
import {
  getArrayWithTruthyKeysFromObject,
  hideButtonMoreByCondition,
} from 'src/utils/helpers';
import {
  ContextFilterForm,
  CurrentFilterContext,
  FilterFormValue,
} from '../users-catalogue';
import { User } from 'src/types/user';
import { isEqual, uniqWith } from 'lodash';
import UserCard from 'src/components/common-ui/user/user-card';

const ABORT_SIGNAL_MESSAGE = 'canceled';

export default function UsersCatalogueList(): JSX.Element {
  const filterFormContext = useContext<ContextFilterForm>(CurrentFilterContext);
  const filterFormState = filterFormContext?.filterFormState as FilterFormValue;

  const [isFirstLoadingServer, setIsFirstLoadingServer] = useState(true);
  const [isFirstServerError, setIsFirstServerError] = useState<string | null>(
    null
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
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
      const locationsQuery = getArrayWithTruthyKeysFromObject(
        filterFormState.location
      );
      const experienceQuery = getArrayWithTruthyKeysFromObject(
        filterFormState.location
      );
      const specializationsQuery = getArrayWithTruthyKeysFromObject(
        filterFormState.specialization
      );
      const sortQuery = Object.entries(filterFormState.sort).filter((entry) =>
        Boolean(entry[1])
      )[0];

      try {
        const api = createAppApi(RESTService.Users);
        const { data: partUsers } = await api.get(
          `?limit=${CARDS_FOR_PAGE}&page=${pageNumber}${
            locationsQuery.length ? `&locations=${locationsQuery}` : ''
          }${experienceQuery.length ? `&experience=${experienceQuery}` : ''}${
            specializationsQuery.length
              ? `&specializations=${specializationsQuery}`
              : ''
          }${sortQuery.length ? `&role=${sortQuery}` : ''}`,
          {
            signal: controller.signal,
          }
        );

        setUsers(() => uniqWith([...users, ...partUsers], isEqual));
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
        <p className="server-workouts-catalogue__error">{isFirstServerError}</p>
      ) : (
        <>
          <ul className="my-trainings__list">
            {users.map((user) => (
              <UserCard
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
              style={hideButtonMoreByCondition(users.length, CARDS_FOR_PAGE)}
              disabled={isLoadingServer}
              onClick={async () => {
                setButtonClickCount((prev) => (prev += 1));
                setIsLoadingServer(true);

                if (errorPageNumber > successPageNumber) {
                  setPageNumber(errorPageNumber);
                  return;
                }

                setPageNumber(pageNumber + 1);
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
