export default function CoachCertificates(): JSX.Element {
  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
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
  );
}
