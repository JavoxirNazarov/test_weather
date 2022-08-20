import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DayWeather,
  ForecastMap,
} from '../../services/weatherService/interfaces';

interface MetaData {
  loading: boolean;
  error: string | null;
}

interface InitialState {
  dayWeather: {
    data: Partial<DayWeather>;
    meta: MetaData;
  };
  forecast: {
    data: ForecastMap[];
    meta: MetaData;
  };
}

const initialState: InitialState = {
  dayWeather: {
    data: {},
    meta: { loading: false, error: null },
  },
  forecast: {
    data: [],
    meta: { loading: false, error: null },
  },
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // day weather
    getDayWeather: (state, _action: PayloadAction<string>) => {
      state.dayWeather.meta = { loading: true, error: null };
    },
    getDayWeatherResponse: (state, { payload }: PayloadAction<DayWeather>) => {
      state.dayWeather = {
        data: payload,
        meta: { loading: false, error: null },
      };
    },
    getDayWeatherError: (state, { payload }) => {
      state.dayWeather.meta = { loading: false, error: payload };
    },

    // forecast
    getForecast: state => {
      state.dayWeather.meta = { loading: true, error: null };
    },
    getForecastResponse: (state, { payload }: PayloadAction<ForecastMap[]>) => {
      state.forecast = {
        data: payload,
        meta: { loading: false, error: null },
      };
    },
    getForecastError: (state, { payload }) => {
      state.dayWeather.meta = { loading: false, error: payload };
    },
  },
});

export const {
  actions: {
    // day weather
    getDayWeather,
    getDayWeatherResponse,
    getDayWeatherError,

    // forecast
    getForecast,
    getForecastResponse,
    getForecastError,
  },
  reducer: weatherReducer,
} = weatherSlice;
