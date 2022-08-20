import React, { useRef } from 'react';
import { Calendar } from '../../components/Calendar';
import { RootStackScreenProps } from '../interfaces';
import { BottomSheetRef } from '../../components/BottomSheet/interfaces';
import { BottomSheet } from '../../components/BottomSheet';
import { Button, View } from 'react-native';
import { ForecastList } from '../../components/ForecastList';

export function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const bottomSheet = useRef<BottomSheetRef>(null);

  return (
    <View style={{ flex: 1 }}>
      <Calendar navigation={navigation} />
      <Button
        onPress={() => bottomSheet.current?.showModal()}
        title="Show Forecast"
      />
      <BottomSheet ref={bottomSheet} children={() => <ForecastList />} />
    </View>
  );
}
