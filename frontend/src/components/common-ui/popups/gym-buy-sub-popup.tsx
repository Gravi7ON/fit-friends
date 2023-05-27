import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GYM_FEATURES } from 'src/components/constant-components';
import styles from './gym-buy-sub-popup.module.css';

type GymBuySubPopupProps = {
  changeIsShowPopup: (value: React.SetStateAction<boolean>) => void;
  cost: number;
  image: string;
  title: string;
};

type Inputs = {
  features: string[];
  payment: string;
};

export default function GymBuySubPopup({
  changeIsShowPopup,
  title,
  image,
  cost,
}: GymBuySubPopupProps): JSX.Element {
  const [countSub, setCountSub] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  useEffect(() => {
    const arrowLeftPressHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowLeft') {
        setCountSub((prev) => {
          if (prev === 1) {
            return prev;
          }
          return (prev -= 1);
        });
      }
    };

    const arrowRightPressHandler = (evt: KeyboardEvent) => {
      if (evt.key === 'ArrowRight') {
        setCountSub((prev) => (prev += 1));
      }
    };

    document.addEventListener('keydown', arrowLeftPressHandler);
    document.addEventListener('keydown', arrowRightPressHandler);

    return () => {
      document.removeEventListener('keydown', arrowLeftPressHandler);
      document.removeEventListener('keydown', arrowRightPressHandler);
    };
  }, []);

  const onSubmit: SubmitHandler<Inputs> = () => null;

  return (
    <div className="popup-form popup-form--membership">
      <section className="popup">
        <div className="popup__wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="popup-head">
              <h2 className="popup-head__header">Оформить абонемент</h2>
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
            <div className="popup__content popup__content--membership">
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
                        setCountSub((prev) => {
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
                          value={countSub}
                          size={2}
                        />
                      </label>
                    </div>
                    <button
                      className="btn-icon btn-icon--quantity"
                      type="button"
                      aria-label="plus"
                      onClick={() => setCountSub((prev) => (prev += 1))}
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
              <section className="services-check">
                <h4 className="services-check__title">
                  Дополнительные услуги (1000 ₽)
                </h4>
                <ul className="services-check__list">
                  {GYM_FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="services-check__item"
                    >
                      <div className="custom-toggle custom-toggle--checkbox">
                        <label>
                          <input
                            type="checkbox"
                            value={feature}
                            {...register('features')}
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
                            {feature}
                          </span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
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
                <div>
                  <p className="popup__total-price">
                    {(cost * countSub).toLocaleString('ru')}&nbsp;₽
                  </p>
                </div>
              </div>
              <div className="popup__button">
                <button
                  className="btn"
                  type="submit"
                >
                  Купить
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
