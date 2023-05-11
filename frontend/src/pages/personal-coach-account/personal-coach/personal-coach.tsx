import { Link } from 'react-router-dom';

export default function PersonalCoach(): JSX.Element {
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
                <a
                  className="main-nav__link is-active"
                  href="#"
                  aria-label="На главную"
                >
                  <svg
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-home"></use>
                  </svg>
                </a>
              </li>
              <li className="main-nav__item">
                <a
                  className="main-nav__link"
                  href="#"
                  aria-label="Личный кабинет"
                >
                  <svg
                    width="16"
                    height="18"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-user"></use>
                  </svg>
                </a>
              </li>
              <li className="main-nav__item">
                <a
                  className="main-nav__link"
                  href="#"
                  aria-label="Друзья"
                >
                  <svg
                    width="22"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-friends"></use>
                  </svg>
                </a>
              </li>
              <li className="main-nav__item main-nav__item--notifications">
                <a
                  className="main-nav__link"
                  href="#"
                  aria-label="Уведомления"
                >
                  <svg
                    width="14"
                    height="18"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-notification"></use>
                  </svg>
                </a>
                <div className="main-nav__dropdown">
                  <p className="main-nav__label">Оповещения</p>
                  <ul className="main-nav__sublist">
                    <li className="main-nav__subitem">
                      <a
                        className="notification is-active"
                        href="#"
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
                      </a>
                    </li>
                    <li className="main-nav__subitem">
                      <a
                        className="notification is-active"
                        href="#"
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
                      </a>
                    </li>
                    <li className="main-nav__subitem">
                      <a
                        className="notification is-active"
                        href="#"
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
                      </a>
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
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div className="user-info-edit__header">
                  <div className="input-load-avatar">
                    <label>
                      <input
                        className="visually-hidden"
                        type="file"
                        name="user-photo-1"
                        accept="image/png, image/jpeg"
                      />
                      <span className="input-load-avatar__avatar">
                        <img
                          src="img/content/user-photo-1.png"
                          srcSet="img/content/user-photo-1@2x.png 2x"
                          width="98"
                          height="98"
                          alt="user photo"
                        />
                      </span>
                    </label>
                  </div>
                  <div className="user-info-edit__controls">
                    <button
                      className="user-info-edit__control-btn"
                      aria-label="обновить"
                    >
                      <svg
                        width="16"
                        height="16"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-change"></use>
                      </svg>
                    </button>
                    <button
                      className="user-info-edit__control-btn"
                      aria-label="удалить"
                    >
                      <svg
                        width="14"
                        height="16"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <form
                  className="user-info-edit__form"
                  action="#"
                  method="post"
                >
                  <button
                    className="btn-flat btn-flat--underlined user-info-edit__save-button"
                    type="submit"
                    aria-label="Сохранить"
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
                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title">Обо мне</h2>
                    <div className="custom-input user-info-edit__input">
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="text"
                            name="name"
                            value="Валерия"
                          />
                        </span>
                      </label>
                    </div>
                    <div className="custom-textarea user-info-edit__textarea">
                      <label>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea
                          name="description"
                          placeholder=" "
                        >
                          Персональный тренер и инструктор групповых программ с
                          опытом более 4х лет. Специализация: коррекция фигуры и
                          осанки, снижение веса, восстановление после травм,
                          пилатес.
                        </textarea>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section user-info-edit__section--status">
                    <h2 className="user-info-edit__title user-info-edit__title--status">
                      Статус
                    </h2>
                    <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
                      <label>
                        <input
                          type="checkbox"
                          name="ready-for-training"
                          checked
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
                          Готов тренировать
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title user-info-edit__title--specialization">
                      Специализация
                    </h2>
                    <div className="specialization-checkbox user-info-edit__specialization">
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value="yoga"
                            checked
                          />
                          <span className="btn-checkbox__btn">Йога</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value="running"
                          />
                          <span className="btn-checkbox__btn">Бег</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value="aerobics"
                            checked
                          />
                          <span className="btn-checkbox__btn">Аэробика</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value="boxing"
                          />
                          <span className="btn-checkbox__btn">Бокс</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value="power"
                          />
                          <span className="btn-checkbox__btn">Силовые</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value="pilates"
                            checked
                          />
                          <span className="btn-checkbox__btn">Пилатес</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value="stretching"
                            checked
                          />
                          <span className="btn-checkbox__btn">Стрейчинг</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input
                            className="visually-hidden"
                            type="checkbox"
                            name="specialization"
                            value="crossfit"
                          />
                          <span className="btn-checkbox__btn">Кроссфит</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Локация</span>
                    <div className="custom-select__placeholder">
                      ст. м. Адмиралтейская
                    </div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                    >
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg
                          width="15"
                          height="6"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul
                      className="custom-select__list"
                      role="listbox"
                    ></ul>
                  </div>
                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Пол</span>
                    <div className="custom-select__placeholder">Женский</div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                    >
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg
                          width="15"
                          height="6"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul
                      className="custom-select__list"
                      role="listbox"
                    ></ul>
                  </div>
                  <div className="custom-select user-info-edit__select">
                    <span className="custom-select__label">Уровень</span>
                    <div className="custom-select__placeholder">
                      Профессионал
                    </div>
                    <button
                      className="custom-select__button"
                      type="button"
                      aria-label="Выберите одну из опций"
                    >
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg
                          width="15"
                          height="6"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul
                      className="custom-select__list"
                      role="listbox"
                    ></ul>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <a
                      className="thumbnail-link thumbnail-link--theme-light"
                      href="#"
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg
                          width="30"
                          height="26"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Мои тренировки
                      </span>
                    </a>
                    <a
                      className="thumbnail-link thumbnail-link--theme-light"
                      href="#"
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg
                          width="30"
                          height="26"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Создать тренировку
                      </span>
                    </a>
                    <a
                      className="thumbnail-link thumbnail-link--theme-light"
                      href="#"
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg
                          width="30"
                          height="26"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </a>
                    <a
                      className="thumbnail-link thumbnail-link--theme-light"
                      href="#"
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg
                          width="30"
                          height="26"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </a>
                    <div className="personal-account-coach__calendar"></div>
                  </div>
                  <div className="personal-account-coach__additional-info">
                    <div className="personal-account-coach__label-wrapper">
                      <h2 className="personal-account-coach__label">
                        Дипломы и сертификаты
                      </h2>
                      <button
                        className="btn-flat btn-flat--underlined personal-account-coach__button"
                        type="button"
                      >
                        <svg
                          width="14"
                          height="14"
                          aria-hidden="true"
                        >
                          <use xlinkHref="#icon-import"></use>
                        </svg>
                        <span>Загрузить</span>
                      </button>
                      <div className="personal-account-coach__controls">
                        <button
                          className="btn-icon personal-account-coach__control"
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
                          className="btn-icon personal-account-coach__control"
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
                    <ul className="personal-account-coach__list">
                      <li className="personal-account-coach__item">
                        <div className="certificate-card certificate-card--edit">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x"
                              />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-1.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат - Биомеханика ударов в боксе"
                              />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button"
                            >
                              <svg
                                width="12"
                                height="12"
                                aria-hidden="true"
                              >
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button"
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
                            <div className="certificate-card__controls">
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="14"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-2.webp, img/content/certificates-and-diplomas/certificate-2@2x.webp 2x"
                              />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-2.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий"
                              />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button"
                            >
                              <svg
                                width="12"
                                height="12"
                                aria-hidden="true"
                              >
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button"
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
                            <div className="certificate-card__controls">
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="14"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-3.webp, img/content/certificates-and-diplomas/certificate-3@2x.webp 2x"
                              />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-3.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертифиционный курс по кроссфиту 2-го уровня"
                              />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button"
                            >
                              <svg
                                width="12"
                                height="12"
                                aria-hidden="true"
                              >
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button"
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
                            <div className="certificate-card__controls">
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="14"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-4.webp, img/content/certificates-and-diplomas/certificate-4@2x.webp 2x"
                              />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-4.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-4@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат инструкторов йоги"
                              />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button"
                            >
                              <svg
                                width="12"
                                height="12"
                                aria-hidden="true"
                              >
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button"
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
                            <div className="certificate-card__controls">
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="14"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-5.webp, img/content/certificates-and-diplomas/certificate-5@2x.webp 2x"
                              />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-5.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-5@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат фитне аэробики"
                              />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button"
                            >
                              <svg
                                width="12"
                                height="12"
                                aria-hidden="true"
                              >
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button"
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
                            <div className="certificate-card__controls">
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="14"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet="img/content/certificates-and-diplomas/certificate-6.webp, img/content/certificates-and-diplomas/certificate-6@2x.webp 2x"
                              />
                              <img
                                src="img/content/certificates-and-diplomas/certificate-6.jpg"
                                srcSet="img/content/certificates-and-diplomas/certificate-6@2x.jpg 2x"
                                width="294"
                                height="360"
                                alt="Сертификат фитне аэробики"
                              />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button"
                            >
                              <svg
                                width="12"
                                height="12"
                                aria-hidden="true"
                              >
                                <use xlinkHref="#icon-edit"></use>
                              </svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button"
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
                            <div className="certificate-card__controls">
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-change"></use>
                                </svg>
                              </button>
                              <button
                                className="btn-icon certificate-card__control"
                                type="button"
                                aria-label="next"
                              >
                                <svg
                                  width="14"
                                  height="16"
                                  aria-hidden="true"
                                >
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
