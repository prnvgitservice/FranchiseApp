import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Dashboard from '../screens/Dashboard';
import CategoryScreen from '../screens/CategoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MoreOptionsScreen from '../screens/MoreOptionsScreen';
import EarningsScreen from '../screens/EarningsScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import KeyFeaturesScreen from '../screens/KeyFeatures';
import TechniciansScreen from '../screens/TechniciansScreen';
import FranchisePlan from '../screens/FranchisePlan';
import SubscriptionPage from '../screens/SubscriptionPage';
import ViewAllPlans from '../screens/ViewAllPlans';
// import DashboardScreen from '../screens/DashboardScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import CategoryScreen from '../screens/CategoryScreen';
// import MoreOptionsScreen from '../screens/MoreOptionsScreen';
// import ServicesScreen from '../screens/ServicesScreen'; // Import or create these screens
// import PhotosScreen from '../screens/PhotosScreen';
// import LoginScreen from '../screens/LoginScreen';
// import ReviewsScreen from '../screens/ReviewsScreen';
// import MySubscriptionScreen from '../screens/MySubscriptionScreen';
// import AllSubscriptionsScreen from '../screens/AllSubscriptions';
// import ViewPlanCard from '../components/ViewPlanCard';
// import AboutUsScreen from '../screens/AboutUsScreen';
// import KeyFeaturesScreen from '../screens/KeyFeaturesScreen';
// import CreateReviewScreen from '../screens/CreateReview';
// import FranchiseScreen from '../screens/FranchiseScreen';
// import TransactionsScreen from '../screens/TransactionsScreen';

// Define Stack Param List
type RootStackParamList = {
  Tabs: undefined;
  Services: undefined;
  Photos: undefined;
  Reviews: undefined;
  MySubscription: undefined;
  AboutUs: undefined;
  KeyFeatures: undefined;
  Technicians: undefined;
  AllSubscriptions: undefined;
  Franchise: undefined;
  LeaveReview: undefined;
  Login: undefined;
};

// Define Tab Param List
type TabParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Category: undefined;
  Earnings: undefined;
  More: undefined;
};

// Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();
// Tab Navigator
const Tab = createBottomTabNavigator<TabParamList>();

// Tab Navigator Component
const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Category') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Earnings') {
            iconName = focused ? 'cash' : 'cash-outline';
          }else if (route.name === 'More') {
            iconName = focused ? 'menu' : 'menu-outline';
          } else {
            iconName = 'ellipse';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerStyle: { backgroundColor: '#2563EB' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Category" component={CategoryScreen} options={{ title: 'Category' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
      <Tab.Screen name="Earnings" component={EarningsScreen} options={{ title: 'Earnigs' }} />
      <Tab.Screen
        name="More"
        component={MoreOptionsScreen}
        options={{ title: 'More' }}
      />
    </Tab.Navigator>
  );
};

// Root Stack Navigator
const AppNavigator: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white mb-12">
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#2563EB' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }} // Hide header for tab navigator
        />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ title: 'About Us' }} />
        <Stack.Screen name="KeyFeatures" component={KeyFeaturesScreen} options={{ title: 'Key Features' }} />
        <Stack.Screen name="Technicians" component={TechniciansScreen} options={{ title: 'Technicians' }} />
        <Stack.Screen name="FranchisePlan" component={FranchisePlan} options={{ title: 'Franchise' }} />
        <Stack.Screen name="SubscriptionPage" component={SubscriptionPage} options={{ title: 'Subscription' }} />
        <Stack.Screen name="ViewAllPlans" component={ViewAllPlans} options={{ title: 'All Subscriptions' }} />
        
        {/* <Stack.Screen name="Services" component={ServicesScreen} options={{ title: 'Services' }} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} options={{ title: 'Reviews' }} />
        <Stack.Screen name="AllSubscriptions" component={AllSubscriptionsScreen} options={{ title: 'All Subscriptions' }} />
        <Stack.Screen name="SubscriptionDetails" component={ViewPlanCard} options={{ title: 'Subscription Details' }} />
        <Stack.Screen name="LeaveReview" component={CreateReviewScreen} options={{ title: 'Leave a Review' }} />
        <Stack.Screen name="Franchise" component={FranchiseScreen} options={{ title: 'Franchise' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />  */}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigator;