import { ChangeEvent, useEffect, useState } from 'react';
import { Slider, debounce } from '@mui/material';
import { StyledEngineProvider } from '@mui/material';
import { throttle } from 'lodash';
import { useForm } from 'react-hook-form';
import { AxiosError, AxiosResponse } from 'axios';
import './GlobalCssSlider.css';
import { TRAINING_TIMES } from 'src/components/constant-components';
import { RESTService, createAppApi } from 'src/services/app.api';
import { APIRoute } from 'src/constant';
import { useAppDispatch } from 'src/hooks/store.hooks';
import { changeWorkoutFilterValue } from 'src/store/workout-filter/workout-filter';
import {
  setStateErrorServer,
  setStateLoadingServer,
  setStatePageNumber,
  setStateWorkouts,
} from 'src/store/workouts/workouts';
import { ErrorResponse } from 'src/types/error-response';

type Inputs = {
  priceMin: string;
  priceMax: string;
  caloriesMin: string;
  caloriesMax: string;
  ratingMin: string;
  ratingMax: string;
  trainingTime: string[];
};

const MIN_RATING = 0;
const MAX_RATING = 5;
const MIN_CALORIES = 1000;
const MAX_CALORIES = 5000;
let minPrice = 0;
let maxPrice = 0;

export default function CoachTrainingFilterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [valuePrice, setValuePrice] = useState<number[]>([minPrice, maxPrice]);
  const [valueCalories, setValueCalories] = useState([
    MIN_CALORIES,
    MAX_CALORIES,
  ]);
  const [valueRating, setValueRating] = useState([MIN_RATING, MAX_RATING]);
  const [valueTimeTraining, setValueTimeTraining] = useState({
    '10-30 мин': false,
    '30-50 мин': false,
    '50-80 мин': false,
    'больше 80 мин': false,
  });

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
        minPrice = price._min.cost;
        maxPrice = price._max.cost;
        dispatch(setStateLoadingServer(false));
        setValuePrice([minPrice, maxPrice]);
      } catch (err) {
        const error = err as AxiosError;
        const errorResponse = error?.response as AxiosResponse<ErrorResponse>;

        if (errorResponse) {
          dispatch(setStateErrorServer(errorResponse.data.message));
        }

        if (!errorResponse) {
          dispatch(setStateErrorServer(error.message));
        }

        dispatch(setStateLoadingServer(false));
      }
    };
    getMinMaxPrice();
  }, [dispatch]);

  useEffect(() => {
    setValue('priceMin', valuePrice[0].toString());
    setValue('priceMax', valuePrice[1].toString());
    setValue('caloriesMin', valueCalories[0].toString());
    setValue('caloriesMax', valueCalories[1].toString());
    setValue('ratingMin', valueRating[0].toString());
    setValue('ratingMax', valueRating[1].toString());

    dispatch(setStateWorkouts([]));
    dispatch(setStateLoadingServer(true));
    dispatch(setStatePageNumber(1));
    dispatch(setStateErrorServer(null));

    dispatch(
      changeWorkoutFilterValue({
        costs: valuePrice,
        calories: valueCalories,
        ratings: valueRating,
        trainingTimes: Object.entries(valueTimeTraining)
          .map((keyValue) => {
            if (keyValue[1]) {
              return keyValue[0];
            }
            return null;
          })
          .filter((value) => Boolean(value)),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, valueCalories, valuePrice, valueRating, valueTimeTraining]);

  const handlePriceSliderChange = throttle(
    (_event: Event, newValue: number | number[]) =>
      setValuePrice(newValue as number[]),
    50,
    { leading: false, trailing: true }
  );

  const handleCaloriesSliderChange = throttle(
    (_event: Event, newValue: number | number[]) => {
      setValueCalories(newValue as number[]);
    },
    50,
    { leading: false, trailing: true }
  );

  const handleRatingSliderChange = (
    _event: Event,
    newValue: number | number[],
    _activeThumb: number
  ) => {
    setValueRating(newValue as number[]);
  };

  const handleTrainingTimeChange = debounce(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setValueTimeTraining({
        ...valueTimeTraining,
        [evt.target.name]: evt.target.checked,
      });
    },
    300
  );

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
                    ? minPrice
                    : minFormPrice > maxPrice || minFormPrice > maxFormPrice
                    ? minPrice
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
                    ? maxPrice
                    : maxFormPrice > maxPrice || maxFormPrice < minFormPrice
                    ? maxPrice
                    : maxFormPrice,
                ]);
              }}
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
        <StyledEngineProvider injectFirst>
          <Slider
            min={minPrice}
            max={maxPrice}
            step={100}
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
            step={100}
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
                    value="duration-1"
                    name={time}
                    onChange={handleTrainingTimeChange}
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
