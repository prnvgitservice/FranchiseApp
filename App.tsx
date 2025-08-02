import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import AppNavigator from './src/nativgation/AppNavigator';
import LoginScreen from './src/screens/LoginScreen';
import './global.css'
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

// Type definitions for root stack
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Mock auth state

  // Mock login function (replace with real auth in production)
  const handleLogin = () => setIsLoggedIn(true);
  // Mock demo mode
  const handleDemo = () => setIsLoggedIn(true);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'MainApp' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} onLogin={handleLogin} onDemo={handleDemo} />}
        </Stack.Screen>
        <Stack.Screen name="MainApp" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;