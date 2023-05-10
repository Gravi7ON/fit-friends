import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './register-form.css';
import { useAppDispatch } from 'src/hooks/store.hooks';
import { userRegisterAction } from 'src/store/api-actions';
import Spinner from '../spinner/spinner';
import { AxiosResponse } from 'axios';
import { ErrorResponse } from 'src/types/error-response';
import { AppRoute } from 'src/constant';
import { UserRole } from 'src/types/user';
import { store } from 'src/store/store';
import { useNavigate } from 'react-router-dom';

const LOCATIONS = [
  'ст. м. Пионерская',
  'ст. м. Петроградская',
  'ст. м. Удельная',
  'ст. м. Звёздная',
  'ст. м. Спортивная',
] as const;

type Inputs = {
  name: string;
  email: string;
  birthday: string;
  password: string;
  sex: string;
  role: string;
  agreement: string;
  location: string;
};

export default function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedLocation, setSelectedLocation] = useState<null | string>(null);
  const [isFormToSending, setIsFormToSending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    role,
    email,
    location,
    password,
    sex,
    birthday,
  }) => {
    const adapter = {
      name,
      email,
      password,
      sex: sex.toLocaleLowerCase(),
      dateBirth: birthday,
      role,
      location: location.replace('ст. м. ', ''),
    };

    setIsFormToSending(true);
    const response = await dispatch(userRegisterAction(adapter));

    if (response.meta.requestStatus === 'rejected') {
      const responsePayload = response.payload as AxiosResponse<ErrorResponse>;
      setIsFormToSending(false);
      setError('email', {
        type: 'server',
        message: responsePayload.data.message,
      });
    } else {
      const userRole = store.getState().USER.role;
      userRole === UserRole.Customer
        ? navigate(AppRoute.QuestionnaireCustomer)
        : navigate(AppRoute.QuestionnaireCoach);
    }
  };

  useEffect(() => {
    setValue('location', selectedLocation as string);
  }, [selectedLocation, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <div className="input-load-avatar">
            <label>
              <input
                className="visually-hidden"
                type="file"
                accept="image/png, image/jpeg"
              />
              <span className="input-load-avatar__btn">
                <svg
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-import"></use>
                </svg>
              </span>
            </label>
          </div>
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">
              JPG, PNG, оптимальный размер 100&times;100&nbsp;px
            </span>
          </div>
        </div>
        <div className="sign-up__data">
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  {...register('name', {
                    required: 'Name is required',
                    maxLength: {
                      value: 15,
                      message: 'максимум 15 символов',
                    },
                    pattern: {
                      value: /^[a-zа-яё\s]+$/i,
                      message: 'только буквы русского/английского алфавита',
                    },
                  })}
                />
                {errors.name && (
                  <p className="input-register__error">{errors.name.message}</p>
                )}
              </span>
            </label>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">E-mail</span>
              <span className="custom-input__wrapper">
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /.@./,
                      message: 'invalid email',
                    },
                  })}
                />
                {errors.email && (
                  <p className="input-register__error">
                    {errors.email.message}
                  </p>
                )}
              </span>
            </label>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Дата рождения</span>
              <span className="custom-input__wrapper">
                <input
                  type="date"
                  max="2099-12-31"
                  {...register('birthday', {
                    required: 'Date of birth is required',
                  })}
                />
                {errors.birthday && (
                  <p className="input-register__error">
                    {errors.birthday.message}
                  </p>
                )}
              </span>
            </label>
          </div>
          <div className="custom-select custom-select--not-selected">
            <span className="custom-select__label">Ваша локация</span>
            <button
              className="custom-select__button"
              type="button"
              aria-label="Выберите одну из опций"
              onFocus={() =>
                document
                  .querySelector('.custom-select__list')
                  ?.classList.add('custom-select__list__selected')
              }
              onBlur={() =>
                document
                  .querySelector('.custom-select__list')
                  ?.classList.remove('custom-select__list__selected')
              }
            >
              <span
                className="custom-select__text"
                style={{ fontSize: '16px' }}
              >
                {selectedLocation}
              </span>
              <input
                type="hidden"
                {...register('location', { required: 'Location is required' })}
              />
              <span className="custom-select__icon">
                <svg
                  width="15"
                  height="6"
                  aria-hidden="true"
                >
                  <use xlinkHref="#arrow-down"></use>
                </svg>
              </span>
            </button>
            <ul
              className="custom-select__list"
              role="listbox"
            >
              {LOCATIONS.map((place) => (
                <li
                  key={place}
                  onMouseOver={(
                    evt: React.MouseEvent<HTMLLIElement, MouseEvent>
                  ) => (evt.currentTarget.style.fontWeight = 'bold')}
                  onMouseOut={(
                    evt: React.MouseEvent<HTMLLIElement, MouseEvent>
                  ) => (evt.currentTarget.style.fontWeight = 'normal')}
                  onClick={(evt) =>
                    setSelectedLocation(evt.currentTarget.textContent)
                  }
                >
                  {place}
                </li>
              ))}
            </ul>
            {errors.location && !selectedLocation && (
              <p className="input-register__error input-register__location-error">
                {errors.location.message}
              </p>
            )}
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Пароль</span>
              <span className="custom-input__wrapper">
                <input
                  type="password"
                  autoComplete="off"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'min length 6 character',
                    },
                    maxLength: {
                      value: 12,
                      message: 'max length 12 character',
                    },
                    pattern: /./i,
                  })}
                />
                {errors.password && (
                  <p className="input-register__error">
                    {errors.password.message}
                  </p>
                )}
              </span>
            </label>
          </div>
          <div
            className="sign-up__radio"
            style={{ position: 'relative' }}
          >
            <span className="sign-up__label">Пол</span>
            <div className="custom-toggle-radio custom-toggle-radio--big">
              <div className="custom-toggle-radio__block">
                <label>
                  <input
                    type="radio"
                    value={'Мужской'}
                    {...register('sex', { required: 'Choose your sex' })}
                  />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Мужской</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input
                    type="radio"
                    value={'Женский'}
                    {...register('sex', { required: 'Choose your sex' })}
                  />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Женский</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input
                    type="radio"
                    value={'Неважно'}
                    {...register('sex', { required: 'Choose your sex' })}
                  />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Неважно</span>
                </label>
              </div>
            </div>
            {errors.sex && (
              <p className="input-register__error">{errors.sex.message}</p>
            )}
          </div>
        </div>
        <div
          className="sign-up__role"
          style={{ position: 'relative' }}
        >
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            <div className="role-btn">
              <label>
                <input
                  className="visually-hidden"
                  type="radio"
                  value="тренер"
                  {...register('role', { required: 'Choose your role' })}
                />
                <span className="role-btn__icon">
                  <svg
                    width="12"
                    height="13"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-cup"></use>
                  </svg>
                </span>
                <span className="role-btn__btn">Я хочу тренировать</span>
              </label>
            </div>
            <div className="role-btn">
              <label>
                <input
                  className="visually-hidden"
                  type="radio"
                  value="пользователь"
                  {...register('role', { required: 'Choose your role' })}
                />
                <span className="role-btn__icon">
                  <svg
                    width="12"
                    height="13"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icon-weight"></use>
                  </svg>
                </span>
                <span className="role-btn__btn">Я хочу тренироваться</span>
              </label>
            </div>
          </div>
          {errors.role && (
            <p className="input-register__error">{errors.role.message}</p>
          )}
        </div>
        <div className="sign-up__checkbox">
          <label>
            <input
              type="checkbox"
              value="agreement"
              {...register('agreement', {
                required: 'Please meet out user agreement',
              })}
            />
            <span className="sign-up__checkbox-icon">
              <svg
                width="9"
                height="6"
                aria-hidden="true"
              >
                <use xlinkHref="#arrow-check"></use>
              </svg>
            </span>
            <span className="sign-up__checkbox-label">
              Я соглашаюсь с <span>политикой конфиденциальности</span> компании
            </span>
            {errors.agreement && (
              <p className="input-register__error input-register__agreement-error">
                {errors.agreement.message}
              </p>
            )}
          </label>
        </div>
        <button
          className="btn sign-up__button"
          type="submit"
        >
          {isFormToSending ? <Spinner /> : 'Продолжить'}
        </button>
      </div>
    </form>
  );
}
