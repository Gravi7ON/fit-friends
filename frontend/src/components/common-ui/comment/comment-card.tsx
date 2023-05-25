import { memo } from 'react';

type CommentCardProps = {
  name?: string;
  commentText: string;
  rating: number;
};

export default memo(function CommentCard({
  commentText,
  name = 'Unknown',
  rating,
}: CommentCardProps): JSX.Element {
  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/avatars/users//photo-1.webp, img/content/avatars/users//photo-1@2x.webp 2x"
              />
              <img
                src="img/content/avatars/users//photo-1.png"
                srcSet="img/content/avatars/users//photo-1@2x.png 2x"
                width="64"
                height="64"
                alt="Изображение пользователя"
              />
            </picture>
          </div>
          <span className="review__user-name">{name}</span>
          <div className="review__rating">
            <svg
              width="16"
              height="16"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-star"></use>
            </svg>
            <span>{rating}</span>
          </div>
        </div>
        <p className="review__comment">{commentText}</p>
      </div>
    </li>
  );
});
