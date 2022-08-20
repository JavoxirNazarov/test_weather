import { RootState } from '..';

export const selectIsDayWeatherLoading = (state: RootState) => {
  return state.dayWeather.meta.loading;
};

export const selectDayWeatherError = (state: RootState) => {
  return state.dayWeather.meta.error;
};

export const selectDayWeather = (state: RootState) => {
  return state.dayWeather.data;
};

export const selectIsForecastLoading = (state: RootState) => {
  return state.forecast.meta.loading;
};

export const selectForecastError = (state: RootState) => {
  return state.forecast.meta.error;
};

export const selectForecast = (state: RootState) => {
  return state.forecast.data;
};
