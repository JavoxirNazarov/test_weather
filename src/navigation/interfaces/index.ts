import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStack = {
  Home: undefined;
  DayWeather: { date: string };
};

export type RootStackScreenProps<T extends keyof RootStack> =
  NativeStackScreenProps<RootStack, T>;
