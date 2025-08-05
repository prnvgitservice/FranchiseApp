import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For show/hide password icon
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/types';
import { franchiseLogin } from '../api/apiMethods';

// Define props type
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(''); // Changed from email
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // For password toggle

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please enter phone number and password');
      return;
    }

    // Validate phone number (basic check for digits)
    const phoneNumberValue = parseInt(phoneNumber, 10);
    if (isNaN(phoneNumberValue) || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    try {
      const response = await franchiseLogin({
        phoneNumber: phoneNumberValue,
        password,
      });
      // Assuming response contains a token
      if (response?.result?.token) {
        await AsyncStorage.setItem('jwt_token',response.result.token);
        await AsyncStorage.setItem('franchiseId',response.result.id);
        await AsyncStorage.setItem('franchiseName',response.result.username);
        console.log(response.result)

        navigation.navigate('MainApp');
      } else {
        Alert.alert('Error', 'Login failed: No token received');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    Alert.alert('Info', 'Sign Up functionality coming soon');
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center px-6">
          {/* Logo Section */}
          <View className="items-center mb-8">
            <View className="bg-blue-900 px-2 py-1 rounded-2xl mb-4">
              <Image
                source={{ uri: 'https://prnvservices.com/uploads/logo/1695377568_logo-white.png' }}
                className="w-40 h-12"
                resizeMode="contain"
              />
            </View>
            <Text className="text-xl font-semibold text-gray-800">Welcome Back</Text>
            <Text className="text-base text-gray-600 text-center">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Form Container */}
          <View className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</Text>

            {/* Phone Number Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Phone Number</Text>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter your phone number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                autoCapitalize="none"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base"
              />
            </View>

            {/* Password Input with Toggle */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Password</Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  <Icon
                    name={showPassword ? 'visibility' : 'visibility-off'}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl mb-4 items-center ${isLoading ? 'bg-gray-400' : 'bg-blue-600'}`}
            >
              <Text className="text-white text-lg font-semibold text-center">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View className="flex-row justify-center items-center mt-6 pt-4 border-t border-gray-100">
              <Text className="text-sm text-gray-600">Don't have an account? </Text>
              <Icon name='call' size={15}  color="#5eff00"/>
              <TouchableOpacity onPress={handleSignUp}>
                <Text className="text-sm text-blue-600 font-semibold">+91 96035583369</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Demo Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('MainApp')}
            className="bg-green-600 py-3 px-6 rounded-xl mt-6 items-center"
          >
            <Text className="text-white font-semibold text-base">Demo: Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import React, { useState } from 'react';
// import {
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { RootStackParamList } from '../navigation/types';

// // Define props type using RootStackParamList from navigation types
// type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

// const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       navigation.navigate('MainApp');
//     }, 1500);
//   };

//   const handleSignUp = () => {
//     // SignUp screen not implemented yet
//     Alert.alert('Info', 'Sign Up functionality coming soon');
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-blue-50">
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         className="flex-1"
//       >
//         <View className="flex-1 justify-center items-center px-6">
//           {/* Logo Section */}
//           <View className="items-center mb-8">
//             <View className="bg-blue-900 p-4 rounded-2xl mb-4">
//               <Image
//                 source={{ uri: 'https://prnvservices.com/uploads/logo/1695377568_logo-white.png' }}
//                 className="w-40 h-12"
//                 resizeMode="contain"
//               />
//             </View>
//             <Text className="text-xl font-semibold text-gray-800">Welcome Back</Text>
//             <Text className="text-base text-gray-600 text-center">
//               Sign in to your account to continue
//             </Text>
//           </View>

//           {/* Form Container */}
//           <View className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
//             <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</Text>

//             {/* Email Input */}
//             <View className="mb-4">
//               <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Email</Text>
//               <TextInput
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#9CA3AF"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base"
//               />
//             </View>

//             {/* Password Input */}
//             <View className="mb-6">
//               <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Password</Text>
//               <TextInput
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#9CA3AF"
//                 secureTextEntry
//                 className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base"
//               />
//             </View>

//             {/* Login Button */}
//             <TouchableOpacity
//               onPress={handleLogin}
//               disabled={isLoading}
//               className={`w-full py-4 rounded-xl mb-4 items-center ${isLoading ? 'bg-gray-400' : 'bg-blue-600'}`}
//             >
//               <Text className="text-white text-lg font-semibold text-center">
//                 {isLoading ? 'Signing In...' : 'Sign In'}
//               </Text>
//             </TouchableOpacity>

//             {/* Sign Up Link */}
//             <View className="flex-row justify-center items-center mt-6 pt-4 border-t border-gray-100">
//               <Text className="text-sm text-gray-600">Don't have an account? </Text>
//               <TouchableOpacity onPress={handleSignUp}>
//                 <Text className="text-sm text-blue-600 font-semibold">Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Demo Button */}
//           <TouchableOpacity
//             onPress={() => navigation.navigate('MainApp')}
//             className="bg-green-600 py-3 px-6 rounded-xl mt-6 items-center"
//           >
//             <Text className="text-white font-semibold text-base">Demo: Go to Main Screen</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;
// import React, { useState } from 'react';
// import {
//   Alert,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   StyleSheet,
// } from 'react-native';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       navigation.navigate('MainApp');
//     }, 1500);
//   };

//   const handleSignUp = () => {
//     navigation.navigate('SignUp');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoidingView}
//       >
//         <View style={styles.innerContainer}>
//           {/* Logo Section */}
//           <View style={styles.logoSection}>
//             <View style={styles.logoContainer}>
//               <Image
//                 source={{ uri: 'https://prnvservices.com/uploads/logo/1695377568_logo-white.png' }}
//                 style={styles.logo}
//                 resizeMode="contain"
//               />
//             </View>
//             <Text style={styles.welcomeText}>Welcome Back</Text>
//             <Text style={styles.subText}>Sign in to your account to continue</Text>
//           </View>

//           {/* Form Container */}
//           <View style={styles.formContainer}>
//             <Text style={styles.signInText}>Sign In</Text>

//             {/* Email Input */}
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#9CA3AF"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 style={styles.input}
//               />
//             </View>

//             {/* Password Input */}
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Password</Text>
//               <TextInput
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Enter your password"
//                 placeholderTextColor="#9CA3AF"
//                 secureTextEntry
//                 style={styles.input}
//               />
//             </View>

//             {/* Login Button */}
//             <TouchableOpacity
//               onPress={handleLogin}
//               disabled={isLoading}
//               style={[styles.button, isLoading ? styles.buttonDisabled : styles.buttonEnabled]}
//             >
//               <Text style={styles.buttonText}>
//                 {isLoading ? 'Signing In...' : 'Sign In'}
//               </Text>
//             </TouchableOpacity>

//             {/* Sign Up Link */}
//             <View style={styles.signUpContainer}>
//               <Text style={styles.signUpText}>Don't have an account? </Text>
//               <TouchableOpacity onPress={handleSignUp}>
//                 <Text style={styles.signUpLink}>Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Demo Button */}
//           <TouchableOpacity
//             onPress={() => navigation.navigate('MainApp')}
//             style={styles.demoButton}
//           >
//             <Text style={styles.demoButtonText}>Demo: Go to Main Screen</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EFF6FF', // bg-blue-50
//   },
//   keyboardAvoidingView: {
//     flex: 1,
//   },
//   innerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 24, // px-6
//   },
//   logoSection: {
//     alignItems: 'center',
//     marginBottom: 32, // mb-8
//   },
//   logoContainer: {
//     backgroundColor: '#2563EB', // bg-blue-600
//     padding: 16, // p-4
//     borderRadius: 16, // rounded-2xl
//     marginBottom: 16, // mb-4
//   },
//   logo: {
//     width: 160, // w-40
//     height: 48, // h-12
//   },
//   welcomeText: {
//     fontSize: 24, // text-2xl
//     fontWeight: 'bold', // font-bold
//     color: '#1F2A44', // text-gray-800
//     marginBottom: 8, // mb-2
//   },
//   subText: {
//     fontSize: 16,
//     color: '#4B5563', // text-gray-600
//     textAlign: 'center',
//   },
//   formContainer: {
//     width: '100%',
//     maxWidth: 384, // max-w-sm
//     backgroundColor: '#FFFFFF', // bg-white
//     borderRadius: 24, // rounded-3xl
//     padding: 24, // p-6
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6, // shadow-lg
//     borderWidth: 1,
//     borderColor: '#F3F4F6', // border-gray-100
//   },
//   signInText: {
//     fontSize: 24, // text-2xl
//     fontWeight: 'bold', // font-bold
//     color: '#1F2A44', // text-gray-800
//     marginBottom: 24, // mb-6
//     textAlign: 'center',
//   },
//   inputContainer: {
//     marginBottom: 16, // mb-4 for email, mb-6 for password
//   },
//   label: {
//     fontSize: 14, // text-sm
//     fontWeight: '500', // font-medium
//     color: '#374151', // text-gray-700
//     marginBottom: 8, // mb-2
//     marginLeft: 4, // ml-1
//   },
//   input: {
//     width: '100%',
//     backgroundColor: '#F9FAFB', // bg-gray-50
//     borderWidth: 1,
//     borderColor: '#E5E7EB', // border-gray-200
//     borderRadius: 12, // rounded-xl
//     paddingHorizontal: 16, // px-4
//     paddingVertical: 12, // py-3
//     color: '#1F2A44', // text-gray-800
//     fontSize: 16,
//   },
//   button: {
//     width: '100%',
//     paddingVertical: 16, // py-4
//     borderRadius: 12, // rounded-xl
//     marginBottom: 16, // mb-4
//     alignItems: 'center',
//   },
//   buttonEnabled: {
//     backgroundColor: '#2563EB', // bg-blue-600
//   },
//   buttonDisabled: {
//     backgroundColor: '#9CA3AF', // bg-gray-400
//   },
//   buttonText: {
//     color: '#FFFFFF', // text-white
//     fontSize: 18, // text-lg
//     fontWeight: '600', // font-semibold
//     textAlign: 'center',
//   },
//   signUpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 24, // mt-6
//     paddingTop: 16, // pt-4
//     borderTopWidth: 1,
//     borderTopColor: '#F3F4F6', // border-gray-100
//   },
//   signUpText: {
//     fontSize: 14, // text-sm
//     color: '#4B5563', // text-gray-600
//   },
//   signUpLink: {
//     fontSize: 14, // text-sm
//     color: '#2563EB', // text-blue-600
//     fontWeight: '600', // font-semibold
//   },
//   demoButton: {
//     backgroundColor: '#16A34A', // bg-green-600
//     paddingVertical: 12, // py-3
//     paddingHorizontal: 24, // px-6
//     borderRadius: 12, // rounded-xl
//     marginTop: 24, // mt-6
//     alignItems: 'center',
//   },
//   demoButtonText: {
//     color: '#FFFFFF', // text-white
//     fontWeight: '600', // font-semibold
//     fontSize: 16,
//   },
// });