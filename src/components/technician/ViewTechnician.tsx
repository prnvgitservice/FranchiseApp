import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Subscription {
  subscriptionId: string;
  subscriptionName: string;
  startDate: string;
  endDate: string;
  leads?: number;
  _id: string;
}

interface Technician {
  id: string;
  franchiseId: string;
  username: string;
  phoneNumber: string;
  role: string;
  category: string;
  buildingName: string;
  areaName: string;
  city: string;
  state: string;
  pincode: string;
  subscription: Subscription;
}


const ViewTechnician: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const technician = route.params?.tech as Technician;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!technician) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center px-6">
        <Text className="text-2xl font-bold text-gray-800 mb-4">Technician Not Found</Text>
        <Text className="text-gray-600 text-center mb-6">
          Please select a technician from the list to view details.
        </Text>
        <TouchableOpacity
          className="bg-blue-600 py-3 px-6 rounded-lg"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-semibold text-center">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={styles.scrollContent}
    >
      <View className="bg-white rounded-2xl shadow-lg m-4 p-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-800">Technician Details</Text>
          <TouchableOpacity
            className="bg-blue-600 py-2 px-4 rounded-lg"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-semibold">Back</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <Text className="text-xl font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
            Personal Information
          </Text>
          <View className="space-y-4">
            <View>
              <Text className="font-medium text-gray-600">Technician Name</Text>
              <Text className="text-gray-800">{technician.username}</Text>
            </View>
            <View>
              <Text className="font-medium text-gray-600">Phone Number</Text>
              <Text className="text-gray-800">{technician.phoneNumber}</Text>
            </View>
            <View>
              <Text className="font-medium text-gray-600">Category</Text>
              <Text className="text-gray-800">{technician.category}</Text>
            </View>
            <View>
              <Text className="font-medium text-gray-600">Address</Text>
              <Text className="text-gray-800">{`${technician.buildingName}, ${technician.areaName}, ${technician.city}, ${technician.pincode}`}</Text>
            </View>
          </View>
        </View>

        <View>
          <Text className="text-xl font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
            Subscription Information
          </Text>
          <View className="space-y-4">
            <View>
              <Text className="font-medium text-gray-600">Subscription Name</Text>
              <Text className="text-gray-800">{technician.subscription?.subscriptionName || 'N/A'}</Text>
            </View>
            <View>
              <Text className="font-medium text-gray-600">Start Date</Text>
              <Text className="text-gray-800">
                {technician.subscription?.startDate ? formatDate(technician.subscription.startDate) : 'N/A'}
              </Text>
            </View>
            <View>
              <Text className="font-medium text-gray-600">End Date</Text>
              <Text className="text-gray-800">
                {technician.subscription?.endDate
                  ? formatDate(technician.subscription.endDate)
                  : technician.subscription?.leads
                  ? `${technician.subscription.leads} leads`
                  : 'N/A'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
});

export default ViewTechnician;