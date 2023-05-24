import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AxiosError, AxiosResponse } from 'axios';
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
import CustomSelectText from './custom-selected-text';
import { ErrorResponse } from 'src/types/error-response';

type Inputs = {
  name: string;
  sex: string;
  location: string;
  about: string;
  isReadyTraining: boolean;
  specializations: string[];
  level: string;
};

const enum AdditionalCustomListCssClass {
  Level = 'level',
  Sex = 'sex',
  Location = 'location',
}

export default function CoachInfo(): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [coach, setCoach] = useState<Coach | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<null | string>(null);
  const [selectedSex, setSelectedSex] = useState<null | string>(null);
  const [selectedLevel, setSelectedLevel] = useState<null | string>(null);
  const [serverError, setServerError] = useState<null | string>(null);
  const [isFormToSending, setIsFormToSending] = useState(false);
  const userId = useAppSelector(getUserId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
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
        setValue('isReadyTraining', coach.isIndividualTraining);
        setValue('about', coach.about);
        setValue('name', coach.name);
        setValue('specializations', coach.specializations);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

        if (errorResponse) {
          setServerError(errorResponse.data.message);
        } else {
          setServerError(error.message);
        }
      }
    };
    getCoach();
  }, [setValue, userId, isEdit]);

  useEffect(() => {
    setValue('location', selectedLocation as string);
    setValue('sex', selectedSex as string);
    setValue('level', selectedLevel as string);
  }, [selectedLevel, selectedLocation, selectedSex, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async ({
    specializations,
    name,
    isReadyTraining,
    level,
    about,
  }) => {
    const updateCoachInfoAdapter = {
      specializations: specializations.map((specialization) =>
        specialization.toLowerCase()
      ),
      name,
      about,
      experience: level.toLowerCase(),
      isIndividualTraining: Boolean(isReadyTraining),
    };

    try {
      const api = createAppApi(RESTService.Users);
      setIsFormToSending(true);
      await api.patch('', updateCoachInfoAdapter);
      setIsFormToSending(false);
    } catch (err) {
      const error = err as AxiosError;
      const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

      if (errorResponse) {
        setServerError(errorResponse.data.message);
      } else {
        setServerError(error.message);
      }

      setIsFormToSending(false);
    }
  };

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
                  disabled={!isEdit || isFormToSending}
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
                  className={`user-info-edit__control-btn ${
                    isFormToSending ? 'spinner-refresh' : null
                  }`}
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
                  disabled={isFormToSending}
                  style={
                    serverError ? { color: 'red', borderColor: 'red' } : {}
                  }
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
              aria-label={isEdit ? 'Сохранить' : 'Редактировать'}
              onClick={(evt) => {
                evt.preventDefault();
                if (isEdit) {
                  clearErrors();
                  setServerError(null);
                }
                setIsEdit((prev) => !prev);
              }}
              disabled={isFormToSending}
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
                      readOnly={!isEdit || isFormToSending}
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
                        if (!isEdit || isFormToSending) {
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
                    readOnly={!isEdit || !isFormToSending}
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
                      if (!isEdit || isFormToSending) {
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
              disabled={!isEdit || isFormToSending}
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
                          value={specialization.toLowerCase()}
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
