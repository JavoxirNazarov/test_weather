import { fetchData } from '..';
import { API_KEY, BASE_URL } from '../../constants/api';
import { DayWeather, ForecastWeather } from './interfaces';

export class WeatherService {
  static getDayWeather(city: string) {
    return fetchData<DayWeather>(
      `${BASE_URL}/data/2.5/weather?&appid=${API_KEY}&units=metric&q=${city}`,
    );
  }

  static getForecastWeather() {
    return fetchData<ForecastWeather>(
      `${BASE_URL}/data/2.5/forecast?&appid=${API_KEY}&units=metric&q=tashkent&cnt=14`,
    );
  }
}
