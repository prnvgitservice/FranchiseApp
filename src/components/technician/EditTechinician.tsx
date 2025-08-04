import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera, Asset } from 'react-native-image-picker';
import { getAllTechniciansByFranchise, getAllPincodes, getAllCategories, getPlans, updateTechByFranchise } from '../../api/apiMethods';

interface Subscription {
  subscriptionId: string;
  subscriptionName: string;
  startDate: string;
  endDate: string;
  leads: number | null;
  ordersCount: number;
  _id: string;
}

interface TechnicianData {
  username: string;
  franchiseId: string;
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

interface PincodeData {
  _id: string;
  code: string;
  city: string;
  state: string;
  areas: { _id: string; name: string }[];
}

interface CategoryData {
  _id: string;
  category_name: string;
  status: number;
}

interface SubscriptionPlan {
  _id: string;
  name: string;
}

const initialFormState: TechnicianData = {
  username: '',
  franchiseId: '',
  category: '',
  phoneNumber: '',
  password: '',
  buildingName: '',
  areaName: '',
  city: '',
  state: '',
  pincode: '',
  subscriptionId: '',
  technicianId: '',
  profileImage: '',
};

const EditTechnician: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const technician = (route.params as { tech: TechnicianData })?.tech;
  
  const [formData, setFormData] = useState<TechnicianData>(technician || initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [areaOptions, setAreaOptions] = useState<{ _id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [apiCategories, setApiCategories] = useState<CategoryData[]>([]);
  const [pincodeData, setPincodeData] = useState<PincodeData[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(formData.profileImage || null);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const franchiseId = await AsyncStorage.getItem('franchiseId');
        if (!franchiseId) {
          setError('Franchise ID not found. Please log in again.');
          setLoading(false);
          return;
        }

        if (!technician) {
          const response = await getAllTechniciansByFranchise(franchiseId);
          if (Array.isArray(response?.result)) {
            const foundTechnician = response.result.find((tech: TechnicianData) => tech.technicianId === technician?.technicianId);
            if (foundTechnician) {
              setFormData({
                username: foundTechnician.username,
                franchiseId,
                category: foundTechnician.category,
                phoneNumber: foundTechnician.phoneNumber,
                password: '',
                buildingName: foundTechnician.buildingName,
                areaName: foundTechnician.areaName,
                city: foundTechnician.city,
                state: foundTechnician.state,
                pincode: foundTechnician.pincode,
                subscriptionId: foundTechnician.subscriptionId,
                technicianId: foundTechnician.technicianId,
                profileImage: foundTechnician.profileImage || '',
              });
              setProfileImagePreview(foundTechnician.profileImage || null);
            } else {
              setError('Technician not found');
            }
          } else {
            setError('No technicians found');
          }
        }

        const [pincodesResponse, categoriesResponse, plansResponse] = await Promise.all([
          getAllPincodes(),
          getAllCategories(null),
          getPlans(),
        ]);

        if (Array.isArray(pincodesResponse?.data)) {
          setPincodeData(pincodesResponse.data);
        } else {
          setPincodeData([]);
          setError('Failed to load pincodes');
        }

        if (Array.isArray(categoriesResponse?.data)) {
          setApiCategories(categoriesResponse.data);
        } else {
          setApiCategories([]);
          setError('Failed to load categories');
        }

        if (Array.isArray(plansResponse?.data)) {
          setSubscriptionPlans(plansResponse.data);
        } else {
          setSubscriptionPlans([]);
          setError('Failed to load subscription plans');
        }
      } catch (error) {
        setError((error as Error)?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [technician]);

  // Update area options and city/state when pincode changes
  useEffect(() => {
    if (formData.pincode && pincodeData.length > 0) {
      const found = pincodeData.find((p) => p.code === formData.pincode);
      if (found && found.areas) {
        setAreaOptions(found.areas);
        setFormData((prev) => ({
          ...prev,
          city: found.city,
          state: found.state,
          areaName: found.areas.some((area) => area.name === prev.areaName)
            ? prev.areaName
            : found.areas[0]?.name || '',
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
    } else {
      setAreaOptions([]);
      setFormData((prev) => ({
        ...prev,
        city: '',
        state: '',
        areaName: '',
      }));
    }
  }, [formData.pincode, pincodeData]);

  const handleChange = useCallback((name: keyof TechnicianData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback(() => {
    Alert.alert(
      'Select Image',
      'Choose an option to select a profile image',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera(
              { mediaType: 'photo', cameraType: 'back', quality: 0.5 },
              (response) => {
                if (response.didCancel) {
                  return;
                }
                if (response.errorCode) {
                  setError(`Image selection error: ${response.errorMessage}`);
                  return;
                }
                const asset = response.assets?.[0];
                if (asset?.uri) {
                  setFormData((prev) => ({ ...prev, profileImage: asset.uri }));
                  setProfileImagePreview(asset.uri);
                }
              }
            );
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary(
              { mediaType: 'photo', quality: 0.5 },
              (response) => {
                if (response.didCancel) {
                  return;
                }
                if (response.errorCode) {
                  setError(`Image selection error: ${response.errorMessage}`);
                  return;
                }
                const asset = response.assets?.[0];
                if (asset?.uri) {
                  setFormData((prev) => ({ ...prev, profileImage: asset?.uri }));
                  setProfileImagePreview(asset.uri);
                }
              }
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  }, []);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setLoading(true);
    setSuccess('');

    try {
      if (!formData.franchiseId) {
        setError('Franchise ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      if (!formData.pincode || formData.pincode.length !== 6) {
        setError('Pincode must be exactly 6 digits');
        setLoading(false);
        return;
      }

      if (!/^\d{10}$/.test(formData.phoneNumber)) {
        setError('Phone number must be exactly 10 digits');
        setLoading(false);
        return;
      }

      if (!formData.category) {
        setError('Category is required');
        setLoading(false);
        return;
      }

      if (!formData.buildingName) {
        setError('Building name is required');
        setLoading(false);
        return;
      }

      if (!formData.areaName) {
        setError('Area is required');
        setLoading(false);
        return;
      }

      const updateData = {
        subscriptionId: formData.subscriptionId,
        category: formData.category,
        phoneNumber: formData.phoneNumber,
        password: formData.password || undefined,
        buildingName: formData.buildingName,
        areaName: formData.areaName,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        technicianId: formData.technicianId,
        profileImage: formData.profileImage || undefined,
      };

      await updateTechByFranchise(updateData);
      setSuccess('Technician updated successfully!');
      setTimeout(() => navigation.navigate('Technicians'), 2000);
    } catch (error) {
      setError((error as Error)?.message || 'Failed to update technician');
    } finally {
      setLoading(false);
    }
  }, [formData, navigation]);

  const handleCancel = useCallback(() => {
    navigation.navigate('Technicians');
  }, [navigation]);

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center">
        <View className="flex-row items-center">
          <Ionicons name="refresh" size={24} color="#4B5563" style={styles.loadingIcon} />
          <Text className="ml-3 text-gray-700 text-lg">Loading...</Text>
        </View>
      </View>
    );
  }

  if (error || !technician) {
    return (
      <View className="flex-1 bg-gray-100 justify-center items-center p-8">
        <View className="bg-red-100 p-3 rounded-lg">
          <Text className="text-red-600 text-sm">{error || 'No technician data available.'}</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView className="flex-1 bg-gray-100 p-1">
        <View className="flex-1 bg-gray-100 px-5 pt-2 pb-5">
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
                  onPress={handleImageChange}
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
              <View className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
                <Picker
                  selectedValue={formData.category}
                  onValueChange={(value) => handleChange('category', value)}
                  style={styles.picker}
                  enabled={false}
                >
                  <Picker.Item label="Select a category" value="" enabled={false} />
                  {apiCategories
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
                  {pincodeData.map((p) => (
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
                  {formData.pincode && pincodeData.find((p) => p.code === formData.pincode) && (
                    <Picker.Item
                      label={pincodeData.find((p) => p.code === formData.pincode)?.city}
                      value={pincodeData.find((p) => p.code === formData.pincode)?.city}
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
                  {formData.pincode && pincodeData.find((p) => p.code === formData.pincode) && (
                    <Picker.Item
                      label={pincodeData.find((p) => p.code === formData.pincode)?.state}
                      value={pincodeData.find((p) => p.code === formData.pincode)?.state}
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
                value={formData.subscriptionId}
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
    </KeyboardAvoidingView>
  );
};

// StyleSheet for styles not supported by NativeWind
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
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
// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Ionicons } from '@expo/vector-icons';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getAllTechniciansByFranchise, getAllPincodes, getAllCategories, getPlans, updateTechByFranchise } from '../../api/apiMethods';

// interface Subscription {
//   subscriptionId: string;
//   subscriptionName: string;
//   startDate: string;
//   endDate: string;
//   leads: number | null;
//   ordersCount: number;
//   _id: string;
// }

// interface TechnicianData {
//   username: string;
//   franchiseId: string;
//   category: string;
//   phoneNumber: string;
//   password: string;
//   buildingName: string;
//   areaName: string;
//   city: string;
//   state: string;
//   pincode: string;
//   subscriptionId: string;
//   technicianId: string;
//   profileImage: string;
// }

// interface PincodeData {
//   _id: string;
//   code: string;
//   city: string;
//   state: string;
//   areas: { _id: string; name: string }[];
// }

// interface CategoryData {
//   _id: string;
//   category_name: string;
//   status: number;
// }

// interface SubscriptionPlan {
//   _id: string;
//   name: string;
// }

// const initialFormState: TechnicianData = {
//   username: '',
//   franchiseId: '',
//   category: '',
//   phoneNumber: '',
//   password: '',
//   buildingName: '',
//   areaName: '',
//   city: '',
//   state: '',
//   pincode: '',
//   subscriptionId: '',
//   technicianId: '',
//   profileImage: '',
// };

// const EditTechnician: React.FC = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const technician = (route.params as { tech: TechnicianData })?.tech;
  
//   const [formData, setFormData] = useState<TechnicianData>(technician || initialFormState);
//   const [showPassword, setShowPassword] = useState(false);
//   const [areaOptions, setAreaOptions] = useState<{ _id: string; name: string }[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string>('');
//   const [loading, setLoading] = useState(false);
//   const [apiCategories, setApiCategories] = useState<CategoryData[]>([]);
//   const [pincodeData, setPincodeData] = useState<PincodeData[]>([]);
//   const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);
//   const [profileImagePreview, setProfileImagePreview] = useState<string | null>(formData.profileImage || null);

//   // Fetch data from APIs
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError('');

//         const franchiseId = await AsyncStorage.getItem('franchiseId');
//         if (!franchiseId) {
//           setError('Franchise ID not found. Please log in again.');
//           setLoading(false);
//           return;
//         }

//         if (!technician) {
//           const response = await getAllTechniciansByFranchise(franchiseId);
//           if (Array.isArray(response?.result)) {
//             const foundTechnician = response.result.find((tech: TechnicianData) => tech.technicianId === technician?.technicianId);
//             if (foundTechnician) {
//               setFormData({
//                 username: foundTechnician.username,
//                 franchiseId,
//                 category: foundTechnician.category,
//                 phoneNumber: foundTechnician.phoneNumber,
//                 password: '',
//                 buildingName: foundTechnician.buildingName,
//                 areaName: foundTechnician.areaName,
//                 city: foundTechnician.city,
//                 state: foundTechnician.state,
//                 pincode: foundTechnician.pincode,
//                 subscriptionId: foundTechnician.subscriptionId,
//                 technicianId: foundTechnician.technicianId,
//                 profileImage: foundTechnician.profileImage || '',
//               });
//               setProfileImagePreview(foundTechnician.profileImage || null);
//             } else {
//               setError('Technician not found');
//             }
//           } else {
//             setError('No technicians found');
//           }
//         }

//         const [pincodesResponse, categoriesResponse, plansResponse] = await Promise.all([
//           getAllPincodes(),
//           getAllCategories(null),
//           getPlans(),
//         ]);

//         if (Array.isArray(pincodesResponse?.data)) {
//           setPincodeData(pincodesResponse.data);
//         } else {
//           setPincodeData([]);
//           setError('Failed to load pincodes');
//         }

//         if (Array.isArray(categoriesResponse?.data)) {
//           setApiCategories(categoriesResponse.data);
//         } else {
//           setApiCategories([]);
//           setError('Failed to load categories');
//         }

//         if (Array.isArray(plansResponse?.data)) {
//           setSubscriptionPlans(plansResponse.data);
//         } else {
//           setSubscriptionPlans([]);
//           setError('Failed to load subscription plans');
//         }
//       } catch (error) {
//         setError((error as Error)?.message || 'Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [technician]);

//   // Update area options and city/state when pincode changes
//   useEffect(() => {
//     if (formData.pincode && pincodeData.length > 0) {
//       const found = pincodeData.find((p) => p.code === formData.pincode);
//       if (found && found.areas) {
//         setAreaOptions(found.areas);
//         setFormData((prev) => ({
//           ...prev,
//           city: found.city,
//           state: found.state,
//           areaName: found.areas.some((area) => area.name === prev.areaName)
//             ? prev.areaName
//             : found.areas[0]?.name || '',
//         }));
//       } else {
//         setAreaOptions([]);
//         setFormData((prev) => ({
//           ...prev,
//           city: '',
//           state: '',
//           areaName: '',
//         }));
//       }
//     } else {
//       setAreaOptions([]);
//       setFormData((prev) => ({
//         ...prev,
//         city: '',
//         state: '',
//         areaName: '',
//       }));
//     }
//   }, [formData.pincode, pincodeData]);

//   const handleChange = useCallback((name: keyof TechnicianData, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }, []);

//   const handleImageChange = useCallback(() => {
//     // Simulate image upload for UI demo (React Native doesn't support <input type="file">)
//     const newImage = 'new-image.jpg'; // Placeholder for demo
//     setFormData((prev) => ({ ...prev, profileImage: newImage }));
//     setProfileImagePreview('https://via.placeholder.com/150'); // Placeholder for demo
//   }, []);

//   const handleSubmit = useCallback(async () => {
//     setError(null);
//     setLoading(true);
//     setSuccess('');

//     try {
//       if (!formData.franchiseId) {
//         setError('Franchise ID not found. Please log in again.');
//         setLoading(false);
//         return;
//       }

//       if (!formData.pincode || formData.pincode.length !== 6) {
//         setError('Pincode must be exactly 6 digits');
//         setLoading(false);
//         return;
//       }

//       if (!/^\d{10}$/.test(formData.phoneNumber)) {
//         setError('Phone number must be exactly 10 digits');
//         setLoading(false);
//         return;
//       }

//       if (!formData.category) {
//         setError('Category is required');
//         setLoading(false);
//         return;
//       }

//       if (!formData.buildingName) {
//         setError('Building name is required');
//         setLoading(false);
//         return;
//       }

//       if (!formData.areaName) {
//         setError('Area is required');
//         setLoading(false);
//         return;
//       }

//       const updateData = {
//         subscriptionId: formData.subscriptionId,
//         category: formData.category,
//         phoneNumber: formData.phoneNumber,
//         password: formData.password || undefined,
//         buildingName: formData.buildingName,
//         areaName: formData.areaName,
//         city: formData.city,
//         state: formData.state,
//         pincode: formData.pincode,
//         technicianId: formData.technicianId,
//         profileImage: formData.profileImage || undefined,
//       };

//       await updateTechByFranchise(updateData);
//       setSuccess('Technician updated successfully!');
//       setTimeout(() => navigation.navigate('Technicians'), 2000);
//     } catch (error) {
//       setError((error as Error)?.message || 'Failed to update technician');
//     } finally {
//       setLoading(false);
//     }
//   }, [formData, navigation]);

//   const handleCancel = useCallback(() => {
//     navigation.navigate('Technicians');
//   }, [navigation]);

//   if (loading) {
//     return (
//       <View className="flex-1 bg-gray-100 justify-center items-center">
//         <View className="flex-row items-center">
//           <Ionicons name="refresh" size={24} color="#4B5563" style={styles.loadingIcon} />
//           <Text className="ml-3 text-gray-700 text-lg">Loading...</Text>
//         </View>
//       </View>
//     );
//   }

//   if (error || !technician) {
//     return (
//       <View className="flex-1 bg-gray-100 justify-center items-center p-8">
//         <View className="bg-red-100 p-3 rounded-lg">
//           <Text className="text-red-600 text-sm">{error || 'No technician data available.'}</Text>
//         </View>
//       </View>
//     );
//   }

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.keyboardAvoidingView}
//     >
//       <ScrollView className="flex-1 bg-gray-100 p-1">
//         <View className="flex-1 bg-gray-100 px-2 pt-2 pb-5">
//           <Text className="text-3xl font-extrabold text-indigo-900 text-center mb-6">
//             Edit Technician
//           </Text>
//           {error && (
//             <View className="bg-red-100 p-3 rounded-lg mb-6 items-center">
//               <Text className="text-red-600 text-sm font-medium">{error}</Text>
//             </View>
//           )}
//           {success && (
//             <View className="bg-green-100 p-3 rounded-lg mb-6 items-center">
//               <Text className="text-green-600 text-sm font-medium">{success}</Text>
//             </View>
//           )}
//           <View className="bg-white rounded-xl p-5 gap-5" style={styles.formContainer}>
//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Profile Image
//               </Text>
//               <View className="flex-row items-center gap-4">
//                 {profileImagePreview && (
//                   <Image
//                     source={{ uri: profileImagePreview }}
//                     className="w-16 h-16 rounded-full"
//                     style={styles.profileImage}
//                   />
//                 )}
//                 <TouchableOpacity
//                   className="bg-white rounded-lg px-4 py-3 border border-gray-300 flex-1"
//                   onPress={handleImageChange}
//                 >
//                   <Text className="text-gray-700">Upload profile image</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Technician Name <Text className="text-red-500">*</Text>
//               </Text>
//               <TextInput
//                 className="bg-white rounded-lg px-4 py-3 text-base border border-gray-300"
//                 placeholder="Enter technician name"
//                 value={formData.username}
//                 onChangeText={(value) => handleChange('username', value)}
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Category <Text className="text-red-500">*</Text>
//               </Text>
//               <View className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
//                 <Picker
//                   selectedValue={formData.category}
//                   onValueChange={(value) => handleChange('category', value)}
//                   style={styles.picker}
//                   enabled={false}
//                 >
//                   <Picker.Item label="Select a category" value="" enabled={false} />
//                   {apiCategories
//                     .filter((category) => category.status === 1)
//                     .map((item) => (
//                       <Picker.Item key={item._id} label={item.category_name} value={item._id} />
//                     ))}
//                 </Picker>
//               </View>
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Phone Number <Text className="text-red-500">*</Text>
//               </Text>
//               <TextInput
//                 className="bg-gray-100 rounded-lg px-4 py-3 text-base border border-gray-300"
//                 placeholder="Enter 10-digit phone number"
//                 value={formData.phoneNumber}
//                 onChangeText={(value) => handleChange('phoneNumber', value)}
//                 keyboardType="phone-pad"
//                 maxLength={10}
//                 placeholderTextColor="#9CA3AF"
//                 editable={false}
//               />
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Password
//               </Text>
//               <View className="flex-row items-center bg-white rounded-lg border border-gray-300">
//                 <TextInput
//                   className="flex-1 px-4 py-3 text-base"
//                   placeholder="6-10 characters (optional)"
//                   value={formData.password}
//                   onChangeText={(value) => handleChange('password', value)}
//                   secureTextEntry={!showPassword}
//                   maxLength={10}
//                   placeholderTextColor="#9CA3AF"
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowPassword(!showPassword)}
//                   className="p-4"
//                 >
//                   <Ionicons
//                     name={showPassword ? 'eye-off' : 'eye'}
//                     size={24}
//                     color="#4B5563"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Building Name <Text className="text-red-500">*</Text>
//               </Text>
//               <TextInput
//                 className="bg-white rounded-lg px-4 py-3 text-base border border-gray-300"
//                 placeholder="Enter building name"
//                 value={formData.buildingName}
//                 onChangeText={(value) => handleChange('buildingName', value)}
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Pincode <Text className="text-red-500">*</Text>
//               </Text>
//               <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
//                 <Picker
//                   selectedValue={formData.pincode}
//                   onValueChange={(value) => handleChange('pincode', value)}
//                   style={styles.picker}
//                 >
//                   <Picker.Item label="Select Pincode" value="" enabled={false} />
//                   {pincodeData.map((p) => (
//                     <Picker.Item key={p._id} label={p.code} value={p.code} />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Area <Text className="text-red-500">*</Text>
//               </Text>
//               <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!formData.pincode ? 'bg-gray-100' : ''}`}>
//                 <Picker
//                   selectedValue={formData.areaName}
//                   onValueChange={(value) => handleChange('areaName', value)}
//                   style={styles.picker}
//                   enabled={!!formData.pincode}
//                 >
//                   <Picker.Item label="Select Area" value="" enabled={false} />
//                   {areaOptions.map((a) => (
//                     <Picker.Item key={a._id} label={a.name} value={a.name} />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 City
//               </Text>
//               <View className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
//                 <Picker
//                   selectedValue={formData.city}
//                   onValueChange={(value) => handleChange('city', value)}
//                   style={styles.picker}
//                   enabled={false}
//                 >
//                   <Picker.Item label="Select City" value="" enabled={false} />
//                   {formData.pincode && pincodeData.find((p) => p.code === formData.pincode) && (
//                     <Picker.Item
//                       label={pincodeData.find((p) => p.code === formData.pincode)?.city}
//                       value={pincodeData.find((p) => p.code === formData.pincode)?.city}
//                     />
//                   )}
//                 </Picker>
//               </View>
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 State
//               </Text>
//               <View className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
//                 <Picker
//                   selectedValue={formData.state}
//                   onValueChange={(value) => handleChange('state', value)}
//                   style={styles.picker}
//                   enabled={false}
//                 >
//                   <Picker.Item label="Select State" value="" enabled={false} />
//                   {formData.pincode && pincodeData.find((p) => p.code === formData.pincode) && (
//                     <Picker.Item
//                       label={pincodeData.find((p) => p.code === formData.pincode)?.state}
//                       value={pincodeData.find((p) => p.code === formData.pincode)?.state}
//                     />
//                   )}
//                 </Picker>
//               </View>
//             </View>

//             <View className="gap-2">
//               <Text className="text-base font-semibold text-indigo-700">
//                 Subscription Plan
//               </Text>
//               <TextInput
//                 className="bg-gray-100 rounded-lg px-4 py-3 text-base border border-gray-300"
//                 value={subscriptionPlans.find((plan) => plan._id === formData.subscriptionId)?.name || formData.subscriptionId}
//                 editable={false}
//                 placeholderTextColor="#9CA3AF"
//               />
//             </View>

//             <View className="flex-row justify-end gap-4 mt-4">
//               <TouchableOpacity
//                 className="bg-gray-200 rounded-lg py-3 px-4"
//                 onPress={handleCancel}
//               >
//                 <Text className="text-gray-700 text-base font-semibold">Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 className={`bg-indigo-600 rounded-lg py-3 px-4 ${loading ? 'bg-gray-400' : 'active:bg-indigo-700'}`}
//                 onPress={handleSubmit}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <View className="flex-row items-center">
//                     <Ionicons name="refresh" size={24} color="#FFFFFF" style={styles.loadingIcon} />
//                     <Text className="text-white text-base font-semibold ml-2">Saving...</Text>
//                   </View>
//                 ) : (
//                   <Text className="text-white text-base font-semibold">Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// // StyleSheet for styles not supported by NativeWind
// const styles = StyleSheet.create({
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   formContainer: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   picker: {
//     fontSize: 16,
//     color: '#1F2937', // text-gray-900
//   },
//   profileImage: {
//     resizeMode: 'cover',
//   },
//   loadingIcon: {
//     transform: [{ rotate: '90deg' }],
//   },
// });

// export default EditTechnician;
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, Platform, StyleSheet, ScrollView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Ionicons } from '@expo/vector-icons';
// import { Route } from 'expo-router/build/Route';
// import { useRoute } from '@react-navigation/native';
// import { useNavigation } from 'expo-router';

// // Fake data for dropdowns
// const fakeCategories = [
//   { _id: '1', category_name: 'Plumbing', status: 1 },
//   { _id: '2', category_name: 'Electrical', status: 1 },
//   { _id: '3', category_name: 'Carpentry', status: 1 },
// ];

// const fakePincodes = [
//   { _id: '1', code: '400001', city: 'Mumbai', state: 'Maharashtra', areas: [{ _id: 'a1', name: 'Colaba' }, { _id: 'a2', name: 'Fort' }] },
//   { _id: '2', code: '400002', city: 'Mumbai', state: 'Maharashtra', areas: [{ _id: 'a3', name: 'Kalbadevi' }, { _id: 'a4', name: 'Mandvi' }] },
// ];

// const fakeSubscriptionPlans = [
//   { _id: '1', name: 'Basic Plan' },
//   { _id: '2', name: 'Premium Plan' },
// ];

// interface TechnicianData {
//   username: string;
//   category: string;
//   phoneNumber: string;
//   password: string;
//   buildingName: string;
//   areaName: string;
//   city: string;
//   state: string;
//   pincode: string;
//   subscriptionId: string;
//   technicianId: string;
//   profileImage: string;
// }

// const EditTechnician: React.FC = () => {
//     const route = useRoute();
//     const navigation = useNavigation();
//     const technician = (route.params as { tech: TechnicianData })?.tech;
    
//     const [formData, setFormData] = useState<TechnicianData>(technician);
//     const [showPassword, setShowPassword] = useState(false);
//     const [areaOptions, setAreaOptions] = useState<{ _id: string; name: string }[]>(fakePincodes[0].areas);
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string>('');
//     const [loading, setLoading] = useState(false);
//     const [profileImagePreview, setProfileImagePreview] = useState<string | null>(formData.profileImage);
    
//   const handleChange = (name: keyof TechnicianData, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === 'pincode') {
//       const found = fakePincodes.find((p) => p.code === value);
//       if (found && found.areas) {
//         setAreaOptions(found.areas);
//         setFormData((prev) => ({
//           ...prev,
//           city: found.city,
//           state: found.state,
//           areaName: found.areas[0]?.name || '',
//         }));
//       } else {
//         setAreaOptions([]);
//         setFormData((prev) => ({
//           ...prev,
//           city: '',
//           state: '',
//           areaName: '',
//         }));
//       }
//     }
//   };

//   const handleImageChange = (file: string) => {
//     // Simulate image upload for UI demo
//     setFormData((prev) => ({ ...prev, profileImage: file }));
//     setProfileImagePreview('https://via.placeholder.com/150'); // Placeholder for demo
//   };

//   const handleSubmit = () => {
//     setError(null);
//     setLoading(true);
//     setSuccess('');
//     // Simulate form submission
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess('Technician updated successfully!');
//       setTimeout(() => setSuccess(''), 2000);
//     }, 1000);
//   };

//   const handleCancel = () => {
//     // Simulate navigation for UI demo
//     setError('Navigation cancelled for UI demo.');
//     setTimeout(() => setError(null), 2000);
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-100 p-1">


//     <View className="flex-1 bg-gray-100 px-5 pt-[60px] pb-5">
//       <Text className="text-3xl font-extrabold text-indigo-900 text-center mb-6">
//         Edit Technician
//       </Text>
//       {error && (
//         <View className="bg-red-100 p-3 rounded-lg mb-6 items-center">
//           <Text className="text-red-600 text-sm font-medium">{error}</Text>
//         </View>
//       )}
//       {success && (
//         <View className="bg-green-100 p-3 rounded-lg mb-6 items-center">
//           <Text className="text-green-600 text-sm font-medium">{success}</Text>
//         </View>
//       )}
//       <View className="bg-white rounded-xl p-5 gap-5" style={styles.formContainer}>
//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Profile Image
//           </Text>
//           <View className="flex-row items-center gap-4">
//             {profileImagePreview && (
//               <Image
//                 source={{ uri: profileImagePreview }}
//                 className="w-16 h-16 rounded-full"
//                 style={styles.profileImage}
//               />
//             )}
//             <TouchableOpacity
//               className="bg-white rounded-lg px-4 py-3 border border-gray-300 flex-1"
//               onPress={() => handleImageChange('new-image.jpg')}
//               >
//               <Text className="text-gray-700">Upload profile image</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Technician Name <Text className="text-red-500">*</Text>
//           </Text>
//           <TextInput
//             className="bg-white rounded-lg px-4 py-3 text-base border border-gray-300"
//             placeholder="Enter technician name"
//             value={formData.username}
//             onChangeText={(value) => handleChange('username', value)}
//             placeholderTextColor="#9CA3AF"
//             />
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Category <Text className="text-red-500">*</Text>
//           </Text>
//           <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
//             <Picker
//               selectedValue={formData.category}
//               onValueChange={(value) => handleChange('category', value)}
//               style={styles.picker}
//               enabled={false}
//               >
//               <Picker.Item label="Select a category" value="" enabled={false} />
//               {fakeCategories
//                 .filter((category) => category.status === 1)
//                 .map((item) => (
//                     <Picker.Item key={item._id} label={item.category_name} value={item._id} />
//                 ))}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Phone Number <Text className="text-red-500">*</Text>
//           </Text>
//           <TextInput
//             className="bg-gray-100 rounded-lg px-4 py-3 text-base border border-gray-300"
//             placeholder="Enter 10-digit phone number"
//             value={formData.phoneNumber}
//             onChangeText={(value) => handleChange('phoneNumber', value)}
//             keyboardType="phone-pad"
//             maxLength={10}
//             placeholderTextColor="#9CA3AF"
//             editable={false}
//             />
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Password
//           </Text>
//           <View className="flex-row items-center bg-white rounded-lg border border-gray-300">
//             <TextInput
//               className="flex-1 px-4 py-3 text-base"
//               placeholder="6-10 characters (optional)"
//               value={formData.password}
//               onChangeText={(value) => handleChange('password', value)}
//               secureTextEntry={!showPassword}
//               maxLength={10}
//               placeholderTextColor="#9CA3AF"
//               />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               className="p-4"
//             >
//               <Ionicons
//                 name={showPassword ? 'eye-off' : 'eye'}
//                 size={24}
//                 color="#4B5563"
//                 />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Building Name <Text className="text-red-500">*</Text>
//           </Text>
//           <TextInput
//             className="bg-white rounded-lg px-4 py-3 text-base border border-gray-300"
//             placeholder="Enter building name"
//             value={formData.buildingName}
//             onChangeText={(value) => handleChange('buildingName', value)}
//             placeholderTextColor="#9CA3AF"
//             />
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Pincode <Text className="text-red-500">*</Text>
//           </Text>
//           <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
//             <Picker
//               selectedValue={formData.pincode}
//               onValueChange={(value) => handleChange('pincode', value)}
//               style={styles.picker}
//               >
//               <Picker.Item label="Select Pincode" value="" enabled={false} />
//               {fakePincodes.map((p) => (
//                   <Picker.Item key={p._id} label={p.code} value={p.code} />
//                 ))}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Area <Text className="text-red-500">*</Text>
//           </Text>
//           <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!formData.pincode ? 'bg-gray-100' : ''}`}>
//             <Picker
//               selectedValue={formData.areaName}
//               onValueChange={(value) => handleChange('areaName', value)}
//               style={styles.picker}
//               enabled={!!formData.pincode}
//               >
//               <Picker.Item label="Select Area" value="" enabled={false} />
//               {areaOptions.map((a) => (
//                   <Picker.Item key={a._id} label={a.name} value={a.name} />
//                 ))}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             City
//           </Text>
//           <View className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
//             <Picker
//               selectedValue={formData.city}
//               onValueChange={(value) => handleChange('city', value)}
//               style={styles.picker}
//               enabled={false}
//               >
//               <Picker.Item label="Select City" value="" enabled={false} />
//               {formData.pincode && fakePincodes.find((p) => p.code === formData.pincode) && (
//                   <Picker.Item
//                   label={fakePincodes.find((p) => p.code === formData.pincode)?.city}
//                   value={fakePincodes.find((p) => p.code === formData.pincode)?.city}
//                   />
//                 )}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             State
//           </Text>
//           <View className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
//             <Picker
//               selectedValue={formData.state}
//               onValueChange={(value) => handleChange('state', value)}
//               style={styles.picker}
//               enabled={false}
//               >
//               <Picker.Item label="Select State" value="" enabled={false} />
//               {formData.pincode && fakePincodes.find((p) => p.code === formData.pincode) && (
//                   <Picker.Item
//                   label={fakePincodes.find((p) => p.code === formData.pincode)?.state}
//                   value={fakePincodes.find((p) => p.code === formData.pincode)?.state}
//                   />
//                 )}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Subscription Plan
//           </Text>
//           <TextInput
//             className="bg-gray-100 rounded-lg px-4 py-3 text-base border border-gray-300"
//             value={fakeSubscriptionPlans.find((plan) => plan._id === formData.subscriptionId)?.name || ''}
//             editable={false}
//             placeholderTextColor="#9CA3AF"
//             />
//         </View>

//         <View className="flex-row justify-end gap-4 mt-4">
//           <TouchableOpacity
//             className="bg-gray-200 rounded-lg py-3 px-4"
//             onPress={handleCancel}
//             >
//             <Text className="text-gray-700 text-base font-semibold">Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             className={`bg-indigo-600 rounded-lg py-3 px-4 ${loading ? 'bg-gray-400' : 'active:bg-indigo-700'}`}
//             onPress={handleSubmit}
//             disabled={loading}
//             >
//             {loading ? (
//                 <View className="flex-row items-center">
//                 <Ionicons name="refresh" size={24} color="#FFFFFF" style={styles.loadingIcon} />
//                 <Text className="text-white text-base font-semibold ml-2">Saving...</Text>
//               </View>
//             ) : (
//               <Text className="text-white text-base font-semibold">Save Changes</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
// </ScrollView>
//   );
// };

// // StyleSheet for styles not supported by NativeWind
// const styles = StyleSheet.create({
//     formContainer: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 5,
//   },
//   picker: {
//     fontSize: 16,
//     color: '#1F2937', // text-gray-900
//   },
//   profileImage: {
//     resizeMode: 'cover',
//   },
//   loadingIcon: {
//     transform: [{ rotate: '90deg' }],
//   },
// });

// export default EditTechnician;