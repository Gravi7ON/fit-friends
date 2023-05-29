import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { isEqual, uniqWith } from 'lodash';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { APIRoute } from 'src/constant';
import { createAppApi, RESTService } from 'src/services/app.api';
import { ErrorResponse } from 'src/types/error-response';
import { Customer, Coach } from 'src/types/user';
import ButtonMoveUp from 'src/components/common-ui/button-move-up/button-move-up';
import { hideButtonMoreByCondition } from 'src/utils/helpers';
import {
  CARDS_FOR_PAGE,
  SHOW_ERROR_TIME,
} from 'src/components/constant-components';
import Error from 'src/components/animate-ui/error/error';
import CustomerFriendCard from '../customer-account-card/customer-account-card';
import useSWR from 'swr';
import { PersonalRequestTraining } from 'src/types/personal-request-training';

const apiUser = createAppApi(RESTService.Users);
const personalRequestsFetcher = async (endPoint: string) =>
  (await apiUser.get(endPoint)).data;

export default function CustomerAccountFriendsList(): JSX.Element {
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
  const [friends, setFriends] = useState<(Customer & Coach)[]>([]);
  const [buttonClickCount, setButtonClickCount] = useState(0);

  const { data: personalRequest, isLoading: personalRequestIsLoading } = useSWR<
    PersonalRequestTraining[]
  >(`${APIRoute.PersonalTrainingRequests}/customer`, personalRequestsFetcher);

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

    const getFriends = async () => {
      try {
        const api = createAppApi(RESTService.Users);
        const { data: partFriends } = await api.get(
          `${APIRoute.MyFriends}?limit=${CARDS_FOR_PAGE}&page=${pageNumber}`
        );

        setFriends(() => uniqWith([...friends, ...partFriends], isEqual));
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonClickCount]);

  return isFirstLoadingServer || personalRequestIsLoading ? (
    <Spinner spinnerScreen />
  ) : isFirstServerError ? (
    <Error errorMessage={isFirstServerError} />
  ) : (
    <>
      <ul className="friends-list__list">
        {friends.map((friend) => (
          <CustomerFriendCard
            key={friend.id}
            specializations={friend.specializations}
            name={friend.name}
            location={friend.location}
            isReadyTraining={
              friend.isReadyTraining || friend.isIndividualTraining
            }
            role={friend.role}
            personalRequestToCoach={personalRequest?.find(
              (request) => request.toUserId === friend.id
            )}
          />
        ))}
      </ul>
      <div className="show-more friends-list__show-more">
        <button
          className={
            isServerError
              ? 'show-more__button--error'
              : 'btn show-more__button show-more__button--more'
          }
          type="button"
          style={hideButtonMoreByCondition(
            friends.length,
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
  );
}
