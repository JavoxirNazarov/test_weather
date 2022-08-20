import React from 'react';
import FastImage from 'react-native-fast-image';

export function WeatherIcon({ uri }: { uri: string }) {
  return (
    <FastImage
      style={{ width: 40, height: 40 }}
      source={{ uri }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
}
