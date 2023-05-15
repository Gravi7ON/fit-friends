import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  SPECIALIZATIONS,
  TRAINING_TIMES,
} from 'src/components/constant-components';
import './coach-account-create-training.css';
import CustomSelectText from '../coach-account-main/coach-info/custom-selected-text';
import CheckMark from 'src/components/animate-ui/check-mark/check-mark';

export type InputsCreateTraining = {
  trainingName: string;
  price: string;
  calories: string;
  gender: string;
  description: string;
  specialization: string;
  trainingTime: string;
  location: string;
};

export default function CoachAccountCreateTraining(): JSX.Element {
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    null | string
  >(null);
  const [selectedTrainingTime, setSelectedTrainingTime] = useState<
    null | string
  >(null);
  const [isFormToSending, setIsFormToSending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputsCreateTraining>({
    mode: 'onChange',
  });

  useEffect(() => {
    setValue('specialization', selectedSpecialization as string);
    setValue('trainingTime', selectedTrainingTime as string);
  }, [selectedSpecialization, selectedTrainingTime, setValue]);

  const onSubmit: SubmitHandler<InputsCreateTraining> = async (data) =>
    console.log(data);

  return (
    <div
      className="popup-form popup-form--create-training"
      style={{ zIndex: 1 }}
    >
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__title-wrapper">
            <h1 className="popup-form__title">Создание тренировки</h1>
          </div>
          <div className="popup-form__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="create-training">
                <div className="create-training__wrapper">
                  <div
                    className="create-training__block"
                    style={{ position: 'relative' }}
                  >
                    <h2 className="create-training__legend">
                      Название тренировки
                    </h2>
                    <div className="custom-input create-training__input">
                      <label>
                        <span className="custom-input__wrapper">
                          <input
                            type="text"
                            {...register('trainingName', {
                              required: 'title is required',
                              maxLength: {
                                value: 15,
                                message: 'max 15 characters',
                              },
                            })}
                          />
                        </span>
                      </label>
                    </div>
                    {errors.trainingName && (
                      <p className="input-create-training__error">
                        {errors.trainingName.message}
                      </p>
                    )}
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Характеристики тренировки
                    </h2>
                    <div className="create-training__info">
                      <div className="custom-select custom-select--not-selected">
                        <span className="custom-select__label">
                          Выберите тип тренировки
                        </span>
                        <div className="custom-select__placeholder">
                          {selectedSpecialization}
                        </div>
                        <CustomSelectText
                          listTitle="specialization"
                          list={SPECIALIZATIONS}
                          setSelectedText={setSelectedSpecialization}
                        />
                        <input
                          type="hidden"
                          {...register('specialization', {
                            required: 'specialization is required',
                          })}
                        />
                        {errors.specialization && !selectedSpecialization && (
                          <p className="input-create-training__error input-create-training-spec__error">
                            {errors.specialization.message}
                          </p>
                        )}
                      </div>
                      <div className="custom-input custom-input--with-text-right">
                        <label>
                          <span className="custom-input__label">
                            Сколько калорий потратим
                          </span>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              {...register('calories', {
                                required: 'calories is required',
                                validate: (value) => {
                                  if (/\W/g.test(value)) {
                                    return 'only positive integer';
                                  }
                                },
                                min: {
                                  value: 1000,
                                  message: 'min 1000',
                                },
                                max: {
                                  value: 5000,
                                  message: 'max 5000',
                                },
                              })}
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                        {errors.calories && (
                          <p className="input-create-training__error input-create-training-spec__error">
                            {errors.calories.message}
                          </p>
                        )}
                      </div>
                      <div className="custom-select custom-select--not-selected">
                        <span className="custom-select__label">
                          Сколько времени потратим
                        </span>
                        <div className="custom-select__placeholder">
                          {selectedTrainingTime}
                        </div>
                        <CustomSelectText
                          listTitle="trainingTime"
                          list={TRAINING_TIMES}
                          setSelectedText={setSelectedTrainingTime}
                        />
                        <input
                          type="hidden"
                          {...register('trainingTime', {
                            required: 'training time is required',
                          })}
                        />
                        {errors.trainingTime && !selectedTrainingTime && (
                          <p className="input-create-training__error input-create-training-spec__error">
                            {errors.trainingTime.message}
                          </p>
                        )}
                      </div>
                      <div className="custom-input custom-input--with-text-right">
                        <label>
                          <span className="custom-input__label">
                            Стоимость тренировки
                          </span>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              {...register('price', {
                                required: 'price is required',
                                validate: (value) => {
                                  if (/\W/g.test(value)) {
                                    return 'only positive integer';
                                  }
                                  if (/^0[0-9]+$/.test(value)) {
                                    return 'zero or positive';
                                  }
                                },
                              })}
                            />
                            <span className="custom-input__text">₽</span>
                          </span>
                        </label>
                        {errors.price && (
                          <p className="input-create-training__error input-create-training-spec__error">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="create-training__radio-wrapper">
                      <span className="create-training__label">
                        Кому подойдет тренировка
                      </span>
                      <div
                        className="custom-toggle-radio create-training__radio"
                        style={{ position: 'relative' }}
                      >
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input
                              type="radio"
                              value={'для мужчин'}
                              {...register('gender', {
                                required: 'chose for whom',
                              })}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              Мужчинам
                            </span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input
                              type="radio"
                              value={'для женщин'}
                              {...register('gender', {
                                required: 'chose for whom',
                              })}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              Женщинам
                            </span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input
                              type="radio"
                              value={'для всех'}
                              {...register('gender', {
                                required: 'chose for whom',
                              })}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              Всем
                            </span>
                          </label>
                        </div>
                        {errors.gender && (
                          <p className="input-create-training__error input-create-training-spec__error">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="create-training__block"
                    style={{ position: 'relative' }}
                  >
                    <h2 className="create-training__legend">
                      Описание тренировки
                    </h2>
                    <div className="custom-textarea create-training__textarea">
                      <label>
                        <textarea
                          {...register('description', {
                            required: 'description is required',
                            minLength: {
                              value: 10,
                              message: 'min 10 characters',
                            },
                            maxLength: {
                              value: 140,
                              message: 'max 140 characters',
                            },
                          })}
                        ></textarea>
                      </label>
                    </div>
                    {errors.description && (
                      <p className="input-create-training__error input-create-training-spec__error">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="create-training__block">
                    <h2 className="create-training__legend">
                      Загрузите видео-тренировку
                    </h2>
                    <div className="drag-and-drop create-training__drag-and-drop">
                      <label>
                        <span
                          className="drag-and-drop__label"
                          tabIndex={0}
                        >
                          Загрузите сюда файлы формата MOV, AVI или MP4
                          <svg
                            width="20"
                            height="20"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#icon-import-video"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="import"
                          tabIndex={-1}
                          accept=".mov, .avi, .mp4"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="btn create-training__button"
                  type="submit"
                >
                  {selectedSpecialization ? <CheckMark /> : 'Опубликовать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
