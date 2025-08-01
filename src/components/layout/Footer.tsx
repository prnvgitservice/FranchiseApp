import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface FooterProps {
  onHomePress?: () => void;
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
}

export default function Footer({ onHomePress, onProfilePress, onSettingsPress }: FooterProps) {
  return (
    <View className="bg-gray-800 p-4 flex-row justify-around">
      <TouchableOpacity onPress={onHomePress} className="items-center">
        <Text className="text-white text-lg">🏠</Text>
        <Text className="text-white text-xs">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onProfilePress} className="items-center">
        <Text className="text-white text-lg">👤</Text>
        <Text className="text-white text-xs">Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onSettingsPress} className="items-center">
        <Text className="text-white text-lg">⚙️</Text>
        <Text className="text-white text-xs">Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
