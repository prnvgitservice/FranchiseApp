// ProfileScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MainAppNavigationProp } from "../navigation/types";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    id: "",
    username: "",
    phoneNumber: "",
    password: "",
    buildingName: "",
    areaName: "",
    city: "",
    state: "",
    pincode: "",
    franchiseId: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<any>(null);
  const navigation = useNavigation<MainAppNavigationProp>();

  const fetchProfile = async () => {
    try {
      setTimeout(() => {
        const mockData = {
          id: "1",
          username: "John Doe",
          phoneNumber: "+91 9876543210",
          password: "",
          buildingName: "Sunrise Apartments",
          areaName: "Downtown",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          franchiseId: "FR001",
          profileImage: "",
        };
        setProfileData(mockData);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Error fetching profile data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = () => {
    Alert.alert("Image Upload", "Implement image upload here");
  };

  const handleSave = async () => {
    try {
      setTimeout(() => {
        setIsEditing(false);
        setProfileImageFile(null);
        Alert.alert("Success", "Profile updated successfully!");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Error updating profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileImageFile(null);
    fetchProfile();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-2 text-base text-gray-500">Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-base text-red-600 text-center">{error}</Text>
        <Text className="text-sm text-gray-500 mt-2">Showing default profile data</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="bg-white mx-4 my-4 rounded-xl shadow-lg overflow-hidden">
        <View className="bg-blue-600 p-6">
          <View className="flex-row items-center mb-4">
            <View className="relative mr-4">
              {profileData.profileImage ? (
                <Image 
                  source={{ uri: profileData.profileImage }} 
                  className="w-20 h-20 rounded-full"
                />
              ) : (
                <View className="w-20 h-20 rounded-full bg-white justify-center items-center">
                  <Icon name="user" size={40} color="#6b7280" />
                </View>
              )}
              {isEditing && (
                <TouchableOpacity 
                  className="absolute bottom-0 right-0 bg-white/80 p-1 rounded-lg"
                  onPress={handleImageChange}
                >
                  <Icon name="edit" size={16} color="#3b82f6" />
                </TouchableOpacity>
              )}
            </View>
            <View className="flex-1">
              {isEditing ? (
                <TextInput
                  value={profileData.username}
                  onChangeText={(value: string) => handleInputChange("username", value)}
                  placeholder="Enter username"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  className="text-2xl font-bold text-white bg-white/20 border-white/30 border rounded px-3 py-1"
                />
              ) : (
                <Text className="text-2xl font-bold text-white mb-1">{profileData.username}</Text>
              )}
              <Text className="text-sm text-white/80">Franchise ID: {profileData.franchiseId}</Text>
            </View>
          </View>
          <View className="items-end">
            {isEditing ? (
              <View className="flex-row space-x-2">
                <TouchableOpacity 
                  className="bg-green-600 px-4 py-2 rounded flex-row items-center"
                  onPress={handleSave}
                >
                  <Icon name="save" size={16} color="white" />
                  <Text className="text-white font-semibold ml-2">Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="bg-red-600 px-4 py-2 rounded flex-row items-center"
                  onPress={handleCancel}
                >
                  <Icon name="times" size={16} color="white" />
                  <Text className="text-white font-semibold ml-2">Cancel</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                className="bg-white/20 px-4 py-2 rounded flex-row items-center"
                onPress={() => setIsEditing(true)}
              >
                <Icon name="edit" size={16} color="white" />
                <Text className="text-white font-semibold ml-2">Edit Profile</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View className="p-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Contact & Address</Text>
          <View className="flex-row items-center space-x-3 mb-4">
            <Icon name="phone" size={20} color="#9ca3af" />
            {isEditing ? (
              <TextInput
                value={profileData.phoneNumber}
                editable={false}
                className="flex-1 border border-gray-300 rounded p-3 bg-gray-200 text-gray-500 text-base"
              />
            ) : (
              <Text className="flex-1 text-base text-gray-700">{profileData.phoneNumber}</Text>
            )}
          </View>
          {isEditing && (
            <View className="flex-row items-center space-x-3 mb-4">
              <Icon name="lock" size={20} color="#9ca3af" />
              <View className="flex-1 relative">
                <TextInput
                  value={profileData.password}
                  onChangeText={(value: string) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                  placeholder="New Password"
                  className="border border-gray-300 rounded p-3 bg-white text-base pr-10"
                />
                <TouchableOpacity 
                  className="absolute right-3 top-2"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {[
            ["buildingName", "Building Name"],
            ["areaName", "Area Name"],
            ["city", "City"],
            ["state", "State"],
            ["pincode", "Pincode"],
          ].map(([field, label]) => (
            <View key={field} className="flex-row items-center space-x-3 mb-4">
              <Icon name="map-marker" size={20} color="#9ca3af" />
              {isEditing ? (
                <TextInput
                  value={(profileData as any)[field]}
                  onChangeText={(value: string) => handleInputChange(field, value)}
                  placeholder={label}
                  keyboardType={field === "pincode" ? "numeric" : "default"}
                  className="flex-1 border border-gray-300 rounded p-3 bg-white text-base"
                />
              ) : (
                <Text className="flex-1 text-base text-gray-700">{(profileData as any)[field]}</Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
