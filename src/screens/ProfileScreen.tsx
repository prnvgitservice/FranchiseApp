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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { MainAppNavigationProp } from "../navigation/types";
import { getFranchiseProfile, updateFranchiseProfile } from "../api/apiMethods";
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen: React.FC = () => {
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

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const franchiseId = await AsyncStorage.getItem("franchiseId");
      if (!franchiseId) {
        throw new Error("Franchise ID is missing");
      }

      const response = await getFranchiseProfile(franchiseId);
      if (response && response.success) {
        setProfileData({
          id: response.result.id || "",
          username: response.result.username || "",
          phoneNumber: response.result.phoneNumber || "",
          password: "", // Password not typically returned
          buildingName: response.result.buildingName || "",
          areaName: response.result.areaName || "",
          city: response.result.city || "",
          state: response.result.state || "",
          pincode: response.result.pincode || "",
          franchiseId: response.result.franchiseId || "",
          profileImage: response.result.profileImage || "",
        });
      } else {
        throw new Error(response?.message || "Failed to fetch profile");
      }
    } catch (err: any) {
      setError(err.message || "Error fetching profile data");
      Alert.alert("Error", err.message || "Error fetching profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleImageChange = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.8,
        maxWidth: 300,
        maxHeight: 300,
      });
      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        setProfileImageFile({
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName || "profile.jpg",
        });
        setProfileData((prevState) => ({
          ...prevState,
          profileImage: asset.uri ? asset.uri : "",
        }));
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const franchiseId = await AsyncStorage.getItem("franchiseId");
      if (!franchiseId) {
        throw new Error("Franchise ID is missing");
      }

      const formData = new FormData();
      formData.append("username", profileData.username);
      formData.append("phoneNumber", profileData.phoneNumber);
      if (profileData.password) {
        formData.append("password", profileData.password);
      }
      formData.append("buildingName", profileData.buildingName);
      formData.append("areaName", profileData.areaName);
      formData.append("city", profileData.city);
      formData.append("state", profileData.state);
      formData.append("pincode", profileData.pincode);
      formData.append("franchiseId", profileData.id);
      if (profileImageFile) {
        formData.append("profileImage", profileImageFile);
      }

      const response = await updateFranchiseProfile(formData);
      if (response?.success) {
        setIsEditing(false);
        setProfileImageFile(null);
        await fetchProfile(); // Refresh profile data
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        throw new Error(response?.message || "Failed to update profile");
      }
    } catch (err: any) {
      setError(err.message || "Error updating profile");
      Alert.alert("Error", err.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileImageFile(null);
    fetchProfile(); // Reset to original data
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
        <Text className="text-base text-red-600 text-center mb-4">{error}</Text>
        <TouchableOpacity
          className="bg-blue-500 py-2 px-5 rounded-lg"
          onPress={() => {
            setError(null);
            setLoading(true);
            fetchProfile();
          }}
        >
          <Text className="text-white text-base font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* New Gradient Header */}
      <View className="m-4 rounded-2xl overflow-hidden">
        <LinearGradient
          colors={['#4F46E5', '#0D9488']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="p-6 relative overflow-hidden"
        >
          {/* Decorative Circles */}
          <View className="absolute top-[-64px] right-[-64px] w-32 h-32 bg-indigo-500/20 rounded-full" />
          <View className="absolute bottom-[-48px] left-[-48px] w-24 h-24 bg-teal-500/20 rounded-full" />
          
          <View className="flex-col justify-between">
            <View className="flex-row items-center mb-4">
              <View className="mr-4 relative">
                {profileData.profileImage ? (
                  <Image
                    source={{ uri: profileData.profileImage }}
                    className="w-20 h-20 rounded-full"
                  />
                ) : (
                  <View className="w-20 h-20 rounded-full bg-white justify-center items-center">
                    <Icon name="person" size={40} color="#6b7280" />
                  </View>
                )}
                {isEditing && (
                  <TouchableOpacity
                    className="absolute bottom-0 right-0 bg-white/80 p-1 rounded-full"
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
                    onChangeText={(value) => handleInputChange("username", value)}
                    placeholder="Enter username"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    className="text-2xl font-bold text-white bg-white/20 border border-white/30 rounded-lg p-2"
                  />
                ) : (
                  <Text className="text-2xl font-bold text-white mb-1">{profileData.username}</Text>
                )}
                <Text className="text-sm text-white/80">Franchise ID: {profileData.franchiseId}</Text>
              </View>
            </View>
            
            <View className="items-end">
              {isEditing ? (
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    className="bg-green-500 py-2 px-4 rounded-lg flex-row items-center"
                    onPress={handleSave}
                  >
                    <Icon name="save" size={16} color="white" />
                    <Text className="text-white font-semibold ml-2">Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-500 py-2 px-4 rounded-lg flex-row items-center"
                    onPress={handleCancel}
                  >
                    <Icon name="close" size={16} color="white" />
                    <Text className="text-white font-semibold ml-2">Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  className="bg-white/20 py-2 px-4 rounded-lg flex-row items-center"
                  onPress={() => setIsEditing(true)}
                >
                  <Icon name="edit" size={16} color="white" />
                  <Text className="text-white font-semibold ml-2">Edit Profile</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Form Section */}
      <View className="m-4 bg-white rounded-xl shadow-md">
        <View className="p-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Contact & Address</Text>
          <View className="flex-row items-center mb-4 gap-3">
            <Icon name="phone" size={20} color="#9ca3af" />
            {isEditing ? (
              <TextInput
                value={profileData.phoneNumber}
                editable={false}
                className="flex-1 border border-gray-300 rounded-lg p-3 bg-gray-200 text-gray-500 text-base"
              />
            ) : (
              <Text className="flex-1 text-base text-gray-700">{profileData.phoneNumber}</Text>
            )}
          </View>
          {isEditing && (
            <View className="flex-row items-center mb-4 gap-3">
              <Icon name="lock" size={20} color="#9ca3af" />
              <View className="flex-1 relative">
                <TextInput
                  value={profileData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                  placeholder="New Password"
                  className="border border-gray-300 rounded-lg p-3 bg-white text-base"
                />
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={20}
                    color="#6b7280"
                  />
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
            <View key={field} className="flex-row items-center mb-4 gap-3">
              <Icon name="place" size={20} color="#9ca3af" />
              {isEditing ? (
                <TextInput
                  value={(profileData as any)[field]}
                  onChangeText={(value) => handleInputChange(field, value)}
                  placeholder={label}
                  keyboardType={field === "pincode" ? "numeric" : "default"}
                  className="flex-1 border border-gray-300 rounded-lg p-3 bg-white text-base"
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