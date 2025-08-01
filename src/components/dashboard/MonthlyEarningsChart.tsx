import React from "react";
import { View, Text } from "react-native";

export default function MonthlyEarningsChart() {
  return (
    <View className="bg-white rounded-lg shadow p-4 m-2">
      <Text className="text-lg font-semibold mb-2">Monthly Earnings</Text>
      <View className="h-32 bg-gray-100 rounded flex items-center justify-center">
        <Text className="text-gray-500">Chart placeholder</Text>
      </View>
    </View>
  );
}
