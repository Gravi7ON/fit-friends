import { useState } from 'react';

export default function CoachCertificateCard({
  cetificateNumber,
}: {
  cetificateNumber: number;
}): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card certificate-card--edit">
        <div className="certificate-card__image">
          <picture>
            <source
              type="image/webp"
              srcSet={`img/content/certificates-and-diplomas/certificate-${cetificateNumber}.webp, img/content/certificates-and-diplomas/certificate-${cetificateNumber}@2x.webp 2x`}
            />
            <img
              src={`img/content/certificates-and-diplomas/certificate-${cetificateNumber}.jpg`}
              srcSet={`img/content/certificates-and-diplomas/certificate-${cetificateNumber}@2x.jpg 2x"`}
              width="294"
              height="360"
              alt="Сертификат - Биомеханика ударов в боксе"
            />
          </picture>
        </div>
        <div className="certificate-card__buttons">
          <button
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
            type="button"
            onClick={() => setIsEdit((prev) => !prev)}
          >
            <svg
              width="12"
              height="12"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>{isEdit ? 'Сохранить' : 'Изменить'}</span>
          </button>
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
          {isEdit && (
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
          )}
        </div>
      </div>
    </li>
  );
}
