import { useNavigate } from 'react-router-dom';
import UsersCatalogueFilterForm from './users-catalogue-filter-form/user-catalogue-filter.form';
import UsersCatalogueList from './users-catalogue-list/users-catalogue-list';

export default function UsersCatalogue(): JSX.Element {
  const navigate = useNavigate();

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог пользователей</h1>
          <div className="user-catalog-form">
            <h2 className="visually-hidden">Каталог пользователя</h2>
            <div className="user-catalog-form__wrapper">
              <button
                className="btn-flat btn-flat--underlined user-catalog-form__btnback"
                type="button"
                onClick={() => navigate(-1)}
              >
                <svg
                  width="14"
                  height="10"
                  aria-hidden="true"
                >
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <h3 className="user-catalog-form__title">Фильтры</h3>
              <UsersCatalogueFilterForm />
            </div>
          </div>
          <div className="inner-page__content">
            <div className="users-catalog">
              <UsersCatalogueList />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
