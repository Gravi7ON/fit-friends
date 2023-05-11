import { Link } from 'react-router-dom';

export default function Main(): JSX.Element {
  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <Link
            className="header__logo"
            to="/"
            aria-label="Переход на главную"
          >
            <svg
              width="187"
              height="70"
              aria-hidden="true"
            >
              <use xlinkHref="#logo"></use>
            </svg>
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link
                  className="main-nav__link is-active"
                  to="#"
                  aria-label="На главную"
                >
                  <svg
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-home"></use>
                  </svg>
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className="main-nav__link"
                  to="#"
                  aria-label="Личный кабинет"
                >
                  <svg
                    width="16"
                    height="18"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-user"></use>
                  </svg>
                </Link>
              </li>
              <li className="main-nav__item">
                <Link
                  className="main-nav__link"
                  to="#"
                  aria-label="Друзья"
                >
                  <svg
                    width="22"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-friends"></use>
                  </svg>
                </Link>
              </li>
              <li className="main-nav__item main-nav__item--notifications">
                <Link
                  className="main-nav__link"
                  to="#"
                  aria-label="Уведомления"
                >
                  <svg
                    width="14"
                    height="18"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-notification"></use>
                  </svg>
                </Link>
                <div className="main-nav__dropdown">
                  <p className="main-nav__label">Оповещения</p>
                  <ul className="main-nav__sublist">
                    <li className="main-nav__subitem">
                      <Link
                        className="notification is-active"
                        to="#"
                      >
                        <p className="notification__text">
                          Катерина пригласила вас на&nbsp;тренировку
                        </p>
                        <time
                          className="notification__time"
                          dateTime="2023-12-23 12:35"
                        >
                          23 декабря, 12:35
                        </time>
                      </Link>
                    </li>
                    <li className="main-nav__subitem">
                      <Link
                        className="notification is-active"
                        to="#"
                      >
                        <p className="notification__text">
                          Никита отклонил приглашение на&nbsp;совместную
                          тренировку
                        </p>
                        <time
                          className="notification__time"
                          dateTime="2023-12-22 09:22"
                        >
                          22 декабря, 09:22
                        </time>
                      </Link>
                    </li>
                    <li className="main-nav__subitem">
                      <Link
                        className="notification is-active"
                        to="#"
                      >
                        <p className="notification__text">
                          Татьяна добавила вас в&nbsp;друзья
                        </p>
                        <time
                          className="notification__time"
                          dateTime="2023-12-18 18:50"
                        >
                          18 декабря, 18:50
                        </time>
                      </Link>
                    </li>
                    <li className="main-nav__subitem">
                      <a
                        className="notification"
                        href="#"
                      >
                        <p className="notification__text">
                          Наталья приняла приглашение на&nbsp;совместную
                          тренировку
                        </p>
                        <time
                          className="notification__time"
                          dateTime="2023-12-14 08:15"
                        >
                          14 декабря, 08:15
                        </time>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
          <div className="search">
            <form
              action="#"
              method="get"
            >
              <label>
                <span className="search__label">Поиск</span>
                <input
                  type="search"
                  name="search"
                />
                <svg
                  className="search__icon"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-search"></use>
                </svg>
              </label>
              <ul className="search__list">
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Бокс
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link is-active"
                    href="#"
                  >
                    Бег
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Аэробика
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
                <li className="search__item">
                  <a
                    className="search__link"
                    href="#"
                  >
                    Text
                  </a>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </header>
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
                <li className="special-for-you__item">
                  <div className="thumbnail-preview">
                    <div className="thumbnail-preview__image">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x"
                        />
                        <img
                          src="img/content/thumbnails/preview-03.jpg"
                          srcSet="img/content/thumbnails/preview-03@2x.jpg 2x"
                          width="452"
                          height="191"
                          alt=""
                        />
                      </picture>
                    </div>
                    <div className="thumbnail-preview__inner">
                      <h3 className="thumbnail-preview__title">crossfit</h3>
                      <div className="thumbnail-preview__button-wrapper">
                        <a
                          className="btn btn--small thumbnail-preview__button"
                          href="#"
                        >
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="special-for-you__item">
                  <div className="thumbnail-preview">
                    <div className="thumbnail-preview__image">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="img/content/thumbnails/preview-02.webp, img/content/thumbnails/preview-02@2x.webp 2x"
                        />
                        <img
                          src="img/content/thumbnails/preview-02.jpg"
                          srcSet="img/content/thumbnails/preview-02@2x.jpg 2x"
                          width="452"
                          height="191"
                          alt=""
                        />
                      </picture>
                    </div>
                    <div className="thumbnail-preview__inner">
                      <h3 className="thumbnail-preview__title">power</h3>
                      <div className="thumbnail-preview__button-wrapper">
                        <a
                          className="btn btn--small thumbnail-preview__button"
                          href="#"
                        >
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="special-for-you__item">
                  <div className="thumbnail-preview">
                    <div className="thumbnail-preview__image">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="img/content/thumbnails/preview-01.webp, img/content/thumbnails/preview-01@2x.webp 2x"
                        />
                        <img
                          src="img/content/thumbnails/preview-01.jpg"
                          srcSet="img/content/thumbnails/preview-01@2x.jpg 2x"
                          width="452"
                          height="191"
                          alt=""
                        />
                      </picture>
                    </div>
                    <div className="thumbnail-preview__inner">
                      <h3 className="thumbnail-preview__title">boxing</h3>
                      <div className="thumbnail-preview__button-wrapper">
                        <a
                          className="btn btn--small thumbnail-preview__button"
                          href="#"
                        >
                          Подробнее
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="special-offers">
          <div className="container">
            <div className="special-offers__wrapper">
              <h2 className="visually-hidden">Специальные предложения</h2>
              <ul className="special-offers__list">
                <li className="special-offers__item is-active">
                  <aside className="promo-slider">
                    <div className="promo-slider__overlay"></div>
                    <div className="promo-slider__image">
                      <img
                        src="img/content/promo-1.png"
                        srcSet="img/content/promo-1@2x.png 2x"
                        width="1040"
                        height="469"
                        alt="promo-photo"
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
                      <div className="promo-slider__slider-dots">
                        <button
                          className="promo-slider__slider-dot--active promo-slider__slider-dot"
                          aria-label="первый слайд"
                        ></button>
                        <button
                          className="promo-slider__slider-dot"
                          aria-label="второй слайд"
                        ></button>
                        <button
                          className="promo-slider__slider-dot"
                          aria-label="третий слайд"
                        ></button>
                      </div>
                      <div className="promo-slider__price-container">
                        <p className="promo-slider__price">1600 ₽</p>
                        <p className="promo-slider__sup">за занятие</p>
                        <p className="promo-slider__old-price">2000 ₽</p>
                      </div>
                    </div>
                  </aside>
                </li>
                <li className="special-offers__item">
                  <aside className="promo-slider">
                    <div className="promo-slider__overlay"></div>
                    <div className="promo-slider__image">
                      <img
                        src="img/content/promo-2.png"
                        srcSet="img/content/promo-2@2x.png 2x"
                        width="1040"
                        height="469"
                        alt="promo-photo"
                      />
                    </div>
                    <div className="promo-slider__header">
                      <h3 className="promo-slider__title">Fleksbend</h3>
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
                      Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для
                      фитнеса
                    </span>
                    <div className="promo-slider__bottom-container">
                      <div className="promo-slider__slider-dots">
                        <button
                          className="promo-slider__slider-dot"
                          aria-label="первый слайд"
                        ></button>
                        <button
                          className="promo-slider__slider-dot--active promo-slider__slider-dot"
                          aria-label="второй слайд"
                        ></button>
                        <button
                          className="promo-slider__slider-dot"
                          aria-label="третий слайд"
                        ></button>
                      </div>
                      <div className="promo-slider__price-container">
                        <p className="promo-slider__price">2400 ₽</p>
                        <p className="promo-slider__sup">за занятие</p>
                        <p className="promo-slider__old-price">2800 ₽</p>
                      </div>
                    </div>
                  </aside>
                </li>
                <li className="special-offers__item">
                  <aside className="promo-slider">
                    <div className="promo-slider__overlay"></div>
                    <div className="promo-slider__image">
                      <img
                        src="img/content/promo-3.png"
                        srcSet="img/content/promo-3@2x.png 2x"
                        width="1040"
                        height="469"
                        alt="promo-photo"
                      />
                    </div>
                    <div className="promo-slider__header">
                      <h3 className="promo-slider__title">Full Body Stretch</h3>
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
                      Горячие предложения на&nbsp;Комплекс упражнений
                      на&nbsp;растяжку всего тела для новичков
                    </span>
                    <div className="promo-slider__bottom-container">
                      <div className="promo-slider__slider-dots">
                        <button
                          className="promo-slider__slider-dot"
                          aria-label="первый слайд"
                        ></button>
                        <button
                          className="promo-slider__slider-dot"
                          aria-label="второй слайд"
                        ></button>
                        <button
                          className="promo-slider__slider-dot--active promo-slider__slider-dot"
                          aria-label="третий слайд"
                        ></button>
                      </div>
                      <div className="promo-slider__price-container">
                        <p className="promo-slider__price">1800 ₽</p>
                        <p className="promo-slider__sup">за занятие</p>
                        <p className="promo-slider__old-price">2200 ₽</p>
                      </div>
                    </div>
                  </aside>
                </li>
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
                  <a
                    className="btn btn--small thumbnail-spec-gym__button"
                    href="#"
                  >
                    Подробнее
                  </a>
                  <a
                    className="btn btn--small btn--outlined thumbnail-spec-gym__button"
                    href="#"
                  >
                    Все залы
                  </a>
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
                <li className="popular-trainings__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="img/content/thumbnails/training-06.webp, img/content/thumbnails/training-06@2x.webp 2x"
                          />
                          <img
                            src="img/content/thumbnails/training-06.jpg"
                            srcSet="img/content/thumbnails/training-06@2x.jpg 2x"
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
                          выносливость и&nbsp;откройте для себя все секреты
                          длительных пробежек.
                        </p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <a
                          className="btn btn--small thumbnail-training__button-catalog"
                          href="#"
                        >
                          Подробнее
                        </a>
                        <a
                          className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                          href="#"
                        >
                          Отзывы
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="popular-trainings__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="img/content/thumbnails/training-07.webp, img/content/thumbnails/training-07@2x.webp 2x"
                          />
                          <img
                            src="img/content/thumbnails/training-07.jpg"
                            srcSet="img/content/thumbnails/training-07@2x.jpg 2x"
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
                      <h3 className="thumbnail-training__title">fitball</h3>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#пилатес</span>
                            </div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#200ккал</span>
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
                          Тренировка на&nbsp;фитболе&nbsp;&mdash; отличном
                          тренажере для развития чувства баланса
                          и&nbsp;равновесия, улучшения координации.
                        </p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <a
                          className="btn btn--small thumbnail-training__button-catalog"
                          href="#"
                        >
                          Подробнее
                        </a>
                        <a
                          className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                          href="#"
                        >
                          Отзывы
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="popular-trainings__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="img/content/thumbnails/training-11.webp, img/content/thumbnails/training-11@2x.webp 2x"
                          />
                          <img
                            src="img/content/thumbnails/training-11.jpg"
                            srcSet="img/content/thumbnails/training-11@2x.jpg 2x"
                            width="330"
                            height="190"
                            alt=""
                          />
                        </picture>
                      </div>
                      <p className="thumbnail-training__price">
                        <span className="thumbnail-training__price-value">
                          2200
                        </span>
                        <span>₽</span>
                      </p>
                      <h3 className="thumbnail-training__title">
                        devil's cindy
                      </h3>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#кроссфит</span>
                            </div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#950ккал</span>
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
                          Знаменитый кроссфит комплекс. Синди&nbsp;&mdash;
                          универсальная тренировка для развития функциональной
                          силы.
                        </p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <a
                          className="btn btn--small thumbnail-training__button-catalog"
                          href="#"
                        >
                          Подробнее
                        </a>
                        <a
                          className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                          href="#"
                        >
                          Отзывы
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="popular-trainings__item">
                  <div className="thumbnail-training">
                    <div className="thumbnail-training__inner">
                      <div className="thumbnail-training__image">
                        <picture>
                          <source
                            type="image/webp"
                            srcSet="img/content/thumbnails/training-09.webp, img/content/thumbnails/training-09@2x.webp 2x"
                          />
                          <img
                            src="img/content/thumbnails/training-09.jpg"
                            srcSet="img/content/thumbnails/training-09@2x.jpg 2x"
                            width="330"
                            height="190"
                            alt=""
                          />
                        </picture>
                      </div>
                      <p className="thumbnail-training__price">
                        <span className="thumbnail-training__price-value">
                          1800
                        </span>
                        <span>₽</span>
                      </p>
                      <h3 className="thumbnail-training__title">
                        full body stretch
                      </h3>
                      <div className="thumbnail-training__info">
                        <ul className="thumbnail-training__hashtags-list">
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#стретчинг</span>
                            </div>
                          </li>
                          <li className="thumbnail-training__hashtags-item">
                            <div className="hashtag thumbnail-training__hashtag">
                              <span>#400ккал</span>
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
                          Комплекс упражнений на&nbsp;растяжку всего тела для
                          новичков. Плавное погружение в&nbsp;стретчинг
                          и&nbsp;умеренная нагрузка.
                        </p>
                      </div>
                      <div className="thumbnail-training__button-wrapper">
                        <a
                          className="btn btn--small thumbnail-training__button-catalog"
                          href="#"
                        >
                          Подробнее
                        </a>
                        <a
                          className="btn btn--small btn--outlined thumbnail-training__button-catalog"
                          href="#"
                        >
                          Отзывы
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
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
                    <a
                      className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                      href="#"
                    >
                      Подробнее
                    </a>
                  </div>
                </li>
                <li className="look-for-company__item">
                  <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div className="thumbnail-user__image">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="img/content/thumbnails/user-05.webp, img/content/thumbnails/user-05@2x.webp 2x"
                        />
                        <img
                          src="img/content/thumbnails/user-05.jpg"
                          srcSet="img/content/thumbnails/user-05@2x.jpg 2x"
                          width="82"
                          height="82"
                          alt=""
                        />
                      </picture>
                    </div>
                    <div className="thumbnail-user__header">
                      <h3 className="thumbnail-user__name">Константин</h3>
                      <div className="thumbnail-user__location">
                        <svg
                          width="14"
                          height="16"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-user__location-address">
                          Комендантский проспект
                        </address>
                      </div>
                    </div>
                    <ul className="thumbnail-user__hashtags-list">
                      <li className="thumbnail-user__hashtags-item">
                        <div className="hashtag thumbnail-user__hashtag">
                          <span>#силовые</span>
                        </div>
                      </li>
                    </ul>
                    <a
                      className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                      href="#"
                    >
                      Подробнее
                    </a>
                  </div>
                </li>
                <li className="look-for-company__item">
                  <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div className="thumbnail-user__image">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="img/content/thumbnails/user-06.webp, img/content/thumbnails/user-06@2x.webp 2x"
                        />
                        <img
                          src="img/content/thumbnails/user-06.jpg"
                          srcSet="img/content/thumbnails/user-06@2x.jpg 2x"
                          width="82"
                          height="82"
                          alt=""
                        />
                      </picture>
                    </div>
                    <div className="thumbnail-user__header">
                      <h3 className="thumbnail-user__name">Иван</h3>
                      <div className="thumbnail-user__location">
                        <svg
                          width="14"
                          height="16"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-user__location-address">
                          Чёрная речка
                        </address>
                      </div>
                    </div>
                    <ul className="thumbnail-user__hashtags-list">
                      <li className="thumbnail-user__hashtags-item">
                        <div className="hashtag thumbnail-user__hashtag">
                          <span>#бег</span>
                        </div>
                      </li>
                    </ul>
                    <a
                      className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                      href="#"
                    >
                      Подробнее
                    </a>
                  </div>
                </li>
                <li className="look-for-company__item">
                  <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
                    <div className="thumbnail-user__image">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="img/content/thumbnails/user-07.webp, img/content/thumbnails/user-07@2x.webp 2x"
                        />
                        <img
                          src="img/content/thumbnails/user-07.jpg"
                          srcSet="img/content/thumbnails/user-07@2x.jpg 2x"
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
                      <h3 className="thumbnail-user__name">Яна</h3>
                      <div className="thumbnail-user__location">
                        <svg
                          width="14"
                          height="16"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <address className="thumbnail-user__location-address">
                          Крестовский остров
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
                    <a
                      className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button"
                      href="#"
                    >
                      Подробнее
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
