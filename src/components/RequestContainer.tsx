import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
  isError: string | null;
  isLoading: boolean;
  children: ReactNode;
}

export function RequestContainer({ isError, isLoading, children }: Props) {
  if (isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{isError}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={'red'} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
  },
  error: { color: 'red' },
});
