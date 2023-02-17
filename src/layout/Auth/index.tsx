import createNativeStackNavigator from '@react-navigation/native-stack/lib/typescript/src/navigators/createNativeStackNavigator';
import React from 'react';
import {RootStackParamList} from '../../../types';
import LoginScreen from '../../screens/Auth/LoginScreen';
interface MainLayoutProps {
  children: JSX.Element;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthLayout({children}: MainLayoutProps): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      {children}
    </Stack.Navigator>
  );
}
