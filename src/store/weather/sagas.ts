import {
  all,
  call,
  cancel,
  delay,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { WeatherService } from '../../services/weatherService';
import {
  DayWeather,
  ForecastWeather,
} from '../../services/weatherService/interfaces';
import { normalizeForecast } from './normalizers';
import {
  getDayWeather,
  getDayWeatherError,
  getDayWeatherResponse,
  getForecast,
  getForecastError,
  getForecastResponse,
} from './slice';

function* fetchDayWeather(searchCity: string) {
  try {
    const searching = searchCity.trim().length > 0;
    const cityValue = searching ? searchCity : 'tashkent';
    if (searching) {
      yield delay(500);
    }
    const data: DayWeather = yield call(
      WeatherService.getDayWeather,
      cityValue,
    );
    yield put(getDayWeatherResponse(data));
  } catch (e: any) {
    yield put(getDayWeatherError(e.message));
  }
}

function* fetchForecast() {
  try {
    const data: ForecastWeather = yield call(WeatherService.getForecastWeather);

    const forecastMap = normalizeForecast(data);

    yield put(getForecastResponse(forecastMap));
  } catch (e: any) {
    yield put(getForecastError(e.message));
  }
}

function* watchDayWeatherRequest() {
  let task: any;

  while (true) {
    const { payload } = yield take(getDayWeather.type);
    if (task) {
      yield cancel(task);
    }

    task = yield fork(fetchDayWeather, payload);
  }
}

function* watchForecastRequest() {
  yield takeLatest(getForecast.type, fetchForecast);
}

export function* weatherSaga() {
  yield all([watchDayWeatherRequest(), watchForecastRequest()]);
}
