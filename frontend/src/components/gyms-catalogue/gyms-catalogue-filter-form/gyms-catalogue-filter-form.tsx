import { ChangeEvent, useEffect, useState } from 'react';
import { Slider, debounce } from '@mui/material';
import { StyledEngineProvider } from '@mui/material';
import { capitalize, throttle } from 'lodash';
import { useForm } from 'react-hook-form';
import { AxiosError, AxiosResponse } from 'axios';
import '../../GlobalCssSlider.css';
import { GYM_FEATURES, LOCATIONS } from 'src/components/constant-components';
import { RESTService, createAppApi } from 'src/services/app.api';
import { useAppDispatch } from 'src/hooks/store.hooks';
import {
  setStateErrorServer,
  setStateLoadingServer,
  setStatePageNumber,
  setStateGyms,
} from 'src/store/gyms/gyms';
import { ErrorResponse } from 'src/types/error-response';
import {
  getArrayWithTruthyKeysFromObject,
  getObjectWithKeysFromList,
} from 'src/utils/helpers';
import { APIRoute } from 'src/constant';
import { changeGymFilterValue } from 'src/store/gym-filter/gym-filter';

type Inputs = {
  priceMin: string;
  priceMax: string;
};

type FilterFormValue = {
  location: Record<string, boolean>;
  feature: Record<string, boolean>;
  isOficial: boolean;
};

const INITIAL_COUNT_CHECKBOXES = 3;

const REPLACED_LOCATIONS = LOCATIONS.map((location) =>
  location.replace('ст. м. ', '')
);

const FILTER_DEFAULT_VALUE = {
  location: getObjectWithKeysFromList(REPLACED_LOCATIONS),
  feature: getObjectWithKeysFromList(GYM_FEATURES),
  isOficial: false,
};

let minPrice = 0;
let maxPrice = 0;

export default function GymsCatalogueFilterForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [filterFormState, setFilterFormState] =
    useState<FilterFormValue>(FILTER_DEFAULT_VALUE);

  const [valuePrice, setValuePrice] = useState<number[]>([minPrice, maxPrice]);

  const [countLocationCheckboxes, setCountLocationCheckboxes] = useState(
    INITIAL_COUNT_CHECKBOXES
  );

  const { register, setValue, watch } = useForm<Inputs>({
    mode: 'onChange',
  });

  const formWatcher = watch();

  useEffect(() => {
    const getMinMaxPrice = async () => {
      try {
        const api = createAppApi(RESTService.Workouts);
        const { data: price } = await api.get(
          `${APIRoute.Gyms}?minMaxPrice=true`
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

    dispatch(setStateGyms([]));
    dispatch(setStateLoadingServer(true));
    dispatch(setStatePageNumber(1));
    dispatch(setStateErrorServer(null));

    const locationsQuery = getArrayWithTruthyKeysFromObject(
      filterFormState.location
    ).map((location) => capitalize(location));

    const featuresQuery = getArrayWithTruthyKeysFromObject(
      filterFormState.feature
    ).map((feature) => {
      if (feature === 'парковка') {
        return feature.padStart(19, 'бесплатная ').toLowerCase();
      }
      return feature.toLowerCase();
    });

    dispatch(
      changeGymFilterValue({
        isOficial: filterFormState.isOficial,
        costs: valuePrice,
        locations: locationsQuery,
        features: featuresQuery,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, valuePrice, filterFormState]);

  const handlePriceSliderChange = throttle(
    (_event: Event, newValue: number | number[]) =>
      setValuePrice(newValue as number[]),
    50,
    { leading: false, trailing: true }
  );

  const handleLocationChange = debounce(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setFilterFormState((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [evt.target.name]: evt.target.checked,
        },
      }));
    },
    150
  );

  const handleFeatureChange = debounce((evt: ChangeEvent<HTMLInputElement>) => {
    setFilterFormState((prev) => ({
      ...prev,
      feature: {
        ...prev.feature,
        [evt.target.name]: evt.target.checked,
      },
    }));
  }, 150);

  const handleIsOficialChange = debounce(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setFilterFormState((prev) => ({
        ...prev,
        isOficial: evt.target.checked,
      }));
    },
    350
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
      <div className="gym-hall-form__block gym-hall-form__block--location">
        <h4 className="gym-hall-form__block-title">Локация, станция метро</h4>
        <ul className="gym-hall-form__check-list">
          {REPLACED_LOCATIONS.slice(0, countLocationCheckboxes).map(
            (location) => (
              <li
                key={location}
                className="gym-hall-form__check-list-item"
              >
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value="location-1"
                      name={location.toLowerCase()}
                      onChange={handleLocationChange}
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
                    <span className="custom-toggle__label">{location}</span>
                  </label>
                </div>
              </li>
            )
          )}
        </ul>
        <button
          className="btn-show-more gym-hall-form__btn-show"
          type="button"
          onClick={(evt) => {
            evt.currentTarget.style.display = 'none';
            setCountLocationCheckboxes(REPLACED_LOCATIONS.length);
          }}
        >
          <span>Посмотреть все</span>
          <svg
            className="btn-show-more__icon"
            width="10"
            height="4"
            aria-hidden="true"
          >
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      </div>
      <div className="gym-hall-form__block gym-hall-form__block--addition">
        <h4 className="gym-hall-form__block-title">Дополнительно</h4>
        <ul className="gym-hall-form__check-list">
          {GYM_FEATURES.map((feature) => (
            <li
              key={feature}
              className="gym-hall-form__check-list-item"
            >
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input
                    type="checkbox"
                    value="addition-1"
                    name={feature.toLowerCase()}
                    onChange={handleFeatureChange}
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
                  <span className="custom-toggle__label">{feature}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="gym-hall-form__block">
        <h3 className="gym-hall-form__title gym-hall-form__title--status">
          Статус
        </h3>
        <div className="custom-toggle custom-toggle--switch">
          <label>
            <input
              type="checkbox"
              value="status-1"
              name="isOficial"
              onChange={handleIsOficialChange}
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
            <span className="custom-toggle__label">Только проверенные</span>
          </label>
        </div>
      </div>
    </form>
  );
}
