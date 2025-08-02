import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

interface AuthenticatedUser {
  id: string;
  role: 'user' | 'technician';
  username?: string;
}

interface ReviewFormData {
  username: string;
  rating: number;
  comment: string;
}

const mockUser: AuthenticatedUser = {
  id: '123',
  role: 'user',
  username: 'Anonymous',
};

const FranchiseReviewScreen: React.FC = () => {
  const [formData, setFormData] = useState<ReviewFormData>({
    username: mockUser.username || '',
    rating: 0,
    comment: '',
  });

  const handleSubmit = () => {
    if (!formData.rating) {
      Alert.alert('Error', 'Please select a rating.');
      return;
    }
    if (!formData.comment.trim()) {
      Alert.alert('Error', 'Please enter a comment.');
      return;
    }
    // Placeholder for API submission
    console.log('Submitting review:', formData);
    Alert.alert('Success', 'Review submitted successfully!');
    setFormData({ username: mockUser.username || '', rating: 0, comment: '' });
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ padding: 24, paddingBottom: 32 }}
    >
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-700">
          💥 Franchise Review
        </Text>
      </View>

      <View className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <View className="flex-col gap-6">
          {/* Name */}
          <View>
            <Text className="text-lg font-medium text-gray-700 mb-2">Name</Text>
            <TextInput
              className="p-3 border border-gray-300 rounded-lg bg-gray-100"
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text })}
              editable={true}
              style={{ fontSize: 16 }}
              accessibilityLabel="Name input"
            />
          </View>

          {/* Rating */}
          <View className="bg-white p-4 rounded-xl shadow-sm">
            <Text className="text-lg font-medium text-gray-700 mb-2">Rating</Text>
            <View className="flex-row justify-center" style={{ gap: 8 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setFormData({ ...formData, rating: star })}
                  activeOpacity={0.7}
                  accessibilityLabel={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <Ionicons
                    name={star <= formData.rating ? 'star' : 'star-outline'}
                    size={40}
                    color={star <= formData.rating ? '#facc15' : '#d1d5db'}
                    style={
                      star <= formData.rating
                        ? { backgroundColor: '#fef9c3', borderRadius: 8 }
                        : {}
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comment */}
          <View>
            <Text className="text-lg font-medium text-gray-700 mb-2">Comment</Text>
            <TextInput
              className="p-3 border border-gray-300 rounded-lg"
              multiline
              numberOfLines={4}
              placeholder="Write your review here..."
              value={formData.comment}
              onChangeText={(text) => setFormData({ ...formData, comment: text })}
              style={{ fontSize: 16, textAlignVertical: 'top' }}
              accessibilityLabel="Comment input"
            />
          </View>

          {/* Submit Button */}
          <View className="flex-row justify-end">
            <TouchableOpacity
              className="px-6 py-3 bg-blue-600 rounded-xl shadow-sm"
              activeOpacity={0.7}
              onPress={handleSubmit}
              accessibilityLabel="Submit review"
            >
              <Text className="text-base font-medium text-white">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FranchiseReviewScreen;
// import React from 'react';
// import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// import { Feather } from '@expo/vector-icons';

// const ReviewScreen: React.FC = () => {
//   // Fake data for UI
//   const fakeUser = {
//     username: 'John Doe',
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-100 p-6">
//       <View className="space-y-6 pb-8">
//         {/* Header with Close Button */}
//         <View className="flex-row justify-between items-center">
//           <Text className="text-lg font-medium text-gray-700">💥 Franchise Review</Text>
//           <TouchableOpacity>
//             <Feather name="x" size={24} color="#6b7280" />
//           </TouchableOpacity>
//         </View>

//         {/* Review Form */}
//         <View className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
//           <View className="space-y-4">
//             {/* Name Field */}
//             <Text className="text-sm font-medium text-gray-700">Name</Text>
//             <TextInput
//               value={fakeUser.username}
//               editable={false}
//               className="p-3 border border-gray-300 rounded-lg text-gray-900"
//               style={{ fontSize: 16 }}
//             />

//             {/* Rating Field */}
//             <Text className="text-sm font-medium text-gray-700">Rating</Text>
//             <View className="flex-row justify-center space-x-2 mb-6">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <TouchableOpacity
//                   key={star}
//                   accessibilityLabel={`Rate ${star} star${star > 1 ? 's' : ''}`}
//                 >
//                   <Feather
//                     name="star"
//                     size={48}
//                     color={star <= 3 ? '#facc15' : '#d1d5db'} // Simulating selected rating of 3
//                     style={star <= 3 ? { backgroundColor: '#fef9c3', borderRadius: 8 } : {}}
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Comment Field */}
//             <Text className="text-sm font-medium text-gray-700">Comment</Text>
//             <TextInput
//               multiline
//               numberOfLines={4}
//               placeholder="Write your review here..."
//               value=""
//               className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
//               style={{ fontSize: 16, textAlignVertical: 'top' }}
//             />

//             {/* Submit Button */}
//             <View className="flex-row justify-end">
//               <TouchableOpacity className="px-4 py-2 bg-blue-600 rounded-lg">
//                 <Text className="text-sm text-white font-medium">Submit</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default ReviewScreen;