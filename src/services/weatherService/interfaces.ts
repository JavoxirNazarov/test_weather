interface WheateherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coordinates {
  lon: number;
  lat: number;
}
interface MainWeatherData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface DayWeather {
  coord: Coordinates;
  weather: WheateherDescription[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastWeather {
  cod: string;
  message: number;
  cnt: number;
  list: DayWeather[];
  city: {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastMap {
  data: DayWeather[];
  title: string;
}
