import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Auth/Login';
import LivenessScreen from "../../screens/Auth/Livness";
const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Liveness" component={LivenessScreen} />
    </Stack.Navigator>
  );
}
