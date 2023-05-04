import { useState } from 'react';
import Spinner from 'src/components/spinner/spinner';
import './sign-in.css';
import { useAppDispatch } from 'src/hooks/store.hooks';
import { userLoginAction } from 'src/store/api-actions';
import { AxiosResponse } from 'axios';

enum ErrorMessageStatusCodeMap {
  Email = '404',
  Password = '400',
}

const INITIAL_VALIDATION_VALUE = 'Обязательное поле';

export default function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const [isSendToServer, setIsSendToServer] = useState(false);
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const initialErrorState = {
    [ErrorMessageStatusCodeMap.Email]: INITIAL_VALIDATION_VALUE,
    [ErrorMessageStatusCodeMap.Password]: INITIAL_VALIDATION_VALUE,
  };
  const [errorMessage, setErrorMessage] = useState(initialErrorState);

  const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const submitButtonHandler = async (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();

    if (!email || !password) {
      setIsSubmitButtonClicked((prev) => !prev);
      return;
    }

    if (email && password) {
      setIsSendToServer((prev) => !prev);
      setErrorMessage(initialErrorState);
      const response = await dispatch(userLoginAction(formData));
      const responsePayload = response.payload as AxiosResponse<{
        error: string;
        message: string;
        statusCode: number;
      }>;

      if (response.meta.requestStatus === 'rejected') {
        setIsSendToServer((prev) => !prev);
        setErrorMessage((prev) => ({
          ...prev,
          [responsePayload.data.statusCode]: responsePayload.data.message,
        }));
      }
    }
  };

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg
            className="background-logo__logo"
            width="750"
            height="284"
            aria-hidden="true"
          >
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg
            className="background-logo__icon"
            width="343"
            height="343"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form>
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="email"
                            name="email"
                            onChange={inputChangeHandler}
                            onFocus={() => setErrorMessage(initialErrorState)}
                            value={email}
                          />
                          {(!email ||
                            errorMessage[ErrorMessageStatusCodeMap.Email] !==
                              INITIAL_VALIDATION_VALUE) && (
                            <p
                              className={`input-login__error ${
                                isSubmitButtonClicked ? 'shake' : ''
                              }`}
                              onAnimationEnd={() =>
                                setIsSubmitButtonClicked(false)
                              }
                            >
                              {errorMessage[ErrorMessageStatusCodeMap.Email]}
                            </p>
                          )}
                        </span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input
                            type="password"
                            name="password"
                            onChange={inputChangeHandler}
                            onFocus={() => setErrorMessage(initialErrorState)}
                            value={password}
                          />
                          {(!password ||
                            errorMessage[ErrorMessageStatusCodeMap.Password] !==
                              INITIAL_VALIDATION_VALUE) && (
                            <p
                              className={`input-login__error ${
                                isSubmitButtonClicked ? 'shake' : ''
                              }`}
                              onAnimationEnd={() =>
                                setIsSubmitButtonClicked(false)
                              }
                            >
                              {errorMessage[ErrorMessageStatusCodeMap.Password]}
                            </p>
                          )}
                        </span>
                      </label>
                    </div>
                    <button
                      className="btn sign-in__button"
                      type="submit"
                      disabled={isSendToServer}
                      onClick={submitButtonHandler}
                    >
                      {isSendToServer ? <Spinner /> : 'Продолжить'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
