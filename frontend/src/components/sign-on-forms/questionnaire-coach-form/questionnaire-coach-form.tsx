import { SubmitHandler, useForm } from 'react-hook-form';
import './questionnaire-coach-form.css';
import { RESTService, createAppApi } from 'src/services/app.api';
import { APIRoute, AppRoute } from 'src/constant';
import { useState } from 'react';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponse } from 'src/types/error-response';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/store.hooks';
import { getUserId, getUserRole } from 'src/store/user-proccess/selectors';
import { UserRole } from 'src/types/user';
import { LEVELS, SPECIALIZATIONS } from 'src/components/constant-components';

type Inputs = {
  specializations: string[];
  level: string;
  description: string;
  individualTraining: string;
};

export default function QuestionnaireCoachForm(): JSX.Element {
  const userRole = useAppSelector(getUserRole);
  const userId = useAppSelector(getUserId);
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
    level,
    description,
    individualTraining,
  }) => {
    const additionalCoachInfoAdapter = {
      specializations: specializations.map((specialization) =>
        specialization.toLowerCase()
      ),
      experience: level.toLowerCase(),
      achievement: description,
      isIndividualTraining: Boolean(individualTraining),
    };

    try {
      const api = createAppApi(RESTService.Auth);
      setIsFormToSending(true);
      await api.patch(
        `${APIRoute.AdditionalInfo}/${userId}`,
        additionalCoachInfoAdapter
      );
      userRole === UserRole.Customer
        ? navigate(AppRoute.Main)
        : navigate(AppRoute.PersonalCoach);
    } catch (err) {
      const error = err as AxiosError;
      const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

      if (errorResponse) {
        setError('description', {
          type: 'server',
          message: errorResponse.data.message,
        });
      } else {
        setError('description', {
          type: 'server',
          message: error.message,
        });
      }

      setIsFormToSending(false);
    }
  };

  return (
    <div className="popup-form popup-form--questionnaire-coach">
      <div className="popup-form__wrapper">
        <div className="popup-form__content">
          <div className="popup-form__form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="questionnaire-coach">
                <h1 className="visually-hidden">Опросник</h1>
                <div className="questionnaire-coach__wrapper">
                  <div
                    className="questionnaire-coach__block"
                    style={{ position: 'relative' }}
                  >
                    <span className="questionnaire-coach__legend">
                      Ваша специализация (тип) тренировок
                    </span>
                    <div className="specialization-checkbox questionnaire-coach__specializations">
                      {SPECIALIZATIONS.map((specialization) => (
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
                            ? 'input-questionnaire-coach__error'
                            : 'input-questionnaire-coach__warn'
                        }
                      >
                        {errors.specializations?.message}
                      </p>
                    )}
                  </div>
                  <div
                    className="questionnaire-coach__block"
                    style={{ position: 'relative' }}
                  >
                    <span className="questionnaire-coach__legend">
                      Ваш уровень
                    </span>
                    <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                      {LEVELS.map((level) => (
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
                      <p className="input-questionnaire-coach__error">
                        {errors.level?.message}
                      </p>
                    )}
                  </div>
                  <div className="questionnaire-coach__block">
                    <span className="questionnaire-coach__legend">
                      Ваши дипломы и сертификаты
                    </span>
                    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                      <label>
                        <span
                          className="drag-and-drop__label"
                          tabIndex={0}
                        >
                          Загрузите сюда файлы формата PDF, JPG или PNG
                          <svg
                            width="20"
                            height="20"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#icon-import"></use>
                          </svg>
                        </span>
                        <input
                          type="file"
                          name="import"
                          tabIndex={-1}
                          accept=".pdf, .jpg, .png"
                        />
                      </label>
                    </div>
                  </div>
                  <div
                    className="questionnaire-coach__block"
                    style={{ position: 'relative' }}
                  >
                    <span className="questionnaire-coach__legend">
                      Расскажите о своём опыте, который мы сможем проверить
                    </span>
                    <div className="custom-textarea questionnaire-coach__textarea">
                      <label>
                        <textarea
                          placeholder=" "
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
                      <p className="input-discription-questionnaire-coach__error">
                        {errors.description?.message}
                      </p>
                    )}
                    <div className="questionnaire-coach__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          value="individualTraining"
                          {...register('individualTraining')}
                        />
                        <span className="questionnaire-coach__checkbox-icon">
                          <svg
                            width="9"
                            height="6"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="questionnaire-coach__checkbox-label">
                          Хочу дополнительно индивидуально тренировать
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="btn questionnaire-coach__button"
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
