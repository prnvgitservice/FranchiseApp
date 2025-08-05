// SubscriptionPage.tsx - React Native (with Tailwind classes via NativeWind)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Zap, ArrowRight } from 'lucide-react-native';
import { getPlans } from '../api/apiMethods';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface Plan {
  _id: string;
  name: string;
  price: number;
  gst: number;
  finalPrice: number;
  leads: number;
  features: PlanFeature[];
  fullFeatures?: { text: string }[];
  originalPrice?: number;
  discount?: number;
  validity?: number;
  validityUnit?: string;
}

const SubscriptionPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await getPlans();
        const economyPlan = response?.data.find((p: Plan) => p.name === 'Economy Plan');
        setPlan(economyPlan || null);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handleViewDetails = () => {
    if (plan) {
      navigation.navigate('PlanDetails', { plan });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-lg text-gray-600">Loading plans...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <Text className="text-lg text-red-500 text-center mb-4">Error: {error}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!plan) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <Text className="text-lg text-gray-700 text-center">
          No subscription plans available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <LinearGradient colors={['#3b82f6', '#2563eb']} className="pt-16 pb-8 px-6 items-center">
        <View className="w-full max-w-md">
          <Text className="text-white text-3xl font-bold text-center mb-2">
            Technician Plans
          </Text>
          <Text className="text-blue-100 text-lg text-center">
            Choose the right plan to grow your technical
          </Text>
        </View>
      </LinearGradient>

      <View className="flex items-center px-4 mt-8 mb-12">
        <View className="bg-white w-full max-w-md rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <View className="p-6">
            <View className="items-center mt-2 mb-6">
              <View className="bg-blue-100 p-4 rounded-full mb-3">
                <Zap size={32} color="#3b82f6" />
              </View>
              <Text className="text-2xl font-bold text-gray-900 mb-2">
                {plan.name}
              </Text>
              <Text className="text-4xl font-bold text-gray-900">
                ₹{plan.price}
              </Text>
            </View>

            <View className="mb-6">
              <View className="flex-row justify-center mt-2">
                <Text className="text-gray-500 text-lg line-through mr-2">
                  ₹{plan.originalPrice} + (GST 18%)
                </Text>
              </View>
              <Text className="text-gray-600 text-center mt-1 text-lg">
                ₹{plan.finalPrice} + ₹{plan.gst} (GST 18%)
              </Text>
              <View className="bg-blue-100 self-center px-4 py-2 rounded-full mt-4">
                <Text className="text-blue-700 font-medium">
                  Valid until {plan.leads} leads
                </Text>
              </View>
            </View>

            <View className="border-t border-gray-200 my-4" />

            <View className="mb-4">
              {plan.features.map((feature, idx) => (
                <View key={idx} className="flex-row items-start mb-3">
                  <Check size={20} color="#10b981" className="mr-3 mt-1" />
                  <Text className="text-gray-700 text-base flex-1">
                    {feature.name}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-center mt-2"
              onPress={handleViewDetails}
            >
              <Text className="text-blue-500 font-medium mr-1">View Full Details</Text>
              <ArrowRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SubscriptionPage;
