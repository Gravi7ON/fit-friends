import { AxiosError, AxiosResponse } from 'axios';
import { memo, useState } from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { SHOW_ERROR_TIME } from 'src/components/constant-components';
import { APIRoute } from 'src/constant';
import { RESTService, createAppApi } from 'src/services/app.api';
import { ErrorResponse } from 'src/types/error-response';

type CoachFriendCardProps = {
  name: string;
  location: string;
  specializations: string[];
  isReadyTraining: boolean;
  personalRequest:
    | {
        fromUserId: string;
        toUserId: string;
        requestStatus: string;
        id: string;
      }
    | undefined;
};

export default memo(function CoachFriendCard({
  name,
  location,
  specializations,
  isReadyTraining,
  personalRequest,
}: CoachFriendCardProps): JSX.Element {
  const [isSendResolveToServer, setIsSendResolveToServer] = useState(false);
  const [isResolveServerError, setIsResolveServerError] = useState<
    string | null
  >(null);
  const [isSendRejectToServer, setIsSendRejectToServer] = useState(false);
  const [isRejectServerError, setIsRejectServerError] = useState<string | null>(
    null
  );
  const [isSuccessSendServer, setIsSuccessSendServer] = useState(false);

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
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
        {personalRequest && !isSuccessSendServer && (
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">
              Запрос на&nbsp;персональную тренировку
            </p>
            <div className="thumbnail-friend__button-wrapper">
              <button
                className={
                  isResolveServerError
                    ? 'btn btn--medium btn--dark-bg thumbnail-friend__button resolve-button'
                    : 'btn btn--medium btn--dark-bg thumbnail-friend__button'
                }
                type="button"
                disabled={isSendResolveToServer || isSendRejectToServer}
                onClick={async () => {
                  try {
                    setIsSendResolveToServer(true);
                    const api = createAppApi(RESTService.Users);
                    await api.patch(APIRoute.PersonalTrainingRequests, {
                      requestId: personalRequest.id,
                      requestStatus: 'принят',
                    });
                    setIsSendResolveToServer(false);
                    setIsSuccessSendServer(true);
                    setIsResolveServerError(null);
                  } catch (err) {
                    const error = err as AxiosError;
                    const errorResponse =
                      error?.response as AxiosResponse<ErrorResponse>;

                    if (errorResponse) {
                      setIsResolveServerError(errorResponse.data.message);
                    }

                    if (!errorResponse) {
                      setIsResolveServerError(error.message);
                    }

                    setIsSendResolveToServer(false);

                    setTimeout(
                      () => setIsResolveServerError(null),
                      SHOW_ERROR_TIME
                    );
                  }
                }}
              >
                {isSendResolveToServer ? <Spinner /> : 'Принять'}
              </button>
              <button
                className={
                  isRejectServerError
                    ? 'btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button reject-button'
                    : 'btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button'
                }
                type="button"
                disabled={isSendRejectToServer || isSendResolveToServer}
                onClick={async () => {
                  try {
                    setIsSendRejectToServer(true);
                    const api = createAppApi(RESTService.Users);
                    await api.patch(APIRoute.PersonalTrainingRequests, {
                      requestId: personalRequest.id,
                      requestStatus: 'отклонен',
                    });
                    setIsSendRejectToServer(false);
                    setIsSuccessSendServer(true);
                    setIsRejectServerError(null);
                  } catch (err) {
                    const error = err as AxiosError;
                    const errorResponse =
                      error?.response as AxiosResponse<ErrorResponse>;

                    if (errorResponse) {
                      setIsRejectServerError(errorResponse.data.message);
                    }

                    if (!errorResponse) {
                      setIsRejectServerError(error.message);
                    }

                    setIsSendRejectToServer(false);

                    setTimeout(
                      () => setIsRejectServerError(null),
                      SHOW_ERROR_TIME
                    );
                  }
                }}
              >
                {isSendRejectToServer ? <Spinner /> : 'Отклонить'}
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
});
