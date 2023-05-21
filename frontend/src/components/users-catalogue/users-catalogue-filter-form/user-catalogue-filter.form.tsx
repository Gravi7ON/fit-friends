import { ChangeEvent, useContext, useState } from 'react';
import {
  ContextFilterForm,
  CurrentFilterContext,
  FilterFormValue,
  REPLACED_LOCATIONS,
} from '../users-catalogue';
import { SPECIALIZATIONS } from 'src/components/constant-components';
import { LEVELS } from 'src/components/constant-components';
import { SORT_ROLE } from 'src/components/constant-components';
import { debounce } from 'lodash';

const INITIAL_COUNT_CHECKBOXES = 3;

export default function UsersCatalogueFilterForm(): JSX.Element {
  const filterFormContext = useContext<ContextFilterForm>(CurrentFilterContext);
  const setFilterFormState =
    filterFormContext?.setFilterFormState as React.Dispatch<
      React.SetStateAction<FilterFormValue>
    >;

  const [countLocationCheckboxes, setCountLocationCheckboxes] = useState(
    INITIAL_COUNT_CHECKBOXES
  );

  const [countSpecializationCheckboxes, setCountSpecializationCheckboxes] =
    useState(INITIAL_COUNT_CHECKBOXES);

  const handleSpecializationChange = debounce(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setFilterFormState((prev) => ({
        ...prev,
        specialization: {
          ...prev.specialization,
          [evt.target.name]: evt.target.checked,
        },
      }));
    },
    150
  );

  const handleLocationChange = debounce(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setFilterFormState((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [evt.target.name]: evt.target.checked,
        },
      }));
    },
    150
  );

  const handleLevelChange = debounce((evt: ChangeEvent<HTMLInputElement>) => {
    setFilterFormState((prev) => ({
      ...prev,
      experience: {
        ...Object.fromEntries(
          [...Object.entries(prev.experience)].map((entry) => {
            entry.splice(1, 1, false);
            return entry;
          })
        ),
        [evt.target.value]: evt.target.checked,
      },
    }));
  }, 150);

  const handleSortChange = debounce((evt: ChangeEvent<HTMLInputElement>) => {
    setFilterFormState((prev) => ({
      ...prev,
      sort: {
        ...Object.fromEntries(
          [...Object.entries(prev.sort)].map((entry) => {
            entry.splice(1, 1, false);
            return entry;
          })
        ),
        [evt.target.value]: evt.target.checked,
      },
    }));
  }, 150);

  return (
    <form className="user-catalog-form__form">
      <div className="user-catalog-form__block user-catalog-form__block--location">
        <h4 className="user-catalog-form__block-title">
          Локация, станция метро
        </h4>
        <ul className="user-catalog-form__check-list">
          {REPLACED_LOCATIONS.slice(0, countLocationCheckboxes).map(
            (location) => (
              <li
                key={location}
                className="user-catalog-form__check-list-item"
              >
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name={location.toLowerCase()}
                      onChange={handleLocationChange}
                    />
                    <span className="custom-toggle__icon">
                      <svg
                        width="9"
                        height="6"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">{location}</span>
                  </label>
                </div>
              </li>
            )
          )}
        </ul>
        <button
          className="btn-show-more user-catalog-form__btn-show"
          type="button"
          onClick={(evt) => {
            evt.currentTarget.style.display = 'none';
            setCountLocationCheckboxes(REPLACED_LOCATIONS.length);
          }}
        >
          <span>Посмотреть все</span>
          <svg
            className="btn-show-more__icon"
            width="10"
            height="4"
            aria-hidden="true"
          >
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--spezialization">
        <h4 className="user-catalog-form__block-title">Специализация</h4>
        <ul className="user-catalog-form__check-list">
          {SPECIALIZATIONS.slice(0, countSpecializationCheckboxes).map(
            (specialization) => (
              <li
                key={specialization}
                className="user-catalog-form__check-list-item"
              >
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name={specialization.toLowerCase()}
                      onChange={handleSpecializationChange}
                    />
                    <span className="custom-toggle__icon">
                      <svg
                        width="9"
                        height="6"
                        aria-hidden="true"
                      >
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="custom-toggle__label">
                      {specialization}
                    </span>
                  </label>
                </div>
              </li>
            )
          )}
        </ul>
        <button
          className="btn-show-more user-catalog-form__btn-show"
          type="button"
          onClick={(evt) => {
            evt.currentTarget.style.display = 'none';
            setCountSpecializationCheckboxes(SPECIALIZATIONS.length);
          }}
        >
          <span>Посмотреть все</span>
          <svg
            className="btn-show-more__icon"
            width="10"
            height="4"
            aria-hidden="true"
          >
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <div className="custom-toggle-radio">
          {LEVELS.map((level) => (
            <div
              key={level}
              className="custom-toggle-radio__block"
            >
              <label>
                <input
                  type="radio"
                  name="level"
                  value={level.toLowerCase()}
                  onChange={handleLevelChange}
                />
                <span className="custom-toggle-radio__icon"></span>
                <span className="custom-toggle-radio__label">{level}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="user-catalog-form__block">
        <h3 className="user-catalog-form__title user-catalog-form__title--sort">
          Сортировка
        </h3>
        <div className="btn-radio-sort">
          {SORT_ROLE.map((role) => (
            <label key={role}>
              <input
                type="radio"
                name="sort"
                value={role.toLowerCase()}
                onChange={handleSortChange}
              />
              <span className="btn-radio-sort__label">{role}</span>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}
