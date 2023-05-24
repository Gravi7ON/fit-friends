import { Dialog } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';
import UserLocationPopup from '../popups/user-location-popup';
import { RESTService, createAppApi } from 'src/services/app.api';
import { APIRoute } from 'src/constant';
import { ErrorResponse } from 'src/types/error-response';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import Error from 'src/components/animate-ui/error/error';
import { Gym } from 'src/types/gym';
import GymBuySubPopup from '../popups/gym-buy-sub-popup';

export default function GymScreen(): JSX.Element {
  const navigate = useNavigate();
  const { gymId } = useParams();

  const [isFirstLoadingServer, setIsFirstLoadingServer] = useState(true);
  const [isFirstServerError, setIsFirstServerError] = useState<string | null>(
    null
  );
  const [isShowMapPopup, setIsShowMapPopup] = useState(false);
  const [isShowBuyPopup, setIsShowBuyPopup] = useState(false);
  const [gym, setGym] = useState<Gym>(Object);

  useEffect(() => {
    const getGym = async () => {
      try {
        const api = createAppApi(RESTService.Workouts);
        const { data: gym } = await api.get(`${APIRoute.Gym}/${gymId}`);

        setGym(gym);
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
    getGym();
  }, [gymId]);

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
              <section className="gym-card">
                <h1 className="visually-hidden">Карточка зала</h1>
                <div className="gym-card__wrapper">
                  <div className="gym-card__content">
                    <div className="gym-card__head">
                      <h2 className="gym-card__title">{gym.title}</h2>
                      {gym.isOriginal && (
                        <div className="gym-card__icon">
                          <svg
                            className="gym-card__verify-bold"
                            width="12"
                            height="12"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#icon-verify-bold"></use>
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="gym-card__address">
                      <svg
                        className="gym-card__icon-location"
                        width="12"
                        height="14"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-location"></use>
                      </svg>
                      <span
                        onClick={() => setIsShowMapPopup(() => true)}
                        onMouseEnter={(evt) => {
                          evt.currentTarget.style.cursor = 'pointer';
                          evt.currentTarget.style.color = '#d6d6d6';
                        }}
                        onMouseLeave={(evt) => {
                          evt.currentTarget.style.color = 'rgb(214, 214, 214)';
                        }}
                      >
                        м. {gym.location}
                      </span>
                    </p>
                    <ul className="gym-card__hashtag-list">
                      {gym.features.map((feature) => (
                        <li
                          key={feature}
                          className="gym-card__hashtag-item"
                        >
                          <div className="hashtag hashtag--white">
                            <span>#{feature}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="gym-card__text">
                      <p>{gym.description}</p>
                    </div>
                    <div className="gym-card__rating-price">
                      <div className="gym-card__rating">
                        <div className="rating">
                          <svg
                            className="rating__icon"
                            width="18"
                            height="18"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#icon-star"></use>
                          </svg>
                          <span className="rating__count">5</span>
                        </div>
                      </div>
                      <div className="gym-card__price">
                        <div className="price-service">
                          <p className="price-service__price">
                            {gym.cost}₽&nbsp;<span>&#47;</span>&nbsp;занятие
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="gym-card__button">
                      <button
                        className="btn btn--dark-bg"
                        type="button"
                        onClick={() => setIsShowBuyPopup(() => true)}
                      >
                        оформить абонемент
                      </button>
                    </div>
                  </div>
                  <section className="slider-gyms">
                    <h2 className="visually-hidden">
                      Слайдер с фотографиями спортивных залов.
                    </h2>
                    <ul className="slider-gyms__list">
                      {/* <li>
                        <button
                          className="btn-icon slider-gyms__btn slider-gyms__btn--prev"
                          type="button"
                          aria-label="prev"
                        >
                          <svg
                            width="16"
                            height="14"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#arrow-left"></use>
                          </svg>
                        </button>
                        <button
                          className="btn-icon slider-gyms__btn slider-gyms__btn--next"
                          type="button"
                          aria-label="next"
                        >
                          <svg
                            width="16"
                            height="14"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#arrow-right"></use>
                          </svg>
                        </button>
                      </li> */}
                      <li className="slider-gyms__slide slider-gyms__slide slider-gyms__slide--current">
                        <div className="slider-gyms__img">
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="img/content/slider-gyms/gym-01.webp, img/content/slider-gyms/gym-01@2x.webp 2x"
                            />
                            <img
                              src="img/content/slider-gyms/gym-01.jpg"
                              srcSet="img/content/slider-gyms/gym-01@2x.jpg 2x"
                              width="826"
                              height="773"
                              alt="Фото спортивного снаряжения."
                            />
                          </picture>
                        </div>
                      </li>
                    </ul>
                  </section>
                </div>
              </section>
            </div>
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
            userName={gym.title}
            location={gym.location}
          />
        </Dialog>
      )}
      {isShowBuyPopup && (
        <Dialog
          open={isShowBuyPopup}
          onClose={() => setIsShowBuyPopup(false)}
        >
          <GymBuySubPopup
            changeIsShowPopup={setIsShowBuyPopup}
            cost={gym.cost}
            image={gym.image}
            title={gym.title}
          />
        </Dialog>
      )}
    </>
  );
}
