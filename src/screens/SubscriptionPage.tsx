import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Zap, BadgeIndianRupee } from 'lucide-react-native';  

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  gst: number;
  finalPrice: number;
  validity: number | null;
  validityUnit: string;
  features: PlanFeature[];
  discount?: number;
  isPopular?: boolean;
}

const SubscriptionPage: React.FC = () => {
  const navigation = useNavigation();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEconomyPlan = async () => {
      try {
        // Updated Economy Plan details
        const mockPlan: Plan = {
          _id: "plan_economy",
          name: "Economy Plan",
          price: 3000,
          originalPrice: 6000,
          gst: 540,
          finalPrice: 3540,
          validity: 50,
          validityUnit: "leads",
          discount: 50,
          isPopular: true,
          leads: 50,
          features: [
            { name: "Only 5 members per pincode per plan", included: true },
            { name: "Each Lead Shared with 1 Technician", included: true },
            { name: "No Commission From Technicians Or Customers", included: true },
            { name: "Applicable for unlimited Services in a specific category", included: true },
            { name: "No Refund", included: true },
            { name: "No Change Of Plan", included: true },
            { name: "Billing Facility", included: true },
          ],
        };
        
        setTimeout(() => {
          setPlan(economyPlan);
          setLoading(false);
        }, 1000);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch plan details');
        setLoading(false);
      }
    };
    
    fetchEconomyPlan();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-gray-600 mt-4 text-lg">Loading Economy Plan...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-gray-50">
        <Text className="text-red-500 text-lg mb-4 text-center">{error}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Section */}
      <LinearGradient
        colors={['#3b82f6', '#2563eb']}
        className="pt-16 pb-8 px-6"
      >
        <Text className="text-white text-3xl font-bold text-center mb-2">
          Economy Plan
        </Text>
        <Text className="text-blue-100 text-center text-lg">
          Perfect for technicians starting their business journey
        </Text>
      </LinearGradient>

      {/* Economy Plan Card */}
      <View className="px-4 mt-8">
        {plan && (
          <View className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Popular badge */}
            {plan.isPopular && ( 
              <LinearGradient
                colors={['#f59e0b', '#eab308']}
                className="py-3 items-center"
              >
                <Text className="text-white font-bold text-lg tracking-wide">
                  ⭐ MOST POPULAR ⭐
                </Text>
              </LinearGradient>
            )}

            <View className="p-6">
              {/* Plan Header */}
              <View className="items-center mb-6">
                <View className="bg-blue-100 p-4 rounded-full mb-4">
                  <Zap size={32} color="#3b82f6" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 text-center">
                  {plan.name}
                </Text>
                <Text className="text-gray-600 text-center mt-2">
                  Ideal for new technicians
                </Text>
              </View>

              {/* Pricing */}
              <View className="mb-6">
                <View className="flex-row items-end justify-center">
                  <BadgeIndianRupee size={28} color="#1f2937" />
                  <Text className="text-4xl font-extrabold text-gray-900 ml-1">
                    ₹{plan.price}
                  </Text>
                  <Text className="text-gray-600 text-lg mb-2 ml-1">
                    /month
                  </Text>
                </View>
                
                <View className="flex-row items-center justify-center mt-2">
                  <Text className="text-gray-400 text-lg line-through mr-2">
                    ₹{plan.originalPrice} + (GST 18%)
                  </Text>
                  <View className="bg-red-100 rounded-full px-3 py-1">
                    <Text className="text-red-800 font-bold">
                      {plan.discount}% OFF
                    </Text>
                  </View>
                </View>
                
                <Text className="text-gray-600 text-center mt-2">
                  ₹{plan.price} + ₹{plan.gst} (GST 18%)
                </Text>
                
                <View className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-full">
                  <Text className="text-blue-700 font-medium">
                    Valid until {plan.validity} {plan.validityUnit}
                  </Text>
                </View>
              </View>

              {/* Features Section */}
              <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 mb-3 text-center">
                  Plan Features:
                </Text>
                <View className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <View key={idx} className="flex-row items-center">
                      <Check size={20} color="#10b981" className="mr-3" />
                      <Text className="text-gray-700 text-base">
                        {feature.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

        {/* Plan Highlights */}
        <View className="bg-white rounded-xl p-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-3 text-center">
            Key Benefits
          </Text>
          <View className="space-y-4">
            <View className="flex-row items-start">
              <Text className="text-blue-500 text-lg mr-2">•</Text>
              <Text className="text-gray-600 flex-1">
                Exclusive territory with limited technicians per area
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-blue-500 text-lg mr-2">•</Text>
              <Text className="text-gray-600 flex-1">
                Keep 100% of your earnings with zero commissions
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-blue-500 text-lg mr-2">•</Text>
              <Text className="text-gray-600 flex-1">
                Professional billing and invoicing support
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <View>
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-xl mt-8"
          onPress={() => navigation.navigate('BuyPlan', { plan })}
        >
          <Text className="text-white text-center text-lg font-bold">
            Subscribe to Economy Plan
          </Text>
        </TouchableOpacity>
      </View>

      {/* Terms Section */}
      <View className="px-4 mt-8 mb-10">
        <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
          Plan Terms & Conditions
        </Text>
        
        <View className="bg-white rounded-xl p-5 mb-4">
          <Text className="font-semibold text-gray-800 mb-2">
            Service Area:
          </Text>
          <Text className="text-gray-600">
            Leads are provided exclusively within your registered pincode area
          </Text>
        </View>
        
        <View className="bg-white rounded-xl p-5 mb-4">
          <Text className="font-semibold text-gray-800 mb-2">
            Validity Period:
          </Text>
          <Text className="text-gray-600">
            Plan is valid for {plan?.validity} leads or 6 months, whichever comes first
          </Text>
        </View>
        
        <View className="bg-white rounded-xl p-5">
          <Text className="font-semibold text-gray-800 mb-2">
            Payment Terms:
          </Text>
          <Text className="text-gray-600">
            Full payment required upfront. GST of 18% included in the final price
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SubscriptionPage;