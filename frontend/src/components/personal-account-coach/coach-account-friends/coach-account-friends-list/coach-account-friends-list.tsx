import { AxiosError, AxiosResponse } from 'axios';
import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { APIRoute } from 'src/constant';
import { createAppApi, RESTService } from 'src/services/app.api';
import { ErrorResponse } from 'src/types/error-response';
import { Customer, Coach } from 'src/types/user';
import CoachFriendCard from '../coach-friend-card/coach-friend-card';

const CARDS_FOR_PAGE = 6;
const SHOW_ERROR_TIME = 600;

export default function CoachAccountFriendsList(): JSX.Element {
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

  const isHideButtonMore = () => {
    if (
      friends.length < CARDS_FOR_PAGE ||
      friends.length % CARDS_FOR_PAGE !== 0
    ) {
      return { display: 'none' };
    }

    if (pageNumber > 1 && friends.length % CARDS_FOR_PAGE === 0) {
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

    const getFriends = async () => {
      try {
        const api = createAppApi(RESTService.Users);
        const { data: partFriends } = await api.get(
          `${APIRoute.MyFriends}?limit=${CARDS_FOR_PAGE}&page=${pageNumber}`
        );
        const set = new Set<Customer & Coach>(friends);
        for (const friend of partFriends) {
          if (!set.has(friend)) {
            set.add(friend);
          }
        }
        setFriends(() => [...set]);
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

  useEffect(() => {
    const scroll = throttle(() => {
      if (window.scrollY > 1000) {
        setIsShowButtonScrollUp(true);
        window.removeEventListener('scroll', scroll);
      }
    }, 300);

    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  return isFirstLoadingServer ? (
    <Spinner spinnerScreen />
  ) : isFirstServerError ? (
    <p className="server-coach-friends__error">{isFirstServerError}</p>
  ) : (
    <>
      <ul className="friends-list__list">
        {friends.map((friend) => (
          <CoachFriendCard
            key={friend.id}
            specializations={friend.specializations}
            name={friend.name}
            location={friend.location}
            isReadyTraining={
              friend.isReadyTraining || friend.isIndividualTraining
            }
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
          style={isShowButtonScrollUp ? {} : { display: 'none' }}
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
  );
}
