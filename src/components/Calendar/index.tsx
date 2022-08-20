import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { RootStackScreenProps } from '../../navigation/interfaces';
import { months, nDays, weekDays } from './constants';
import { APP_STYLES } from '../../constants/styles';

interface Props {
  navigation: RootStackScreenProps<'Home'>['navigation'];
}

export const Calendar = ({ navigation }: Props) => {
  const [activeDate, setActiveDate] = useState(new Date());

  const onPress = (day: number) => {
    const dateStr = `${activeDate.getFullYear()} ${
      months[activeDate.getMonth()]
    } ${day}`;

    navigation.navigate('DayWeather', { date: dateStr });
  };

  const changeMonth = (step: number) => {
    const copyDate = new Date(activeDate);

    setActiveDate(new Date(copyDate.setMonth(copyDate.getMonth() + step)));
  };

  const matrixMap = useMemo(() => {
    var matrix: (string | number)[][] = [];
    // Create header
    matrix[0] = weekDays;

    var year = activeDate.getFullYear();
    var month = activeDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();

    var maxDays = nDays[month];
    if (month === 1) {
      // February
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }

    var counter = 1;
    for (var row = 1; row < 6; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  }, [activeDate]);

  const renderRows = matrixMap.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <TouchableOpacity
          key={`col_${item}_${colIndex}`}
          disabled={rowIndex === 0 || item < 1}
          style={[
            styles.rowItem,
            { backgroundColor: rowIndex === 0 ? '#ddd' : '#fff' },
          ]}
          onPress={() => {
            onPress(item as number);
          }}>
          <Text style={{ color: colIndex === 0 ? '#a00' : '#000' }}>
            {item !== -1 ? item : ''}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.rowItems} key={`row_${row}_${rowItems}`}>
        {rowItems}
      </View>
    );
  });

  return (
    <>
      <Text style={styles.date}>
        {months[activeDate.getMonth()]} &nbsp;
        {activeDate.getFullYear()}
      </Text>
      {renderRows}

      <Button title="Previous" onPress={() => changeMonth(-1)} />

      <Button title="Next" onPress={() => changeMonth(+1)} />
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: APP_STYLES.typography.font.boldItalic,
    marginTop: 10,
  },
  rowItem: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowItems: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
