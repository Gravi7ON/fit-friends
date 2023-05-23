import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Error from 'src/components/animate-ui/error/error';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { RESTService, createAppApi } from 'src/services/app.api';
import { ErrorResponse } from 'src/types/error-response';
import { Coach, Customer, User } from 'src/types/user';
import styles from './user-screen.module.css';
import UserLocationPopup from '../popups/user-location-popup';
import { Dialog } from '@headlessui/react';
import { APIRoute } from 'src/constant';
import { SHOW_ERROR_TIME } from 'src/components/constant-components';

export default function UserScreen(): JSX.Element {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [isFirstLoadingServer, setIsFirstLoadingServer] = useState(true);
  const [isFirstServerError, setIsFirstServerError] = useState<string | null>(
    null
  );
  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const [isServerError, setIsServerError] = useState<string | null>(null);
  const [user, setUser] = useState<Coach & Customer>(Object);
  const [userFriend, setUserFriend] = useState<User[]>([]);
  const [isShowPopup, setIsShowPopup] = useState(false);

  useEffect(() => {
    const findUser = async () => {
      try {
        const api = createAppApi(RESTService.Users);
        const fetchServer = await Promise.all([
          api.get(`/${userId}`),
          api.get(`${APIRoute.MyFriends}?isFriendId=${userId}`),
        ]);
        const { data: user } = fetchServer[0];
        const { data: userFriend } = fetchServer[1];

        setUser(user);
        setUserFriend(userFriend);
        setIsFirstLoadingServer(false);
        setIsFirstServerError(null);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

        if (errorResponse) {
          setIsFirstServerError(errorResponse.data.message);
        }

        if (!errorResponse) {
          setIsFirstServerError(error.message);
        }

        setIsFirstLoadingServer(false);
      }
    };
    findUser();
  }, [setIsFirstLoadingServer, setIsFirstServerError, userId]);

  return isFirstLoadingServer ? (
    <Spinner spinnerScreen />
  ) : isFirstServerError ? (
    <Error errorMessage={isFirstServerError} />
  ) : (
    <>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <button
              className="btn-flat inner-page__back"
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
            <div className="inner-page__content">
              <section className="user-card">
                <h1 className="visually-hidden">Карточка пользователя</h1>
                <div className="user-card__wrapper">
                  <div className="user-card__content">
                    <div className="user-card__head">
                      <h2 className="user-card__title">{user.name}</h2>
                      {/* <div className="user-card__icon">
                      <svg
                        className="user-card__crown"
                        width="12"
                        height="12"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-crown"></use>
                      </svg>
                    </div> */}
                    </div>
                    <div className="user-card__label">
                      <svg
                        className="user-card__icon-location"
                        width="12"
                        height="14"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-location"></use>
                      </svg>
                      <span
                        onClick={() => setIsShowPopup(() => true)}
                        onMouseOver={(evt) =>
                          (evt.currentTarget.style.cursor = 'pointer')
                        }
                      >
                        {user.location}
                      </span>
                    </div>
                    <div
                      className={`user-card__status ${
                        user.isReadyTraining ? '' : styles.statusNotReady
                      }`}
                    >
                      <span>Готов к тренировке</span>
                    </div>
                    <div className="user-card__text">
                      <p>{user.about}</p>
                    </div>
                    <ul className="user-card__hashtag-list">
                      {user.specializations.map((specialization) => (
                        <li
                          key={specialization}
                          className="user-card__hashtag-item"
                        >
                          <div className="hashtag">
                            <span>#{specialization}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`${
                        isServerError
                          ? `show-more__button--error ${styles.showMoreButtonErrorUser}`
                          : userFriend.length
                          ? `btn ${styles.btnOutlinedDeleteUser}`
                          : 'btn user-card__btn'
                      }`}
                      type="button"
                      disabled={isLoadingServer}
                      onClick={async (evt) => {
                        const api = createAppApi(RESTService.Users);
                        try {
                          if (
                            evt.currentTarget.textContent ===
                            'Удалить из друзей'
                          ) {
                            setIsLoadingServer(true);
                            await api.delete(`${APIRoute.MyFriends}/${userId}`);
                            setUserFriend([]);
                            setIsLoadingServer(false);
                          } else {
                            setIsLoadingServer(true);
                            const { data: userFriend } = await api.post(
                              `${APIRoute.MyFriends}/${userId}`
                            );
                            setUserFriend([userFriend]);
                            setIsLoadingServer(false);
                          }
                        } catch (err) {
                          const error = err as AxiosError;
                          const errorResponse =
                            error?.response as AxiosResponse<ErrorResponse>;

                          setIsLoadingServer(false);

                          if (errorResponse) {
                            setIsServerError(errorResponse.data.message);
                          }

                          if (!errorResponse) {
                            setIsServerError(error.message);
                          }

                          setTimeout(
                            () => setIsServerError(null),
                            SHOW_ERROR_TIME
                          );
                        }
                      }}
                    >
                      {isLoadingServer ? (
                        <Spinner />
                      ) : userFriend.length ? (
                        'Удалить из друзей'
                      ) : (
                        'Добавить в друзья'
                      )}
                    </button>
                  </div>
                  <div className="user-card__gallary">
                    <ul className="user-card__gallary-list">
                      <li className="user-card__gallary-item">
                        <img
                          src="img/content/user-card-photo1.jpg"
                          srcSet="img/content/user-card-photo1@2x.jpg 2x"
                          width="334"
                          height="573"
                          alt="photo1"
                        />
                      </li>
                      <li className="user-card__gallary-item">
                        <img
                          src="img/content/user-card-photo2.jpg"
                          srcSet="img/content/user-card-photo2@2x.jpg 2x"
                          width="334"
                          height="573"
                          alt="photo2"
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      {isShowPopup && (
        <Dialog
          open={isShowPopup}
          onClose={() => setIsShowPopup(false)}
        >
          <UserLocationPopup
            changeIsShowPopup={setIsShowPopup}
            userName={user.name}
            location={user.location}
          />
        </Dialog>
      )}
    </>
  );
}
