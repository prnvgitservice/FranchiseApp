import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import Lohi from '../screens/Lohi';
import ProfileScreen from '../screens/ProfileScreen';
import FranchisePlan from '../screens/FranchisePlan';
import MoreOptions from '../screens/MoreOptions';
import { MainAppStackParamList } from './types';

const Stack = createNativeStackNavigator<MainAppStackParamList>();

export default function MainAppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3b82f6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Franchise Dashboard",
          headerShown: true
        }}
      />
      <Stack.Screen
        name="Lohi"
        component={Lohi}
        options={{
          title: "Lohi Screen",
          headerShown: true
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: true
        }}
      />
      <Stack.Screen
        name="FranchisePlan"
        component={FranchisePlan}
        options={{
          title: "Franchise Plan",
          headerShown: false
        }}
      />
      <Stack.Screen
        name="MoreOptions"
        component={MoreOptions}
        options={{
          title: "More Options",
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
} 