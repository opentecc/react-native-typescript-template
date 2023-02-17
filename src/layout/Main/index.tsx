import {View} from '../../components/Themed';
import {StyleSheet} from 'react-native';
import React from 'react';
import BottomTabNavigator from './BottomTab';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function MainLayout(WrappedComponent: React.FC) {
  const ComponentWithLayout = (props: any) => {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <WrappedComponent {...props} />
        </View>
      </SafeAreaProvider>
    );
  };

  return ComponentWithLayout;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainLayout(BottomTabNavigator);
