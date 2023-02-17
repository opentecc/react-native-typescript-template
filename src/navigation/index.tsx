import {NavigationContainer} from '@react-navigation/native';
import {useColorModeValue, useTheme} from 'native-base';
import * as React from 'react';
import DrawerNavigator from '../layout/Main/Drawer';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  const {colors} = useTheme();
  const MyTheme = {
    dark: true,
    colors: {
      primary: useColorModeValue(colors.primary[200], colors.warmGray[200]),
      background: useColorModeValue(colors.light[50], colors.warmGray[800]),
      card: useColorModeValue(colors.primary[600], colors.dark[50]),
      text: useColorModeValue(colors.dark[100], colors.dark[800]),
      border: useColorModeValue(colors.primary[600], colors.dark[50]),
      notification: 'rgb(255, 69, 58)',
    },
  };

  return (
    <NavigationContainer linking={LinkingConfiguration} theme={MyTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
