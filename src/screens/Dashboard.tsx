import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart } from 'react-native-svg-charts';

const Dashboard = () => {
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
  ];

  const subscriptionPlans = [
    { name: 'Platinum Plan', technicians: 1, percentage: 100, color: '#3b82f6' },
  ];

  const getCurrentDate = () => {
    const today = new Date();
    return today.toDateString();
  };

  // Pie Chart Data
  const pieData = subscriptionPlans.map((item, index) => ({
    value: item.percentage,
    svg: { fill: item.color },
    key: `pie-${index}`,
  }));

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

      {/* KPI Cards - 2x2 Grid */}
      <View className="mb-4">
        {/* First Row: Total Technicians + Total Subscriptions */}
        <View className="flex-row space-x-4 mb-4">
          <View className="bg-white p-4 rounded-xl shadow flex-1">
            <View className="flex-row justify-between items-center mb-2">
              <View className="bg-blue-500 p-2 rounded-lg">
                <Icon name="users" size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">1</Text>
            </View>
            <Text className="text-gray-600 text-sm">Total Technicians</Text>
          </View>

          <View className="bg-white p-4 rounded-xl shadow flex-1">
            <View className="flex-row justify-between items-center mb-2">
              <View className="bg-green-500 p-2 rounded-lg">
                <Icon name="credit-card" size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">1</Text>
            </View>
            <Text className="text-gray-600 text-sm">Total Subscriptions</Text>
          </View>
        </View>

        {/* Second Row: Total Earnings + Monthly Earnings */}
        <View className="flex-row space-x-4">
          <View className="bg-white p-4 rounded-xl shadow flex-1">
            <View className="flex-row justify-between items-center mb-2">
              <View className="bg-yellow-500 p-2 rounded-lg">
                <Icon name="money" size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">₹1,000</Text>
            </View>
            <Text className="text-gray-600 text-sm">Total Earnings</Text>
          </View>

          <View className="bg-white p-4 rounded-xl shadow flex-1">
            <View className="flex-row justify-between items-center mb-2">
              <View className="bg-orange-500 p-2 rounded-lg">
                <Icon name="line-chart" size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">₹0</Text>
            </View>
            <Text className="text-gray-600 text-sm">Monthly Earnings</Text>
          </View>
        </View>
      </View>

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

      {/* Subscription Plans with Pie Chart */}
      <View className="bg-white p-4 rounded-xl shadow mb-6">
        <Text className="text-lg font-semibold text-gray-800 mb-4">📦 Subscription Plans</Text>
        
        <View className="flex-row items-center justify-between">
          {/* Pie Chart */}
          <PieChart
            style={{ height: 120, width: 120 }}
            data={pieData}
            innerRadius={40}
            outerRadius={60}
          />
          
          {/* Labels */}
          <View>
            {subscriptionPlans.map((item, index) => (
              <View key={index} className="mb-2">
                <View className="flex-row items-center mb-1">
                  <View style={{ backgroundColor: item.color }} className="w-3 h-3 rounded-full mr-2" />
                  <Text className="text-gray-800 font-medium">{item.name}: {item.percentage}%</Text>
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
