import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainAppNavigationProp } from '../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';

const MoreOptions: React.FC = () => {
  const navigation = useNavigation<MainAppNavigationProp>();

  const moreOptions = [
    {
      id: 'franchise-plan',
      title: 'Franchise Plan',
      subtitle: 'View subscription plans and details',
      icon: 'crown',
      color: 'bg-gradient-to-r from-pink-500 to-purple-600',
      textColor: 'text-white',
      onPress: () => navigation.navigate('FranchisePlan'),
    },
    {
      id: 'profile',
      title: 'Profile',
      subtitle: 'Manage your account settings',
      icon: 'user',
      color: 'bg-blue-500',
      textColor: 'text-white',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      id: 'settings',
      title: 'Settings',
      subtitle: 'App preferences and configuration',
      icon: 'cog',
      color: 'bg-gray-500',
      textColor: 'text-white',
      onPress: () => {},
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get assistance and contact support',
      icon: 'question-circle',
      color: 'bg-green-500',
      textColor: 'text-white',
      onPress: () => {},
    },
    {
      id: 'about',
      title: 'About Us',
      subtitle: 'Learn more about PRNV Services',
      icon: 'info-circle',
      color: 'bg-purple-500',
      textColor: 'text-white',
      onPress: () => {},
    },
    {
      id: 'logout',
      title: 'Logout',
      subtitle: 'Sign out of your account',
      icon: 'sign-out',
      color: 'bg-red-500',
      textColor: 'text-white',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 rounded-b-3xl">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">More Options</Text>
          <View className="w-6" />
        </View>
        
        <View className="items-center">
          <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-3">
            <Icon name="bars" size={32} color="white" />
          </View>
          <Text className="text-white text-2xl font-bold mb-2">Menu</Text>
          <Text className="text-white text-center opacity-90">
            Access additional features and settings
          </Text>
        </View>
      </View>

      {/* Options List */}
      <View className="px-4 -mt-6">
        <View className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Available Options</Text>
          
          <View className="space-y-3">
            {moreOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={option.onPress}
                className={`${option.color} p-4 rounded-xl shadow-sm`}
              >
                <View className="flex-row items-center">
                  <View className="bg-white/20 p-3 rounded-lg mr-4">
                    <Icon name={option.icon} size={24} color="white" />
                  </View>
                  <View className="flex-1">
                    <Text className={`${option.textColor} text-lg font-semibold`}>
                      {option.title}
                    </Text>
                    <Text className={`${option.textColor} opacity-90 text-sm`}>
                      {option.subtitle}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={20} color="white" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</Text>
          
          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity className="bg-blue-100 w-[48%] p-4 rounded-xl mb-3 items-center">
              <Icon name="download" size={24} color="#3b82f6" />
              <Text className="text-blue-600 font-semibold mt-2">Download App</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-green-100 w-[48%] p-4 rounded-xl mb-3 items-center">
              <Icon name="share" size={24} color="#10b981" />
              <Text className="text-green-600 font-semibold mt-2">Share App</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-purple-100 w-[48%] p-4 rounded-xl mb-3 items-center">
              <Icon name="star" size={24} color="#8b5cf6" />
              <Text className="text-purple-600 font-semibold mt-2">Rate App</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-orange-100 w-[48%] p-4 rounded-xl mb-3 items-center">
              <Icon name="envelope" size={24} color="#f97316" />
              <Text className="text-orange-600 font-semibold mt-2">Contact Us</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">App Information</Text>
          
          <View className="space-y-3">
            <View className="flex-row justify-between items-center p-3 bg-gray-50 rounded-lg">
              <Text className="text-gray-600">App Version</Text>
              <Text className="text-gray-800 font-semibold">1.0.0</Text>
            </View>
            
            <View className="flex-row justify-between items-center p-3 bg-gray-50 rounded-lg">
              <Text className="text-gray-600">Build Number</Text>
              <Text className="text-gray-800 font-semibold">2025.08.02</Text>
            </View>
            
            <View className="flex-row justify-between items-center p-3 bg-gray-50 rounded-lg">
              <Text className="text-gray-600">Last Updated</Text>
              <Text className="text-gray-800 font-semibold">Today</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MoreOptions; 