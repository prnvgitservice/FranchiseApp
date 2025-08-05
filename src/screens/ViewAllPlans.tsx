import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Check, X, Crown, BadgeIndianRupee } from 'lucide-react-native';
import { getFranchisePlans } from '../api/apiMethods';
import { MainAppNavigationProp } from '../navigation/types';

type PlanFeature = {
  name: string;
  included: boolean;
};

type PlanFullFeature = {
  text: string;
};

type FranchisePlan = {
  _id: string;
  name: string;
  finalPrice: number;
  originalPrice: number;
  price: number;
  gst: number;
  gstPercentage: number;
  validity: number;
  discount: number;
  features: PlanFeature[];
  fullFeatures?: PlanFullFeature[];
  isPopular?: boolean;
};

const ViewAllPlansScreen: React.FC = () => {
  const navigation = useNavigation<MainAppNavigationProp>();
  const [plan, setPlan] = useState<FranchisePlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await getFranchisePlans();
        if (response && response.success && Array.isArray(response.data) && response.data.length > 0) {
          setPlan(response.data[0]);
        } else {
          setError('No plan found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch franchise plan');
      }
    };
    fetchPlan();
  }, []);

  const handleFullDetails = (plan: FranchisePlan) => {
    navigation.navigate('PlanDetails', { plan });
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <View className="w-full max-w-md mx-auto px-4 pt-8">
        <View className="mb-10 text-center">
          <Text className="text-4xl font-bold text-gray-900">
            The Ultimate Franchise Plan
          </Text>
          <Text className="text-base text-gray-600 mt-3 leading-relaxed">
          Unlock every premium feature and grow your franchise business with our all-in-one, most popular plan.
          </Text>
        </View>

        {error && (
          <View className="mb-8 text-center">
            <Text className="text-red-500 text-base font-medium">{error}</Text>
          </View>
        )}

        {plan && (
          <View className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 w-full relative">
            {plan.isPopular && (
              
              <View className="absolute  -top-5 left-28  z-10">
                {/* <View className='items-center justify-center flex'> */}
                <View className="flex-row items-center bg-purple-600 px-3 py-2 rounded-full shadow-md">
                  <Crown size={20} color="#ffffff" />
                  <Text className="text-white font-bold ml-2 text-sm">MOST POPULAR</Text>
                </View>
              </View>
              // </View>
             
            )}
            <View className="items-center mt-2">
              <View className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4 border border-purple-200">
                <Crown size={32} color="#8b5cf6" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</Text>
              <View className="flex-row items-center justify-center gap-2 mb-2">
                <Text className="text-3xl font-extrabold text-gray-900 flex items-center">
                  <BadgeIndianRupee size={24} color="#1f2937" />
                  {plan.finalPrice}
                </Text>
                {Number(plan.discount) > 0 && (
                  <View className="ml-2 bg-red-100 px-2 py-1 rounded-full">
                    <Text className="text-red-700 text-xs font-bold">{plan.discount}% OFF</Text>
                  </View>
                )}
              </View>
              {Number(plan.originalPrice) > 0 && (
                <Text className="text-sm text-gray-400 line-through">
                  ₹{plan.originalPrice} + (GST {plan.gstPercentage}%)
                </Text>
              )}
              {Number(plan.price) > 0 && (
                <Text className="text-sm text-gray-600">
                  ₹{plan.price} + ₹{plan.gst} (GST {plan.gstPercentage}%)
                </Text>
              )}
              <View className="mt-3 bg-purple-50 px-4 py-2 rounded-full">
                <Text className="text-sm font-medium text-purple-700">
                  Valid for {plan.validity} days
                </Text>
              </View>
            </View>

            <View className="mt-6 border-t border-gray-200 pt-4">
              <Text className="text-base font-semibold text-gray-800 mb-3">Features</Text>
              <View className="space-y-3">
                {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                  <View key={idx} className="flex-row items-center gap-3">
                    {feature.included ? (
                      <Check size={20} color="#10b981" />
                    ) : (
                      <X size={20} color="#ef4444" />
                    )}
                    <Text className="text-base text-gray-700">{feature.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            {Array.isArray(plan.fullFeatures) && plan.fullFeatures.length > 0 && (
              <View className="mt-6 border-t border-gray-200 pt-4">
                <Text className="text-base font-semibold text-gray-800 mb-3">Terms & Conditions</Text>
                <View className="space-y-2">
                  {plan.fullFeatures.map((f, idx) => (
                    <View key={idx} className="flex-row items-start gap-2">
                      <Text className="text-red-500 text-xl">•</Text>
                      <Text className="text-sm text-gray-600 flex-1">{f.text}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View className="mt-6 space-y-3">
              <TouchableOpacity
                className="bg-purple-600 py-3 rounded-xl"
                onPress={() => Alert.alert('Purchase', `Please contact Prnv Admin ${'\n'} (call: 9603558369).`)}
              >
                <Text className="text-white text-center text-base font-bold">Buy Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="py-2"
                onPress={() => handleFullDetails(plan)}
              >
                <Text className="text-center text-purple-600 text-base font-medium">Full Details →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ViewAllPlansScreen;
// import React, { useEffect, useState } from 'react';
// import { 
//   View, 
//   Text, 
//   ScrollView, 
//   TouchableOpacity, 
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { 
//   Check, 
//   X, 
//   Crown, 
//   BadgeIndianRupee,
//   ArrowLeft
// } from 'lucide-react-native';

// type PlanFeature = {
//   name: string;
//   included: boolean;
// };

// type FranchisePlan = {
//   _id: string;
//   name: string;
//   finalPrice: number;
//   originalPrice: number;
//   price: number;
//   gst: number;
//   validity: number;
//   discount: number;
//   features: PlanFeature[];
//   isPopular?: boolean;
// }; 

// const ViewAllPlansScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const [plans, setPlans] = useState<FranchisePlan[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         // Mock data
//         const mockPlans: FranchisePlan[] = [
//           {
//             _id: "plan1",
//             name: "Premium Plan",
//             originalPrice: 1180,
//             discount: 90,
//             price: 100,
//             gst: 18,
//             finalPrice: 118,
//             validity: 30,
//             features: [
//               { name: "Unlimited Technicians", included: true },
//               { name: "Priority Support", included: true },
//               { name: "Advanced Analytics", included: true },
//               { name: "Custom Branding", included: false },
//             ],
//             isPopular: true,
//           },
//           {
//             _id: "plan2",
//             name: "Business Plan",
//             originalPrice: 2360,
//             discount: 85,
//             price: 200,
//             gst: 36,
//             finalPrice: 236,
//             validity: 60,
//             features: [
//               { name: "Up to 10 Technicians", included: true },
//               { name: "24/7 Support", included: true },
//               { name: "Advanced Analytics", included: true },
//               { name: "Custom Branding", included: true },
//             ],
//           },
//           {
//             _id: "plan3",
//             name: "Starter Plan",
//             originalPrice: 590,
//             discount: 80,
//             price: 50,
//             gst: 9,
//             finalPrice: 59,
//             validity: 30,
//             features: [
//               { name: "Up to 3 Technicians", included: true },
//               { name: "Email Support", included: true },
//               { name: "Basic Analytics", included: true },
//               { name: "Custom Branding", included: false },
//             ],
//           }
//         ];
        
//         setPlans(mockPlans);
//       } catch (err: any) {
//         setError(err?.message || 'Failed to fetch plans');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchPlans();
//   }, []);

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-50">
//         <ActivityIndicator size="large" color="#8b5cf6" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 justify-center items-center bg-gray-50">
//         <Text className="text-red-500 text-lg">{error}</Text>
//         <TouchableOpacity
//           className="mt-4 bg-purple-600 px-6 py-3 rounded-lg"
//           onPress={() => navigation.goBack()}
//         >
//           <Text className="text-white">Go Back</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView 
//       className="flex-1 bg-gray-50"
//       contentContainerStyle={{ paddingBottom: 30 }}
//     >
//       <View className="px-4 pt-6">
//         <View className="flex-row items-center mb-4">
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <ArrowLeft size={24} color="#4b5563" />
//           </TouchableOpacity>
//           <Text className="text-gray-900 text-2xl font-bold ml-4">
//             View All Plans
//           </Text>
//         </View>
        
//         <Text className="text-gray-500 text-center text-lg mt-2 mb-6">
//           Choose the perfect plan for your franchise business
//         </Text>
//       </View>

//       <View className="px-4">
//         {plans.map((plan) => (
//           <View 
//             key={plan._id} 
//             className="w-full mb-6"
//           >
//             {plan.isPopular && (
//               <View className="absolute -top-3 left-0 right-0 z-10 items-center">
//                 <View className="flex-row items-center bg-gradient-to-r from-yellow-400 to-pink-500 px-4 py-2 rounded-full">
//                   <Crown size={16} color="#fef3c7" className="mr-2" />
//                   <Text className="text-white font-bold">MOST POPULAR</Text>
//                 </View>
//               </View>
//             )}

//             <View className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200">
//               <View className="flex-row items-center justify-between mb-4">
//                 <View>
//                   <Text className="text-xl font-bold text-gray-900">
//                     {plan.name}
//                   </Text>
//                   <Text className="text-purple-600 font-medium">
//                     {plan.validity} days validity
//                   </Text>
//                 </View>
                
//                 {plan.isPopular ? (
//                   <View className="bg-purple-100 p-3 rounded-full">
//                     <Crown size={24} color="#8b5cf6" />
//                   </View>
//                 ) : (
//                   <View className="bg-gray-100 p-3 rounded-full">
//                     <BadgeIndianRupee size={24} color="#4b5563" />
//                   </View>
//                 )}
//               </View>

//               <View className="flex-row items-center mb-2">
//                 <BadgeIndianRupee size={20} color="#1f2937" />
//                 <Text className="text-2xl font-extrabold text-gray-900 ml-1">
//                   {plan.finalPrice}
//                 </Text>
                
//                 {plan.discount > 0 && (
//                   <View className="ml-2 bg-red-100 rounded-full px-2 py-1">
//                     <Text className="text-red-800 text-xs font-bold">
//                       {plan.discount}% OFF
//                     </Text>
//                   </View>
//                 )}
//               </View>

//               {plan.originalPrice > 0 && (
//                 <Text className="text-gray-400 text-sm line-through">
//                   ₹{plan.originalPrice} + GST
//                 </Text>
//               )}

//               <Text className="text-gray-600 text-sm mt-1">
//                 ₹{plan.price} + ₹{plan.gst} GST
//               </Text>

//               <View className="mt-4 border-t border-gray-200 pt-4">
//                 <Text className="font-semibold text-gray-800 mb-2">
//                   Features:
//                 </Text>
//                 <View className="space-y-2">
//                   {plan.features.map((feature, idx) => (
//                     <View key={idx} className="flex-row items-center">
//                       {feature.included ? (
//                         <Check size={16} color="#10b981" className="mr-2" />
//                       ) : (
//                         <X size={16} color="#ef4444" className="mr-2" />
//                       )}
//                       <Text className="text-gray-700">
//                         {feature.name}
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               </View>

//               <View className="mt-6 flex-row justify-between space-x-3">
//                 <TouchableOpacity
//                   className="flex-1 border border-purple-600 rounded-lg py-3"
//                   onPress={() => navigation.navigate('PlanDetails', { plan })}
//                 >
//                   <Text className="text-purple-600 font-medium text-center">
//                     Details
//                   </Text>
//                 </TouchableOpacity>
                
//                 <TouchableOpacity
//                   className="flex-1 bg-purple-600 rounded-lg py-3"
//                   onPress={() => navigation.navigate('BuySubscription' as never, { plan } as never)}
//                 >
//                   <Text className="text-white font-medium text-center">
//                     Buy Now
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         ))}
//       </View>

//       <View className="mt-8 mx-4 p-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-700">
//         <Text className="text-white text-center text-lg font-bold">
//           Need help choosing a plan?
//         </Text>
//         <Text className="text-purple-200 text-center mt-2">
//           Contact our sales team for personalized recommendations
//         </Text>
//         <TouchableOpacity
//           className="bg-white mt-4 py-3 rounded-lg"
//           onPress={() => navigation.navigate('Contact')}
//         >
//           <Text className="text-purple-600 font-bold text-center">
//             Contact Sales
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default ViewAllPlansScreen;