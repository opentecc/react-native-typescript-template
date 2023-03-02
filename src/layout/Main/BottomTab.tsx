import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../../types';
import { BottomTabRouter } from '../../navigation/routes';
import { Pressable, theme, useTheme } from 'native-base';
import { useColorModeValue } from 'native-base';
import CustomIcon from '../../components/Icon';
import Chat from '../../screens/chat/chat';
const BottomTab = createBottomTabNavigator<RootTabParamList>();


export default function BottomTabNavigator() {
  const { colors } = useTheme();
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
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={navigation.toggleDrawer}>
            <CustomIcon
              margin={5}
              name="bars"
              provider="FontAwesome"
              color={Colors.tabBarInactiveTintColor}
              size={6}
            />
          </Pressable>
        ),
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
        },
      })}
    >
      {BottomTabRouter.map((tab, index) => {
        return (
          <BottomTab.Screen
            key={index}
            name={tab.path.name}
            component={tab.path.components}
            options={props => tab.options({ ...props })}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}
