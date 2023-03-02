/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './navigation';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './redux/store';
import ThemeProvider from './theme';

const App = () => {
  return (
    <ThemeProvider>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default App;
