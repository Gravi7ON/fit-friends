import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from 'src/components/animate-ui/spinner/spinner';
import { SHOW_ERROR_TIME } from 'src/components/constant-components';
import { APIRoute } from 'src/constant';
import { RESTService, createAppApi } from 'src/services/app.api';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const CELLS_COMMON = Array(28).fill(0);
const CELLS_TOTAL = Array(7).fill(0);
const DAY_OF_WEEK = 7;

const apiAccount = createAppApi(RESTService.PersonalAccount);
const myFoodDiaryFetcher = async (endPoint: string) =>
  (await apiAccount.get(endPoint)).data;
const setFoodDiary = async (
  endPoint: string,
  arg: { arg: { calories: string[] } }
) => (await apiAccount.patch(endPoint, arg.arg)).data;

export default function CustomerAccountFoodDiary(): JSX.Element {
  const navigate = useNavigate();

  const formRef = useRef(null);

  const {
    data: foodDiary,
    isLoading: foodDiaryIsLoading,
    mutate,
  } = useSWR<{
    calories: string[];
    totalCalory: { inDays: string[]; inWeek: string };
  }>(APIRoute.FoodDiary, myFoodDiaryFetcher);

  const { trigger, isMutating, reset, error, data } = useSWRMutation(
    APIRoute.FoodDiary,
    setFoodDiary
  );

  useEffect(() => {
    const enterKeyDownHandler = async (evt: KeyboardEvent) => {
      if (evt.key === 'Enter' && document.hasFocus()) {
        if (formRef.current) {
          const formData = new FormData(formRef.current).getAll('calories');

          try {
            await trigger({ calories: formData as string[] });
            mutate(data);
          } catch {
            setTimeout(reset, SHOW_ERROR_TIME);
          }
        }
      }
    };

    const clickOutInputHandler = async (evt: MouseEvent) => {
      const focusInput = document.querySelector('.focus-visible');

      if (
        document.hasFocus() &&
        !evt.composedPath().includes(focusInput as EventTarget)
      ) {
        if (formRef.current) {
          const formData = new FormData(formRef.current).getAll('calories');

          try {
            await trigger({ calories: formData as string[] });
            mutate(data);
          } catch {
            setTimeout(reset, SHOW_ERROR_TIME);
          }
        }
      }
    };

    document.addEventListener('keydown', enterKeyDownHandler);
    document.addEventListener('click', clickOutInputHandler);
    return () => {
      document.removeEventListener('keydown', enterKeyDownHandler);
      document.removeEventListener('click', clickOutInputHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return foodDiaryIsLoading ? (
    <Spinner spinnerScreen />
  ) : (
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
            <section className="food-diary">
              <div className="food-diary__wrapper">
                <h1 className="food-diary__title">Дневник питания</h1>
                <div className="food-diary__block">
                  <div className="food-diary__sidebar">
                    <svg
                      className="food-diary__icon"
                      width="21"
                      height="18"
                      aria-hidden="true"
                    >
                      <use xlinkHref="#icon-book"></use>
                    </svg>
                    <ul className="food-diary__list">
                      <li className="food-diary__item">
                        <span>Завтрак</span>
                      </li>
                      <li className="food-diary__item">
                        <span>Обед</span>
                      </li>
                      <li className="food-diary__item">
                        <span>Ужин</span>
                      </li>
                      <li className="food-diary__item">
                        <span>Перекус</span>
                      </li>
                    </ul>
                    <p className="food-diary__total">Итого</p>
                  </div>
                  <div className="food-diary__content">
                    <form ref={formRef}>
                      <table className="food-diary__table">
                        <tbody>
                          <tr className="food-diary__row food-diary__row--head">
                            <th className="food-diary__cell food-diary__cell--head">
                              пн
                            </th>
                            <th className="food-diary__cell food-diary__cell--head">
                              вт
                            </th>
                            <th className="food-diary__cell food-diary__cell--head">
                              ср
                            </th>
                            <th className="food-diary__cell food-diary__cell--head">
                              чт
                            </th>
                            <th className="food-diary__cell food-diary__cell--head">
                              пт
                            </th>
                            <th className="food-diary__cell food-diary__cell--head">
                              сб
                            </th>
                            <th className="food-diary__cell food-diary__cell--head">
                              вс
                            </th>
                          </tr>
                          <tr className="food-diary__row">
                            {foodDiary
                              ? foodDiary.calories
                                  .slice(0, DAY_OF_WEEK)
                                  .map((cell, index) => (
                                    <td
                                      className="food-diary__cell"
                                      key={`${cell}${index}`}
                                    >
                                      <div className="food-diary__input">
                                        <label>
                                          <input
                                            type="number"
                                            name="calories"
                                            defaultValue={Number(cell)}
                                          />
                                        </label>
                                      </div>
                                    </td>
                                  ))
                              : CELLS_COMMON.slice(0, DAY_OF_WEEK).map(
                                  (cell, index) => (
                                    <td
                                      className="food-diary__cell"
                                      key={`${cell}${index}`}
                                    >
                                      <div className="food-diary__input">
                                        <label>
                                          <input
                                            type="number"
                                            name="calories"
                                            defaultValue={cell}
                                          />
                                        </label>
                                      </div>
                                    </td>
                                  )
                                )}
                          </tr>
                          <tr className="food-diary__row">
                            {foodDiary
                              ? foodDiary.calories
                                  .slice(DAY_OF_WEEK, DAY_OF_WEEK * 2)
                                  .map((cell, index) => (
                                    <td
                                      className="food-diary__cell"
                                      key={`${cell}${index}`}
                                    >
                                      <div className="food-diary__input">
                                        <label>
                                          <input
                                            type="number"
                                            name="calories"
                                            defaultValue={Number(cell)}
                                          />
                                        </label>
                                      </div>
                                    </td>
                                  ))
                              : CELLS_COMMON.slice(
                                  DAY_OF_WEEK,
                                  DAY_OF_WEEK * 2
                                ).map((cell, index) => (
                                  <td
                                    className="food-diary__cell"
                                    key={`${cell}${index}`}
                                  >
                                    <div className="food-diary__input">
                                      <label>
                                        <input
                                          type="number"
                                          name="calories"
                                          defaultValue={cell}
                                        />
                                      </label>
                                    </div>
                                  </td>
                                ))}
                          </tr>
                          <tr className="food-diary__row">
                            {foodDiary
                              ? foodDiary.calories
                                  .slice(DAY_OF_WEEK * 2, DAY_OF_WEEK * 3)
                                  .map((cell, index) => (
                                    <td
                                      className="food-diary__cell"
                                      key={`${cell}${index}`}
                                    >
                                      <div className="food-diary__input">
                                        <label>
                                          <input
                                            type="number"
                                            name="calories"
                                            defaultValue={Number(cell)}
                                          />
                                        </label>
                                      </div>
                                    </td>
                                  ))
                              : CELLS_COMMON.slice(
                                  DAY_OF_WEEK * 2,
                                  DAY_OF_WEEK * 3
                                ).map((cell, index) => (
                                  <td
                                    className="food-diary__cell"
                                    key={`${cell}${index}`}
                                  >
                                    <div className="food-diary__input">
                                      <label>
                                        <input
                                          type="number"
                                          name="calories"
                                          defaultValue={cell}
                                        />
                                      </label>
                                    </div>
                                  </td>
                                ))}
                          </tr>
                          <tr className="food-diary__row">
                            {foodDiary
                              ? foodDiary.calories
                                  .slice(DAY_OF_WEEK * 3, DAY_OF_WEEK * 4)
                                  .map((cell, index) => (
                                    <td
                                      className="food-diary__cell"
                                      key={`${cell}${index}`}
                                    >
                                      <div className="food-diary__input">
                                        <label>
                                          <input
                                            type="number"
                                            name="calories"
                                            defaultValue={Number(cell)}
                                          />
                                        </label>
                                      </div>
                                    </td>
                                  ))
                              : CELLS_COMMON.slice(
                                  DAY_OF_WEEK * 3,
                                  DAY_OF_WEEK * 4
                                ).map((cell, index) => (
                                  <td
                                    className="food-diary__cell"
                                    key={`${cell}${index}`}
                                  >
                                    <div className="food-diary__input">
                                      <label>
                                        <input
                                          type="number"
                                          name="calories"
                                          defaultValue={cell}
                                        />
                                      </label>
                                    </div>
                                  </td>
                                ))}
                          </tr>
                          <tr className="food-diary__row">
                            {foodDiary
                              ? foodDiary.totalCalory.inDays.map(
                                  (cell, index) => (
                                    <td
                                      className="food-diary__cell"
                                      key={`${cell}${index}`}
                                    >
                                      <div className="food-diary__total-value">
                                        <span>{cell}</span>
                                      </div>
                                    </td>
                                  )
                                )
                              : CELLS_TOTAL.map((cell, index) => (
                                  <td
                                    className="food-diary__cell"
                                    key={`${cell}${index}`}
                                  >
                                    <div className="food-diary__total-value">
                                      <span>{cell}</span>
                                    </div>
                                  </td>
                                ))}
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                </div>
                <div className="total food-diary__total-per-week">
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
                  <p className="total__number">
                    {foodDiary ? foodDiary.totalCalory.inWeek : 0}
                  </p>
                </div>
                <button
                  className={`btn food-diary__button ${
                    error ? 'show-more__button--error' : ''
                  }`}
                  type="button"
                  disabled={isMutating}
                  onClick={async () => {
                    if (formRef.current) {
                      const formData = new FormData(formRef.current).getAll(
                        'calories'
                      );

                      try {
                        await trigger({ calories: formData as string[] });
                        mutate();
                      } catch {
                        setTimeout(reset, SHOW_ERROR_TIME);
                      }
                    }
                  }}
                >
                  {isMutating ? <Spinner /> : 'Сохранить'}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
