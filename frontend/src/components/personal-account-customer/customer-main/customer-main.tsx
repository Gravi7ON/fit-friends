import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { PersonalCustomerRoute } from 'src/constant';
import 'swiper/css';
import 'swiper/css/pagination';
import './custom-main.css';

export function CustomerMain(): JSX.Element {
  const navigate = useNavigate();

  const swiperSpecialRef = useRef<SwiperCore>();
  const [isBeginningSpecial, setIsBeginningSpecial] = useState(true);
  const [isEndSpecial, setIsEndSpecial] = useState(false);

  const swiperPopularRef = useRef<SwiperCore>();
  const [isBeginningPopular, setIsBeginningPopular] = useState(true);
  const [isEndPopular, setIsEndPopular] = useState(false);

  const swiperActiveRef = useRef<SwiperCore>();
  const [isBeginningActive, setIsBeginningActive] = useState(true);
  const [isEndActive, setIsEndActive] = useState(false);

  return (
    <div className="wrapper">
      <main>
        <h1 className="visually-hidden">
          FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
        </h1>
        <section className="special-for-you">
          <div className="container">
            <div className="special-for-you__wrapper">
              <div className="special-for-you__title-wrapper">
                <h2 className="special-for-you__title">
                  Специально подобрано для вас
                </h2>
                <div className="special-for-you__controls">
                  <button
                    className="btn-icon special-for-you__control"
                    type="button"
                    aria-label="previous"
                    disabled={isBeginningSpecial}
                    onClick={() => swiperSpecialRef.current?.slidePrev()}
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
                    className="btn-icon special-for-you__control"
                    type="button"
                    aria-label="next"
                    disabled={isEndSpecial}
                    onClick={() => swiperSpecialRef.current?.slideNext()}
                  >
                    <svg
                      width="16"
                      height="14"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <ul className="special-for-you__list">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={3}
                  onBeforeInit={(swiper) => {
                    swiperSpecialRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setIsBeginningSpecial(swiper.isBeginning);
                    setIsEndSpecial(swiper.isEnd);
                  }}
                >
                  {Array(6)
                    .fill(0)
                    .map((_item, index) => (
                      <SwiperSlide key={index}>
                        <li className="special-for-you__item">
                          <div className="thumbnail-preview">
                            <div className="thumbnail-preview__image">
                              <picture>
                                <source
                                  type="image/webp"
                                  srcSet={`img/content/thumbnails/preview-0${Math.ceil(
                                    Math.random() * 3
                                  )}.webp, img/content/thumbnails/preview-0${Math.ceil(
                                    Math.random() * 3
                                  )}@2x.webp 2x`}
                                />
                                <img
                                  src={`img/content/thumbnails/preview-0${Math.ceil(
                                    Math.random() * 3
                                  )}.jpg`}
                                  srcSet={`img/content/thumbnails/preview-0${Math.ceil(
                                    Math.random() * 3
                                  )}@2x.jpg 2x`}
                                  width="452"
                                  height="191"
                                  alt=""
                                />
                              </picture>
                            </div>
                            <div className="thumbnail-preview__inner">
                              <h3 className="thumbnail-preview__title">
                                {
                                  ['crossfit', 'power', 'boxing'][
                                    Math.floor(Math.random() * 3)
                                  ]
                                }
                              </h3>
                              <div className="thumbnail-preview__button-wrapper">
                                <Link
                                  className="btn btn--small thumbnail-preview__button"
                                  to="#"
                                >
                                  Подробнее
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </ul>
            </div>
          </div>
        </section>
        <section className="special-offers">
          <div className="container">
            <div className="special-offers__wrapper">
              <h2 className="visually-hidden">Специальные предложения</h2>
              <ul className="special-offers__list">
                <Swiper
                  modules={[Pagination]}
                  slidesPerView={1}
                  spaceBetween={20}
                  pagination={{
                    clickable: true,
                    bulletClass:
                      'swiper-custom-pagination swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-custom-pagination-progressbar',
                  }}
                >
                  {Array(3)
                    .fill(0)
                    .map((_item, index) => (
                      <SwiperSlide key={index}>
                        <li className="special-offers__item is-active">
                          <aside className="promo-slider">
                            <div className="promo-slider__overlay"></div>
                            <div className="promo-slider__image">
                              <img
                                src={`img/content/promo-${index++}.png`}
                                srcSet={`img/content/promo-${index++}@2x.png 2x`}
                                width="1040"
                                height="469"
                                alt="promo"
                              />
                            </div>
                            <div className="promo-slider__header">
                              <h3 className="promo-slider__title">Fitball</h3>
                              <div className="promo-slider__logo">
                                <svg
                                  width="74"
                                  height="74"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#logotype"></use>
                                </svg>
                              </div>
                            </div>
                            <span className="promo-slider__text">
                              Горячие предложения на тренировки на фитболе
                            </span>
                            <div className="promo-slider__bottom-container">
                              <div className="promo-slider__slider-dots"></div>
                              <div className="promo-slider__price-container">
                                <p className="promo-slider__price">1600 ₽</p>
                                <p className="promo-slider__sup">за занятие</p>
                                <p className="promo-slider__old-price">
                                  2000 ₽
                                </p>
                              </div>
                            </div>
                          </aside>
                        </li>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </ul>
              <div className="thumbnail-spec-gym">
                <div className="thumbnail-spec-gym__image">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
                    />
                    <img
                      src="img/content/thumbnails/nearest-gym-01.jpg"
                      srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                      width="330"
                      height="190"
                      alt=""
                    />
                  </picture>
                </div>
                <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                <div className="thumbnail-spec-gym__header">
                  <h3 className="thumbnail-spec-gym__title">атлетика</h3>
                  <div className="thumbnail-spec-gym__location">
                    <svg
                      width="14"
                      height="16"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-location"></use>
                    </svg>
                    <address className="thumbnail-spec-gym__location-address">
                      м. Московская
                    </address>
                  </div>
                </div>
                <div className="thumbnail-spec-gym__button-wrapper">
                  <Link
                    className="btn btn--small thumbnail-spec-gym__button"
                    to="#"
                  >
                    Подробнее
                  </Link>
                  <Link
                    className="btn btn--small btn--outlined thumbnail-spec-gym__button"
                    to={PersonalCustomerRoute.Gyms}
                  >
                    Все залы
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="popular-trainings">
          <div className="container">
            <div className="popular-trainings__wrapper">
              <div className="popular-trainings__title-wrapper">
                <h2 className="popular-trainings__title">
                  Популярные тренировки
                </h2>
                <button
                  className="btn-flat popular-trainings__button"
                  type="button"
                  onClick={(evt) => navigate(PersonalCustomerRoute.Workouts)}
                >
                  <span>Смотреть все</span>
                  <svg
                    width="14"
                    height="10"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
                <div className="popular-trainings__controls">
                  <button
                    className="btn-icon popular-trainings__control"
                    type="button"
                    aria-label="previous"
                    disabled={isBeginningPopular}
                    onClick={() => swiperPopularRef.current?.slidePrev()}
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
                    className="btn-icon popular-trainings__control"
                    type="button"
                    aria-label="next"
                    disabled={isEndPopular}
                    onClick={() => swiperPopularRef.current?.slideNext()}
                  >
                    <svg
                      width="16"
                      height="14"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <ul className="popular-trainings__list">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={4}
                  onBeforeInit={(swiper) => {
                    swiperPopularRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setIsBeginningPopular(swiper.isBeginning);
                    setIsEndPopular(swiper.isEnd);
                  }}
                >
                  {Array(8)
                    .fill(0)
                    .map((_item, index) => (
                      <SwiperSlide key={index}>
                        <li className="popular-trainings__item">
                          <div className="thumbnail-training">
                            <div className="thumbnail-training__inner">
                              <div className="thumbnail-training__image">
                                <picture>
                                  <source
                                    type="image/webp"
                                    srcSet={`img/content/thumbnails/training-0${Math.ceil(
                                      Math.random() * 6
                                    )}.webp, img/content/thumbnails/training-0${Math.ceil(
                                      Math.random() * 6
                                    )}@2x.webp 2x`}
                                  />
                                  <img
                                    src={`img/content/thumbnails/training-0${Math.ceil(
                                      Math.random() * 6
                                    )}.jpg`}
                                    srcSet={`img/content/thumbnails/training-0${Math.ceil(
                                      Math.random() * 6
                                    )}@2x.jpg 2x`}
                                    width="330"
                                    height="190"
                                    alt=""
                                  />
                                </picture>
                              </div>
                              <p className="thumbnail-training__price">
                                <span className="thumbnail-training__price-value">
                                  1600
                                </span>
                                <span>₽</span>
                              </p>
                              <h3 className="thumbnail-training__title">
                                run, forrest, run
                              </h3>
                              <div className="thumbnail-training__info">
                                <ul className="thumbnail-training__hashtags-list">
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag">
                                      <span>#бег</span>
                                    </div>
                                  </li>
                                  <li className="thumbnail-training__hashtags-item">
                                    <div className="hashtag thumbnail-training__hashtag">
                                      <span>#500ккал</span>
                                    </div>
                                  </li>
                                </ul>
                                <div className="thumbnail-training__rate">
                                  <svg
                                    width="16"
                                    height="16"
                                    aria-hidden="true"
                                  >
                                    <use xlinkHref="#icon-star"></use>
                                  </svg>
                                  <span className="thumbnail-training__rate-value">
                                    5
                                  </span>
                                </div>
                              </div>
                              <div className="thumbnail-training__text-wrapper">
                                <p className="thumbnail-training__text">
                                  Узнайте правильную технику бега, развивайте
                                  выносливость и&nbsp;откройте для себя все
                                  секреты длительных пробежек.
                                </p>
                              </div>
                              <div className="thumbnail-training__button-wrapper">
                                <Link
                                  className="btn btn--small thumbnail-training__button-catalog"
                                  to="#"
                                >
                                  Подробнее
                                </Link>
                                <Link
                                  className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                                  to="#"
                                >
                                  Отзывы
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </ul>
            </div>
          </div>
        </section>
        <section className="look-for-company">
          <div className="container">
            <div className="look-for-company__wrapper">
              <div className="look-for-company__title-wrapper">
                <h2 className="look-for-company__title">
                  Ищут компанию для тренировки
                </h2>
                <button
                  className="btn-flat btn-flat--light look-for-company__button"
                  type="button"
                  onClick={() => navigate(PersonalCustomerRoute.Users)}
                >
                  <span>Смотреть все</span>
                  <svg
                    width="14"
                    height="10"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#arrow-right"></use>
                  </svg>
                </button>
                <div className="look-for-company__controls">
                  <button
                    className="btn-icon btn-icon--outlined look-for-company__control"
                    type="button"
                    aria-label="previous"
                    disabled={isBeginningActive}
                    onClick={() => swiperActiveRef.current?.slidePrev()}
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
                    className="btn-icon btn-icon--outlined look-for-company__control"
                    type="button"
                    aria-label="next"
                    disabled={isEndActive}
                    onClick={() => swiperActiveRef.current?.slideNext()}
                  >
                    <svg
                      width="16"
                      height="14"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#arrow-right"></use>
                    </svg>
                  </button>
                </div>
              </div>
              <ul className="look-for-company__list">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={4}
                  onBeforeInit={(swiper) => {
                    swiperActiveRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => {
                    setIsBeginningActive(swiper.isBeginning);
                    setIsEndActive(swiper.isEnd);
                  }}
                >
                  {Array(8)
                    .fill(0)
                    .map((item, index) => (
                      <SwiperSlide key={index}>
                        <li className="look-for-company__item">
                          <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                            <div className="thumbnail-user__image">
                              <picture>
                                <source
                                  type="image/webp"
                                  srcSet="img/content/thumbnails/user-04.webp, img/content/thumbnails/user-04@2x.webp 2x"
                                />
                                <img
                                  src="img/content/thumbnails/user-04.jpg"
                                  srcSet="img/content/thumbnails/user-04@2x.jpg 2x"
                                  width="82"
                                  height="82"
                                  alt=""
                                />
                              </picture>
                            </div>
                            <div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
                              <svg
                                width="12"
                                height="12"
                                aria-hidden="true"
                              >
                                <use xlinkHref="#icon-crown"></use>
                              </svg>
                            </div>
                            <div className="thumbnail-user__header">
                              <h3 className="thumbnail-user__name">Диана</h3>
                              <div className="thumbnail-user__location">
                                <svg
                                  width="14"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-location"></use>
                                </svg>
                                <address className="thumbnail-user__location-address">
                                  Невский проспект
                                </address>
                              </div>
                            </div>
                            <ul className="thumbnail-user__hashtags-list">
                              <li className="thumbnail-user__hashtags-item">
                                <div className="hashtag thumbnail-user__hashtag">
                                  <span>#пилатес</span>
                                </div>
                              </li>
                            </ul>
                            <Link
                              className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                              to="#"
                            >
                              Подробнее
                            </Link>
                          </div>
                        </li>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
