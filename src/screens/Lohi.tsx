import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MainAppNavigationProp } from '../navigation/types';
import '../../global.css'

export default function Lohi() {
  const navigation = useNavigation<MainAppNavigationProp>();

  return (
    <View className="flex-1 bg-pink-100">
      <View className="bg-pink-200 rounded-lg shadow p-4 flex-1 mx-1 items-center justify-center">
        <Text className="text-3xl mb-2">Lohi</Text>
        <Text className="text-lg font-semibold">Siri</Text>
        <Text className="text-xs text-gray-500 mb-4">Vijju</Text>
        
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="bg-blue-500 p-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            Go Back to Dashboard
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}