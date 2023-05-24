import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { SwiperSlide, Swiper } from 'swiper/react';
import SwiperCore from 'swiper';
import Error from 'src/components/animate-ui/error/error';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { RESTService, createAppApi } from 'src/services/app.api';
import { ErrorResponse } from 'src/types/error-response';
import { Coach, Customer, User, UserRole } from 'src/types/user';
import styles from './user-screen.module.css';
import UserLocationPopup from '../popups/user-location-popup';
import { APIRoute } from 'src/constant';
import { SHOW_ERROR_TIME } from 'src/components/constant-components';
import { Workout } from 'src/types/workout';
import WorkoutCard from '../workout/workout-card';
import CheckMark from 'src/components/animate-ui/check-mark/check-mark';

const SHOW_TEXT_ON_CONSIDERATION_TIME = 2000;

export default function UserScreen(): JSX.Element {
  const navigate = useNavigate();
  const { userId } = useParams();

  const swiperWorkoutRef = useRef<SwiperCore>();
  const [isBeginningWorkout, setIsBeginningWorkout] = useState(true);
  const [isEndWorkout, setIsEndWorkout] = useState(false);

  const [isFirstLoadingServer, setIsFirstLoadingServer] = useState(true);
  const [isFirstServerError, setIsFirstServerError] = useState<string | null>(
    null
  );
  const [isLoadingServer, setIsLoadingServer] = useState(false);
  const [isServerError, setIsServerError] = useState<string | null>(null);
  const [isSendRequestServer, setIsSendRequestServer] = useState(false);
  const [isSendRequestError, setIsSendRequestError] = useState<string | null>(
    null
  );
  const [user, setUser] = useState<Coach & Customer>(Object);
  const [userFriend, setUserFriend] = useState<User[]>([]);
  const [coachWorkouts, setCoachWorkouts] = useState<Workout[]>([]);
  const [subscribeCoach, setSubscribeCoach] = useState<
    Record<string, unknown>[]
  >([]);
  const [isShowMapPopup, setIsShowMapPopup] = useState(false);
  const [isSendingSuccess, setIsSendingSuccess] = useState(false);

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

        if (user.role === UserRole.Coach) {
          const apiWorkout = createAppApi(RESTService.Workouts);
          const apiNotify = createAppApi(RESTService.Notify);
          const fetchServer = await Promise.all([
            apiWorkout.get(`?coachId=${userId}`),
            apiNotify.get(`${APIRoute.Subscribe}/${userId}`),
          ]);
          const { data: coachWorkout } = fetchServer[0];
          const { data: subscribe } = fetchServer[1];

          setCoachWorkouts(coachWorkout);
          setSubscribeCoach(subscribe);
        }

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
            <div
              className="inner-page__content"
              style={
                user.role === UserRole.Coach
                  ? { marginBottom: '64px' }
                  : undefined
              }
            >
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
                        onClick={() => setIsShowMapPopup(() => true)}
                        onMouseOver={(evt) =>
                          (evt.currentTarget.style.cursor = 'pointer')
                        }
                      >
                        {user.location}
                      </span>
                    </div>
                    {user.role === UserRole.Coach && (
                      <div className="user-card-coach__status user-card-coach__status--tag">
                        <svg
                          className="user-card-coach__icon-cup"
                          width="12"
                          height="13"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-cup"></use>
                        </svg>
                        <span>Тренер</span>
                      </div>
                    )}
                    <div
                      className={`user-card__status ${
                        user.isReadyTraining || user.isIndividualTraining
                          ? ''
                          : styles.statusNotReady
                      }`}
                    >
                      <span>
                        {user.role === UserRole.Customer
                          ? 'Готов к тренировке'
                          : 'Готов тренировать'}
                      </span>
                    </div>
                    <div className="user-card__text">
                      <p>{user.about}</p>
                    </div>
                    {user.role === UserRole.Coach && (
                      <button
                        className="btn-flat user-card-coach__sertificate"
                        type="button"
                        style={{ margin: '24px 0 30px' }}
                      >
                        <svg
                          width="12"
                          height="13"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-teacher"></use>
                        </svg>
                        <span>Посмотреть сертификаты</span>
                      </button>
                    )}
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
            {user.role === UserRole.Coach && (
              <div className="user-card-coach__training">
                {Boolean(coachWorkouts.length) && (
                  <div className="user-card-coach__training-head">
                    <h2 className="user-card-coach__training-title">
                      Тренировки
                    </h2>
                    <div className="user-card-coach__training-bts">
                      <button
                        className="btn-icon user-card-coach__training-btn"
                        type="button"
                        aria-label="back"
                        disabled={isBeginningWorkout}
                        onClick={() => swiperWorkoutRef.current?.slidePrev()}
                      >
                        <svg
                          width="14"
                          height="10"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#arrow-left"></use>
                        </svg>
                      </button>
                      <button
                        className="btn-icon user-card-coach__training-btn"
                        type="button"
                        aria-label="next"
                        disabled={isEndWorkout}
                        onClick={() => swiperWorkoutRef.current?.slideNext()}
                      >
                        <svg
                          width="14"
                          height="10"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#arrow-right"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                <ul className="user-card-coach__training-list">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    onBeforeInit={(swiper) => {
                      swiperWorkoutRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                      setIsBeginningWorkout(swiper.isBeginning);
                      setIsEndWorkout(swiper.isEnd);
                    }}
                  >
                    {coachWorkouts.map((workout) => (
                      <SwiperSlide key={workout.id}>
                        <WorkoutCard
                          id={workout.id}
                          cost={workout.cost}
                          title={workout.title}
                          specialization={workout.specialization}
                          rating={workout.rating}
                          calories={workout.calories}
                          backgroundImage={workout.backgroundImage}
                          description={workout.description}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </ul>
                <form className="user-card-coach__training-form">
                  {user.isIndividualTraining && (
                    <button
                      className="btn user-card-coach__btn-training"
                      type="button"
                      disabled={isSendRequestServer}
                      onClick={async () => {
                        const api = createAppApi(RESTService.Users);

                        try {
                          setIsSendingSuccess(false);
                          setIsSendRequestServer(true);
                          await api.post(APIRoute.PersonalTrainingRequests, {
                            toUserId: userId,
                          });
                          setIsSendRequestServer(false);
                          setIsSendingSuccess(true);

                          setTimeout(() => {
                            setIsSendingSuccess(false);
                          }, SHOW_ERROR_TIME);
                        } catch (err) {
                          const error = err as AxiosError;
                          const errorResponse =
                            error?.response as AxiosResponse<ErrorResponse>;

                          setIsSendRequestServer(false);

                          if (errorResponse) {
                            setIsSendRequestError(errorResponse.data.message);
                          }

                          if (!errorResponse) {
                            setIsSendRequestError(error.message);
                          }

                          setTimeout(() => {
                            setIsSendingSuccess(false);
                            setIsSendRequestError(null);
                          }, SHOW_TEXT_ON_CONSIDERATION_TIME);
                        }
                      }}
                    >
                      {isSendRequestServer ? (
                        <Spinner />
                      ) : isSendingSuccess ? (
                        <CheckMark />
                      ) : isSendRequestError ? (
                        'Заявка уже на рассмотрении'
                      ) : (
                        'Хочу персональную тренировку'
                      )}
                    </button>
                  )}
                  <div className="user-card-coach__training-check">
                    <div className="custom-toggle custom-toggle--checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value="user-agreement-1"
                          name="user-agreement"
                          disabled={Boolean(subscribeCoach.length)}
                          defaultChecked={Boolean(subscribeCoach.length)}
                          onChange={async () => {
                            const api = createAppApi(RESTService.Notify);
                            const { data: subscribe } = await api.post(
                              APIRoute.Subscribe,
                              { subscribeCoachId: userId }
                            );
                            setSubscribeCoach([subscribe]);
                          }}
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
                        <span className="custom-toggle__label">
                          Получать уведомление на почту о новой тренировке
                        </span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      {isShowMapPopup && (
        <Dialog
          open={isShowMapPopup}
          onClose={() => setIsShowMapPopup(false)}
        >
          <UserLocationPopup
            changeIsShowPopup={setIsShowMapPopup}
            userName={user.name}
            location={user.location}
          />
        </Dialog>
      )}
    </>
  );
}
