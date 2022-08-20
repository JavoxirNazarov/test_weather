import { SectionList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectForecast,
  selectForecastError,
  selectIsForecastLoading,
} from '../../store/weather/selectors';
import { RequestContainer } from '../RequestContainer';
import { getForecast } from '../../store/weather/slice';
import { DayWeather } from '../../services/weatherService/interfaces';
import { APP_STYLES } from '../../constants/styles';
import { weekDays } from '../Calendar/constants';
import { WeatherIcon } from '../WeatherIcon';

const Item = ({ data, index }: { data: DayWeather; index: number }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{weekDays[index]}:</Text>
      <Text style={styles.title}>{data?.main?.temp}°</Text>
      <WeatherIcon
        uri={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
      />
      <Text style={styles.title}>{data.weather[0].description}</Text>
    </View>
  );
};

export const ForecastList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsForecastLoading);
  const isError = useSelector(selectForecastError);
  const forecast = useSelector(selectForecast);

  useEffect(() => {
    dispatch(getForecast());
  }, [dispatch]);

  return (
    <RequestContainer isError={isError} isLoading={isLoading}>
      <SectionList
        sections={forecast}
        keyExtractor={item => item.dt.toString()}
        renderItem={({ item, index }) => <Item data={item} index={index} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </RequestContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
    fontFamily: APP_STYLES.typography.font.boldItalic,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    width: 100,
  },
});
