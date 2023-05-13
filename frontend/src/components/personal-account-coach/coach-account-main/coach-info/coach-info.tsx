import { useEffect, useState } from 'react';
import {
  LEVELS,
  LOCATIONS,
  SEXES,
  SPECIALIZATIONS,
} from 'src/components/constant-components';
import { useAppSelector } from 'src/hooks/store.hooks';
import { RESTService, createAppApi } from 'src/services/app.api';
import { getUserId } from 'src/store/user-proccess/selectors';
import './coach-info.css';
import { Coach } from 'src/types/user';
import { SubmitHandler, useForm } from 'react-hook-form';
import CustomSelectText from './custom-selected-text';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'src/types/error-response';

type Inputs = {
  name: string;
  sex: string;
  location: string;
  about: string;
  isReadyTraining: boolean;
  specializations: string;
  level: string;
};

const enum AdditionalCustomListCssClass {
  Level = 'level',
  Sex = 'sex',
  Location = 'location',
}

export default function CoachInfo(): JSX.Element {
  console.log('+++');

  const [isEdit, setIsEdit] = useState(false);
  const [coach, setCoach] = useState<Coach | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<null | string>(null);
  const [selectedSex, setSelectedSex] = useState<null | string>(null);
  const [selectedLevel, setSelectedLevel] = useState<null | string>(null);
  const [serverError, setServerError] = useState<null | string>(null);
  const userId = useAppSelector(getUserId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const watchForm = watch();

  useEffect(() => {
    const getCoach = async () => {
      try {
        const api = createAppApi(RESTService.Users);
        const { data: coach } = await api.get(userId);
        setCoach(coach);
        setSelectedLevel(coach.experience);
        setSelectedLocation(`ст. м. ${coach.location}`);
        setSelectedSex(coach.sex);
      } catch (err) {
        const errorResponse = (err as AxiosError)
          .response as AxiosResponse<ErrorResponse>;
        setServerError(errorResponse.data.message);
      }
    };
    getCoach();
  }, [userId]);

  useEffect(() => {
    setValue('location', selectedLocation as string);
    setValue('sex', selectedSex as string);
    setValue('level', selectedLevel as string);
  }, [selectedLevel, selectedLocation, selectedSex, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => console.log(data);

  return (
    <section className={`user-info-edit ${coach ? null : 'skeleton'}`}>
      {coach ? (
        <>
          <div className="user-info-edit__header">
            <div className="input-load-avatar">
              <label>
                <input
                  className="visually-hidden"
                  type="file"
                  name="user-photo-1"
                  accept="image/png, image/jpeg"
                  disabled={!isEdit}
                />
                <span className="input-load-avatar__avatar">
                  <img
                    src="img/content/user-photo-1.png"
                    srcSet="img/content/user-photo-1@2x.png 2x"
                    width="98"
                    height="98"
                    alt="user screen"
                  />
                </span>
              </label>
            </div>
            {isEdit && (
              <div className="user-info-edit__controls">
                <button
                  className="user-info-edit__control-btn"
                  aria-label="обновить"
                  onClick={() => {
                    const form = document.querySelector(
                      '.user-info-edit__form'
                    );
                    const event = new Event('submit', {
                      bubbles: true,
                      cancelable: true,
                    });
                    form?.dispatchEvent(event);
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-change"></use>
                  </svg>
                </button>
                <button
                  className="user-info-edit__control-btn"
                  aria-label="удалить"
                >
                  <svg
                    width="14"
                    height="16"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-trash"></use>
                  </svg>
                </button>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="user-info-edit__form"
          >
            <button
              className="btn-flat btn-flat--underlined user-info-edit__save-button"
              type="submit"
              aria-label="Сохранить"
              onClick={(evt) => {
                evt.preventDefault();
                setIsEdit((prev) => !prev);
                if (isEdit) {
                  reset({
                    name: coach.name,
                    about: coach.about,
                    sex: coach.sex,
                    location: coach.location,
                    level: coach.experience,
                  });
                  setSelectedLevel(coach.experience);
                  setSelectedLocation(`ст. м. ${coach.location}`);
                  setValue('location', `ст. м. ${coach.location}`);
                  setSelectedSex(coach.sex);
                }
              }}
            >
              <svg
                width="12"
                height="12"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>{isEdit ? 'Сохранить' : 'Редактировать'}</span>
            </button>
            <div className="user-info-edit__section">
              <h2 className="user-info-edit__title">Обо мне</h2>
              <div className="custom-input user-info-edit__input">
                <label>
                  <span className="custom-input__label">Имя</span>
                  <span className="custom-input__wrapper">
                    <input
                      type="text"
                      defaultValue={coach.name}
                      readOnly={!isEdit}
                      {...register('name', {
                        required: 'name is required',
                        maxLength: {
                          value: 15,
                          message: 'максимум 15 символов',
                        },
                        pattern: {
                          value: /^[a-zа-яё\s]+$/i,
                          message: 'только буквы русского/английского алфавита',
                        },
                      })}
                      onClick={(evt) => {
                        if (!isEdit) {
                          evt.currentTarget.blur();
                        }
                      }}
                    />
                  </span>
                </label>
                {errors.name && (
                  <p className="input-update__error">{errors.name.message}</p>
                )}
              </div>
              <div className="custom-textarea user-info-edit__textarea">
                <label>
                  <span className="custom-textarea__label">Описание</span>
                  <textarea
                    readOnly={!isEdit}
                    defaultValue={coach.about}
                    {...register('about', {
                      minLength: {
                        value: 10,
                        message: 'минимум 10 символов',
                      },
                      maxLength: {
                        value: 140,
                        message: 'максимум 140 символов',
                      },
                    })}
                    onClick={(evt) => {
                      if (!isEdit) {
                        evt.currentTarget.blur();
                      }
                    }}
                  ></textarea>
                </label>
                {errors.about && (
                  <p className="input-update__error">{errors.about.message}</p>
                )}
              </div>
            </div>
            <fieldset
              disabled={!isEdit}
              style={{ margin: 0, border: 'none', padding: 0 }}
            >
              <div className="user-info-edit__section user-info-edit__section--status">
                <h2 className="user-info-edit__title user-info-edit__title--status">
                  Статус
                </h2>
                <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
                  <label>
                    <input
                      type="checkbox"
                      defaultChecked={coach.isIndividualTraining}
                      {...register('isReadyTraining')}
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
                      Готов тренировать
                    </span>
                  </label>
                </div>
              </div>
              <div
                className="user-info-edit__section"
                style={{ position: 'relative' }}
              >
                <h2 className="user-info-edit__title user-info-edit__title--specialization">
                  Специализация
                </h2>
                <div className="specialization-checkbox user-info-edit__specialization">
                  {SPECIALIZATIONS.map((specialization) => (
                    <div
                      key={specialization}
                      className="btn-checkbox"
                    >
                      <label>
                        <input
                          className="visually-hidden"
                          type="checkbox"
                          defaultChecked={coach.specializations.includes(
                            specialization.toLowerCase()
                          )}
                          value={specialization}
                          {...register('specializations', {
                            required: 'specialization is required',
                            validate: (value) =>
                              value.length <= 3 || 'Только три одновременно',
                          })}
                        />
                        <span className="btn-checkbox__btn">
                          {specialization}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
                {errors.specializations && (
                  <p
                    className={
                      errors.specializations.type !== 'validate'
                        ? 'input-update__error'
                        : 'input-update__warn'
                    }
                  >
                    {errors.specializations.message}
                  </p>
                )}
              </div>
              <div className="custom-select user-info-edit__select">
                <span className="custom-select__label">Локация</span>
                <div className="custom-select__placeholder">
                  {watchForm.location}
                </div>
                <CustomSelectText
                  setSelectedText={setSelectedLocation}
                  list={LOCATIONS}
                  listTitle={AdditionalCustomListCssClass.Location}
                />
              </div>
              <div className="custom-select user-info-edit__select">
                <span className="custom-select__label">Пол</span>
                <div className="custom-select__placeholder">
                  {watchForm.sex?.replace(/^[a-zа-яё]{1}/i, (match) =>
                    match.toUpperCase()
                  )}
                </div>
                <CustomSelectText
                  setSelectedText={setSelectedSex}
                  list={SEXES}
                  listTitle={AdditionalCustomListCssClass.Sex}
                />
              </div>
              <div className="custom-select user-info-edit__select">
                <span className="custom-select__label">Уровень</span>
                <div className="custom-select__placeholder">
                  {watchForm.level?.replace(/^[a-zа-яё]{1}/i, (match) =>
                    match.toUpperCase()
                  )}
                </div>
                <CustomSelectText
                  setSelectedText={setSelectedLevel}
                  list={LEVELS}
                  listTitle={AdditionalCustomListCssClass.Level}
                />
              </div>
            </fieldset>
          </form>
        </>
      ) : null || serverError ? (
        <p style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
          {serverError}
        </p>
      ) : null}
    </section>
  );
}
