import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './gym-buy-sub-popup.module.css';
import { useParams } from 'react-router-dom';
import {
  SHOW_ERROR_TIME,
  TypePurchase,
} from 'src/components/constant-components';
import useSWRMutation from 'swr/mutation';
import { APIRoute } from 'src/constant';
import { RESTService, createAppApi } from 'src/services/app.api';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { useSWRConfig } from 'swr';

type WorkoutBuyPopupProps = {
  changeIsShowPopup: (value: React.SetStateAction<boolean>) => void;
  cost: number;
  image: string;
  title: string;
};

type Inputs = {
  payment: string;
};

const apiAccount = createAppApi(RESTService.PersonalAccount);
const purchaseFetcher = async (endPoint: string) =>
  (await apiAccount.post(endPoint)).data;

const apiWorkout = createAppApi(RESTService.Workouts);
const orderFetcher = async (
  endPoint: string,
  { arg }: { arg: Record<string, string | undefined | number> }
) => (await apiWorkout.post(endPoint, arg)).data;

export default function WorkoutBuyPopup({
  changeIsShowPopup,
  title,
  image,
  cost,
}: WorkoutBuyPopupProps): JSX.Element {
  const { workoutId } = useParams();

  const { mutate } = useSWRConfig();

  const [countWorkout, setCountWorkout] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const {
    trigger: purchaseTrigger,
    isMutating: isMutatingPurchase,
    error: makePurchaseError,
    reset: resetPurchase,
  } = useSWRMutation(
    `${APIRoute.MyPurchasesWorkouts}/${workoutId}`,
    purchaseFetcher
  );

  const {
    trigger: orderTrigger,
    isMutating: isMutatingOrder,
    error: makeOrderError,
    reset: resetOrder,
  } = useSWRMutation(APIRoute.Orders, orderFetcher);

  useEffect(() => {
    const arrowLeftPressHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowLeft') {
        setCountWorkout((prev) => {
          if (prev === 1) {
            return prev;
          }
          return (prev -= 1);
        });
      }
    };

    const arrowRightPressHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowRight') {
        setCountWorkout((prev) => (prev += 1));
      }
    };

    document.addEventListener('keydown', arrowLeftPressHandler);
    document.addEventListener('keydown', arrowRightPressHandler);

    return () => {
      document.removeEventListener('keydown', arrowLeftPressHandler);
      document.removeEventListener('keydown', arrowRightPressHandler);
    };
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const adapter = {
      ...data,
      amountWorkout: countWorkout,
      workoutId: Number(workoutId),
      cost,
      type: TypePurchase.Workout,
    };

    try {
      await Promise.all([purchaseTrigger(), orderTrigger(adapter)]);
      mutate(APIRoute.MyBalance);
      changeIsShowPopup(() => false);
    } catch {
      setTimeout(resetPurchase, SHOW_ERROR_TIME);
      setTimeout(resetOrder, SHOW_ERROR_TIME);
    }
  };

  return (
    <div className="popup-form popup-form--buy">
      <section className="popup">
        <div className="popup__wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="popup-head">
              <h2 className="popup-head__header">Купить тренировку</h2>
              <button
                className="btn-icon btn-icon--outlined btn-icon--big"
                type="button"
                aria-label="close"
                onClick={() => changeIsShowPopup(() => false)}
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
            <div className="popup__content popup__content--purchases">
              <div className="popup__product">
                <div className="popup__product-image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={image}
                    />
                    <img
                      src={image}
                      srcSet={image}
                      width="98"
                      height="80"
                      alt=""
                    />
                  </picture>
                </div>
                <div className="popup__product-info">
                  <h3 className="popup__product-title">{title}</h3>
                  <p className="popup__product-price">{cost} ₽</p>
                </div>
                <div className="popup__product-quantity">
                  <p className="popup__quantity">Количество</p>
                  <div className="input-quantity">
                    <button
                      className="btn-icon btn-icon--quantity"
                      type="button"
                      aria-label="minus"
                      onClick={() =>
                        setCountWorkout((prev) => {
                          if (prev === 1) {
                            return prev;
                          }
                          return (prev -= 1);
                        })
                      }
                    >
                      <svg
                        width="12"
                        height="12"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-minus"></use>
                      </svg>
                    </button>
                    <div className="input-quantity__input">
                      <label>
                        <input
                          type="text"
                          readOnly
                          value={countWorkout}
                          size={2}
                        />
                      </label>
                    </div>
                    <button
                      className="btn-icon btn-icon--quantity"
                      type="button"
                      aria-label="plus"
                      onClick={() => setCountWorkout((prev) => (prev += 1))}
                    >
                      <svg
                        width="12"
                        height="12"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-plus"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <section
                className="payment-method"
                style={{ position: 'relative' }}
              >
                <h4 className="payment-method__title">
                  Выберите способ оплаты
                </h4>
                <ul className="payment-method__list">
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          aria-label="Visa."
                          value={'visa'}
                          {...register('payment', {
                            required: 'payment is required',
                          })}
                        />
                        <span className="btn-radio-image__image">
                          <svg
                            width="58"
                            height="20"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#visa-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          aria-label="Мир."
                          value={'mir'}
                          {...register('payment', {
                            required: 'payment is required',
                          })}
                        />
                        <span className="btn-radio-image__image">
                          <svg
                            width="66"
                            height="20"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#mir-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                  <li className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          type="radio"
                          aria-label="Iomoney."
                          value={'umoney'}
                          {...register('payment', {
                            required: 'payment is required',
                          })}
                        />
                        <span className="btn-radio-image__image">
                          <svg
                            width="106"
                            height="24"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#iomoney-logo"></use>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </li>
                </ul>
                {errors.payment && (
                  <p className={styles.inputError}>{errors.payment.message}</p>
                )}
              </section>
              <div className="popup__total">
                <p className="popup__total-text">Итого</p>
                <svg
                  className="popup__total-dash"
                  width="310"
                  height="2"
                  aria-hidden="true"
                >
                  <use xlinkHref="#dash-line"></use>
                </svg>
                <p className="popup__total-price">
                  {(cost * countWorkout).toLocaleString('ru')}&nbsp;₽
                </p>
              </div>
              <div className="popup__button">
                <button
                  className={`btn ${
                    makePurchaseError || makeOrderError
                      ? 'show-more__button--error'
                      : ''
                  }`}
                  disabled={isMutatingOrder || isMutatingPurchase}
                  type="submit"
                >
                  {isMutatingPurchase || isMutatingOrder ? (
                    <Spinner />
                  ) : (
                    'Купить'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
