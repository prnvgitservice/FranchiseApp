import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { Route } from 'expo-router/build/Route';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

// Fake data for dropdowns
const fakeCategories = [
  { _id: '1', category_name: 'Plumbing', status: 1 },
  { _id: '2', category_name: 'Electrical', status: 1 },
  { _id: '3', category_name: 'Carpentry', status: 1 },
];

const fakePincodes = [
  { _id: '1', code: '400001', city: 'Mumbai', state: 'Maharashtra', areas: [{ _id: 'a1', name: 'Colaba' }, { _id: 'a2', name: 'Fort' }] },
  { _id: '2', code: '400002', city: 'Mumbai', state: 'Maharashtra', areas: [{ _id: 'a3', name: 'Kalbadevi' }, { _id: 'a4', name: 'Mandvi' }] },
];

const fakeSubscriptionPlans = [
  { _id: '1', name: 'Basic Plan' },
  { _id: '2', name: 'Premium Plan' },
];

interface TechnicianData {
  username: string;
  category: string;
  phoneNumber: string;
  password: string;
  buildingName: string;
  areaName: string;
  city: string;
  state: string;
  pincode: string;
  subscriptionId: string;
  technicianId: string;
  profileImage: string;
}

const EditTechnician: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const technician = (route.params as { tech: TechnicianData })?.tech;
    
    const [formData, setFormData] = useState<TechnicianData>(technician);
    const [showPassword, setShowPassword] = useState(false);
    const [areaOptions, setAreaOptions] = useState<{ _id: string; name: string }[]>(fakePincodes[0].areas);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(formData.profileImage);
    
  const handleChange = (name: keyof TechnicianData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'pincode') {
      const found = fakePincodes.find((p) => p.code === value);
      if (found && found.areas) {
        setAreaOptions(found.areas);
        setFormData((prev) => ({
          ...prev,
          city: found.city,
          state: found.state,
          areaName: found.areas[0]?.name || '',
        }));
      } else {
        setAreaOptions([]);
        setFormData((prev) => ({
          ...prev,
          city: '',
          state: '',
          areaName: '',
        }));
      }
    }
  };

  const handleImageChange = (file: string) => {
    // Simulate image upload for UI demo
    setFormData((prev) => ({ ...prev, profileImage: file }));
    setProfileImagePreview('https://via.placeholder.com/150'); // Placeholder for demo
  };

  const handleSubmit = () => {
    setError(null);
    setLoading(true);
    setSuccess('');
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess('Technician updated successfully!');
      setTimeout(() => setSuccess(''), 2000);
    }, 1000);
  };

  const handleCancel = () => {
    // Simulate navigation for UI demo
    setError('Navigation cancelled for UI demo.');
    setTimeout(() => setError(null), 2000);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-1">


    <View className="flex-1 bg-gray-100 px-5 pt-[60px] pb-5">
      <Text className="text-3xl font-extrabold text-indigo-900 text-center mb-6">
        Edit Technician
      </Text>
      {error && (
        <View className="bg-red-100 p-3 rounded-lg mb-6 items-center">
          <Text className="text-red-600 text-sm font-medium">{error}</Text>
        </View>
      )}
      {success && (
        <View className="bg-green-100 p-3 rounded-lg mb-6 items-center">
          <Text className="text-green-600 text-sm font-medium">{success}</Text>
        </View>
      )}
      <View className="bg-white rounded-xl p-5 gap-5" style={styles.formContainer}>
        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Profile Image
          </Text>
          <View className="flex-row items-center gap-4">
            {profileImagePreview && (
              <Image
                source={{ uri: profileImagePreview }}
                className="w-16 h-16 rounded-full"
                style={styles.profileImage}
              />
            )}
            <TouchableOpacity
              className="bg-white rounded-lg px-4 py-3 border border-gray-300 flex-1"
              onPress={() => handleImageChange('new-image.jpg')}
              >
              <Text className="text-gray-700">Upload profile image</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Technician Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className="bg-white rounded-lg px-4 py-3 text-base border border-gray-300"
            placeholder="Enter technician name"
            value={formData.username}
            onChangeText={(value) => handleChange('username', value)}
            placeholderTextColor="#9CA3AF"
            />
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Category <Text className="text-red-500">*</Text>
          </Text>
          <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <Picker
              selectedValue={formData.category}
              onValueChange={(value) => handleChange('category', value)}
              style={styles.picker}
              enabled={false}
              >
              <Picker.Item label="Select a category" value="" enabled={false} />
              {fakeCategories
                .filter((category) => category.status === 1)
                .map((item) => (
                    <Picker.Item key={item._id} label={item.category_name} value={item._id} />
                ))}
            </Picker>
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Phone Number <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 text-base border border-gray-300"
            placeholder="Enter 10-digit phone number"
            value={formData.phoneNumber}
            onChangeText={(value) => handleChange('phoneNumber', value)}
            keyboardType="phone-pad"
            maxLength={10}
            placeholderTextColor="#9CA3AF"
            editable={false}
            />
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Password
          </Text>
          <View className="flex-row items-center bg-white rounded-lg border border-gray-300">
            <TextInput
              className="flex-1 px-4 py-3 text-base"
              placeholder="6-10 characters (optional)"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry={!showPassword}
              maxLength={10}
              placeholderTextColor="#9CA3AF"
              />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="p-4"
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#4B5563"
                />
            </TouchableOpacity>
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Building Name <Text className="text-red-500">*</Text>
          </Text>
          <TextInput
            className="bg-white rounded-lg px-4 py-3 text-base border border-gray-300"
            placeholder="Enter building name"
            value={formData.buildingName}
            onChangeText={(value) => handleChange('buildingName', value)}
            placeholderTextColor="#9CA3AF"
            />
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Pincode <Text className="text-red-500">*</Text>
          </Text>
          <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <Picker
              selectedValue={formData.pincode}
              onValueChange={(value) => handleChange('pincode', value)}
              style={styles.picker}
              >
              <Picker.Item label="Select Pincode" value="" enabled={false} />
              {fakePincodes.map((p) => (
                  <Picker.Item key={p._id} label={p.code} value={p.code} />
                ))}
            </Picker>
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Area <Text className="text-red-500">*</Text>
          </Text>
          <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!formData.pincode ? 'bg-gray-100' : ''}`}>
            <Picker
              selectedValue={formData.areaName}
              onValueChange={(value) => handleChange('areaName', value)}
              style={styles.picker}
              enabled={!!formData.pincode}
              >
              <Picker.Item label="Select Area" value="" enabled={false} />
              {areaOptions.map((a) => (
                  <Picker.Item key={a._id} label={a.name} value={a.name} />
                ))}
            </Picker>
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            City
          </Text>
          <View className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
            <Picker
              selectedValue={formData.city}
              onValueChange={(value) => handleChange('city', value)}
              style={styles.picker}
              enabled={false}
              >
              <Picker.Item label="Select City" value="" enabled={false} />
              {formData.pincode && fakePincodes.find((p) => p.code === formData.pincode) && (
                  <Picker.Item
                  label={fakePincodes.find((p) => p.code === formData.pincode)?.city}
                  value={fakePincodes.find((p) => p.code === formData.pincode)?.city}
                  />
                )}
            </Picker>
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            State
          </Text>
          <View className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
            <Picker
              selectedValue={formData.state}
              onValueChange={(value) => handleChange('state', value)}
              style={styles.picker}
              enabled={false}
              >
              <Picker.Item label="Select State" value="" enabled={false} />
              {formData.pincode && fakePincodes.find((p) => p.code === formData.pincode) && (
                  <Picker.Item
                  label={fakePincodes.find((p) => p.code === formData.pincode)?.state}
                  value={fakePincodes.find((p) => p.code === formData.pincode)?.state}
                  />
                )}
            </Picker>
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-base font-semibold text-indigo-700">
            Subscription Plan
          </Text>
          <TextInput
            className="bg-gray-100 rounded-lg px-4 py-3 text-base border border-gray-300"
            value={fakeSubscriptionPlans.find((plan) => plan._id === formData.subscriptionId)?.name || ''}
            editable={false}
            placeholderTextColor="#9CA3AF"
            />
        </View>

        <View className="flex-row justify-end gap-4 mt-4">
          <TouchableOpacity
            className="bg-gray-200 rounded-lg py-3 px-4"
            onPress={handleCancel}
            >
            <Text className="text-gray-700 text-base font-semibold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`bg-indigo-600 rounded-lg py-3 px-4 ${loading ? 'bg-gray-400' : 'active:bg-indigo-700'}`}
            onPress={handleSubmit}
            disabled={loading}
            >
            {loading ? (
                <View className="flex-row items-center">
                <Ionicons name="refresh" size={24} color="#FFFFFF" style={styles.loadingIcon} />
                <Text className="text-white text-base font-semibold ml-2">Saving...</Text>
              </View>
            ) : (
              <Text className="text-white text-base font-semibold">Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
</ScrollView>
  );
};

// StyleSheet for styles not supported by NativeWind
const styles = StyleSheet.create({
    formContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
  },
  picker: {
    fontSize: 16,
    color: '#1F2937', // text-gray-900
  },
  profileImage: {
    resizeMode: 'cover',
  },
  loadingIcon: {
    transform: [{ rotate: '90deg' }],
  },
});

export default EditTechnician;