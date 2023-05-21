import { useNavigate } from 'react-router-dom';
import UsersCatalogueFilterForm from './users-catalogue-filter-form/user-catalogue-filter.form';
import { createContext, useState } from 'react';
import { getObjectWithKeysFromList } from 'src/utils/helpers';
import {
  LEVELS,
  LOCATIONS,
  SORT_ROLE,
  SPECIALIZATIONS,
} from '../constant-components';
import UsersCatalogueList from './users-catalogue-list/users-catalogue-list';

export type FilterFormValue = {
  specialization: Record<string, boolean>;
  location: Record<string, boolean>;
  experience: Record<string, boolean>;
  sort: Record<string, boolean>;
};

export type ContextFilterForm = {
  filterFormState: FilterFormValue;
  setFilterFormState: React.Dispatch<React.SetStateAction<FilterFormValue>>;
} | null;

export const REPLACED_LOCATIONS = LOCATIONS.map((location) =>
  location.replace('ст. м. ', '')
);

const FILTER_DEFAULT_VALUE = {
  location: getObjectWithKeysFromList(REPLACED_LOCATIONS),
  experience: getObjectWithKeysFromList(LEVELS),
  specialization: getObjectWithKeysFromList(SPECIALIZATIONS),
  sort: getObjectWithKeysFromList(SORT_ROLE),
};

export const CurrentFilterContext = createContext<ContextFilterForm>(null);

export default function UsersCatalogue(): JSX.Element {
  const navigate = useNavigate();

  const [filterFormState, setFilterFormState] =
    useState<FilterFormValue>(FILTER_DEFAULT_VALUE);

  return (
    <CurrentFilterContext.Provider
      value={{
        filterFormState,
        setFilterFormState,
      }}
    >
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
                <div className="show-more users-catalog__show-more">
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                  >
                    Показать еще
                  </button>
                  <button
                    className="btn show-more__button show-more__button--to-top"
                    type="button"
                  >
                    Вернуться в начало
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CurrentFilterContext.Provider>
  );
}
