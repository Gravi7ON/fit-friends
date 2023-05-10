export default function QuestionnaireCoach(): JSX.Element {
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
        <div className="popup-form popup-form--questionnaire-coach">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get">
                  <div className="questionnaire-coach">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-coach__wrapper">
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Ваша специализация (тип) тренировок
                        </span>
                        <div className="specialization-checkbox questionnaire-coach__specializations">
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value="yoga"
                              />
                              <span className="btn-checkbox__btn">Йога</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value="running"
                              />
                              <span className="btn-checkbox__btn">Бег</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value="power"
                                checked
                              />
                              <span className="btn-checkbox__btn">Силовые</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value="aerobics"
                              />
                              <span className="btn-checkbox__btn">
                                Аэробика
                              </span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value="crossfit"
                                checked
                              />
                              <span className="btn-checkbox__btn">
                                Кроссфит
                              </span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value="boxing"
                                checked
                              />
                              <span className="btn-checkbox__btn">Бокс</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value="pilates"
                              />
                              <span className="btn-checkbox__btn">Пилатес</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input
                                className="visually-hidden"
                                type="checkbox"
                                name="specialisation"
                                value="stretching"
                              />
                              <span className="btn-checkbox__btn">
                                Стрейчинг
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Ваш уровень
                        </span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="level"
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Новичок
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="level"
                                checked
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Любитель
                              </span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="level"
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">
                                Профессионал
                              </span>
                            </label>
                          </div>
                        </div>
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
                      <div className="questionnaire-coach__block">
                        <span className="questionnaire-coach__legend">
                          Расскажите о своём опыте, который мы сможем проверить
                        </span>
                        <div className="custom-textarea questionnaire-coach__textarea">
                          <label>
                            <textarea
                              name="description"
                              placeholder=" "
                            ></textarea>
                          </label>
                        </div>
                        <div className="questionnaire-coach__checkbox">
                          <label>
                            <input
                              type="checkbox"
                              value="individual-training"
                              name="individual-training"
                              checked
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
                    >
                      Продолжить
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
