import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { Host } from 'react-native-portalize';
import { RootNavigation } from './src/navigation';
import { store } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaView style={styles.root}>
          {/* HOST FOR PORTALING BOTTOMSHET TO AVOID NAVIGATION HEADER OVERFLOW */}
          <Host>
            <RootNavigation />
          </Host>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
