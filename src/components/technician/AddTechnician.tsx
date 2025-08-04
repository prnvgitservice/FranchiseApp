import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCategories, getAllPincodes, getPlans } from '../../api/apiMethods';

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
}

interface PincodeData {
  _id: string;
  code: string;
  city: string;
  state: string;
  areas: { _id: string; name: string }[];
}

interface SubscriptionPlan {
  _id: string;
  name: string;
  price: number;
  finalPrice: number;
  gst: number;
}

interface Category {
  _id: string;
  category_name: string;
  status: number;
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
};

const AddTechnician: React.FC = () => {
  const [formData, setFormData] = useState<TechnicianData>(initialFormState);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState<string>('');
  const [areaOptions, setAreaOptions] = useState<{ _id: string; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiCategories, setApiCategories] = useState<Category[]>([]);
  const [pincodeData, setPincodeData] = useState<PincodeData[]>([]);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const franchiseId = await AsyncStorage.getItem('franchiseId');
        if (franchiseId) {
          setFormData((prev) => ({ ...prev, franchiseId }));
        } else {
          setError('Franchise ID not found. Please log in again.');
        }

        const [categoriesRes, pincodesRes, plansRes] = await Promise.all([
          getAllCategories(null),
          getAllPincodes(),
          getPlans(),
        ]);

        if (Array.isArray(categoriesRes?.data)) {
          setApiCategories(categoriesRes.data);
        } else {
          setApiCategories([]);
          setError('Failed to load categories');
        }

        if (Array.isArray(pincodesRes?.data)) {
          setPincodeData(pincodesRes.data);
        } else {
          setPincodeData([]);
          setError('Failed to load pincodes');
        }

        if (Array.isArray(plansRes?.data)) {
          setSubscriptionPlans(plansRes.data);
        } else {
          setSubscriptionPlans([]);
          setError('Failed to load subscription plans');
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
      }
    };

    fetchData();
  }, []);

  // Update area options and city/state when pincode changes
  useEffect(() => {
    if (selectedPincode) {
      const found = pincodeData.find((p) => p.code === selectedPincode);
      if (found && found.areas) {
        setAreaOptions(found.areas);
        setFormData((prev) => ({
          ...prev,
          city: found.city,
          state: found.state,
          areaName: '',
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
  }, [selectedPincode, pincodeData]);

  const handleChange = useCallback((name: keyof TechnicianData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'pincode') {
      setSelectedPincode(value);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      if (!formData.franchiseId) {
        setError('Franchise ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      if (!formData.username) {
        setError('Technician name is required');
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

      if (!formData.subscriptionId) {
        setError('Please select a subscription plan');
        setLoading(false);
        return;
      }

      // Simulate navigation to payment (since navigation isn't fully implemented)
      console.log('Form Data:', formData);
      setError('This is a UI-only demo. Form submission is not implemented.');
    } catch (err: any) {
      setError(err?.message || 'Failed to proceed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={styles.keyboardAvoidingView}
    // >
      <ScrollView className="flex-1 bg-gray-100 p-4">
        <View className="flex-1 bg-gray-100">
          <Text className="text-3xl font-extrabold text-indigo-900 text-center mb-6">
            Add New Technician
          </Text>
          {error && (
            <View className="bg-red-100 p-3 rounded-lg mb-6 items-center">
              <Text className="text-red-600 text-sm font-medium">{error}</Text>
            </View>
          )}
          <View className="bg-white rounded-xl p-5 gap-5" style={styles.formContainer}>
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
                >
                  <Picker.Item label="Select a category" value="" enabled={false} />
                  {apiCategories
                    .filter((category) => category?.status === 1)
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
                className="bg-white rounded-lg px-4 py-3 text-base border border-gray-300"
                placeholder="Enter 10-digit phone number"
                value={formData.phoneNumber}
                onChangeText={(value) => handleChange('phoneNumber', value)}
                keyboardType="phone-pad"
                maxLength={10}
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="gap-2">
              <Text className="text-base font-semibold text-indigo-700">
                Password <Text className="text-red-500">*</Text>
              </Text>
              <View className="flex-row items-center bg-white rounded-lg border border-gray-300">
                <TextInput
                  className="flex-1 px-4 py-3 text-base"
                  placeholder="6-10 characters"
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
              <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!selectedPincode ? 'bg-gray-100' : ''}`}>
                <Picker
                  selectedValue={formData.areaName}
                  onValueChange={(value) => handleChange('areaName', value)}
                  style={styles.picker}
                  enabled={!!selectedPincode}
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
                City <Text className="text-red-500">*</Text>
              </Text>
              <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!selectedPincode ? 'bg-gray-100' : ''}`}>
                <Picker
                  selectedValue={formData.city}
                  onValueChange={(value) => handleChange('city', value)}
                  style={styles.picker}
                  enabled={!!selectedPincode}
                >
                  <Picker.Item label="Select City" value="" enabled={false} />
                  {selectedPincode && pincodeData.find((p) => p.code === selectedPincode) && (
                    <Picker.Item
                      label={pincodeData.find((p) => p.code === selectedPincode)?.city}
                      value={pincodeData.find((p) => p.code === selectedPincode)?.city}
                    />
                  )}
                </Picker>
              </View>
            </View>

            <View className="gap-2">
              <Text className="text-base font-semibold text-indigo-700">
                State <Text className="text-red-500">*</Text>
              </Text>
              <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!selectedPincode ? 'bg-gray-100' : ''}`}>
                <Picker
                  selectedValue={formData.state}
                  onValueChange={(value) => handleChange('state', value)}
                  style={styles.picker}
                  enabled={!!selectedPincode}
                >
                  <Picker.Item label="Select State" value="" enabled={false} />
                  {selectedPincode && pincodeData.find((p) => p.code === selectedPincode) && (
                    <Picker.Item
                      label={pincodeData.find((p) => p.code === selectedPincode)?.state}
                      value={pincodeData.find((p) => p.code === selectedPincode)?.state}
                    />
                  )}
                </Picker>
              </View>
            </View>

            <View className="gap-2">
              <Text className="text-base font-semibold text-indigo-700">
                Subscription Plan <Text className="text-red-500">*</Text>
              </Text>
              <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                <Picker
                  selectedValue={formData.subscriptionId}
                  onValueChange={(value) => handleChange('subscriptionId', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Subscription Plan" value="" enabled={false} />
                  {subscriptionPlans
                    .filter((plan) => plan.name === 'Economy Plan')
                    .map((plan) => (
                      <Picker.Item
                        key={plan._id}
                        label={`${plan.name} - ₹${plan.finalPrice} (${plan.price} + ${plan.gst} GST)`}
                        value={plan._id}
                      />
                    ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              className={`bg-indigo-600 rounded-lg py-4 items-center justify-center mt-4 ${loading ? 'bg-gray-400' : 'active:bg-indigo-700'}`}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <View className="flex-row items-center">
                  <Ionicons name="refresh" size={24} color="#FFFFFF" />
                  <Text className="text-white text-lg font-semibold ml-2">Processing...</Text>
                </View>
              ) : (
                <Text className="text-white text-lg font-semibold">Proceed to Payment</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    // {/* </KeyboardAvoidingView> */} 
  );
};

// StyleSheet for styles not supported by NativeWind
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    marginBottom: 21,
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
  loadingIcon: {
    transform: [{ rotate: '90deg' }],
  },
});

export default AddTechnician;
// Economy Plan
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet, ScrollView } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { Ionicons } from '@expo/vector-icons';

// // Fake data for dropdowns
// const fakeCategories = [
//   { _id: '1', category_name: 'Plumbing' },
//   { _id: '2', category_name: 'Electrical' },
//   { _id: '3', category_name: 'Carpentry' },
// ];

// const fakePincodes = [
//   { _id: '1', code: '400001', city: 'Mumbai', state: 'Maharashtra', areas: [{ _id: 'a1', name: 'Colaba' }, { _id: 'a2', name: 'Fort' }] },
//   { _id: '2', code: '400002', city: 'Mumbai', state: 'Maharashtra', areas: [{ _id: 'a3', name: 'Kalbadevi' }, { _id: 'a4', name: 'Mandvi' }] },
// ];

// const fakeSubscriptionPlans = [
//   { _id: '1', name: 'Basic Plan', price: 1000, finalPrice: 1180, gst: 180 },
//   { _id: '2', name: 'Premium Plan', price: 2000, finalPrice: 2360, gst: 360 },
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
// }

// const initialFormState: TechnicianData = {
//   username: '',
//   category: '',
//   phoneNumber: '',
//   password: '',
//   buildingName: '',
//   areaName: '',
//   city: '',
//   state: '',
//   pincode: '',
//   subscriptionId: '',
// };

// const AddTechnician: React.FC = () => {
//   const [formData, setFormData] = useState<TechnicianData>(initialFormState);
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedPincode, setSelectedPincode] = useState<string>('');
//   const [areaOptions, setAreaOptions] = useState<{ _id: string; name: string }[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (name: keyof TechnicianData, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === 'pincode') {
//       setSelectedPincode(value);
//       const found = fakePincodes.find((p) => p.code === value);
//       if (found && found.areas) {
//         setAreaOptions(found.areas);
//         setFormData((prev) => ({
//           ...prev,
//           city: found.city,
//           state: found.state,
//           areaName: '',
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

//   const handleSubmit = () => {
//     setError(null);
//     setLoading(true);
//     // Simulate form submission
//     setTimeout(() => {
//       setLoading(false);
//       setError('This is a UI-only demo. Form submission is not implemented.');
//     }, 1000);
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-100 p-4">
//     <View className="flex-1 bg-gray-100">
//       <Text className="text-3xl font-extrabold text-indigo-900 text-center mb-6">
//         Add New Technician
//       </Text>
//       {error && (
//         <View className="bg-red-100 p-3 rounded-lg mb-6 items-center">
//           <Text className="text-red-600 text-sm font-medium">{error}</Text>
//         </View>
//       )}
//       <View className="bg-white rounded-xl p-5 gap-5" style={styles.formContainer}>
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
//           />
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
//               >
//               <Picker.Item label="Select a category" value="" enabled={false} />
//               {fakeCategories.map((item) => (
//                 <Picker.Item key={item._id} label={item.category_name} value={item._id} />
//             ))}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Phone Number <Text className="text-red-500">*</Text>
//           </Text>
//           <TextInput
//             className="bg-white rounded-lg px-4 py-3 text-base border border-gray-300"
//             placeholder="Enter 10-digit phone number"
//             value={formData.phoneNumber}
//             onChangeText={(value) => handleChange('phoneNumber', value)}
//             keyboardType="phone-pad"
//             maxLength={10}
//             placeholderTextColor="#9CA3AF"
//             />
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Password <Text className="text-red-500">*</Text>
//           </Text>
//           <View className="flex-row items-center bg-white rounded-lg border border-gray-300">
//             <TextInput
//               className="flex-1 px-4 py-3 text-base"
//               placeholder="6-10 characters"
//               value={formData.password}
//               onChangeText={(value) => handleChange('password', value)}
//               secureTextEntry={!showPassword}
//               maxLength={10}
//               placeholderTextColor="#9CA3AF"
//               />
//             <TouchableOpacity
//               onPress={() => setShowPassword(!showPassword)}
//               className="p-4"
//               >
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
//             >
//               <Picker.Item label="Select Pincode" value="" enabled={false} />
//               {fakePincodes.map((p) => (
//                 <Picker.Item key={p._id} label={p.code} value={p.code} />
//             ))}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Area <Text className="text-red-500">*</Text>
//           </Text>
//           <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!selectedPincode ? 'bg-gray-100' : ''}`}>
//             <Picker
//               selectedValue={formData.areaName}
//               onValueChange={(value) => handleChange('areaName', value)}
//               style={styles.picker}
//               enabled={!!selectedPincode}
//               >
//               <Picker.Item label="Select Area" value="" enabled={false} />
//               {areaOptions.map((a) => (
//                 <Picker.Item key={a._id} label={a.name} value={a.name} />
//             ))}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             City <Text className="text-red-500">*</Text>
//           </Text>
//           <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!selectedPincode ? 'bg-gray-100' : ''}`}>
//             <Picker
//               selectedValue={formData.city}
//               onValueChange={(value) => handleChange('city', value)}
//               style={styles.picker}
//               enabled={!!selectedPincode}
//               >
//               <Picker.Item label="Select City" value="" enabled={false} />
//               {selectedPincode && fakePincodes.find((p) => p.code === selectedPincode) && (
//                 <Picker.Item
//                   label={fakePincodes.find((p) => p.code === selectedPincode)?.city}
//                   value={fakePincodes.find((p) => p.code === selectedPincode)?.city}
//                 />
//             )}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             State <Text className="text-red-500">*</Text>
//           </Text>
//           <View className={`bg-white rounded-lg border border-gray-300 overflow-hidden ${!selectedPincode ? 'bg-gray-100' : ''}`}>
//             <Picker
//               selectedValue={formData.state}
//               onValueChange={(value) => handleChange('state', value)}
//               style={styles.picker}
//               enabled={!!selectedPincode}
//               >
//               <Picker.Item label="Select State" value="" enabled={false} />
//               {selectedPincode && fakePincodes.find((p) => p.code === selectedPincode) && (
//                   <Picker.Item
//                   label={fakePincodes.find((p) => p.code === selectedPincode)?.state}
//                   value={fakePincodes.find((p) => p.code === selectedPincode)?.state}
//                   />
//               )}
//             </Picker>
//           </View>
//         </View>

//         <View className="gap-2">
//           <Text className="text-base font-semibold text-indigo-700">
//             Subscription Plan <Text className="text-red-500">*</Text>
//           </Text>
//           <View className="bg-white rounded-lg border border-gray-300 overflow-hidden">
//             <Picker
//               selectedValue={formData.subscriptionId}
//               onValueChange={(value) => handleChange('subscriptionId', value)}
//               style={styles.picker}
//               >
//               <Picker.Item label="Select Subscription Plan" value="" enabled={false} />
//               {fakeSubscriptionPlans.map((plan) => (
//                   <Picker.Item
//                   key={plan._id}
//                   label={`${plan.name} - ₹${plan.finalPrice} (${plan.price} + ${plan.gst} GST)`}
//                   value={plan._id}
//                   />
//                 ))}
//             </Picker>
//           </View>
//         </View>

//         <TouchableOpacity
//           className={`bg-indigo-600 rounded-lg py-4 items-center justify-center mt-4 ${loading ? 'bg-gray-400' : 'active:bg-indigo-700'}`}
//           onPress={handleSubmit}
//           disabled={loading}
//           >
//           {loading ? (
//               <View className="flex-row items-center">
//               <Ionicons name="refresh" size={24} color="#FFFFFF" style={styles.loadingIcon} />
//               <Text className="text-white text-lg font-semibold ml-2">Processing...</Text>
//             </View>
//           ) : (
//             <Text className="text-white text-lg font-semibold">Proceed to Payment</Text>
//         )}
//         </TouchableOpacity>
//       </View>
//     </View>
// </ScrollView>
//   );
// };

// // StyleSheet for styles not supported by NativeWind
// const styles = StyleSheet.create({
//   formContainer: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
// },
//   picker: {
//     fontSize: 16,
//     color: '#1F2937', // text-gray-900
//   },
//   loadingIcon: {
//     transform: [{ rotate: '90deg' }],
//   },
// });

// export default AddTechnician;