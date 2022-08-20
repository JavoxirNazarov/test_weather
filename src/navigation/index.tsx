import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './screens/Home';
import { DayWeather } from './screens/DayWeather';
import { RootStack } from './interfaces';

const Stack = createNativeStackNavigator<RootStack>();

export function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="DayWeather"
          component={DayWeather}
          options={({ route }) => ({ title: route.params.date })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
