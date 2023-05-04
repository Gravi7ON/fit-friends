import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from 'src/constant';

export default function Intro(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
      <main>
        <div className="intro">
          <div className="intro__background">
            <picture>
              <source
                type="image/webp"
                srcSet="img/content/sitemap//background.webp, img/content/sitemap//background@2x.webp 2x"
              />
              <img
                src="img/content/sitemap//background.jpg"
                srcSet="img/content/sitemap//background@2x.jpg 2x"
                width="1440"
                height="1024"
                alt="Фон с бегущей девушкой"
              />
            </picture>
          </div>
          <div className="intro__wrapper">
            <svg
              className="intro__icon"
              width="60"
              height="60"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-logotype"></use>
            </svg>
            <div className="intro__title-logo">
              <picture>
                <source
                  type="image/webp"
                  srcSet="img/content/sitemap//title-logo.webp, img/content/sitemap//title-logo@2x.webp 2x"
                />
                <img
                  src="img/content/sitemap//title-logo.png"
                  srcSet="img/content/sitemap//title-logo@2x.png 2x"
                  width="934"
                  height="455"
                  alt="Логотип Fit Friends"
                />
              </picture>
            </div>
            <div className="intro__buttons">
              <button
                className="btn intro__button"
                type="button"
                onClick={() => navigate(AppRoute.SignUp)}
              >
                Регистрация
              </button>
              <p className="intro__text">
                Есть аккаунт?{' '}
                <Link
                  className="intro__link"
                  to={AppRoute.SignIn}
                >
                  Вход
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
