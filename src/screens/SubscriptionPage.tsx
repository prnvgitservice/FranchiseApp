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
import { Check, X, Zap, BadgeIndianRupee } from 'lucide-react-native';

interface PlanFeature {
  name: string;
  included: boolean;
}

interface FullFeature {
  text: string;
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
  fullFeatures: FullFeature[];
  discount?: number;
  isPopular?: boolean;
  leads?: number;
}

const SubscriptionPage: React.FC = () => {
  const navigation = useNavigation();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock API call for Economy Plan
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        // Simulated API response for Economy Plan
        const mockPlan: Plan = {
          _id: "plan_economy",
          name: "Economy Plan",
          price: 499,
          originalPrice: 999,
          gst: 90,
          finalPrice: 589,
          validity: 30,
          validityUnit: "days",
          discount: 50,
          isPopular: true,
          features: [
            { name: "Up to 5 active jobs", included: true },
            { name: "Basic customer support", included: true },
            { name: "Job scheduling", included: true },
            { name: "Premium analytics", included: false },
            { name: "Priority customer support", included: false },
          ],
          fullFeatures: [
            { text: "Access to basic job management tools" },
            { text: "Email and chat support during business hours" },
            { text: "Ability to schedule up to 5 jobs per day" },
            { text: "Monthly performance reports" },
          ]
        };
        
        // Simulate API delay
        setTimeout(() => {
          setPlan(mockPlan);
          setLoading(false);
        }, 1000);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch plan details');
        setLoading(false);
      }
    };
    
    fetchPlan();
  }, []);

  const handleFullDetails = () => {
    if (plan) {
      navigation.navigate('PlanDetails', { plan });
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-lg mb-4">{error}</Text>
        <TouchableOpacity
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#3b82f6', '#2563eb']}
        className="pt-16 pb-8 px-6"
      >
        <Text className="text-white text-3xl font-bold text-center mb-2">
          Technician Subscription Plans
        </Text>
        <Text className="text-blue-100 text-center text-lg">
          Choose the right plan to grow your technical service business
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
                <Text className="text-white font-bold text-lg">
                  MOST POPULAR
                </Text>
              </LinearGradient>
            )}

            <View className="p-6">
              {/* Plan header */}
              <View className="flex-row items-center justify-between mb-6">
                <View className="bg-blue-100 p-3 rounded-full">
                  <Zap size={28} color="#3b82f6" />
                </View>
                <Text className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </Text>
              </View>

              {/* Pricing */}
              <View className="mb-6">
                <View className="flex-row items-end justify-center">
                  <BadgeIndianRupee size={28} color="#1f2937" />
                  <Text className="text-4xl font-extrabold text-gray-900 ml-1">
                    {plan.price}
                  </Text>
                </View>
                
                {plan.originalPrice && plan.discount && (
                  <View className="flex-row items-center justify-center mt-2">
                    <Text className="text-gray-400 text-lg line-through mr-2">
                      ₹{plan.originalPrice}
                    </Text>
                    <View className="bg-red-100 rounded-full px-3 py-1">
                      <Text className="text-red-800 font-bold">
                        {plan.discount}% OFF
                      </Text>
                    </View>
                  </View>
                )}
                
                <Text className="text-gray-600 text-center mt-2">
                  ₹{plan.price} + ₹{plan.gst} GST (18%)
                </Text>
                
                <View className="bg-blue-100 self-center px-4 py-2 rounded-full mt-3">
                  <Text className="text-blue-700 font-medium">
                    Valid for {plan.validity} days
                  </Text>
                </View>
              </View>

              {/* Features */}
              <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 mb-3">
                  Features:
                </Text>
                <View className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <View key={idx} className="flex-row items-center">
                      {feature.included ? (
                        <Check size={20} color="#10b981" className="mr-3" />
                      ) : (
                        <X size={20} color="#ef4444" className="mr-3" />
                      )}
                      <Text className="text-gray-700 text-base">
                        {feature.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Full Details Button */}
              <TouchableOpacity
                className="border border-blue-500 rounded-lg py-3 mt-4"
                onPress={handleFullDetails}
              >
                <Text className="text-blue-500 font-medium text-center">
                  View Full Details →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Additional Information */}
        <View className="bg-white rounded-xl p-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Why Choose the Economy Plan?
          </Text>
          <View className="space-y-2">
            <View className="flex-row items-start">
              <Text className="text-blue-500 text-lg mr-2">•</Text>
              <Text className="text-gray-600 flex-1">
                Perfect for new technicians starting their business
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-blue-500 text-lg mr-2">•</Text>
              <Text className="text-gray-600 flex-1">
                Affordable pricing with essential features
              </Text>
            </View>
            <View className="flex-row items-start">
              <Text className="text-blue-500 text-lg mr-2">•</Text>
              <Text className="text-gray-600 flex-1">
                Easy upgrade to premium plans as your business grows
              </Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          className="bg-blue-500 py-4 rounded-xl mt-8"
          onPress={() => navigation.navigate('BuyPlan', { plan })}
        >
          <Text className="text-white text-center text-lg font-bold">
            Get Started with Economy Plan
          </Text>
        </TouchableOpacity>
      </View>

      {/* FAQ Section */}
      <View className="px-4 mt-8 mb-10">
        <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
          Frequently Asked Questions
        </Text>
        
        <View className="bg-white rounded-xl p-5 mb-4">
          <Text className="font-semibold text-gray-800 mb-2">
            Can I upgrade my plan later?
          </Text>
          <Text className="text-gray-600">
            Yes, you can upgrade to any premium plan at any time. The remaining balance from your current plan will be credited towards the new plan.
          </Text>
        </View>
        
        <View className="bg-white rounded-xl p-5 mb-4">
          <Text className="font-semibold text-gray-800 mb-2">
            What payment methods do you accept?
          </Text>
          <Text className="text-gray-600">
            We accept all major credit/debit cards, UPI payments, and net banking. All transactions are secure and encrypted.
          </Text>
        </View>
        
        <View className="bg-white rounded-xl p-5">
          <Text className="font-semibold text-gray-800 mb-2">
            Is there a free trial available?
          </Text>
          <Text className="text-gray-600">
            Yes! We offer a 7-day free trial for new users. No credit card required to start your trial.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SubscriptionPage;