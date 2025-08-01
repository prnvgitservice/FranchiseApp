import { NavigationProp, MainAppNavigationProp } from './types';

// Root navigation utilities
export const navigateToLogin = (navigation: NavigationProp) => {
  navigation.navigate('Login');
};

export const navigateToMainApp = (navigation: NavigationProp) => {
  navigation.navigate('MainApp');
};

// Main app navigation utilities
export const navigateToDashboard = (navigation: MainAppNavigationProp) => {
  navigation.navigate('Dashboard');
};

export const navigateToLohi = (navigation: MainAppNavigationProp) => {
  navigation.navigate('Lohi');
};

export const goBack = (navigation: MainAppNavigationProp) => {
  navigation.goBack();
}; 