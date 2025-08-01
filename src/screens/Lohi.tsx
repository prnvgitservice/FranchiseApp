import React from "react";
import { View, Text } from "react-native";
import '../../global.css'

export default function Lohi() {
  return (
    <View className="bg-pink-200 rounded-lg shadow p-4 flex-1 mx-1 items-center">
      <Text className="text-3xl mb-2">Lohi</Text>
      <Text className="text-lg font-semibold">Siri</Text>
      <Text className="text-xs text-gray-500">Vijju</Text>
    </View>
  );
}