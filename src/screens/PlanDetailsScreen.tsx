import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Define Root Stack Param List (same as in AllSubscriptionsScreen)
type RootStackParamList = {
  Tabs: undefined;
  Services: undefined;
  Photos: undefined;
  Reviews: undefined;
  Transactions: undefined;
  MySubscription: undefined;
  AboutUs: undefined;
  KeyFeatures: undefined;
  AllSubscriptions: undefined;
  Franchise: undefined;
  LeaveReview: undefined;
  Login: undefined;
  Plans: undefined;
  SubscriptionDetails: { plan: Plan };
  BuyPlan: { plan: Plan };
};

interface Plan {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  finalPrice: number;
  gst: number;
  discount: number;
  validity: number;
  validityUnit: string;
  fullFeatures: { text: string }[];
}

const fakePlan: Plan = {
  _id: '1',
  name: 'Gold Plan',
  price: 999,
  originalPrice: 1299,
  finalPrice: 999,
  gst: 180,
  discount: 15,
  validity: 90,
  validityUnit: 'days',
  fullFeatures: [
    { text: 'Unlimited profile views' },
    { text: 'Featured listing' },
    { text: 'Priority support' },
  ],
};

const PlanDetailsPage: React.FC = () => {
  const route = useRoute();
  const subscription: Plan = (route.params as { plan?: Plan })?.plan || fakePlan;

  if (!subscription) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-red-600 text-lg font-semibold">Plan not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <View className="bg-white rounded-xl shadow-md p-6">
        <View className="items-center mb-4">
          <Text className="text-2xl font-bold text-gray-800">{subscription.name}</Text>
        </View>
        <View className="items-center mb-4">
          <Text className="text-2xl font-bold text-gray-900">₹ {subscription.price}</Text>
          {Number(subscription.originalPrice) > 0 && (
            <Text className="text-sm text-gray-500 line-through">
              ₹{subscription.originalPrice} + (GST 18%)
            </Text>
          )}
          {Number(subscription.finalPrice) > 0 && (
            <Text className="text-sm text-gray-600">
              ₹{subscription.finalPrice} + ₹{subscription.gst} (GST 18%)
            </Text>
          )}
        </View>
        {Number(subscription.discount) > 0 && (
          <View className="items-center mb-4">
            <View className="bg-red-500 rounded-full px-4 py-1">
              <Text className="text-white text-sm font-semibold">
                {subscription.discount}% OFF
              </Text>
            </View>
          </View>
        )}
        <View className="items-center mb-4">
          <View className="bg-blue-100 px-3 py-1 rounded-full">
            <Text className="text-sm font-medium text-blue-700">
              Valid until {subscription.validity} {subscription.validityUnit}
            </Text>
          </View>
        </View>
        <View className="border-t border-gray-200 my-4" />
        <Text className="text-lg font-semibold text-gray-800 mb-3">What's included:</Text>
        <View className="space-y-2">
          {subscription.fullFeatures.map((feature, index) => (
            <View key={index} className="flex-row items-center">
              <Text className="text-sm text-gray-700 mr-2">•</Text>
              <Text className="text-sm text-gray-700">{feature.text}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PlanDetailsPage;
// import React from 'react';
// import { View, Text, ScrollView } from 'react-native';

// const PlanDetailsPage: React.FC = () => {
//   return (
//     <ScrollView className="flex-1 bg-gray-50">
//       <View className="bg-white mx-4 my-6 rounded-xl shadow-sm border border-gray-100">
//         {/* Header Section */}
//         <View className="items-center py-8 px-6">
//           <Text className="text-2xl font-bold text-gray-800 mb-4">
//             Economy Plan
//           </Text>
          
//           {/* Price Section */}
//           <Text className="text-4xl font-bold text-gray-900 mb-2">
//             ₹ 3000
//           </Text>
          
//           {/* Original Price with Strikethrough */}
//           <View className="flex-row items-center mb-2">
//             <Text className="text-gray-500 text-sm line-through">
//               ₹6000 + GST 18%
//             </Text>
//           </View>
          
//           {/* Final Price with GST */}
//           <Text className="text-gray-600 text-sm mb-4">
//             ₹3540 = ₹540 (GST 18%)
//           </Text>
          
//           {/* Discount Badge */}
//           <View className="bg-red-500 px-3 py-1 rounded-md mb-2">
//             <Text className="text-white text-sm font-semibold">
//               50% OFF
//             </Text>
//           </View>
          
//           {/* Valid Until Badge */}
//           <View className="bg-blue-100 px-3 py-1 rounded-md">
//             <Text className="text-blue-600 text-xs font-medium">
//               Valid until
//             </Text>
//           </View>
//         </View>
        
//         {/* What's Included Section */}
//         <View className="px-6 pb-8">
//           <Text className="text-lg font-semibold text-gray-800 mb-4">
//             What's included:
//           </Text>
          
//           <View className="space-y-3">
//             {/* Plan Period */}
//             <View className="flex-row">
//               <Text className="text-blue-600 mr-3 text-base">•</Text>
//               <Text className="text-gray-700 flex-1 text-sm leading-5">
//                 Plan Period - Till 50 leads Provided
//               </Text>
//             </View>
            
//             {/* Actual Price */}
//             <View className="flex-row">
//               <Text className="text-blue-600 mr-3 text-base">•</Text>
//               <Text className="text-gray-700 flex-1 text-sm leading-5">
//                 Actual Price Rs. 6,000 + (18% GST) Rs. 1,080 = Rs. 7,080
//               </Text>
//             </View>
            
//             {/* Offer Price */}
//             <View className="flex-row">
//               <Text className="text-blue-600 mr-3 text-base">•</Text>
//               <Text className="text-gray-700 flex-1 text-sm leading-5">
//                 Offer Price Rs. 3,000 + (18% GST) Rs. 540 = Rs. 3,540
//               </Text>
//             </View>
            
//             {/* Renewal Price */}
//             <View className="flex-row">
//               <Text className="text-blue-600 mr-3 text-base">•</Text>
//               <Text className="text-gray-700 flex-1 text-sm leading-5">
//                 From next renewal subscription amount will be Rs. 3,540 only
//               </Text>
//             </View>
            
//             {/* Services */}
//             <View className="flex-row">
//               <Text className="text-blue-600 mr-3 text-base">•</Text>
//               <Text className="text-gray-700 flex-1 text-sm leading-5">
//                 Applicable for unlimited Services in a specific category
//               </Text>
//             </View>
            
//             {/* Work Images */}
//             <View className="flex-row">
//               <Text className="text-blue-600 mr-3 text-base">•</Text>
//               <Text className="text-gray-700 flex-1 text-sm leading-5">
//                 Add up to 4 work images
//               </Text>
//             </View>
            
//             {/* Social Media */}
//             <View className="flex-row">
//               <Text className="text-blue-600 mr-3 text-base">•</Text>
//               <Text className="text-gray-700 flex-1 text-sm leading-5">
//                 Social Media Promotion - Yes
//               </Text>
//             </View>
            
//             {/* Billing */}
//             <View className="flex-row">
//               <Text className="text-blue-600 mr-3 text-base">•</Text>
//               <Text className="text-gray-700 flex-1 text-sm leading-5">
//                 Billing Facility Available - Yes
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default PlanDetailsPage;