import { memo } from 'react';
import { PersonalRequestTraining } from 'src/types/personal-request-training';
import { UserRole } from 'src/types/user';

type CustomerFriendCardProps = {
  name: string;
  location: string;
  specializations: string[];
  isReadyTraining: boolean;
  role: string;
  personalRequestToCoach?: PersonalRequestTraining | undefined;
};

export default memo(function CustomerFriendCard({
  name,
  location,
  specializations,
  isReadyTraining,
  role,
  personalRequestToCoach = undefined,
}: CustomerFriendCardProps): JSX.Element {
  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div
          className={`thumbnail-friend__info ${
            role === UserRole.Customer
              ? 'thumbnail-friend__info--theme-light'
              : 'thumbnail-friend__info--theme-dark'
          }`}
        >
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/thumbnails/friend-14.webp, img/content/thumbnails/friend-14@2x.webp 2x"
                />
                <img
                  src="img/content/thumbnails/friend-14.jpg"
                  srcSet="img/content/thumbnails/friend-14@2x.jpg 2x"
                  width="78"
                  height="78"
                  alt=""
                />
              </picture>
              <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{name}</h2>
            <div className="thumbnail-friend__location">
              <svg
                width="14"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">
                {`ст. м. ${location}`}
              </address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {specializations.map((specialization) => (
              <li key={specialization}>
                <div className="hashtag thumbnail-friend__hashtag">
                  <span>#{specialization}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div
              className={`thumbnail-friend__ready-status ${
                isReadyTraining
                  ? 'thumbnail-friend__ready-status--is-ready'
                  : 'thumbnail-friend__ready-status--is-not-ready'
              }`}
            >
              <span>Готов к&nbsp;тренировке</span>
            </div>
          </div>
        </div>
        {role === UserRole.Coach && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
            <p className="thumbnail-friend__request-text">
              Запрос на&nbsp;персональную тренировку{' '}
              {personalRequestToCoach?.requestStatus}
            </p>
          </div>
        )}
      </div>
    </li>
  );
});
