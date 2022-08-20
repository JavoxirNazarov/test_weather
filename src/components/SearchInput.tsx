import {
  TouchableWithoutFeedback,
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export function SearchInput(props: TextInputProps) {
  const inpuRef = useRef<TextInput>(null);

  const focusInput = () => {
    inpuRef.current?.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={focusInput}>
      <View style={styles.container}>
        <TextInput {...props} ref={inpuRef} style={styles.input} />
        <Icon name="search" size={20} color="#ccc" style={styles.icon} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '100%',
    height: 30,
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    height: 30,
    paddingVertical: 0,
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 5,
  },
});
