import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface SidebarProps {
  isVisible?: boolean;
  onClose?: () => void;
  onNavigate?: (route: string) => void;
}

export default function Sidebar({ isVisible = false, onClose, onNavigate }: SidebarProps) {
  if (!isVisible) return null;

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: '📊' },
    { id: 'franchises', title: 'Franchises', icon: '🏢' },
    { id: 'earnings', title: 'Earnings', icon: '💰' },
    { id: 'reports', title: 'Reports', icon: '📈' },
    { id: 'settings', title: 'Settings', icon: '⚙️' },
  ];

  return (
    <View className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg z-50">
      <View className="bg-blue-600 p-4">
        <Text className="text-white text-lg font-semibold">Menu</Text>
      </View>
      <ScrollView className="flex-1">
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onNavigate?.(item.id)}
            className="p-4 border-b border-gray-200 flex-row items-center"
          >
            <Text className="text-xl mr-3">{item.icon}</Text>
            <Text className="text-gray-800">{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={onClose} className="p-4 border-t border-gray-200">
        <Text className="text-gray-600 text-center">Close</Text>
      </TouchableOpacity>
    </View>
  );
}
