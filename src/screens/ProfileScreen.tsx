import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from 'react-native-vector-icons';

// Define interfaces for type safety
interface Profile {
  name: string;
  service: string;
  location: string;
  years: string;
  image: string;
  phone: string;
  description: string;
}

const ProfileScreen: React.FC = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    name: 'Rani Frances',
    service: 'Web and App development',
    location: 'Downtown, Springfield, IL, 62701',
    years: '5',
    image: 'https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ=',
    phone: '+91 9618784512',
    description: '5',
  });
  const [editProfile, setEditProfile] = useState<Profile>({ ...profile });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEditChange = (name: string, value: string) => {
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = () => {
    // Placeholder for image picker (use react-native-image-picker in a real app)
    setEditProfile((prev) => ({
      ...prev,
      image: 'https://via.placeholder.com/150?text=New+Image', // Mock new image
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate saving with a delay
    setTimeout(() => {
      setProfile(editProfile);
      setEditModalOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ScrollView className="bg-gray-50 py-6">
      <View className="mx-auto px-4 max-w-screen max-h-full">
        {/* Header Section */}
        <View className="relative mb-6">
          <Text className="text-2xl font-bold text-gray-900">My Profile</Text>
          {/* <View className="flex flex-row items-center text-md text-gray-500 mt-1">
            <TouchableOpacity>
              <Text className="text-blue-600">Dashboard</Text>
            </TouchableOpacity>
            <MaterialIcons name="chevron-right" size={12} color="#9ca3af" className="mx-1" />
            <Text className="text-gray-600">My Profile</Text>
          </View> */}
          <TouchableOpacity
            className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-2 rounded-lg text-md font-medium shadow-md"
            onPress={() => {
              setEditProfile(profile);
              setEditModalOpen(true);
            }}
          >
            <Text className='text-white'>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        {isLoading ? (
          <View className="flex justify-center items-center h-48">
            <View className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" />
          </View>
        ) : (
          <View className="border border-gray-300 rounded-xl p-4 flex flex-col relative">
            <View className="flex flex-col items-center mb-4">
              <Image
                source={{ uri: profile.image }}
                className="w-40 h-40 rounded-full border-2 border-gray-300"
                style={{ objectFit: 'cover' }}
              />
            </View>
            <View className="flex-1">
              <Text className="text-3xl font-semibold truncate">{profile.name}</Text>
              <View className="flex flex-row items-center gap-3 my-2">
                <View className="flex flex-row items-center border border-amber-500 rounded-lg px-1.5 py-0.5 text-black text-md font-bold">
                  <Text>4.8</Text>
                  <MaterialIcons name="star-outline" size={16} color="#ffc71b" className="ml-1" />
                </View>
                <Text className="text-gray-600 text-md text-black">84 Ratings</Text>
              </View>
              {profile.service && (
                <View className="flex flex-row gap-2">
                  <Text className="bg-fuchsia-200 px-2 py-0.5 rounded-xl text-black text-md text-black">
                    {profile.service}
                  </Text>
                </View>
              )}
              <View className="flex flex-row my-2 items-center">
                <Ionicons name="location-outline" size={20} color="red" />
                <Text className="text-md ml-1 text-black">{profile.location}</Text>
              </View>
              {profile?.description && (
                <View className="flex flex-row items-center">
                  <FontAwesome name="thumbs-up" size={18} color="#00B800" />
                  <Text className="text-md ml-1 text-dark-900">
                    {profile?.description} Years in Services
                  </Text>
                </View>
              )}
              <View className="flex flex-row gap-3 mt-3 flex-wrap">
                <TouchableOpacity className="flex flex-row bg-fuchsia-600 rounded-xl  px-3 py-1 text-md font-bold items-center">
                  <Ionicons name="call" size={18} color="white" className="mr-1" />
                  <Text className='text-white'>{profile?.phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row bg-green-600 rounded-xl px-3 py-1 text-md font-bold items-center">
                  <MaterialIcons name="message" size={16} color="white" className="mr-1" />
                  <Text className='text-white'>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex flex-row bg-blue-600 rounded-xl px-3 py-1 text-md font-bold items-center">
                  <Ionicons name="share-social" size={16} color="white" className="mr-1" />
                  <Text className='text-white'>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Edit Modal */}
        {editModalOpen && (
          <View className="absolute  inset-0 flex items-center justify-center p-4 max-h-full mt-32">
            <View className="bg-white rounded-lg w-full max-w-sm p-5 max-h-screen">
              <TouchableOpacity
                className="absolute top-3 right-3 text-gray-500 text-xl"
                onPress={() => setEditModalOpen(false)}
              >
                <Text>×</Text>
              </TouchableOpacity>
              <Text className="font-semibold mb-4 text-gray-800 text-3xl">Edit Profile</Text>
              <View className="space-y-4">
                <View>
                  <Text className="text-md font-medium text-gray-700">Profile Image</Text>
                  <TouchableOpacity
                    className="border border-gray-300 px-3 py-4 rounded-lg text-md mt-1"
                    onPress={handleImageChange}
                  >
                    <Text>Choose Image</Text>
                  </TouchableOpacity>
                  {editProfile.image && (
                    <Image
                      source={{ uri: editProfile.image }}
                      className="w-16 h-16 rounded-full mt-2 border border-gray-200"
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </View>
                <InputField
                  label="Name"
                  name="name"
                  value={editProfile.name}
                  onChange={(value) => handleEditChange('name', value)}
                />
                <InputField
                  label="Service"
                  name="service"
                  value={editProfile.service}
                  onChange={(value) => handleEditChange('service', value)}
                />
                <InputField
                  label="Location"
                  name="location"
                  value={editProfile.location}
                  onChange={(value) => handleEditChange('location', value)}
                />
                <InputField
                  label="Years in Service"
                  name="years"
                  value={editProfile.years}
                  onChange={(value) => handleEditChange('years', value)}
                />
                <View className="flex flex-row justify-end gap-2 pt-3">
                  <TouchableOpacity
                    className="bg-gray-200 px-4 py-2 rounded-lg text-md font-medium"
                    onPress={() => setEditModalOpen(false)}
                  >
                    <Text className='text-dark-600 '>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-blue-600 px-4 py-2 rounded-lg text-md font-medium"
                    onPress={handleSave}
                    disabled={isLoading}
                  >
                    <Text className='bg-light-600'>{isLoading ? 'Saving...' : 'Save'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// Reusable InputField Component
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, value, onChange }) => (
  <View>
    <Text className="text-xl font-medium text-gray-700">{label}</Text>
    <TextInput
      className="w-full mt-1 border border-gray-300 px-4 py-4 rounded-lg text-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      value={value}
      onChangeText={(text) => onChange(text)}
    />
  </View>
);

export default ProfileScreen;
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';
// import {
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';

// export default function ProfileScreen({ navigation }) {
//   const profileData = {
//     name: 'John Doe',
//     phone: '+91 9876543210',
//     category: 'Electrician',
//     location: 'Hyderabad, Telangana',
//     rating: '4.8',
//     totalServices: '45',
//     completedServices: '42',
//     monthlyEarnings: '₹15,000',
//   };

//   const menuItems = [
//     { icon: 'person-outline', title: 'Edit Profile', action: 'edit' },
//     { icon: 'settings-outline', title: 'Settings', action: 'settings' },
//     { icon: 'notifications-outline', title: 'Notifications', action: 'notifications' },
//     { icon: 'help-circle-outline', title: 'Help & Support', action: 'help' },
//     { icon: 'document-text-outline', title: 'Terms & Conditions', action: 'terms' },
//     { icon: 'shield-checkmark-outline', title: 'Privacy Policy', action: 'privacy' },
//     { icon: 'log-out-outline', title: 'Logout', action: 'logout' },
//   ];

//   const handleMenuAction = (action) => {
//     switch (action) {
//       case 'logout':
//         navigation.navigate('Login');
//         break;
//       default:
//         // Handle other actions
//         console.log(`Action: ${action}`);
//         break;
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
//         <View style={styles.content}>
//           {/* Profile Header */}
//           <View style={styles.profileHeader}>
//             <View style={styles.avatarContainer}>
//               <View style={styles.avatar}>
//                 <Ionicons name="person" size={40} color="#6B7280" />
//               </View>
//               <TouchableOpacity style={styles.editAvatar}>
//                 <Ionicons name="camera" size={16} color="#FFFFFF" />
//               </TouchableOpacity>
//             </View>
            
//             <View style={styles.profileInfo}>
//               <Text style={styles.profileName}>{profileData.name}</Text>
//               <Text style={styles.profileCategory}>{profileData.category}</Text>
//               <Text style={styles.profileLocation}>{profileData.location}</Text>
              
//               <View style={styles.ratingContainer}>
//                 <Ionicons name="star" size={16} color="#F59E0B" />
//                 <Text style={styles.ratingText}>{profileData.rating}</Text>
//                 <Text style={styles.ratingLabel}>Rating</Text>
//               </View>
//             </View>
//           </View>

//           {/* Stats Cards */}
//           <View style={styles.statsContainer}>
//             <View style={styles.statCard}>
//               <Text style={styles.statValue}>{profileData.totalServices}</Text>
//               <Text style={styles.statLabel}>Total Services</Text>
//             </View>
//             <View style={styles.statCard}>
//               <Text style={styles.statValue}>{profileData.completedServices}</Text>
//               <Text style={styles.statLabel}>Completed</Text>
//             </View>
//             <View style={styles.statCard}>
//               <Text style={styles.statValue}>{profileData.monthlyEarnings}</Text>
//               <Text style={styles.statLabel}>Monthly Earnings</Text>
//             </View>
//           </View>

//           {/* Contact Info */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Contact Information</Text>
//             <View style={styles.contactCard}>
//               <View style={styles.contactItem}>
//                 <Ionicons name="call-outline" size={20} color="#6B7280" />
//                 <Text style={styles.contactText}>{profileData.phone}</Text>
//               </View>
//               <View style={styles.contactItem}>
//                 <Ionicons name="location-outline" size={20} color="#6B7280" />
//                 <Text style={styles.contactText}>{profileData.location}</Text>
//               </View>
//             </View>
//           </View>

//           {/* Menu Items */}
//           <View style={styles.section}>
//             <Text style={styles.sectionTitle}>Account Settings</Text>
//             <View style={styles.menuCard}>
//               {menuItems.map((item, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={styles.menuItem}
//                   onPress={() => handleMenuAction(item.action)}
//                 >
//                   <View style={styles.menuItemLeft}>
//                     <Ionicons name={item.icon} size={20} color="#6B7280" />
//                     <Text style={styles.menuItemText}>{item.title}</Text>
//                   </View>
//                   <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     padding: 16,
//   },
//   profileHeader: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   avatarContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   editAvatar: {
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     backgroundColor: '#2563EB',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   profileInfo: {
//     alignItems: 'center',
//   },
//   profileName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   profileCategory: {
//     fontSize: 16,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   profileLocation: {
//     fontSize: 14,
//     color: '#9CA3AF',
//     marginBottom: 12,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   ratingText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     marginLeft: 4,
//     marginRight: 4,
//   },
//   ratingLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   statCard: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     marginHorizontal: 4,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: '#6B7280',
//     textAlign: 'center',
//   },
//   section: {
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 12,
//   },
//   contactCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   contactItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//   },
//   contactText: {
//     fontSize: 14,
//     color: '#374151',
//     marginLeft: 12,
//   },
//   menuCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   menuItemLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   menuItemText: {
//     fontSize: 16,
//     color: '#374151',
//     marginLeft: 12,
//   },
// }); 