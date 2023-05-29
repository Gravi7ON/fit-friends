import { Link, useNavigate } from 'react-router-dom';
import CustomerInfo from './customer-info/customer-info';
import { RESTService, createAppApi } from 'src/services/app.api';
import useSWR from 'swr';
import { useAppSelector } from 'src/hooks/store.hooks';
import { getUserId } from 'src/store/user-proccess/selectors';
import { Customer } from 'src/types/user';
import { PersonalCustomerRoute } from 'src/constant';
import CustomerWidget from './customer-widgets/customer-widgets';
import { WidgetTheme } from 'src/components/constant-components';

const DAY_OF_WEEK = 7;

const apiUser = createAppApi(RESTService.Users);
const userFetcher = async (endPoint: string) =>
  (await apiUser.get(endPoint)).data;

export default function CustomerAccount(): JSX.Element {
  const userId = useAppSelector(getUserId);

  const { data: user } = useSWR<Customer>(`/${userId}`, userFetcher);

  return (
    <section className="inner-page">
      <div className="container">
        <div className="inner-page__wrapper">
          <h1 className="visually-hidden">Личный кабинет</h1>
          <CustomerInfo />
          <div className="inner-page__content">
            <div className="personal-account-user">
              <div className="personal-account-user__schedule">
                <form>
                  <div className="personal-account-user__form">
                    <div className="personal-account-user__input">
                      <label>
                        <span className="personal-account-user__label">
                          План на день, ккал
                        </span>
                        <input
                          type="text"
                          name="schedule-for-the-day"
                          value={user?.dayDeclineCalories}
                        />
                      </label>
                    </div>
                    <div className="personal-account-user__input">
                      <label>
                        <span className="personal-account-user__label">
                          План на неделю, ккал
                        </span>
                        <input
                          type="text"
                          name="schedule-for-the-week"
                          value={user && user?.dayDeclineCalories * DAY_OF_WEEK}
                        />
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="personal-account-user__info">
                <CustomerWidget
                  title={'Дневник тренировок'}
                  linkTo={PersonalCustomerRoute.TrainingsDiary}
                  iconPath={'#icon-ranking'}
                  theme={WidgetTheme.Dark}
                />
                <CustomerWidget
                  title={'Дневник питания'}
                  linkTo={PersonalCustomerRoute.FoodDiary}
                  iconPath={'#icon-book'}
                  theme={WidgetTheme.Dark}
                />
                <section className="my-progress personal-account-user__my-progress">
                  <div className="my-progress__sidebar">
                    <svg
                      className="my-progress__icon"
                      width="46"
                      height="51"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-chart-filled"></use>
                    </svg>
                    <ul className="my-progress__list">
                      <li className="my-progress__item">
                        <span>поступило, Ккал</span>
                      </li>
                      <li className="my-progress__item">
                        <span>
                          ушло,
                          <br /> Ккал
                        </span>
                      </li>
                      <li className="my-progress__item">
                        <span>Итого за&nbsp;день, Ккал</span>
                      </li>
                    </ul>
                  </div>
                  <div className="my-progress__content">
                    <div className="my-progress__title-wrapper">
                      <h2 className="my-progress__title">Мой прогресс</h2>
                      <div className="my-progress__controls">
                        <button
                          className="btn-icon btn-icon--outlined my-progress__control"
                          type="button"
                          aria-label="previous"
                        >
                          <svg
                            width="11"
                            height="8"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#arrow-left"></use>
                          </svg>
                        </button>
                        <button
                          className="btn-icon btn-icon--outlined my-progress__control"
                          type="button"
                          aria-label="next"
                        >
                          <svg
                            width="11"
                            height="8"
                            aria-hidden="true"
                          >
                            <use xlinkHref="#arrow-right"></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <table className="my-progress__table">
                      <tr className="my-progress__row my-progress__row--head">
                        <th className="my-progress__cell my-progress__cell--head">
                          пн
                        </th>
                        <th className="my-progress__cell my-progress__cell--head">
                          вт
                        </th>
                        <th className="my-progress__cell my-progress__cell--head">
                          ср
                        </th>
                        <th className="my-progress__cell my-progress__cell--head">
                          чт
                        </th>
                        <th className="my-progress__cell my-progress__cell--head">
                          пт
                        </th>
                        <th className="my-progress__cell my-progress__cell--head">
                          сб
                        </th>
                        <th className="my-progress__cell my-progress__cell--head">
                          вс
                        </th>
                      </tr>
                      <tr className="my-progress__row">
                        <td className="my-progress__cell">3000</td>
                        <td className="my-progress__cell">1000</td>
                        <td className="my-progress__cell">3000</td>
                        <td className="my-progress__cell">1000</td>
                        <td className="my-progress__cell">3000</td>
                        <td className="my-progress__cell">1000</td>
                        <td className="my-progress__cell">3000</td>
                      </tr>
                      <tr className="my-progress__row">
                        <td className="my-progress__cell">2000</td>
                        <td className="my-progress__cell">4500</td>
                        <td className="my-progress__cell">2000</td>
                        <td className="my-progress__cell">4500</td>
                        <td className="my-progress__cell">2000</td>
                        <td className="my-progress__cell">4500</td>
                        <td className="my-progress__cell">2000</td>
                      </tr>
                      <tr className="my-progress__row">
                        <td className="my-progress__cell my-progress__cell--red">
                          1000
                        </td>
                        <td className="my-progress__cell my-progress__cell--green">
                          3500
                        </td>
                        <td className="my-progress__cell my-progress__cell--red">
                          1000
                        </td>
                        <td className="my-progress__cell my-progress__cell--green">
                          3500
                        </td>
                        <td className="my-progress__cell my-progress__cell--red">
                          1000
                        </td>
                        <td className="my-progress__cell my-progress__cell--green">
                          3500
                        </td>
                        <td className="my-progress__cell my-progress__cell--red">
                          1000
                        </td>
                      </tr>
                    </table>
                  </div>
                </section>
                <div className="personal-account-user__diagram"></div>
              </div>
              <div className="personal-account-user__additional-info">
                <CustomerWidget
                  title={'Мои друзья'}
                  linkTo={PersonalCustomerRoute.Friends}
                  iconPath={'#icon-friends'}
                  theme={WidgetTheme.Light}
                />
                <CustomerWidget
                  title={'Мои залы'}
                  linkTo={PersonalCustomerRoute.MyGyms}
                  iconPath={'#icon-weight'}
                  theme={WidgetTheme.Light}
                />
                <CustomerWidget
                  title={'Мои покупки'}
                  linkTo={PersonalCustomerRoute.Purchases}
                  iconPath={'#icon-shopping-cart'}
                  theme={WidgetTheme.Light}
                  isPurchases
                />
                <div className="personal-account-user__calendar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
