import React from "react";
import { View, Text } from "react-native";

export default function DashboardCard({ title, value, icon }) {
  return (
    <View className="bg-white rounded-lg shadow p-4 flex-1 mx-1 items-center">
      <Text className="text-3xl mb-2">{icon}</Text>
      <Text className="text-lg font-semibold">{value}</Text>
      <Text className="text-xs text-gray-500">{title}</Text>
    </View>
  );
}