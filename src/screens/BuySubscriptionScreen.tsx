import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  Check, 
  CreditCard, 
  Smartphone, 
  DollarSign, 
  Landmark, 
  QrCode,
  ArrowLeft
} from 'lucide-react-native';

const BuySubscriptionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { plan } = route.params as { plan: any };
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay using any UPI app',
      popular: true,
    },
    {
      id: 'cards',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay using cards',
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Landmark,
      description: 'Direct bank transfer',
    },
    {
      id: 'wallet',
      name: 'Paytm Wallet',
      icon: DollarSign,
      description: 'Pay using wallet',
    },
    {
      id: 'qr',
      name: 'QR Code',
      icon: QrCode,
      description: 'Scan and pay',
    },
  ];

  const handlePaymentSelection = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const proceedToPayment = () => {
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }

    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('PaymentSuccess', { plan });
    }, 2000);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#4b5563" />
          </TouchableOpacity>
          <Text className="text-gray-900 text-2xl font-bold ml-4">
            Complete Purchase
          </Text>
        </View>

        {error && (
          <View className="bg-red-100 p-3 rounded-lg mb-6">
            <Text className="text-red-600 text-center">{error}</Text>
          </View>
        )}

        <View className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <Text className="text-xl font-bold text-gray-900 mb-2">
            {plan?.name}
          </Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-600">Total Amount</Text>
              <Text className="text-2xl font-bold text-gray-900">
                ₹{plan?.finalPrice}
                <Text className="text-gray-500 text-sm">
                  {' '}(₹{plan?.price} + ₹{plan?.gst} GST)
                </Text>
              </Text>
            </View>
            {plan?.discount > 0 && (
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-800 font-medium">
                  {plan?.discount}% OFF
                </Text>
              </View>
            )}
          </View>
        </View>

        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Select Payment Method
        </Text>
        
        <View className="mb-8">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                className={`p-4 border rounded-lg mb-3 ${
                  selectedMethod === method.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
                onPress={() => handlePaymentSelection(method.id)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View className={`p-2 rounded-lg mr-4 ${
                      selectedMethod === method.id 
                        ? 'bg-blue-100' 
                        : 'bg-gray-100'
                    }`}>
                      <Icon 
                        size={20} 
                        color={selectedMethod === method.id ? '#3b82f6' : '#6b7280'} 
                      />
                    </View>
                    <View>
                      <Text className="font-medium text-gray-800">
                        {method.name}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {method.description}
                      </Text>
                    </View>
                  </View>
                  
                  <View className="flex-row items-center">
                    {method.popular && (
                      <View className="bg-yellow-100 px-2 py-1 rounded mr-3">
                        <Text className="text-yellow-800 text-xs">Popular</Text>
                      </View>
                    )}
                    {selectedMethod === method.id ? (
                      <View className="w-5 h-5 rounded-full bg-blue-500 items-center justify-center">
                        <Check size={14} color="white" />
                      </View>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <Text className="font-medium text-gray-800 mb-3">Order Summary</Text>
          
          <View className="flex-row justify-between py-2 border-b border-gray-200">
            <Text className="text-gray-600">Plan Price</Text>
            <Text className="font-medium">₹{plan?.price}</Text>
          </View>
          
          <View className="flex-row justify-between py-2 border-b border-gray-200">
            <Text className="text-gray-600">GST</Text>
            <Text className="font-medium">₹{plan?.gst}</Text>
          </View>
          
          <View className="flex-row justify-between pt-4 mt-2">
            <Text className="font-semibold">Total Amount</Text>
            <Text className="font-bold text-lg">
              ₹{plan?.finalPrice}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          className={`w-full py-4 rounded-lg ${
            selectedMethod && !loading 
              ? 'bg-purple-600' 
              : 'bg-gray-400'
          }`}
          disabled={!selectedMethod || loading}
          onPress={proceedToPayment}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-bold text-center">
              Proceed to Pay ₹{plan?.finalPrice}
            </Text>
          )}
        </TouchableOpacity>

        <Text className="text-gray-500 text-xs text-center mt-4">
          By completing your purchase, you agree to our Terms of Service
        </Text>
      </View>
    </ScrollView>
  );
};

export default BuySubscriptionScreen;