import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/store.hooks';
import { getUserRole } from 'src/store/user-proccess/selectors';
import './questionnaire-customer.css';
import Spinner from 'src/components/ui-helpers/spinner/spinner';
import { RESTService, createAppApi } from 'src/services/app.api';
import { APIRoute, AppRoute } from 'src/constant';
import { store } from 'src/store/store';
import { UserRole } from 'src/types/user';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'src/types/error-response';

type Inputs = {
  specializations: string[];
  level: string;
  time: string;
  caloriesLose: string;
  caloriesWaste: string;
};

const specializations = [
  'Йога',
  'Бег',
  'Силовые',
  'Аэробика',
  'Кроссфит',
  'Бокс',
  'Пилатес',
  'Стрейчинг',
];

const levels = ['Новичок', 'Любитель', 'Профессионал'];

const trainingTimes = ['10-30 мин', '30-50 мин', '50-80 мин', 'больше 80 мин'];

export default function QuestionnaireCustomerForm(): JSX.Element {
  const userRole = useAppSelector(getUserRole);
  const navigate = useNavigate();

  const [isFormToSending, setIsFormToSending] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async ({
    specializations,
    time,
    level,
    caloriesLose,
    caloriesWaste,
  }) => {
    const additionalCustomerInfoAdapter = {
      specializations: specializations.map((specialization) =>
        specialization.toLowerCase()
      ),
      experience: level.toLowerCase(),
      trainingTime: time,
      targetDeclineСalories: Number(caloriesLose),
      dayDeclineCalories: Number(caloriesWaste),
    };
    console.log(additionalCustomerInfoAdapter);
    try {
      const api = createAppApi(RESTService.Auth);
      setIsFormToSending(true);
      await api.patch(
        `${APIRoute.AdditionalInfo}/${store.getState().USER.id}`,
        additionalCustomerInfoAdapter
      );
      userRole === UserRole.Customer
        ? navigate(AppRoute.Main)
        : navigate(AppRoute.PersonalCoach);
    } catch (err) {
      const errorResponse = (err as AxiosError)
        .response as AxiosResponse<ErrorResponse>;

      setError('caloriesWaste', {
        type: 'server',
        message: errorResponse.data.message,
      });

      setIsFormToSending(false);
    }
  };

  return (
    <div className="popup-form popup-form--questionnaire-user">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="questionnaire-user">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-user__wrapper">
                  <div
                    className="questionnaire-user__block"
                    style={{ position: 'relative' }}
                  >
                    <span className="questionnaire-user__legend">
                      Ваша специализация (тип) тренировок
                    </span>
                    <div className="specialization-checkbox questionnaire-user__specializations">
                      {specializations.map((specialization) => (
                        <div
                          key={specialization}
                          className="btn-checkbox"
                        >
                          <label>
                            <input
                              className="visually-hidden"
                              type="checkbox"
                              value={specialization}
                              {...register('specializations', {
                                required: 'specialization is required',
                                validate: (value) =>
                                  value.length <= 3 ||
                                  'Только три одновременно',
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
                            ? 'input-questionnaire-customer__error'
                            : 'input-questionnaire-customer__warn'
                        }
                      >
                        {errors.specializations?.message}
                      </p>
                    )}
                  </div>
                  <div
                    className="questionnaire-user__block"
                    style={{ position: 'relative' }}
                  >
                    <span className="questionnaire-user__legend">
                      Сколько времени вы готовы уделять на тренировку в день
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {trainingTimes.map((range) => (
                        <div
                          key={range}
                          className="custom-toggle-radio__block"
                        >
                          <label>
                            <input
                              type="radio"
                              value={range}
                              {...register('time', {
                                required: 'time range is required',
                              })}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              {range}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.time && (
                      <p className="input-questionnaire-customer__error">
                        {errors.time?.message}
                      </p>
                    )}
                  </div>
                  <div
                    className="questionnaire-user__block"
                    style={{ position: 'relative' }}
                  >
                    <span className="questionnaire-user__legend">
                      Ваш уровень
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                      {levels.map((level) => (
                        <div
                          key={level}
                          className="custom-toggle-radio__block"
                        >
                          <label>
                            <input
                              type="radio"
                              value={level}
                              {...register('level', {
                                required: 'level is required',
                              })}
                            />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">
                              {level}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.level && (
                      <p className="input-questionnaire-customer__error">
                        {errors.level?.message}
                      </p>
                    )}
                  </div>
                  <div className="questionnaire-user__block">
                    <div
                      className="questionnaire-user__calories-lose"
                      style={{ position: 'relative' }}
                    >
                      <span className="questionnaire-user__legend">
                        Сколько калорий хотите сбросить
                      </span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              {...register('caloriesLose', {
                                required: 'required field',
                                min: {
                                  value: '1000',
                                  message: 'min value 1000',
                                },
                                max: {
                                  value: '5000',
                                  message: 'max value 5000',
                                },
                                pattern: {
                                  value: /^[0-9]{4}$/,
                                  message: 'only integer',
                                },
                              })}
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                      {errors.caloriesLose && (
                        <p
                          className="input-questionnaire-customer__error"
                          style={{ bottom: '-15px' }}
                        >
                          {errors.caloriesLose?.message}
                        </p>
                      )}
                    </div>
                    <div
                      className="questionnaire-user__calories-waste"
                      style={{ position: 'relative' }}
                    >
                      <span className="questionnaire-user__legend">
                        Сколько калорий тратить в день
                      </span>
                      <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                        <label>
                          <span className="custom-input__wrapper">
                            <input
                              type="number"
                              {...register('caloriesWaste', {
                                required: 'required field',
                                min: {
                                  value: '1000',
                                  message: 'min value 1000',
                                },
                                max: {
                                  value: '5000',
                                  message: 'max value 5000',
                                },
                                pattern: {
                                  value: /^[0-9]{4}$/,
                                  message: 'only integer',
                                },
                              })}
                            />
                            <span className="custom-input__text">ккал</span>
                          </span>
                        </label>
                      </div>
                      {errors.caloriesWaste && (
                        <p
                          className="input-questionnaire-customer__error"
                          style={{ bottom: '-15px' }}
                        >
                          {errors.caloriesWaste?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="btn questionnaire-user__button"
                  type="submit"
                  disabled={isFormToSending}
                >
                  {isFormToSending ? <Spinner /> : 'Продолжить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
