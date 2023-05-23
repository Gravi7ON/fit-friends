import { useNavigate } from 'react-router-dom';
import WorkoutsCatalogueFilterForm from './workouts-catalogue-filter-form/workouts-catalogue-filter.form';
import WorkoutsCatalogueList from './workouts-catalogue-list/workouts-catalogue-list';

export default function WorkoutsCatalogue(): JSX.Element {
  const navigate = useNavigate();

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Каталог тренировок</h1>
          <div className="gym-catalog-form">
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className="gym-catalog-form__wrapper">
              <button
                className="btn-flat btn-flat--underlined gym-catalog-form__btnback"
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
              <h3 className="gym-catalog-form__title">Фильтры</h3>
              <WorkoutsCatalogueFilterForm />
            </div>
          </div>
          <div className="training-catalog">
            <WorkoutsCatalogueList />
          </div>
        </div>
      </div>
    </section>
  );
}
