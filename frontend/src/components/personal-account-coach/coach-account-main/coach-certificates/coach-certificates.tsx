import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useState } from 'react';
import SwiperCore, { Keyboard } from 'swiper';
import CoachCertificateCard from '../coach-certificate-card/coach-certificate-carf';
import 'swiper/css';

export default function CoachCertificates(): JSX.Element {
  const swiperRef = useRef<SwiperCore>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

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
            disabled={isBeginning}
            onClick={() => swiperRef.current?.slidePrev()}
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
            disabled={isEnd}
            onClick={() => swiperRef.current?.slideNext()}
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
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          keyboard={true}
          modules={[Keyboard]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {Array(6)
            .fill(0)
            .map((_item, index) => (
              <SwiperSlide key={index}>
                <CoachCertificateCard
                  key={index}
                  cetificateNumber={++index}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </ul>
    </div>
  );
}
