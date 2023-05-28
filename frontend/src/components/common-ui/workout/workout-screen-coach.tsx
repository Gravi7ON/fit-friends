import { useNavigate, useParams } from 'react-router-dom';
import useSWR, { useSWRConfig } from 'swr';
import { useRef, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import Error from 'src/components/animate-ui/error/error';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { APIRoute } from 'src/constant';
import { RESTService, createAppApi } from 'src/services/app.api';
import { Comment } from 'src/types/comment';
import CommentCard from '../comment/comment-card';
import { Workout } from 'src/types/workout';
import { User } from 'src/types/user';
import './workout-screen-coach.css';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  title: string;
  cost: string;
  description: string;
};

const apiWorkout = createAppApi(RESTService.Workouts);
const workoutFetcher = async (endPoint: string) =>
  (await apiWorkout.get(endPoint)).data;
const updateWorkoutFetcher = async (
  endPoint: string,
  { arg }: { arg: Record<string, string | undefined | number> }
) => (await apiWorkout.patch(endPoint, arg)).data;

const apiUser = createAppApi(RESTService.Users);
const userFetcher = async (endPoint: string) =>
  (await apiUser.get(endPoint)).data;

export default function WorkoutScreenCoach(): JSX.Element {
  const navigate = useNavigate();
  const { workoutId } = useParams();

  const { mutate } = useSWRConfig();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlayedVideo, setIsPlayedVideo] = useState(false);
  const [isEditWorkout, setIsEditWorkout] = useState(false);

  const { data: comments } = useSWR<Comment[]>(
    `${APIRoute.Reviews}/${workoutId}`,
    workoutFetcher
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
  } = useSWR<User>(workout ? `/${workout?.coachId}` : null, userFetcher);

  const { trigger, isMutating } = useSWRMutation(
    `${APIRoute.Coach}/${workoutId}`,
    updateWorkoutFetcher
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const adapter = {
      ...data,
      cost: Number(data.cost),
    };

    await trigger(adapter);
    mutate(`/${workoutId}`);
  };

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
            <button
              className="btn btn--medium reviews-side-bar__button"
              type="button"
              disabled
            >
              Оставить отзыв
            </button>
          </aside>
          <div className="training-card training-card--edit">
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
                {!isEditWorkout && (
                  <button
                    className="btn-flat btn-flat--light training-info__edit training-info__edit--edit"
                    type="button"
                    disabled={isMutating}
                    onClick={() => setIsEditWorkout((prev) => !prev)}
                    style={{ display: 'flex' }}
                  >
                    <svg
                      width="12"
                      height="12"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span>Редактировать</span>
                  </button>
                )}
                {isEditWorkout && (
                  <button
                    className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
                    type="button"
                    onClick={() => {
                      if (!Object.keys(errors).length) {
                        setIsEditWorkout((prev) => !prev);
                      }
                      const form = document.querySelector('#workout-edit');
                      const event = new Event('submit', {
                        bubbles: true,
                        cancelable: true,
                      });
                      form?.dispatchEvent(event);
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span>Сохранить</span>
                  </button>
                )}
              </div>
              <div className="training-info__main-content">
                <form
                  id="workout-edit"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <fieldset
                    disabled={!isEditWorkout}
                    style={{ margin: 0, border: 'none', padding: 0 }}
                  >
                    <div className="training-info__form-wrapper">
                      <div className="training-info__info-wrapper">
                        <div className="training-info__input training-info__input--training">
                          <label>
                            <span className="training-info__label">
                              Название тренировки
                            </span>
                            <input
                              type="text"
                              defaultValue={workout?.title}
                              {...register('title', {
                                required: 'title is required',
                                minLength: {
                                  value: 1,
                                  message: 'min 1 character',
                                },
                                maxLength: {
                                  value: 15,
                                  message: 'max 15 characters',
                                },
                              })}
                            />
                          </label>
                          <div className="training-info__error">
                            Обязательное поле
                          </div>
                          {errors.title && (
                            <p className="input__error">
                              {errors.title.message}
                            </p>
                          )}
                        </div>
                        <div
                          className="training-info__textarea"
                          style={{ position: 'relative' }}
                        >
                          <label>
                            <span className="training-info__label">
                              Описание тренировки
                            </span>
                            <textarea
                              defaultValue={workout?.description}
                              {...register('description', {
                                required: 'description is required',
                                minLength: {
                                  value: 10,
                                  message: 'min 10 characters',
                                },
                                maxLength: {
                                  value: 140,
                                  message: 'max 140 characters',
                                },
                              })}
                            ></textarea>
                          </label>
                          {errors.description && (
                            <p className="input__error">
                              {errors.description.message}
                            </p>
                          )}
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
                              defaultValue={workout?.rating}
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
                              type="number"
                              defaultValue={workout?.cost}
                              {...register('cost', {
                                required: 'cost is required',
                                min: {
                                  value: 0,
                                  message: 'min cost is 0',
                                },
                                validate: (value) => {
                                  if (/\W/g.test(value)) {
                                    return 'only positive integer';
                                  }
                                  if (/^0[0-9]+$/.test(value)) {
                                    return 'zero or positive';
                                  }
                                },
                              })}
                            />
                          </label>
                          {errors.cost && (
                            <p className="input__error">
                              {errors.cost.message}
                            </p>
                          )}
                          <div className="training-info__error">
                            Введите число
                          </div>
                        </div>
                        <button
                          className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                          type="button"
                          disabled
                        >
                          <svg
                            width="14"
                            height="14"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#icon-discount"></use>
                          </svg>
                          <span>Сделать скидку 10%</span>
                        </button>
                      </div>
                    </div>
                  </fieldset>
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
                <div
                  className="training-video__edit-buttons"
                  style={{ display: 'grid' }}
                >
                  {isEditWorkout && (
                    <>
                      <button
                        className="btn"
                        type="button"
                        disabled
                      >
                        Сохранить
                      </button>
                      <button
                        className="btn btn--outlined"
                        type="button"
                        disabled
                      >
                        Удалить
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
