import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import Error from 'src/components/animate-ui/error/error';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { APIRoute } from 'src/constant';
import { RESTService, createAppApi } from 'src/services/app.api';
import { Comment } from 'src/types/comment';
import CommentCard from '../comment/comment-card';
import { MyBalance } from 'src/types/my-balance';
import { SHOW_ERROR_TIME } from 'src/components/constant-components';
import { Dialog } from '@headlessui/react';
import WorkoutBuyPopup from '../popups/workout-buy-popup';
import CreateCommentPopup from '../popups/create-comment-popup';
import { Workout } from 'src/types/workout';
import { User } from 'src/types/user';

const apiWorkout = createAppApi(RESTService.Workouts);
const workoutFetcher = async (endPoint: string) =>
  (await apiWorkout.get(endPoint)).data;

const apiAccount = createAppApi(RESTService.PersonalAccount);
const myBalanceFetcher = async (endPoint: string) =>
  (await apiAccount.get(endPoint)).data;
const workoutOff = async (endPoint: string) =>
  (await apiAccount.patch(endPoint)).data;

const apiUser = createAppApi(RESTService.Users);
const userFetcher = async (endPoint: string) =>
  (await apiUser.get(endPoint)).data;

export default function WorkoutScreenCustomer(): JSX.Element {
  const navigate = useNavigate();
  const { workoutId } = useParams();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isStartTraining, setIsStartTraining] = useState(false);
  const [isPlayedVideo, setIsPlayedVideo] = useState(false);
  const [isShowBuyPopup, setIsShowBuyPopup] = useState(false);
  const [isShowCommentPopup, setIsShowCommentPopup] = useState(false);

  const { data: comments } = useSWR<Comment[]>(
    `${APIRoute.Reviews}/${workoutId}`,
    workoutFetcher
  );

  const { data: myBalance, mutate: mutateBalanceCache } = useSWR<MyBalance>(
    APIRoute.MyBalance,
    myBalanceFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const {
    data: workout,
    error: workoutError,
    isLoading: workoutIsLoading,
  } = useSWR<Workout>(`/${workoutId}`, workoutFetcher);

  const {
    data: user,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR<User>(() => `/${workout?.coachId}`, userFetcher);

  const {
    trigger,
    isMutating,
    data: updateBalance,
    error: updateBalanceError,
    reset,
  } = useSWRMutation(
    `${APIRoute.MyPurchasesWorkouts}/${workoutId}`,
    workoutOff
  );

  return userIsLoading || workoutIsLoading ? (
    <Spinner spinnerScreen />
  ) : userError || workoutError ? (
    <Error
      errorMessage={
        userError
          ? userError.message || userError.response.data.message
          : workoutError.message || workoutError.response.data.message
      }
    />
  ) : (
    <>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Карточка тренировки</h1>
            <aside className="reviews-side-bar">
              <button
                className="btn-flat btn-flat--underlined reviews-side-bar__back"
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
              {comments && comments.length > 0 ? (
                <>
                  <h2 className="reviews-side-bar__title">Отзывы</h2>
                  <ul className="reviews-side-bar__list">
                    {comments.map((comment) => (
                      <CommentCard
                        key={comment.id}
                        commentText={comment.text}
                        rating={comment.rating}
                      />
                    ))}
                  </ul>
                </>
              ) : (
                <h2 style={{ margin: 'auto' }}>No comments</h2>
              )}
              {myBalance &&
                myBalance.purchasedWorkoutIds.includes(Number(workoutId)) && (
                  <button
                    className="btn btn--medium reviews-side-bar__button"
                    type="button"
                    onClick={() => setIsShowCommentPopup(true)}
                  >
                    Оставить отзыв
                  </button>
                )}
            </aside>
            <div className="training-card">
              <div className="training-info">
                <h2 className="visually-hidden">Информация о тренировке</h2>
                <div className="training-info__header">
                  <div className="training-info__coach">
                    <div className="training-info__photo">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="img/content/avatars/coaches//photo-1.webp, img/content/avatars/coaches//photo-1@2x.webp 2x"
                        />
                        <img
                          src="img/content/avatars/coaches//photo-1.png"
                          srcSet="img/content/avatars/coaches//photo-1@2x.png 2x"
                          width="64"
                          height="64"
                          alt="Изображение тренера"
                        />
                      </picture>
                    </div>
                    <div className="training-info__coach-info">
                      <span className="training-info__label">Тренер</span>
                      <span className="training-info__name">{user?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="training-info__main-content">
                  <form>
                    <div className="training-info__form-wrapper">
                      <div className="training-info__info-wrapper">
                        <div className="training-info__input training-info__input--training">
                          <label>
                            <span className="training-info__label">
                              Название тренировки
                            </span>
                            <input
                              type="text"
                              name="training"
                              value={workout?.title}
                              readOnly
                            />
                          </label>
                          <div className="training-info__error">
                            Обязательное поле
                          </div>
                        </div>
                        <div className="training-info__textarea">
                          <label>
                            <span className="training-info__label">
                              Описание тренировки
                            </span>
                            <textarea
                              name="description"
                              disabled
                              defaultValue={workout?.description}
                            ></textarea>
                          </label>
                        </div>
                      </div>
                      <div className="training-info__rating-wrapper">
                        <div className="training-info__input training-info__input--rating">
                          <label>
                            <span className="training-info__label">
                              Рейтинг
                            </span>
                            <span className="training-info__rating-icon">
                              <svg
                                width="18"
                                height="18"
                                aria-hidden="true"
                              >
                                <use xlinkHref="#icon-star"></use>
                              </svg>
                            </span>
                            <input
                              type="number"
                              name="rating"
                              value={workout?.rating}
                              readOnly
                            />
                          </label>
                        </div>
                        <ul className="training-info__list">
                          <li className="training-info__item">
                            <div className="hashtag hashtag--white">
                              <span>#{workout?.specialization}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="training-info__price-wrapper">
                        <div className="training-info__input training-info__input--price">
                          <label>
                            <span className="training-info__label">
                              Стоимость
                            </span>
                            <input
                              type="text"
                              name="price"
                              value={`${workout?.cost} ₽`}
                              readOnly
                            />
                          </label>
                          <div className="training-info__error">
                            Введите число
                          </div>
                        </div>
                        <button
                          className="btn training-info__buy"
                          type="button"
                          disabled={myBalance?.purchasedWorkoutIds.includes(
                            Number(workoutId)
                          )}
                          onClick={() => setIsShowBuyPopup(true)}
                        >
                          Купить
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-video">
                <h2 className="training-video__title">Видео</h2>
                <div className="training-video__video">
                  <div className="training-video__thumbnail">
                    <picture>
                      <source
                        type="video/mp4"
                        srcSet="img/content/training-video/video-html-academy_SO2ddjJ6.mp4"
                      />
                      <video
                        ref={videoRef}
                        controls={isPlayedVideo}
                        src="img/content/training-video/video-html-academy_SO2ddjJ6.mp4"
                        width="922"
                        height="566"
                        onEnded={() => setIsPlayedVideo((prev) => !prev)}
                      />
                    </picture>
                  </div>
                  <button
                    style={isPlayedVideo ? { display: 'none' } : undefined}
                    className="training-video__play-button btn-reset"
                    disabled={
                      !myBalance?.purchasedWorkoutIds.includes(
                        Number(workoutId)
                      ) || !isStartTraining
                    }
                    onClick={() => {
                      setIsPlayedVideo((prev) => !prev);
                      if (videoRef.current) {
                        videoRef.current.play();
                      }
                    }}
                  >
                    <svg
                      width="18"
                      height="30"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                </div>
                <div className="training-video__buttons-wrapper">
                  <button
                    className={`btn training-video__button training-video__button--start ${
                      updateBalanceError ? 'show-more__button--error' : ''
                    }`}
                    type="button"
                    disabled={
                      !myBalance?.purchasedWorkoutIds.includes(
                        Number(workoutId)
                      ) || isMutating
                    }
                    onClick={async (evt) => {
                      if (evt.currentTarget.textContent === 'Приступить') {
                        try {
                          await trigger();
                          setIsStartTraining((prev) => !prev);
                        } catch {
                          setTimeout(reset, SHOW_ERROR_TIME);
                        }
                        return;
                      }

                      setIsStartTraining((prev) => !prev);

                      if (
                        evt.currentTarget.textContent === 'Закончить' &&
                        Boolean(updateBalance.purchasedWorkoutIds.length)
                      ) {
                        mutateBalanceCache(updateBalance);
                      }
                    }}
                  >
                    {isMutating ? (
                      <Spinner />
                    ) : isStartTraining ? (
                      'Закончить'
                    ) : (
                      'Приступить'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isShowBuyPopup && (
        <Dialog
          open={isShowBuyPopup}
          onClose={() => setIsShowBuyPopup(false)}
        >
          <WorkoutBuyPopup
            changeIsShowPopup={setIsShowBuyPopup}
            title="title"
            cost={800}
            image="image.jpg"
          />
        </Dialog>
      )}
      {isShowCommentPopup && (
        <Dialog
          open={isShowCommentPopup}
          onClose={() => setIsShowCommentPopup(false)}
        >
          <CreateCommentPopup changeIsShowPopup={setIsShowCommentPopup} />
        </Dialog>
      )}
    </>
  );
}
