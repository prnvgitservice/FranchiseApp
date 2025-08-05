import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Check, CreditCard, Smartphone, Landmark, DollarSign, QrCode, ArrowLeft } from 'lucide-react-native';

const paymentMethods = [
  {
    id: 'upi',
    name: 'UPI Payment',
    description: 'Pay using any UPI app like Google Pay, PhonePe, Paytm',
    icon: Smartphone,
    popular: true,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Pay using Visa, Mastercard, Rupay or other cards',
    icon: CreditCard,
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    description: 'Direct bank transfer from 50+ Indian banks',
    icon: Landmark,
  },
  {
    id: 'wallet',
    name: 'Paytm Wallet',
    description: 'Pay using your Paytm wallet balance',
    icon: DollarSign,
  },
  {
    id: 'qr',
    name: 'QR Code',
    description: 'Scan and pay using any UPI app',
    icon: QrCode,
  },
];

const BuySubscriptionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { plan } = route.params as any;
  const [selectedMethod, setSelectedMethod] = useState('upi');

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="max-w-xl mx-auto w-full px-4 py-6">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#4b5563" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-2xl font-bold ml-4">
            Complete Your Purchase
          </Text>
        </View>

        {/* Plan Card */}
        <View className="bg-blue-50 rounded-xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-1">{plan.name}</Text>
          <Text className="text-gray-600">Total Amount</Text>
          <Text className="text-2xl font-bold text-blue-700 mt-1">
            ₹{plan.finalPrice}{' '}
            <Text className="text-base font-normal text-gray-500">
              ({plan.price} + {plan.gst} GST)
            </Text>
          </Text>
        </View>

        {/* Payment Methods */}
        <Text className="text-base font-semibold text-gray-800 mb-2">Select Payment Method</Text>
        <View className="space-y-3 mb-6">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                className={`flex-row items-center border rounded-lg px-4 py-3 bg-white ${selectedMethod === method.id ? 'border-blue-600' : 'border-gray-200'}`}
                onPress={() => setSelectedMethod(method.id)}
                activeOpacity={0.8}
              >
                <Icon size={22} color="#2563eb" />
                <View className="flex-1 ml-3">
                  <Text className="text-gray-900 font-medium">{method.name}</Text>
                  <Text className="text-gray-500 text-xs">{method.description}</Text>
                </View>
                {method.popular && (
                  <View className="bg-yellow-100 px-2 py-1 rounded-full ml-2">
                    <Text className="text-yellow-700 text-xs font-bold">Popular</Text>
                  </View>
                )}
                {selectedMethod === method.id && (
                  <Check size={20} color="#10b981" className="ml-2" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Order Summary */}
        <View className="bg-white rounded-xl p-4 mb-6 border border-gray-200">
          <Text className="text-base font-semibold text-gray-800 mb-2">Order Summary</Text>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">Plan Price</Text>
            <Text className="text-gray-900 font-medium">₹{plan.price}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-600">GST</Text>
            <Text className="text-gray-900 font-medium">₹{plan.gst}</Text>
          </View>
          <View className="flex-row justify-between mt-2 border-t border-gray-100 pt-2">
            <Text className="text-gray-900 font-bold">Total Amount</Text>
            <Text className="text-blue-700 font-bold">₹{plan.finalPrice}</Text>
          </View>
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-lg"
          onPress={() => {/* handle payment */}}
        >
          <Text className="text-white text-center text-lg font-bold">
            Proceed to Pay ₹{plan.finalPrice}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BuySubscriptionScreen;