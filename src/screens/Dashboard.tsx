import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainAppNavigationProp } from '../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = () => {
  const navigation = useNavigation<MainAppNavigationProp>();

  const kpiData = [
    { title: 'Total Technicians', value: '1', icon: 'users', color: 'bg-blue-500' },
    { title: 'Total Subscriptions', value: '1', icon: 'credit-card', color: 'bg-green-500' },
    { title: 'Total Earnings', value: '₹1,000', icon: 'money', color: 'bg-yellow-500' },
    { title: 'Monthly Earnings', value: '₹0', icon: 'line-chart', color: 'bg-orange-500' },
  ];

  const monthlyEarnings = [
    { month: 'Jan', amount: '₹0k', percentage: 0 },
    { month: 'Feb', amount: '₹0k', percentage: 0 },
    { month: 'Mar', amount: '₹0k', percentage: 0 },
    { month: 'Apr', amount: '₹0k', percentage: 0 },
    { month: 'May', amount: '₹0k', percentage: 0 },
    { month: 'Jun', amount: '₹0k', percentage: 0 },
    { month: 'Jul', amount: '₹1k', percentage: 100 },
    { month: 'Aug', amount: '₹0k', percentage: 0 },
  ];

  const recentEarnings = [
    {
      plan: 'Platinum Plan',
      customer: 'Rama',
      amount: '₹1,000',
      date: '29/07/2025',
      icon: 'user',
    },
    {
      plan: 'Economy Plan',
      customer: 'soujanya',
      amount: '₹1,000',
      date: '29/07/2025',
      icon: 'user',
    },
  ];

  const subscriptionPlans = [
    { name: 'Platinum Plan', technicians: 1, percentage: 33.3, color: '#3b82f6' },
    { name: 'Economy Plan', technicians: 1, percentage: 33.3, color: '#10B981' },
    { name: 'Glod Plan', technicians: 1, percentage: 33.3, color: '#F59E0B' },
  ];

  const getCurrentDate = () => {
    const today = new Date();
    return today.toDateString();
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
      {/* Header */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-blue-700 mb-1">👋 Welcome back, Franchise</Text>
        <Text className="text-base text-blue-700 mb-2">Here's your performance overview for today</Text>
        <Text className="bg-green-500 text-white px-3 py-2 rounded-lg w-max text-sm font-semibold">
          Today's Date: {getCurrentDate()}
        </Text>
      </View>

      {/* KPI Cards - 2 per row */}
      <View className="flex-row justify-between mb-4">
        {kpiData.slice(0, 2).map((item, index) => (
          <View key={index} className="bg-white p-4 rounded-xl shadow w-[48%]">
            <View className="flex-row justify-between items-center mb-2">
              <View className={`${item.color} p-2 rounded-lg`}>
                <Icon name={item.icon} size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">{item.value}</Text>
            </View>
            <Text className="text-gray-600 text-sm">{item.title}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row justify-between mb-4">
        {kpiData.slice(2, 4).map((item, index) => (
          <View key={index} className="bg-white p-4 rounded-xl shadow w-[48%]">
            <View className="flex-row justify-between items-center mb-2">
              <View className={`${item.color} p-2 rounded-lg`}>
                <Icon name={item.icon} size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">{item.value}</Text>
            </View>
            <Text className="text-gray-600 text-sm">{item.title}</Text>
          </View>
        ))}
      </View>

      {/* More Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('MoreOptions')}
        className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl shadow-lg mb-4"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="bg-white/20 p-2 rounded-lg mr-3">
              <Icon name="bars" size={20} color="white" />
            </View>
            <View>
              <Text className="text-white font-semibold text-lg">More Options</Text>
              <Text className="text-white/90 text-sm">Access additional features</Text>
            </View>
          </View>
          <Icon name="chevron-right" size={20} color="white" />
        </View>
      </TouchableOpacity>

      {/* Monthly Earnings */}
      <View className="bg-white p-4 rounded-xl shadow mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-4">📈 Monthly Earnings</Text>
        {monthlyEarnings.map((item, index) => (
          <View key={index} className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-600 text-sm w-10">{item.month}</Text>
            <View className="flex-1 mx-3">
              <View className="bg-gray-200 h-2 rounded-full">
                <View
                  className={`h-2 rounded-full ${
                    item.percentage > 0 ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-300'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </View>
            </View>
            <Text className="text-gray-800 text-sm font-medium">{item.amount}</Text>
          </View>
        ))}
      </View>

      {/* Recent Earnings */}
      <View className="bg-white p-4 rounded-xl shadow mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-4">💸 Recent Earnings</Text>
        {recentEarnings.map((item, index) => (
          <View key={index} className="flex-row justify-between items-center border-b border-gray-100 pb-3 mb-3">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full mr-3">
                <Icon name={item.icon} size={16} color="#3b82f6" />
              </View>
   <View>
                <Text className="text-gray-800 font-medium">{item.plan}</Text>
                <Text className="text-gray-600 text-sm">{item.customer}</Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="text-gray-800 font-semibold">{item.amount}</Text>
              <Text className="text-gray-500 text-xs">{item.date}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Subscription Plans with Circular Progress */}
      <View className="bg-white p-4 rounded-xl shadow mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">📦 Subscription Plans</Text>
        <View className="flex-row items-center justify-between">
          {/* Circular Progress */}
          <View className="relative">
            <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
              <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white font-bold text-lg">100%</Text>
              </View>
            </View>
          </View>
          {/* Labels */}
          <View>
            {subscriptionPlans.map((item, index) => (
              <View key={index} className="mb-2">
                <View className="flex-row items-center mb-1">
                  <View style={{ backgroundColor: item.color }} className="w-3 h-3 rounded-full mr-2" />
                  <Text className="text-gray-800 font-medium">
                    {item.name}: {item.percentage}%
                  </Text>
                </View>
                <Text className="text-gray-600 text-sm">{item.technicians} technician</Text>
              </View>
            ))}
          </View>
        </View>
    </View>
    </ScrollView>
  );
};

export default Dashboard;
