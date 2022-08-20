import {
  ForecastMap,
  ForecastWeather,
} from '../../services/weatherService/interfaces';

// transform data from api to sectionlist data array
export const normalizeForecast = (forecast: ForecastWeather): ForecastMap[] => {
  const result: ForecastMap[] = [
    { title: 'first week', data: [] },
    { title: 'second week', data: [] },
  ];

  forecast.list.forEach((data, index) => {
    // we know the array is fixed so we cam divide it to two weeks
    result[index < 7 ? 0 : 1].data.push(data);
  });

  return result;
};
