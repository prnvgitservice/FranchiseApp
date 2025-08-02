import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import MainAppNavigator from './MainAppNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={Login} 
      />
      <Stack.Screen 
        name="MainApp" 
        component={MainAppNavigator} 
      />
    </Stack.Navigator>
  );
}
