import { useNavigate } from 'react-router-dom';
import CoachTrainingFilterForm from './coach-trainings-filter-form/coach-trainings-filter-form';
import CoachTrainingList from './coach-trainings-list/coach-training-list';
import './coach-account-training.css';

export default function CoachAccountTrainings(): JSX.Element {
  const navigate = useNavigate();

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Мои тренировки</h1>
          <div className="my-training-form">
            <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
            <div className="my-training-form__wrapper">
              <button
                className="btn-flat btn-flat--underlined my-training-form__btnback"
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
              <h3 className="my-training-form__title">фильтры</h3>
              <CoachTrainingFilterForm />
            </div>
          </div>
          <div className="inner-page__content">
            <CoachTrainingList />
          </div>
        </div>
      </div>
    </section>
  );
}
