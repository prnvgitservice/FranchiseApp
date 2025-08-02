import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationProp } from '../navigation/types';

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateInputs = () => {
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      return "Phone number must be exactly 10 digits";
    }
    if (formData.password.length < 6 || formData.password.length > 10) {
      return "Password must be between 6 and 10 characters";
    }
    return null;
  };

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    
    const inputError = validateInputs();
    if (inputError) {
      setError(inputError);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MainApp');
    }, 1500);
  };

  const handleDemoLogin = () => {
    navigation.navigate('MainApp');
  };

  const buttonTextStyle = {
    color: 'white',
    fontWeight: '600' as const,
    textAlign: 'center' as const,
    fontSize: 16
  };

  return (
    <ScrollView 
      contentContainerStyle={{ 
        flexGrow: 1, 
        padding: 20, 
        backgroundColor: '#f9fafb',
        justifyContent: 'center'
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <View style={{ 
          backgroundColor: '#1e3a8a', 
          paddingVertical: 8, 
          paddingHorizontal: 16, 
          borderRadius: 6 
        }}>
          <Image
            source={{ uri: 'https://prnvservices.com/uploads/logo/1695377568_logo-white.png' }}
            style={{ height: 40, width: 180 }}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={{ 
        backgroundColor: 'white', 
        padding: 24, 
        borderRadius: 12, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 6, 
        elevation: 3 
      }}>
        <Text style={{ 
          fontSize: 26, 
          fontWeight: 'bold', 
          textAlign: 'center', 
          color: '#1f2937', 
          marginBottom: 24 
        }}>
          Franchise Sign In
        </Text>

        {error && (
          <View style={{ 
            backgroundColor: '#fef2f2', 
            padding: 12, 
            borderRadius: 8, 
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#fee2e2'
          }}>
            <Text style={{ 
              color: '#dc2626', 
              textAlign: 'center',
              fontSize: 14 
            }}>
              {error}
            </Text>
          </View>
        )}

        <View style={{ marginBottom: 20 }}>
          <Text style={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: '#374151', 
            marginBottom: 8 
          }}>
            Phone Number <Text style={{ color: '#ef4444' }}>*</Text>
          </Text>
          <TextInput
            value={formData.phoneNumber}
            onChangeText={value => handleChange('phoneNumber', value)}
            placeholder="Enter 10-digit phone number"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
            maxLength={10}
            style={{ 
              borderWidth: 1, 
              borderColor: '#d1d5db', 
              borderRadius: 8, 
              padding: 14, 
              fontSize: 16,
              backgroundColor: '#fff' 
            }}
          />
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ 
            fontSize: 15, 
            fontWeight: '500', 
            color: '#374151', 
            marginBottom: 8 
          }}>
            Password <Text style={{ color: '#ef4444' }}>*</Text>
          </Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              value={formData.password}
              onChangeText={value => handleChange('password', value)}
              placeholder="Password (6-10 characters)"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              style={{ 
                borderWidth: 1, 
                borderColor: '#d1d5db', 
                borderRadius: 8, 
                padding: 14, 
                fontSize: 16,
                backgroundColor: '#fff',
                paddingRight: 40
              }}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 12, top: 14 }}
            >
              <Icon 
                name={showPassword ? 'eye-slash' : 'eye'} 
                size={20} 
                color="#6b7280" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: '#3b82f6',
            borderRadius: 8,
            padding: 16,
            opacity: loading ? 0.7 : 1,
            marginBottom: 12
          }}
        >
          <Text style={buttonTextStyle}>
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDemoLogin}
          style={{
            backgroundColor: '#ef4444',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            borderWidth: 2,
            borderColor: '#dc2626',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
        >
          <Text style={buttonTextStyle}>
            🚀 Demo Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log('Sign up pressed')}
          style={{ marginTop: 8 }}
        >
          <Text style={{ 
            color: '#3b82f6', 
            fontWeight: '500', 
            textAlign: 'center', 
            fontSize: 15 
          }}>
            Create New Account
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 24,
        flexWrap: 'wrap'
      }}>
        <Text style={{ 
          color: '#4b5563', 
          fontSize: 14,
          textAlign: 'center'
        }}>
          Don't have an account? 
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
          <Icon name="phone" size={14} color="#4ade80" style={{ marginRight: 4 }} />
          <TouchableOpacity onPress={() => Linking.openURL('tel:+9196035583369')}>
            <Text style={{ 
              color: '#3b82f6', 
              fontWeight: '500', 
              fontSize: 14 
            }}>
              +91 96035583369
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login; 