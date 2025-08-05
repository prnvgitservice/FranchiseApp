import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Check, Zap, BadgeIndianRupee } from 'lucide-react-native';

const economyPlan = {
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

const SubscriptionPage: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      {/* Header */}
      <LinearGradient
        colors={['#3b82f6', '#2563eb']}
        style={{ paddingTop: 64, paddingBottom: 32, paddingHorizontal: 24 }}
      >
        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
          Technician Subscription Plans
        </Text>
        <Text style={{ color: '#dbeafe', textAlign: 'center', fontSize: 18 }}>
          Choose the right plan to grow your technical service business
        </Text>
      </LinearGradient>

      {/* Economy Plan Card */}
      <View style={{ paddingHorizontal: 16, marginTop: 32 }}>
        <View style={{ backgroundColor: 'white', borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 4, overflow: 'hidden' }}>
          {/* Popular badge */}
          {economyPlan.isPopular && (
            <LinearGradient
              colors={['#f59e0b', '#eab308']}
              style={{ paddingVertical: 12, alignItems: 'center' }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                MOST POPULAR
              </Text>
            </LinearGradient>
          )}

          <View style={{ padding: 24 }}>
            {/* Plan header */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <View style={{ backgroundColor: '#dbeafe', padding: 12, borderRadius: 999 }}>
                <Zap size={28} color="#3b82f6" />
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>
                {economyPlan.name}
              </Text>
            </View>

            {/* Pricing */}
            <View style={{ marginBottom: 24 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <BadgeIndianRupee size={28} color="#1f2937" />
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#111827', marginLeft: 4 }}>
                  ₹{economyPlan.price}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
                <Text style={{ color: '#9ca3af', fontSize: 18, textDecorationLine: 'line-through', marginRight: 8 }}>
                  ₹{economyPlan.originalPrice} + (GST 18%)
                </Text>
                <View style={{ backgroundColor: '#fee2e2', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 4 }}>
                  <Text style={{ color: '#b91c1c', fontWeight: 'bold' }}>
                    {economyPlan.discount}% OFF
                  </Text>
                </View>
              </View>
              <Text style={{ color: '#6b7280', textAlign: 'center', marginTop: 8 }}>
                ₹{economyPlan.price} + ₹{economyPlan.gst} (GST 18%)
              </Text>
              <View style={{ backgroundColor: '#dbeafe', alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999, marginTop: 12 }}>
                <Text style={{ color: '#2563eb', fontWeight: '500' }}>
                  Valid until {economyPlan.validity} {economyPlan.validityUnit}
                </Text>
              </View>
            </View>

            {/* Features */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 12, textAlign: 'center' }}>
                Plan Features:
              </Text>
              <View>
                {economyPlan.features.map((feature, idx) => (
                  <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <Check size={20} color="#10b981" style={{ marginRight: 12 }} />
                    <Text style={{ color: '#374151', fontSize: 16 }}>
                      {feature.name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={{ backgroundColor: '#3b82f6', paddingVertical: 16, borderRadius: 16, marginTop: 32 }}
          onPress={() => navigation.navigate('BuySubscription', { plan: economyPlan })}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>
            Subscribe to Economy Plan
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SubscriptionPage;