import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDayWeather } from '../../store/weather/slice';
import {
  selectDayWeather,
  selectDayWeatherError,
  selectIsDayWeatherLoading,
} from '../../store/weather/selectors';
import { RequestContainer } from '../../components/RequestContainer';
import { SearchInput } from '../../components/SearchInput';
import LinearGradient from 'react-native-linear-gradient';
import WindIcon from '../../assets/icons/Wind';
import HumidityIcon from '../../assets/icons/Humidity';
import PressureIcon from '../../assets/icons/Pressure';
import { APP_STYLES } from '../../constants/styles';
import { WeatherIcon } from '../../components/WeatherIcon';

export function DayWeather() {
  const dispatch = useDispatch();
  const dayData = useSelector(selectDayWeather);
  const isLoading = useSelector(selectIsDayWeatherLoading);
  const isError = useSelector(selectDayWeatherError);
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(getDayWeather(text));
  }, [dispatch, text]);

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#62B8F6', '#2C79C1']} style={styles.weatherBox}>
        <SearchInput
          placeholder="Type Your City"
          value={text}
          onChangeText={setText}
        />
        <RequestContainer isError={isError} isLoading={isLoading}>
          <Text style={styles.city}>{dayData.name}</Text>
          <View>
            <Text style={styles.temperature}>{dayData.main?.temp}</Text>
            <View style={styles.temperatureCircle} />
          </View>

          <View style={styles.textRow}>
            <WeatherIcon
              uri={`https://openweathermap.org/img/wn/${dayData.weather?.[0].icon}.png`}
            />

            <Text style={styles.decription}>
              {dayData.weather?.[0]?.description}
            </Text>
          </View>

          <View style={styles.textRow}>
            <PressureIcon />
            <Text style={styles.decription}>
              pressure: {dayData.main?.pressure} mbar
            </Text>
          </View>

          <View style={styles.textRow}>
            <WindIcon />
            <Text style={styles.decription}>
              wind: {dayData.wind?.speed} km/h
            </Text>
          </View>

          <View style={styles.textRow}>
            <HumidityIcon />
            <Text style={styles.decription}>
              humidity: {dayData.main?.humidity}
            </Text>
          </View>
        </RequestContainer>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  weatherBox: {
    borderRadius: 10,
    padding: 10,
    width: '100%',
    backgroundColor: '#ccc',
    alignItems: 'flex-start',
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {
    fontSize: 55,
    fontFamily: APP_STYLES.typography.font.boldItalic,
    color: '#fff',
    marginTop: 20,
  },
  temperature: {
    fontSize: 45,
    fontFamily: APP_STYLES.typography.font.bold,
    color: '#fff',
  },
  temperatureCircle: {
    position: 'absolute',
    top: 0,
    right: -25,
    width: 20,
    height: 20,
    borderWidth: 5,
    borderRadius: 50,
    borderColor: '#fff',
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  decription: {
    fontSize: 25,
    fontFamily: APP_STYLES.typography.font.regular,
    color: '#fff',
  },
});
