import { useContext, useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material';
import './GlobalCssSlider.css';
import { TRAINING_TIMES } from 'src/components/constant-components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RESTService, createAppApi } from 'src/services/app.api';
import { APIRoute } from 'src/constant';
import { useAppDispatch } from 'src/hooks/store.hooks';
import { changeWorkoutFilterValue } from 'src/store/workout-filter/workout-filter';
import { setStateWorkouts } from 'src/store/workouts/workouts';
// import { FilterValueContext } from '../coach-account-trainings';

type Inputs = {
  priceMin: string;
  priceMax: string;
  caloriesMin: string;
  caloriesMax: string;
  ratingMin: string;
  ratingMax: string;
  trainingTime: string;
};

const MIN_RATING = 0;
const MAX_RATING = 5;
let MIN_PRICE = 0;
let MAX_PRICE = 0;
const MIN_CALORIES = 1000;
const MAX_CALORIES = 5000;

export default function CoachTrainingFilterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [valuePrice, setValuePrice] = useState([MIN_PRICE, MAX_PRICE]);
  const [valueCalories, setValueCalories] = useState([
    MIN_CALORIES,
    MAX_CALORIES,
  ]);
  const [valueRating, setValueRating] = useState([MIN_RATING, MAX_RATING]);

  const { register, setValue, watch } = useForm<Inputs>({
    mode: 'onChange',
  });

  const formWatcher = watch();

  useEffect(() => {
    const getMinMaxPrice = async () => {
      try {
        const api = createAppApi(RESTService.Workouts);
        const { data: price } = await api.get(
          `${APIRoute.Coach}?minMaxPrice=true`
        );
        MIN_PRICE = price._min.cost;
        MAX_PRICE = price._max.cost;
        setValuePrice([MIN_PRICE, MAX_PRICE]);
      } catch {
        MIN_PRICE = 0;
        MAX_PRICE = 0;
      }
    };
    getMinMaxPrice();
  }, []);

  useEffect(() => {
    setValue('priceMin', valuePrice[0].toString());
    setValue('priceMax', valuePrice[1].toString());
    setValue('caloriesMin', valueCalories[0].toString());
    setValue('caloriesMax', valueCalories[1].toString());
    setValue('ratingMin', valueRating[0].toString());
    setValue('ratingMax', valueRating[1].toString());
    dispatch(
      changeWorkoutFilterValue({
        costs: valuePrice,
        calories: valueCalories,
        rating: valueRating,
      })
    );
    dispatch(setStateWorkouts([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setValue,
    valueCalories,
    valuePrice,
    valueRating,
    formWatcher.ratingMax,
    formWatcher.ratingMin,
  ]);

  const handlePriceSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setValuePrice(newValue as number[]);
  };

  const handleCaloriesSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setValueCalories(newValue as number[]);
  };

  const handleRatingSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    setValueRating(newValue as number[]);
  };

  return (
    <form className="my-training-form__form">
      <div className="my-training-form__block my-training-form__block--price">
        <h4 className="my-training-form__block-title">Цена, ₽</h4>
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input
              type="number"
              id="text-min"
              defaultValue={valuePrice[0]}
              {...register('priceMin')}
              onKeyDown={(evt) => {
                if (evt.key === 'Enter') {
                  evt.preventDefault();
                }
              }}
              onClick={() => {
                if (!valuePrice[0]) {
                  setValue('priceMin', '');
                }
              }}
              onBlur={() => {
                const minFormPrice = Math.floor(Number(formWatcher.priceMin));
                const maxFormPrice = Math.floor(Number(formWatcher.priceMax));

                setValuePrice((prev) => [
                  Math.sign(minFormPrice) === -1 &&
                  Number.isInteger(minFormPrice)
                    ? MIN_PRICE
                    : minFormPrice > MAX_PRICE || minFormPrice > maxFormPrice
                    ? MIN_PRICE
                    : minFormPrice,
                  prev[1],
                ]);
              }}
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input
              type="number"
              id="text-max"
              defaultValue={valuePrice[1]}
              {...register('priceMax')}
              onKeyDown={(evt) => {
                if (evt.key === 'Enter') {
                  evt.preventDefault();
                }
              }}
              onClick={() => {
                if (!valuePrice[1]) {
                  setValue('priceMax', '');
                }
              }}
              onBlur={() => {
                const minFormPrice = Math.floor(Number(formWatcher.priceMin));
                const maxFormPrice = Math.floor(Number(formWatcher.priceMax));

                setValuePrice((prev) => [
                  prev[0],
                  Math.sign(maxFormPrice) === -1 &&
                  Number.isInteger(maxFormPrice)
                    ? MAX_PRICE
                    : maxFormPrice > MAX_PRICE || maxFormPrice < minFormPrice
                    ? MAX_PRICE
                    : maxFormPrice,
                ]);
              }}
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
        <StyledEngineProvider injectFirst>
          <Slider
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={50}
            value={valuePrice}
            valueLabelDisplay="auto"
            onChange={handlePriceSliderChange}
          />
        </StyledEngineProvider>
      </div>
      <div className="my-training-form__block my-training-form__block--calories">
        <h4 className="my-training-form__block-title">Калории</h4>
        <div className="filter-calories">
          <div className="filter-calories__input-text filter-calories__input-text--min">
            <input
              type="number"
              id="text-min-cal"
              defaultValue={valueCalories[0]}
              {...register('caloriesMin')}
              onKeyDown={(evt) => {
                if (evt.key === 'Enter') {
                  evt.preventDefault();
                }
              }}
              onBlur={() => {
                const minFormCalories = Math.floor(
                  Number(formWatcher.caloriesMin)
                );
                const maxFormCalories = Math.floor(
                  Number(formWatcher.caloriesMax)
                );

                setValueCalories((prev) => [
                  Math.sign(minFormCalories) === -1 &&
                  Number.isInteger(minFormCalories)
                    ? MIN_CALORIES
                    : minFormCalories > MAX_CALORIES ||
                      minFormCalories > maxFormCalories ||
                      minFormCalories < MIN_CALORIES
                    ? MIN_CALORIES
                    : minFormCalories,
                  prev[1],
                ]);
              }}
            />
            <label htmlFor="text-min-cal">от</label>
          </div>
          <div className="filter-calories__input-text filter-calories__input-text--max">
            <input
              type="number"
              id="text-max-cal"
              defaultValue={valueCalories[1]}
              {...register('caloriesMax')}
              onKeyDown={(evt) => {
                if (evt.key === 'Enter') {
                  evt.preventDefault();
                }
              }}
              onBlur={() => {
                const minFormCalories = Math.floor(
                  Number(formWatcher.caloriesMin)
                );
                const maxFormCalories = Math.floor(
                  Number(formWatcher.caloriesMax)
                );

                setValueCalories((prev) => [
                  prev[0],
                  Math.sign(maxFormCalories) === -1 &&
                  Number.isInteger(maxFormCalories)
                    ? MAX_CALORIES
                    : maxFormCalories > MAX_CALORIES ||
                      maxFormCalories < minFormCalories
                    ? MAX_CALORIES
                    : maxFormCalories,
                ]);
              }}
            />
            <label htmlFor="text-max-cal">до</label>
          </div>
        </div>
        <StyledEngineProvider injectFirst>
          <Slider
            min={1000}
            max={5000}
            step={50}
            value={valueCalories}
            valueLabelDisplay="auto"
            onChange={handleCaloriesSliderChange}
          />
        </StyledEngineProvider>
      </div>
      <div className="my-training-form__block my-training-form__block--raiting">
        <h4 className="my-training-form__block-title">Рейтинг</h4>
        <StyledEngineProvider injectFirst>
          <Slider
            min={0}
            max={5}
            step={1}
            value={valueRating}
            valueLabelDisplay="auto"
            onChange={handleRatingSliderChange}
          />
        </StyledEngineProvider>
      </div>
      <div className="my-training-form__block my-training-form__block--duration">
        <h4 className="my-training-form__block-title">Длительность</h4>
        <ul className="my-training-form__check-list">
          {TRAINING_TIMES.map((time) => (
            <li
              key={time}
              className="my-training-form__check-list-item"
            >
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    type="checkbox"
                    value={time}
                    {...register('trainingTime')}
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
                  <span className="custom-toggle__label">{time}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
