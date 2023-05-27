import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './create-comment-popup.module.css';
import { useParams } from 'react-router-dom';
import { RESTService, createAppApi } from 'src/services/app.api';
import useSWRMutation from 'swr/mutation';
import { APIRoute } from 'src/constant';
import { useSWRConfig } from 'swr';
import { SHOW_ERROR_TIME } from 'src/components/constant-components';
import Spinner from 'src/components/animate-ui/spinner/spinner';

type CreateCommentPopupProps = {
  changeIsShowPopup: (value: React.SetStateAction<boolean>) => void;
};

type Inputs = {
  rating: number;
  text: string;
};

const apiWorkout = createAppApi(RESTService.Workouts);
const commentFetcher = async (
  endPoint: string,
  { arg }: { arg: Record<string, string | undefined | number> }
) => (await apiWorkout.post(endPoint, arg)).data;

export default function CreateCommentPopup({
  changeIsShowPopup,
}: CreateCommentPopupProps): JSX.Element {
  const { workoutId } = useParams();

  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const { trigger, isMutating, error, reset } = useSWRMutation(
    APIRoute.Reviews,
    commentFetcher
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const adapter = {
      ...data,
      workoutId: Number(workoutId),
    };

    try {
      await trigger(adapter);
      mutate(`${APIRoute.Reviews}/${workoutId}`);
      changeIsShowPopup(() => false);
    } catch {
      setTimeout(reset, SHOW_ERROR_TIME);
    }
  };

  return (
    <div className="popup-form popup-form--feedback">
      <section className="popup">
        <div className="popup__wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="popup-head">
              <h2 className="popup-head__header">Оставить отзыв</h2>
              <button
                className="btn-icon btn-icon--outlined btn-icon--big"
                type="button"
                aria-label="close"
                onClick={() => changeIsShowPopup(false)}
              >
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-cross"></use>
                </svg>
              </button>
            </div>
            <div className="popup__content popup__content--feedback">
              <h3 className="popup__feedback-title">Оцените тренировку</h3>
              <ul
                className="popup__rate-list"
                style={{ position: 'relative' }}
              >
                {Array(5)
                  .fill(0)
                  .map((_item, index) => ++index)
                  .map((number) => (
                    <li
                      key={number}
                      className="popup__rate-item"
                    >
                      <div className="popup__rate-item-wrap">
                        <label>
                          <input
                            type="radio"
                            aria-label={`оценка ${number}.`}
                            value={`${number}`}
                            {...register('rating', {
                              required: 'rating is required',
                            })}
                          />
                          <span className="popup__rate-number">{number}</span>
                        </label>
                      </div>
                    </li>
                  ))}
                {errors.rating && (
                  <p className={styles.inputError}>{errors.rating.message}</p>
                )}
              </ul>
              <div
                className="popup__feedback"
                style={{ position: 'relative' }}
              >
                <h3 className="popup__feedback-title popup__feedback-title--text">
                  Поделитесь своими впечатлениями о тренировке
                </h3>
                <div className="popup__feedback-textarea">
                  <div className="custom-textarea">
                    <label>
                      <textarea
                        placeholder=" "
                        {...register('text', {
                          required: 'text is required',
                          minLength: {
                            value: 100,
                            message: 'min 100 characters',
                          },
                          maxLength: {
                            value: 1024,
                            message: 'max 1024 characters',
                          },
                        })}
                      ></textarea>
                    </label>
                  </div>
                  {errors.text && (
                    <p className={styles.inputError}>{errors.text.message}</p>
                  )}
                </div>
              </div>
              <div className="popup__button">
                <button
                  className={`btn ${error ? 'show-more__button--error' : ''}`}
                  type="submit"
                  disabled={isMutating}
                >
                  {isMutating ? <Spinner /> : 'Продолжить'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
