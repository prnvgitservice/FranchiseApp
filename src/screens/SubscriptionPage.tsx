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

  // Mock Economy Plan data
  useEffect(() => {
    const fetchEconomyPlan = async () => {
      try {
        // Economy Plan data
        const economyPlan: Plan = {
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
          leads: 50,
          features: [
            { name: "Up to 5 active jobs", included: true },
            { name: "Basic customer support", included: true },
            { name: "Job scheduling", included: true },
            { name: "Email notifications", included: true },
            { name: "Basic analytics", included: true },
            { name: "Premium analytics", included: false },
            { name: "Priority customer support", included: false },
            { name: "Advanced reporting", included: false },
          ],
          fullFeatures: [
            { text: "Access to basic job management tools" },
            { text: "Email and chat support during business hours" },
            { text: "Ability to schedule up to 5 jobs per day" },
            { text: "Monthly performance reports" },
            { text: "Basic customer database" },
          ]
        };
        
        // Simulate API delay
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

  const handleSubscribe = () => {
    if (plan) {
      // Navigate to payment or subscription flow
      navigation.navigate('PaymentScreen', { plan });
    }
  };

  const handleViewDetails = () => {
    if (plan) {
      navigation.navigate('PlanDetails', { plan });
    }
  };

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
          <View className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* Popular Badge */}
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

              {/* Pricing Section */}
              <View className="items-center mb-8">
                <View className="flex-row items-end justify-center mb-2">
                  <BadgeIndianRupee size={30} color="#1f2937" />
                  <Text className="text-5xl font-extrabold text-gray-900 ml-1">
                    {plan.price}
                  </Text>
                  <Text className="text-gray-600 text-lg mb-2 ml-1">
                    /month
                  </Text>
                </View>
                
                {plan.originalPrice && plan.discount && (
                  <View className="flex-row items-center justify-center mb-3">
                    <Text className="text-gray-400 text-xl line-through mr-3">
                      ₹{plan.originalPrice}
                    </Text>
                    <View className="bg-red-100 rounded-full px-3 py-1">
                      <Text className="text-red-800 font-bold text-sm">
                        {plan.discount}% OFF
                      </Text>
                    </View>
                  </View>
                )}
                
                <Text className="text-gray-600 text-center mb-3">
                  ₹{plan.price} + ₹{plan.gst} GST (18%)
                </Text>
                
                <View className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-full">
                  <Text className="text-blue-700 font-medium">
                    Valid for {plan.validity} {plan.validityUnit}
                  </Text>
                </View>
              </View>

              {/* Features Section */}
              <View className="mb-6">
                <Text className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  What's Included
                </Text>
                <View className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <View key={idx} className="flex-row items-center py-1">
                      <View className="mr-3">
                        {feature.included ? (
                          <View className="bg-green-100 p-1 rounded-full">
                            <Check size={16} color="#10b981" />
                          </View>
                        ) : (
                          <View className="bg-red-100 p-1 rounded-full">
                            <X size={16} color="#ef4444" />
                          </View>
                        )}
                      </View>
                      <Text 
                        className={`text-base flex-1 ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}
                      >
                        {feature.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Action Buttons */}
              <View className="space-y-3">
                <TouchableOpacity
                  className="bg-blue-500 py-4 rounded-xl"
                  onPress={handleSubscribe}
                >
                  <Text className="text-white text-center text-lg font-bold">
                    Subscribe to Economy Plan
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="border-2 border-blue-500 py-3 rounded-xl"
                  onPress={handleViewDetails}
                >
                  <Text className="text-blue-500 font-medium text-center">
                    View Full Details →
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Benefits Section */}
      <View className="px-4 mt-8">
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
            Why Choose Economy Plan?
          </Text>
          <View className="space-y-4">
            <View className="flex-row items-start">
              <View className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                <Text className="text-blue-500 text-xs">💡</Text>
              </View>
              <Text className="text-gray-600 flex-1 text-base">
                Perfect for new technicians starting their business with essential tools
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                <Text className="text-green-500 text-xs">💰</Text>
              </View>
              <Text className="text-gray-600 flex-1 text-base">
                Affordable pricing with 50% discount - best value for money
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="bg-purple-100 p-2 rounded-full mr-3 mt-1">
                <Text className="text-purple-500 text-xs">📈</Text>
              </View>
              <Text className="text-gray-600 flex-1 text-base">
                Easy upgrade path to premium plans as your business grows
              </Text>
            </View>
            <View className="flex-row items-start">
              <View className="bg-orange-100 p-2 rounded-full mr-3 mt-1">
                <Text className="text-orange-500 text-xs">🛠️</Text>
              </View>
              <Text className="text-gray-600 flex-1 text-base">
                All basic tools needed to manage up to 5 active jobs efficiently
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* FAQ Section */}
      <View className="px-4 mt-8 mb-10">
        <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
          Frequently Asked Questions
        </Text>
        
        <View className="space-y-4">
          <View className="bg-white rounded-xl p-5 shadow-sm">
            <Text className="font-semibold text-gray-800 mb-3 text-lg">
              Can I upgrade my plan later?
            </Text>
            <Text className="text-gray-600 text-base leading-relaxed">
              Yes, you can upgrade to any premium plan at any time. The remaining balance from your current plan will be credited towards the new plan.
            </Text>
          </View>
          
          <View className="bg-white rounded-xl p-5 shadow-sm">
            <Text className="font-semibold text-gray-800 mb-3 text-lg">
              What payment methods do you accept?
            </Text>
            <Text className="text-gray-600 text-base leading-relaxed">
              We accept all major credit/debit cards, UPI payments, and net banking. All transactions are secure and encrypted.
            </Text>
          </View>
          
          <View className="bg-white rounded-xl p-5 shadow-sm">
            <Text className="font-semibold text-gray-800 mb-3 text-lg">
              Is there a free trial available?
            </Text>
            <Text className="text-gray-600 text-base leading-relaxed">
              Yes! We offer a 7-day free trial for new users. No credit card required to start your trial.
            </Text>
          </View>

          <View className="bg-white rounded-xl p-5 shadow-sm">
            <Text className="font-semibold text-gray-800 mb-3 text-lg">
              What happens after 30 days?
            </Text>
            <Text className="text-gray-600 text-base leading-relaxed">
              Your plan will automatically renew at the same rate. You can cancel anytime from your account settings or contact our support team.
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom CTA */}
      <View className="px-4 pb-8">
        <TouchableOpacity
          className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 rounded-xl shadow-lg"
          onPress={handleSubscribe}
        >
          <Text className="text-white text-center text-xl font-bold">
            Start Your 7-Day Free Trial
          </Text>
        </TouchableOpacity>
        <Text className="text-gray-500 text-center mt-3 text-sm">
          No commitment • Cancel anytime • Full support included
        </Text>
      </View>
    </ScrollView>
  );
};

export default SubscriptionPage;