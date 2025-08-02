import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
};

export type MainAppStackParamList = {
  Dashboard: undefined;
  Lohi: undefined;
  Profile: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type MainAppNavigationProp = NativeStackNavigationProp<MainAppStackParamList>; 