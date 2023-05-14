import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { throttle } from 'lodash';
import { APIRoute } from 'src/constant';
import CoachFriendCard from './coach-friend-card/coach-friend-card';
import { Coach, Customer } from 'src/types/user';
import { RESTService, createAppApi } from 'src/services/app.api';
import { ErrorResponse } from 'src/types/error-response';
import Spinner from 'src/components/ui-helpers/spinner/spinner';
import './coach-account-friends.css';

const CARDS_FOR_PAGE = 6;

export default function CoachAccountFriends(): JSX.Element {
  const navigate = useNavigate();

  const [friends, setFriends] = useState<(Customer & Coach)[]>([]);
  const [serverError, setServerError] = useState<null | string>(null);
  const [isLoadingServer, setIsLoadingServer] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isShowButtonScrollUp, setIsShowButtonScrollUp] = useState(false);

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
        setIsLoadingServer(false);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

        if (errorResponse) {
          setServerError(errorResponse.data.message);
        } else {
          setServerError(error.message);
        }

        setIsLoadingServer(false);
      }
    };
    getFriends();
  }, [pageNumber]);

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

  return (
    <section className="friends-list">
      <div className="container">
        <div className="friends-list__wrapper">
          <button
            className="btn-flat friends-list__back"
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
          <div className="friends-list__title-wrapper">
            <h1 className="friends-list__title">Мои друзья</h1>
            <div
              className="custom-toggle custom-toggle--switch custom-toggle--switch-right"
              data-validate-type="checkbox"
            >
              <label>
                <input
                  type="checkbox"
                  value="user-agreement-1"
                  name="user-agreement"
                  disabled
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
                <span className="custom-toggle__label">Только онлайн</span>
              </label>
            </div>
          </div>
          {isLoadingServer ? (
            <Spinner spinnerScreen />
          ) : serverError ? (
            <p className="server-coach-friends__error">{serverError}</p>
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
                  className="btn show-more__button show-more__button--more"
                  type="button"
                  style={isHideButtonMore()}
                  onClick={() => {
                    setPageNumber((prev) => (prev += 1));
                  }}
                >
                  Показать еще
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
          )}
        </div>
      </div>
    </section>
  );
}
