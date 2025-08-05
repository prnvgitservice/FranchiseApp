import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define Root Stack Param List (same as in AppNavigator)
type RootStackParamList = {
  Tabs: undefined;
  Technicians: undefined;
  FranchisePlan: undefined;
  AboutUs: undefined;
  KeyFeatures: undefined;
  AllSubscriptions: undefined;
  LeaveReview: undefined;
  Login: undefined;
};

// Navigation Prop Type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MoreOptionsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    console.log('MoreOptionsScreen rendered');
  }, []);

  const options = [
    { icon: 'people-outline', title: 'Technicians', screen: 'Technicians' },
    { icon: 'card-outline', title: 'Franchise Plan', screen: 'FranchisePlan' },
    { icon: 'information-circle-outline', title: 'About us', screen: 'AboutUs' },
    { icon: 'bulb-outline', title: 'Key Features', screen: 'KeyFeatures' },
    { icon: 'pricetags-outline', title: 'All Subscriptions', screen: 'AllSubscription' },
    {
      icon: 'log-out-outline',
      title: 'Logout',
      action: () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Logout',
              onPress: () =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                }),
            },
          ],
          { cancelable: true }
        );
      },
    },
    { icon: 'chatbubble-outline', title: 'Leave a Review', screen: 'LeaveReview' },
  ];

  const handleOptionPress = (screen?: string, action?: () => void) => {
    if (action) {
      action();
    } else if (screen) {
      navigation.navigate(screen); // Use navigate instead of replace
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900">More Options</Text>
            <Text className="text-sm text-gray-500">Manage your account and services</Text>
          </View>
          <View className="bg-white rounded-xl shadow-md">
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center justify-between py-4 px-4 border-b border-gray-200 last:border-b-0"
                onPress={() => handleOptionPress(item.screen, item.action)}
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
                    <Ionicons name={item.icon} size={20} color="#6B7280" />
                  </View>
                  <Text className="text-base font-medium text-gray-700">{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MoreOptionsScreen;