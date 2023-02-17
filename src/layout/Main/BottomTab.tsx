import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../../types';
import {BottomTabRouter} from '../../navigation/routes';
import {useTheme} from 'native-base';
import {useColorModeValue} from 'native-base';
const BottomTab = createBottomTabNavigator<RootTabParamList>();
export default function BottomTabNavigator() {
  const {colors} = useTheme();
  const Colors = {
    backgroundColor: useColorModeValue(colors.primary[600], colors.dark[50]),
    tabBarActiveTintColor: useColorModeValue(
      colors.secondary[50],
      colors.primary[700],
    ),
    tabBarInactiveTintColor: useColorModeValue(
      colors.primary[900],
      colors.primary[50],
    ),
    borderTopColor: useColorModeValue(colors.primary[700], colors.dark[50]),
  };
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.tabBarActiveTintColor,
        tabBarInactiveTintColor: Colors.tabBarInactiveTintColor,
        tabBarStyle: {
          backgroundColor: Colors.backgroundColor,
          borderTopColor: Colors.borderTopColor,
        },
      }}>
      {BottomTabRouter.map((tab, index) => {
        return (
          <BottomTab.Screen
            key={index}
            name={tab.path.name}
            component={tab.path.components}
            options={props => tab.options({...props})}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}
