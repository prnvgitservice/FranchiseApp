import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface HeaderProps {
  title?: string;
  onMenuPress?: () => void;
}

export default function Header({ title = "Franchise App", onMenuPress }: HeaderProps) {
  return (
    <View className="bg-blue-600 p-4 flex-row items-center justify-between">
      <TouchableOpacity onPress={onMenuPress} className="p-2">
        <Text className="text-white text-lg">☰</Text>
      </TouchableOpacity>
      <Text className="text-white text-lg font-semibold">{title}</Text>
      <View className="w-8" />
    </View>
  );
}
