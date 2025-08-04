import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { MainAppNavigationProp } from '../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

// Define interfaces based on API responses
interface Feature {
  name: string;
  included: boolean;
}

interface FullFeature {
  text: string;
}

interface Plan {
  _id: string;
  name: string;
  originalPrice: number;
  discount: string;
  discountPercentage: number;
  price: number;
  gstPercentage: number;
  gst: number;
  finalPrice: number;
  validity: number;
  features: Feature[];
  fullFeatures: FullFeature[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Subscription {
  franchiseSubscriptionId: string;
  subscriptionName: string;
  startDate: string;
  endDate: string;
  _id: string;
}

const FranchisePlan: React.FC = () => {
  const navigation = useNavigation<MainAppNavigationProp>();
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);

  // Mock data for demonstration - matching the image
  useEffect(() => {
    // Simulate API calls
    const mockSubscription: Subscription = {
      franchiseSubscriptionId: "plan1",
      subscriptionName: "Premium Plan",
      startDate: "2025-07-26",
      endDate: "2025-08-25",
      _id: "sub1"
    };

    const mockPlans: Plan[] = [
      {
        _id: "plan1",
        name: "Premium Plan",
        originalPrice: 1180,
        discount: "90%",
        discountPercentage: 90,
        price: 100,
        gstPercentage: 18,
        gst: 18,
        finalPrice: 118,
        validity: 30,
        features: [
          { name: "Applicable for Unlimited Technicians", included: true },
          { name: "No change of plan", included: false },
        ],
        fullFeatures: [
          { text: "Franchise will earn commission on their enrollments and renewals of professionals (service providers/technicians) & advertisement plans as well." },
          { text: "The franchise has to pay a monthly subscription fee of Rs. 100 + GST (18%), Rs. 18 = Rs. 118 (valid for 30 days). (Actual amount Rs. 1000 + GST (18%), Rs. 180 = Rs. 1,180)." },
          { text: "The franchise has to renewal plan with Rs. 118 after every 30 days." },
          { text: "The franchise must have Marketing as well as organizing knowledge." },
          { text: "The growth of the franchise is purely dependent upon their performance." },
          { text: "If the Franchise doesn't renew the monthly plan, he will not receive any commission." },
          { text: "The Franchise can work anywhere within the area of GHMC." },
          { text: "Franchises will not get a monthly salary, but their earnings will depend upon their performance." },
          { text: "PRNV Services will charge individual Franchises if they fall in terms of government policies." },
          { text: "This commission will be paid every month. The total commission earned from the 1st to the end of the month will be paid next month between the 5th to 10th by PRNV Services." },
          { text: "This amount will be deposited to their respective bank account." },
        ],
        isPopular: true,
        isActive: true,
        createdAt: "2025-01-01",
        updatedAt: "2025-01-01",
        __v: 0
      }
    ];

    setCurrentSubscription(mockSubscription);
    setPlans(mockPlans);
  }, []);

  const getDaysLeft = (endDate: string | undefined): number => {
    if (!endDate) return 0;
    const diff = new Date(endDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getPlanConfig = (planName: string) => {
    const configs: { [key: string]: { icon: string; color: string; bgColor: string } } = {
      "Economy Plan": { icon: "bolt", color: "blue", bgColor: "bg-blue-100" },
      "Gold Plan": { icon: "star", color: "yellow", bgColor: "bg-yellow-100" },
      "Platinum Plan": { icon: "crown", color: "purple", bgColor: "bg-purple-100" },
      "Free Plan": { icon: "shield-alt", color: "green", bgColor: "bg-green-100" },
      "Premium Plan": { icon: "crown", color: "purple", bgColor: "bg-purple-100" },
    };
    return configs[planName] || { icon: "star", color: "gray", bgColor: "bg-gray-100" };
  };

  const getStatusColor = (daysLeft: number) => {
    if (daysLeft <= 0) return "bg-red-100 text-red-800";
    if (daysLeft <= 3) return "bg-red-100 text-red-800";
    if (daysLeft <= 7) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-3xl font-bold">My Subscription Plan</Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Info", "View All Plans functionality would be implemented here")}
            className="bg-purple-300 px-3 py-2 rounded-lg flex-row items-center"
          >
            <Icon name="eye" size={16} color="#7c3aed" />
            <Text className="text-purple-800 font-bold ml-1.5">View All Plans</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-4">
        {currentSubscription ? (
          <View className="bg-white rounded-lg shadow-md mb-8 border border-gray-200 p-6">
            <View className="flex-row justify-between items-start">
              <View className="flex-row items-start gap-5">
                <View className="bg-purple-100 p-3 rounded-full mt-1">
                  <Icon5 name="crown" size={20} color="#8b5cf6" />
                </View>
                <View className="space-y-2">
                  <Text className="text-2xl font-bold text-gray-800">
                    {currentSubscription.subscriptionName}
                  </Text>
                  <View className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <View>
                      <Text className="text-gray-500 text-sm">Start Date</Text>
                      <Text className="font-medium text-gray-800">
                        {new Date(currentSubscription.startDate).toLocaleDateString()}
                      </Text>
                    </View>
                    {currentSubscription?.endDate && (
                      <View>
                        <Text className="text-gray-500 text-sm">End Date</Text>
                        <Text className="font-medium text-gray-800">
                          {new Date(currentSubscription.endDate).toLocaleDateString()}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              {currentSubscription?.endDate && (
                <View className={`px-3 py-1 rounded-full ${getStatusColor(getDaysLeft(currentSubscription.endDate))}`}>
                  <Text className="text-sm font-medium">
                    {getDaysLeft(currentSubscription.endDate) <= 0
                      ? "Expired"
                      : `${getDaysLeft(currentSubscription.endDate)} days left`}
                  </Text>
                </View>
              )}
            </View>

            <View className="border-t border-gray-200 pt-6 mt-6">
              {currentSubscription && plans.length > 0 && (
                <View>
                  <Text className="text-xl font-semibold text-gray-800 mb-4">Plan Details</Text>
                  {plans
                    .filter(
                      (plan) => plan._id === currentSubscription.franchiseSubscriptionId
                    )
                    .map((plan) => {
                      const config = getPlanConfig(plan.name);
                      return (
                        <View
                          key={plan._id}
                          className="bg-gray-50 p-6 rounded-lg shadow border border-gray-200"
                        >
                          <View className="flex-row items-center mb-4">
                            <View className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full items-center justify-center mr-4">
                              <Icon5 name="crown" size={20} color="#8b5cf6" />
                            </View>
                            <View>
                              <Text className="text-xl font-bold text-gray-800">{plan.name}</Text>
                              <Text className="text-lg font-medium text-gray-600">
                                ₹{plan.finalPrice}
                              </Text>
                            </View>
                          </View>

                          <View className="space-y-2 mb-4">
                            {plan.features?.map((feature, i) => (
                              <View key={i} className="flex-row items-center gap-2">
                                {feature.included ? (
                                  <Icon name="check" size={16} color="#10b981" />
                                ) : (
                                  <Icon name="times" size={16} color="#ef4444" />
                                )}
                                <Text className="text-sm text-gray-700">{feature.name}</Text>
                              </View>
                            ))}
                          </View>

                          {plan.fullFeatures && plan.fullFeatures.length > 0 && (
                            <View>
                              <Text className="text-lg font-semibold text-gray-800 mb-4">Terms & Conditions</Text>
                              <View className="space-y-2">
                                {plan.fullFeatures.map((details, i) => (
                                  <View key={i} className="flex-row items-start">
                                    <Text className="text-red-500 text-lg mr-2">•</Text>
                                    <Text className="text-sm text-gray-700 flex-1">{details?.text}</Text>
                                  </View>
                                ))}
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                </View>
              )}
            </View>
          </View>
                 ) : (
           <View className="bg-white rounded-lg shadow-md mb-8 border border-gray-200 p-6 flex-wrap">
             <Text className="text-gray-700 text-center">
               No Subscription Plan. Please choose a suitable plan to grow your technical service business.
             </Text>
           </View>
         )}
      </View>
    </ScrollView>
  );
};

export default FranchisePlan; 