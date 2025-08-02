import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';

const TechniciansScreen: React.FC = () => {
  // Fake data for UI
  const fakeTechnicians = [
    {
      id: '1',
      username: 'John Doe',
      phoneNumber: '+91 98765 43210',
      category: 'Plumbing',
      areaName: 'Koramangala',
      city: 'Bangalore',
      pincode: '560034',
      subscription: {
        subscriptionName: 'Gold Plan',
        endDate: '2025-12-31T23:59:59Z',
      },
    },
    {
      id: '2',
      username: 'Jane Smith',
      phoneNumber: '+91 87654 32109',
      category: 'Electrical',
      areaName: 'Indiranagar',
      city: 'Bangalore',
      pincode: '560038',
      subscription: {
        subscriptionName: 'Economy Plan',
        endDate: '2025-11-30T23:59:59Z',
      },
    },
    {
      id: '3',
      username: 'Ravi Kumar',
      phoneNumber: '+91 76543 21098',
      category: 'Carpentry',
      areaName: 'Whitefield',
      city: 'Bangalore',
      pincode: '560066',
      subscription: {
        subscriptionName: 'Platinum Plan',
        leads: 50,
      },
    },
  ];

  // Static subscription plans
  const subscriptionPlans = ['all', 'Economy Plan', 'Gold Plan', 'Platinum Plan'];

  // Format date to "DD MMM YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="space-y-6 pb-8">
        {/* Header */}
        <View className="space-y-4">
          <View>
            <Text className="text-2xl font-bold text-gray-900">Technicians Management</Text>
            <Text className="text-gray-600 mt-1">Manage and monitor all technicians in your network</Text>
          </View>
          <TouchableOpacity className="bg-gradient-to-r from-indigo-600 to-teal-500 rounded-xl p-3 flex-row items-center justify-center">
            <Feather name="plus" size={16} color="#ffffff" />
            <Text className="text-white font-medium ml-2">Add Technician</Text>
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <View className="space-y-4">
            <View className="relative">
              <Feather name="search" size={20} color="#9ca3af" className="absolute left-3 top-1/2 -translate-y-1/2" />
              <TextInput
                placeholder="Search technicians by name or category..."
                value=""
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900"
                style={{ fontSize: 16 }}
              />
            </View>
            <View className="flex-row items-center space-x-2">
              <Feather name="filter" size={20} color="#9ca3af" />
              <View className="flex-1 border border-gray-300 rounded-xl">
                <Picker selectedValue="all" style={{ height: 48, color: '#111827' }}>
                  {subscriptionPlans.map(plan => (
                    <Picker.Item
                      key={plan}
                      label={plan === 'all' ? 'All Plans' : plan}
                      value={plan}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        {/* Technicians Table */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <View className="w-full">
            {/* Table Header */}
            <View className="flex-row bg-gray-50 p-3 rounded-t-lg border-b border-gray-200">
              <Text className="flex-1 text-xs font-medium text-gray-700">Technician</Text>
              <Text className="flex-1 text-xs font-medium text-gray-700">Mobile</Text>
              <Text className="flex-1 text-xs font-medium text-gray-700">Category</Text>
              <Text className="flex-1 text-xs font-medium text-gray-700">Address</Text>
              <Text className="flex-1 text-xs font-medium text-gray-700">Plan</Text>
              <Text className="flex-1 text-xs font-medium text-gray-700">End Date</Text>
              <Text className="flex-1 text-xs font-medium text-gray-700 text-right">Action</Text>
            </View>
            {/* Table Body */}
            {fakeTechnicians.length === 0 ? (
              <View className="py-12 items-center">
                <Feather name="users" size={48} color="#9ca3af" />
                <Text className="text-lg font-medium text-gray-900 mt-4">No technicians found</Text>
              </View>
            ) : (
              fakeTechnicians.map((tech, index) => (
                <View
                  key={tech.id}
                  className={`flex-row p-3 ${
                    index < fakeTechnicians.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <View className="flex-1 flex-row items-center">
                    <View className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full items-center justify-center">
                      <Text className="text-white font-medium text-sm">
                        {tech.username.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    <Text numberOfLines={1} className="ml-2 text-xs font-semibold text-gray-900">
                      {tech.username}
                    </Text>
                  </View>
                  <Text numberOfLines={1} className="flex-1 text-xs text-gray-700">
                    {tech.phoneNumber}
                  </Text>
                  <Text numberOfLines={1} className="flex-1 text-xs text-gray-700">
                    {tech.category}
                  </Text>
                  <Text numberOfLines={1} className="flex-1 text-xs text-gray-700">
                    {`${tech.areaName}, ${tech.city}, ${tech.pincode}`}
                  </Text>
                  <Text numberOfLines={1} className="flex-1 text-xs text-gray-700">
                    {tech.subscription?.subscriptionName || 'N/A'}
                  </Text>
                  <Text numberOfLines={1} className="flex-1 text-xs text-gray-700">
                    {tech.subscription?.endDate
                      ? formatDate(tech.subscription.endDate)
                      : tech.subscription?.leads
                      ? `${tech.subscription.leads} leads`
                      : 'N/A'}
                  </Text>
                  <View className="flex-1 flex-row justify-end space-x-2">
                    <TouchableOpacity>
                      <Feather name="eye" size={18} color="#2563eb" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Feather name="edit" size={16} color="#15803d" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>

          {/* Pagination (Static UI) */}
          <View className="flex-row justify-center items-center space-x-2 py-4">
            <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-xl" style={{ opacity: 0.5 }}>
              <Text className="text-gray-700">Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-teal-500 rounded-xl">
              <Text className="text-white">1</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-xl">
              <Text className="text-gray-700">2</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-xl">
              <Text className="text-gray-700">Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default TechniciansScreen;