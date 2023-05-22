import { useNavigate } from 'react-router-dom';
import GymsCatalogueFilterForm from './gyms-catalogue-filter-form/gyms-catalogue-filter-form';
import GymsCatalogueList from './gyms-catalogue-list/gyms-catalogue-list';

export default function GymsCatalogue(): JSX.Element {
  const navigate = useNavigate();

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог залов</h1>
          <div className="gym-hall-form">
            <h2 className="visually-hidden">Каталог залов фильтр</h2>
            <div className="gym-hall-form__wrapper">
              <button
                className="btn-flat btn-flat--underlined gym-hall-form__btnback"
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
              <h3 className="gym-hall-form__title">Фильтры</h3>
              <GymsCatalogueFilterForm />
            </div>
          </div>
          <div className="gyms-catalog">
            <GymsCatalogueList />
          </div>
        </div>
      </div>
    </section>
  );
}
