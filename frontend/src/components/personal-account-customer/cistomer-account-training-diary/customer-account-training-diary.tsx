import { useNavigate } from 'react-router-dom';

export default function CustomerAccountTrainingDiary(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="inner-page inner-page--no-sidebar">
      <div className="container">
        <div className="inner-page__wrapper">
          <button
            className="btn-flat inner-page__back"
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
          <div className="inner-page__content">
            <section className="training-diary">
              <div className="training-diary__wrapper">
                <h1 className="training-diary__title">Дневник тренировок</h1>
                <div className="training-diary__block">
                  <div className="training-diary__sidebar">
                    <svg
                      className="training-diary__icon"
                      width="17"
                      height="18"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-ranking"></use>
                    </svg>
                    <ul className="training-diary__list">
                      <li className="training-diary__item">
                        <span>Тренировка 1</span>
                        <ul className="training-diary__sublist">
                          <li className="training-diary__subitem">
                            <span>Калории</span>
                          </li>
                          <li className="training-diary__subitem">
                            <span>Время</span>
                          </li>
                        </ul>
                      </li>
                      <li className="training-diary__item">
                        <span>Тренировка 2</span>
                        <ul className="training-diary__sublist">
                          <li className="training-diary__subitem">
                            <span>Калории</span>
                          </li>
                          <li className="training-diary__subitem">
                            <span>Время</span>
                          </li>
                        </ul>
                      </li>
                      <li className="training-diary__item">
                        <span>Тренировка 3</span>
                        <ul className="training-diary__sublist">
                          <li className="training-diary__subitem">
                            <span>Калории</span>
                          </li>
                          <li className="training-diary__subitem">
                            <span>Время</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                    <div className="training-diary__total">
                      <p className="training-diary__total-label">Итого</p>
                      <ul className="training-diary__total-list">
                        <li className="training-diary__total-item">
                          <span>Калории</span>
                        </li>
                        <li className="training-diary__total-item">
                          <span>Время</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="training-diary__content">
                    <table className="training-diary__table">
                      <tbody>
                        <tr className="training-diary__row training-diary__row--head">
                          <th className="training-diary__cell training-diary__cell--head">
                            пн
                          </th>
                          <th className="training-diary__cell training-diary__cell--head">
                            вт
                          </th>
                          <th className="training-diary__cell training-diary__cell--head">
                            ср
                          </th>
                          <th className="training-diary__cell training-diary__cell--head">
                            чт
                          </th>
                          <th className="training-diary__cell training-diary__cell--head">
                            пт
                          </th>
                          <th className="training-diary__cell training-diary__cell--head">
                            сб
                          </th>
                          <th className="training-diary__cell training-diary__cell--head">
                            вс
                          </th>
                        </tr>
                        <tr className="training-diary__row">
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>620</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>320</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>700</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>620</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>320</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>700</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>620</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="training-diary__row">
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>30</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>30</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>90</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>30</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>30</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>30</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>30</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="training-diary__row">
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>410</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>810</span>
                            </div>
                          </td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>410</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>810</span>
                            </div>
                          </td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>410</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="training-diary__row">
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>60</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>60</span>
                            </div>
                          </td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>60</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>60</span>
                            </div>
                          </td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>60</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="training-diary__row">
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>830</span>
                            </div>
                          </td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>830</span>
                            </div>
                          </td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>830</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="training-diary__row">
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>90</span>
                            </div>
                          </td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>90</span>
                            </div>
                          </td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell"></td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data">
                              <span>90</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="training-diary__row">
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>1860</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>1130</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>700</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>1860</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>1130</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>700</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>1860</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="training-diary__row">
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>180</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>90</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>90</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>180</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>90</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>30</span>
                            </div>
                          </td>
                          <td className="training-diary__cell">
                            <div className="training-diary__data training-diary__data--total">
                              <span>180</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="total training-diary__total-per-week">
                  <div className="total__title-wrapper">
                    <div className="total__title">Итого за неделю</div>
                    <svg
                      className="total__icon"
                      width="30"
                      height="30"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-chart-with-arrow"></use>
                    </svg>
                  </div>
                  <dl className="total__result">
                    <div className="total__item">
                      <dt className="total__label">Калории</dt>
                      <dd className="total__number">9 240</dd>
                    </div>
                    <div className="total__item">
                      <dt className="total__label">Время</dt>
                      <dd className="total__number">840</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
