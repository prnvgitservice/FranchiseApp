import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MainAppNavigationProp } from '../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFranchiseAccount, getFranchiseAccountValues } from '../api/apiMethods';

// Constants for colors
const PLAN_COLORS = {
  'Economy Plan': '#10B981',
  'Gold Plan': '#F59E0B',
  'Platinum Plan': '#3B82F6',
  'Basic Plan': '#8B5CF6',
  'Premium Plan': '#EC4899',
  'No Plan': '#6B7280',
};

const Dashboard = () => {
  const navigation = useNavigation<MainAppNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [accountValues, setAccountValues] = useState<{
    totalEarnings: number;
    totalThisMonthEarnings: number;
    earningsByMonth: number[];
    totalNoOfTechnicians: number;
    totalNoOfSubscriptions: number;
  } | null>(null);
  const [recentEarnings, setRecentEarnings] = useState<any[]>([]);
  const [subscriptionData, setSubscriptionData] = useState<
    { name: string; value: number; color: string }[]
  >([]);
  const [error, setError] = useState('');

  // Format currency
  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const franchiseId = await AsyncStorage.getItem('franchiseId');
        if (!franchiseId) {
          throw new Error('Franchise ID is missing');
        }

        // Fetch account values
        const valuesRes = await getFranchiseAccountValues(franchiseId);
        if (valuesRes?.success && valuesRes?.result) {
          setAccountValues(valuesRes?.result);
        } else {
          setAccountValues(null);
        }

        // Fetch recent earnings
        const earningsRes = await getFranchiseAccount(franchiseId);
        if (earningsRes?.success && Array.isArray(earningsRes?.result)) {
          setRecentEarnings(earningsRes?.result);

          // Calculate subscription distribution
          const planCounts: Record<string, number> = {};
          earningsRes?.result.forEach((item: any) => {
            const planName = item.subscriptionName || 'No Plan';
            planCounts[planName] = (planCounts[planName] || 0) + 1;
          });
          const subData = Object.entries(planCounts).map(([name, value]) => ({
            name,
            value,
            color: PLAN_COLORS[name] || PLAN_COLORS['No Plan'],
          }));
          setSubscriptionData(subData);
        } else {
          setRecentEarnings([]);
          setSubscriptionData([]);
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch data');
        setAccountValues(null);
        setRecentEarnings([]);
        setSubscriptionData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    
  }, []);

  // Prepare KPI data
  const kpiData = [
    {
      title: 'Total Technicians',
      value: accountValues?.totalNoOfTechnicians ?? 0,
      icon: 'users',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Subscriptions',
      value: accountValues?.totalNoOfSubscriptions ?? 0,
      icon: 'credit-card',
      color: 'bg-green-500',
    },
    {
      title: 'Total Earnings',
      value: formatCurrency(accountValues?.totalEarnings ?? 0),
      icon: 'money',
      color: 'bg-yellow-500',
    },
    {
      title: 'Monthly Earnings',
      value: formatCurrency(accountValues?.totalThisMonthEarnings ?? 0),
      icon: 'line-chart',
      color: 'bg-orange-500',
    },
  ];

  // Prepare monthly earnings
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyEarnings = monthLabels.map((month, idx) => {
    const amount = accountValues?.earningsByMonth[idx] ?? 0;
    const maxEarnings = accountValues?.earningsByMonth?.length
      ? Math.max(...accountValues.earningsByMonth, 1)
      : 1;
    return {
      month,
      amount: formatCurrency(amount / 1000) + 'k',
      percentage: (amount / maxEarnings) * 100,
    };
  });

  // Prepare recent earnings
  const recentActivities = recentEarnings.map((item) => ({
    plan: item.subscriptionName || 'No Plan',
    customer: item.technicianName,
    amount: formatCurrency(item.amount),
    date: new Date(item.createdAt).toLocaleDateString('en-GB'),
    icon: 'user',
  }));

  // Prepare subscription plans (using dynamic data but static UI structure)
  const subscriptionPlans = subscriptionData.map((item) => ({
    name: item.name,
    technicians: item.value,
    percentage: (item.value / subscriptionData.reduce((sum, d) => sum + d.value, 0) * 100) || 0,
    color: item.color,
  }));

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
      {/* Header with Gradient */}
      <View className="mb-6 rounded-2xl overflow-hidden">
        <LinearGradient
          colors={['#4F46E5', '#0D9488']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="p-6 relative overflow-hidden"
        >
          <View className="absolute top-[-64px] right-[-64px] w-32 h-32 bg-indigo-500/20 rounded-full" />
          <View className="absolute bottom-[-48px] left-[-48px] w-24 h-24 bg-teal-500/20 rounded-full" />
          <View className="flex-col justify-between">
            <View className="mb-4">
              <Text className="text-2xl font-bold text-white mb-2">
                Welcome back, Franchise
              </Text>
              <Text className="text-indigo-100 text-lg">
                Here's your performance overview for today
              </Text>
            </View>
            <BlurView
              intensity={25}
              tint="light"
              className="bg-indigo-700/30 rounded-xl border border-teal-400/30 p-4"
            >
              <Text className="text-sm text-indigo-100 mb-1">Today's Date</Text>
              <Text className="text-lg font-semibold text-white">{getCurrentDate()}</Text>
            </BlurView>
          </View>
        </LinearGradient>
      </View>

      {/* KPI Cards - 2 per row */}
      <View className="flex-row justify-between mb-4">
        {kpiData.slice(0, 2).map((item, index) => (
          <View key={index} className="bg-white p-4 rounded-xl shadow w-[48%]">
            <View className="flex-row justify-between items-center mb-2">
              <View className={`${item.color} p-2 rounded-lg`}>
                <Icon name={item.icon} size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">{item.value}</Text>
            </View>
            <Text className="text-gray-600 text-sm">{item.title}</Text>
          </View>
        ))}
      </View>
      <View className="flex-row justify-between mb-4">
        {kpiData.slice(2, 4).map((item, index) => (
          <View key={index} className="bg-white p-4 rounded-xl shadow w-[48%]">
            <View className="flex-row justify-between items-center mb-2">
              <View className={`${item.color} p-2 rounded-lg`}>
                <Icon name={item.icon} size={20} color="white" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">{item.value}</Text>
            </View>
            <Text className="text-gray-600 text-sm">{item.title}</Text>
          </View>
        ))}
      </View>

      {/* Monthly Earnings */}
      <View className="bg-white p-4 rounded-xl shadow mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-4">📈 Monthly Earnings</Text>
        {monthlyEarnings.map((item, index) => (
          <View key={index} className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-600 text-sm w-10">{item.month}</Text>
            <View className="flex-1 mx-3">
              <View className="bg-gray-200 h-2 rounded-full">
                <View
                  className={`h-2 rounded-full ${
                    item.percentage > 0 ? 'bg-green-400' : 'bg-gray-300'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </View>
            </View>
            <Text className="text-gray-800 text-sm font-medium">{item.amount}</Text>
          </View>
        ))}
      </View>

      {/* Recent Earnings */}
      <View className="bg-white p-4 rounded-xl shadow mb-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-800">💸 Recent Earnings</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Earnings')}>
            <Text className="text-blue-600 text-sm font-medium">View All</Text>
          </TouchableOpacity>
        </View>
        {recentActivities.length === 0 ? (
          <Text className="text-center text-gray-500">No recent earnings found.</Text>
        ) : (
          recentActivities.map((item, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center border-b border-gray-100 pb-3 mb-3"
            >
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-full mr-3">
                  <Icon name={item.icon} size={16} color="#3b82f6" />
                </View>
                <View>
                  <Text className="text-gray-800 font-medium">{item.plan}</Text>
                  <Text className="text-gray-600 text-sm">{item.customer}</Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-gray-800 font-semibold">{item.amount}</Text>
                <Text className="text-gray-500 text-xs">{item.date}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Subscription Plans with Circular Progress */}
      <View className="bg-white p-4 rounded-xl shadow mb-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-800">📦 Subscription Plans</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Technicians')}>
            <Text className="text-blue-600 text-sm font-medium">View Details</Text>
          </TouchableOpacity>
        </View>
        {subscriptionPlans.length === 0 ? (
          <View className="text-center py-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              No Technicians Found
            </Text>
            <Text className="text-gray-500 mb-4">
              It seems there are no technicians associated with any subscription plans.
            </Text>
            <TouchableOpacity
              className="bg-blue-600 px-4 py-2 rounded-lg"
              onPress={() => navigation.navigate('Technicians')}
            >
              <Text className="text-white font-medium">Create New Technicians</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row items-center justify-between">
            {/* Circular Progress */}
            <View className="relative mr-4">
              <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
                <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-lg">100%</Text>
                </View>
              </View>
            </View>
            {/* Labels */}
            <View>
              {subscriptionPlans.map((item, index) => (
                <View key={index} className="mb-2">
                  <View className="flex-row items-center mb-1">
                    <View
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <Text className="text-gray-800 font-medium">
                      {item.name}: {item.percentage.toFixed(0)}%
                    </Text>
                  </View>
                  <Text className="text-gray-600 text-sm">
                    {item.technicians} technician{item.technicians !== 1 ? 's' : ''}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <View className="bg-red-100 p-4 rounded-xl">
          <Text className="text-red-600">{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { MainAppNavigationProp } from '../navigation/types';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { PieChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';
// import { getFranchiseAccount, getFranchiseAccountValues } from '../api/apiMethods';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Constants for colors (matching the second component)
// const PLAN_COLORS = {
//   'Economy Plan': '#10B981',
//   'Gold Plan': '#F59E0B',
//   'Platinum Plan': '#3B82F6',
//   'Basic Plan': '#8B5CF6',
//   'Premium Plan': '#EC4899',
//   'No Plan': '#6B7280',
// };

// const Dashboard = () => {
//   const navigation = useNavigation<MainAppNavigationProp>();
//   const [loading, setLoading] = useState(true);
//   const [accountValues, setAccountValues] = useState<{
//     totalEarnings: number;
//     totalThisMonthEarnings: number;
//     earningsByMonth: number[];
//     totalNoOfTechnicians: number;
//     totalNoOfSubscriptions: number;
//   } | null>(null);
//   const [recentEarnings, setRecentEarnings] = useState<any[]>([]);
//   const [subscriptionData, setSubscriptionData] = useState<
//     { name: string; value: number; color: string }[]
//   >([]);
//   const [error, setError] = useState('');

//   // Format currency
//   const formatCurrency = (amount: number) =>
//     `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

//   // Fetch data
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError('');
//       try {
//       const franchiseId = await AsyncStorage.getItem("franchiseId");
//       if (!franchiseId) {
//         throw new Error("Franchise ID is missing");
//       }

//         const valuesRes = await getFranchiseAccountValues(franchiseId);
//         if (valuesRes?.success && valuesRes?.result) {
//           setAccountValues(valuesRes?.result);
//         } else {
//           setAccountValues(null);
//         }

//         // Fetch recent earnings
//         const earningsRes = await getFranchiseAccount(franchiseId);
//         if (earningsRes?.success && Array.isArray(earningsRes?.result)) {
//           setRecentEarnings(earningsRes?.result);

//           // Calculate subscription distribution for pie chart
//           const planCounts: Record<string, number> = {};
//           earningsRes?.result.forEach((item: any) => {
//             const planName = item.subscriptionName || 'No Plan';
//             planCounts[planName] = (planCounts[planName] || 0) + 1;
//           });
//           const subData = Object.entries(planCounts).map(([name, value]) => ({
//             name,
//             value,
//             color: PLAN_COLORS[name] || PLAN_COLORS['No Plan'],
//           }));
//           setSubscriptionData(subData);
//         } else {
//           setRecentEarnings([]);
//           setSubscriptionData([]);
//         }
//       } catch (err: any) {
//         setError(err?.message || 'Failed to fetch data');
//         setAccountValues(null);
//         setRecentEarnings([]);
//         setSubscriptionData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Prepare KPI data
//   const kpiData = [
//     {
//       title: 'Total Technicians',
//       value: accountValues?.totalNoOfTechnicians ?? 0,
//       icon: 'users',
//       color: 'bg-blue-500',
//     },
//     {
//       title: 'Total Subscriptions',
//       value: accountValues?.totalNoOfSubscriptions ?? 0,
//       icon: 'credit-card',
//       color: 'bg-green-500',
//     },
//     {
//       title: 'Total Earnings',
//       value: formatCurrency(accountValues?.totalEarnings ?? 0),
//       icon: 'money',
//       color: 'bg-yellow-500',
//     },
//     {
//       title: 'Monthly Earnings',
//       value: formatCurrency(accountValues?.totalThisMonthEarnings ?? 0),
//       icon: 'line-chart',
//       color: 'bg-orange-500',
//     },
//   ];

//   // Prepare monthly earnings
//   const monthLabels = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
//   ];
//   const monthlyEarnings = (accountValues?.earningsByMonth || []).map((amount, idx) => ({
//     month: monthLabels[idx],
//     amount: formatCurrency(amount / 1000) + 'k',
//     percentage:
//       (accountValues?.earningsByMonth
//         ? (amount / Math.max(...accountValues.earningsByMonth, 1)) * 100
//         : 0),
//   }));

//   // Prepare recent earnings
//   const recentActivities = recentEarnings.map((item) => ({
//     plan: item.subscriptionName || 'No Plan',
//     customer: item.technicianName,
//     amount: formatCurrency(item.amount),
//     date: new Date(item.createdAt).toLocaleDateString('en-GB'),
//     icon: 'user',
//   }));

//   // Prepare subscription plans for pie chart
//   const pieChartData = subscriptionData.map((item) => ({
//     name: item.name,
//     value: item.value,
//     color: item.color,
//   }));

//   const getCurrentDate = () => {
//     const today = new Date();
//     return today.toLocaleDateString('en-US', {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text className="text-lg text-gray-600">Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
//       {/* Header with Gradient */}
//       <View className="mb-6 rounded-2xl overflow-hidden">
//         <LinearGradient
//           colors={['#4F46E5', '#0D9488']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           className="p-6 relative overflow-hidden"
//         >
//           <View className="absolute top-[-64px] right-[-64px] w-32 h-32 bg-indigo-500/20 rounded-full" />
//           <View className="absolute bottom-[-48px] left-[-48px] w-24 h-24 bg-teal-500/20 rounded-full" />
//           <View className="flex-col justify-between">
//             <View className="mb-4">
//               <Text className="text-2xl font-bold text-white mb-2">
//                 Welcome back, Franchise
//               </Text>
//               <Text className="text-indigo-100 text-lg">
//                 Here's your performance overview for today
//               </Text>
//             </View>
//             <BlurView
//               intensity={25}
//               tint="light"
//               className="bg-indigo-700/30 rounded-xl border border-teal-400/30 p-4"
//             >
//               <Text className="text-sm text-indigo-100 mb-1">Today's Date</Text>
//               <Text className="text-lg font-semibold text-white">{getCurrentDate()}</Text>
//             </BlurView>
//           </View>
//         </LinearGradient>
//       </View>

//       {/* KPI Cards - 2 per row */}
//       <View className="flex-row justify-between mb-4">
//         {kpiData.slice(0, 2).map((item, index) => (
//           <View key={index} className="bg-white p-4 rounded-xl shadow w-[48%]">
//             <View className="flex-row justify-between items-center mb-2">
//               <View className={`${item.color} p-2 rounded-lg`}>
//                 <Icon name={item.icon} size={20} color="white" />
//               </View>
//               <Text className="text-2xl font-bold text-gray-800">{item.value}</Text>
//             </View>
//             <Text className="text-gray-600 text-sm">{item.title}</Text>
//           </View>
//         ))}
//       </View>
//       <View className="flex-row justify-between mb-4">
//         {kpiData.slice(2, 4).map((item, index) => (
//           <View key={index} className="bg-white p-4 rounded-xl shadow w-[48%]">
//             <View className="flex-row justify-between items-center mb-2">
//               <View className={`${item.color} p-2 rounded-lg`}>
//                 <Icon name={item.icon} size={20} color="white" />
//               </View>
//               <Text className="text-2xl font-bold text-gray-800">{item.value}</Text>
//             </View>
//             <Text className="text-gray-600 text-sm">{item.title}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Monthly Earnings */}
//       <View className="bg-white p-4 rounded-xl shadow mb-4">
//         <Text className="text-lg font-semibold text-gray-800 mb-4">📈 Monthly Earnings</Text>
//         {monthlyEarnings.map((item, index) => (
//           <View key={index} className="flex-row items-center justify-between mb-2">
//             <Text className="text-gray-600 text-sm w-10">{item.month}</Text>
//             <View className="flex-1 mx-3">
//               <View className="bg-gray-200 h-2 rounded-full">
//                 <View
//                   className={`h-2 rounded-full ${
//                     item.percentage > 0 ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-300'
//                   }`}
//                   style={{ width: `${item.percentage}%` }}
//                 />
//               </View>
//             </View>
//             <Text className="text-gray-800 text-sm font-medium">{item.amount}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Recent Earnings */}
//       <View className="bg-white p-4 rounded-xl shadow mb-4">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-lg font-semibold text-gray-800">💸 Recent Earnings</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Earnings')}>
//             <Text className="text-blue-600 text-sm font-medium">View All</Text>
//           </TouchableOpacity>
//         </View>
//         {recentActivities.length === 0 ? (
//           <Text className="text-center text-gray-500">No recent earnings found.</Text>
//         ) : (
//           recentActivities.map((item, index) => (
//             <View
//               key={index}
//               className="flex-row justify-between items-center border-b border-gray-100 pb-3 mb-3"
//             >
//               <View className="flex-row items-center">
//                 <View className="bg-blue-100 p-2 rounded-full mr-3">
//                   <Icon name={item.icon} size={16} color="#3b82f6" />
//                 </View>
//                 <View>
//                   <Text className="text-gray-800 font-medium">{item.plan}</Text>
//                   <Text className="text-gray-600 text-sm">{item.customer}</Text>
//                 </View>
//               </View>
//               <View className="items-end">
//                 <Text className="text-gray-800 font-semibold">{item.amount}</Text>
//                 <Text className="text-gray-500 text-xs">{item.date}</Text>
//               </View>
//             </View>
//           ))
//         )}
//       </View>

//       {/* Subscription Plans with Pie Chart */}
//       <View className="bg-white p-4 rounded-xl shadow mb-6">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-lg font-semibold text-gray-800">📦 Subscription Plans</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Technicians')}>
//             <Text className="text-blue-600 text-sm font-medium">View Details</Text>
//           </TouchableOpacity>
//         </View>
//         {subscriptionData.length === 0 ? (
//           <View className="text-center py-6">
//             <Text className="text-lg font-semibold text-gray-800 mb-2">
//               No Technicians Found
//             </Text>
//             <Text className="text-gray-500 mb-4">
//               It seems there are no technicians associated with any subscription plans.
//             </Text>
//             <TouchableOpacity
//               className="bg-blue-600 px-4 py-2 rounded-lg"
//               onPress={() => navigation.navigate('Technicians')}
//             >
//               <Text className="text-white font-medium">Create New Technicians</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View className="flex-row items-center justify-between">
//             {/* Pie Chart */}
//             <View className="mr-4">
//               <PieChart
//                 data={pieChartData}
//                 width={150}
//                 height={150}
//                 chartConfig={{
//                   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//                   labelColor: () => `#333`,
//                 }}
//                 accessor="value"
//                 backgroundColor="transparent"
//                 paddingLeft="15"
//                 center={[10, 10]}
//                 absolute
//               />
//             </View>
//             {/* Labels */}
//             <View>
//               {subscriptionData.map((item, index) => (
//                 <View key={index} className="mb-2">
//                   <View className="flex-row items-center mb-1">
//                     <View
//                       className="w-3 h-3 rounded-full mr-2"
//                       style={{ backgroundColor: item.color }}
//                     />
//                     <Text className="text-gray-800 font-medium">
//                       {item.name}: {(item.value / subscriptionData.reduce((sum, d) => sum + d.value, 0) * 100).toFixed(0)}%
//                     </Text>
//                   </View>
//                   <Text className="text-gray-600 text-sm">{item.value} technician{item.value !== 1 ? 's' : ''}</Text>
//                 </View>
//               ))}
//             </View>
//           </View>
//         )}
//       </View>

//       {/* Error Message */}
//       {error && (
//         <View className="bg-red-100 p-4 rounded-xl">
//           <Text className="text-red-600">{error}</Text>
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default Dashboard;
// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { MainAppNavigationProp } from '../navigation/types';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';

// const Dashboard = () => {
//   const navigation = useNavigation<MainAppNavigationProp>();

//   const kpiData = [
//     { title: 'Total Technicians', value: '1', icon: 'users', color: 'bg-blue-500' },
//     { title: 'Total Subscriptions', value: '1', icon: 'credit-card', color: 'bg-green-500' },
//     { title: 'Total Earnings', value: '₹1,000', icon: 'money', color: 'bg-yellow-500' },
//     { title: 'Monthly Earnings', value: '₹0', icon: 'line-chart', color: 'bg-orange-500' },
//   ];

//   const monthlyEarnings = [
//     { month: 'Jan', amount: '₹0k', percentage: 0 },
//     { month: 'Feb', amount: '₹0k', percentage: 0 },
//     { month: 'Mar', amount: '₹0k', percentage: 0 },
//     { month: 'Apr', amount: '₹0k', percentage: 0 },
//     { month: 'May', amount: '₹0k', percentage: 0 },
//     { month: 'Jun', amount: '₹0k', percentage: 0 },
//     { month: 'Jul', amount: '₹1k', percentage: 100 },
//     { month: 'Aug', amount: '₹0k', percentage: 0 },
//   ];

//   const recentEarnings = [
//     {
//       plan: 'Platinum Plan',
//       customer: 'Rama',
//       amount: '₹1,000',
//       date: '29/07/2025',
//       icon: 'user',
//     },
//   ];

//   const subscriptionPlans = [
//     { name: 'Platinum Plan', technicians: 1, percentage: 100, color: '#3b82f6' },
//   ];

//   const getCurrentDate = () => {
//     const today = new Date();
//     return today.toLocaleDateString('en-US', {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
//       {/* New Header with Gradient */}
//       <View className="mb-6 rounded-2xl overflow-hidden">
//         <LinearGradient
//           colors={['#4F46E5', '#0D9488']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//           className="p-6 relative overflow-hidden"
//         >
//           {/* Decorative Circles */}
//           <View className="absolute top-[-64px] right-[-64px] w-32 h-32 bg-indigo-500/20 rounded-full" />
//           <View className="absolute bottom-[-48px] left-[-48px] w-24 h-24 bg-teal-500/20 rounded-full" />
          
//           <View className="flex-col justify-between">
//             <View className="mb-4">
//               <Text className="text-2xl font-bold text-white mb-2">
//                 Welcome back, Franchise
//               </Text>
//               <Text className="text-indigo-100 text-lg">
//                 Here's your performance overview for today
//               </Text>
//             </View>
            
//             <BlurView 
//               intensity={25}
//               tint="light"
//               className="bg-indigo-700/30 rounded-xl border border-teal-400/30 p-4"
//             >
//               <Text className="text-sm text-indigo-100 mb-1">Today's Date</Text>
//               <Text className="text-lg font-semibold text-white">
//                 {getCurrentDate()}
//               </Text>
//             </BlurView>
//           </View>
//         </LinearGradient>
//       </View>

//       {/* KPI Cards - 2 per row */}
//       <View className="flex-row justify-between mb-4">
//         {kpiData.slice(0, 2).map((item, index) => (
//           <View key={index} className="bg-white p-4 rounded-xl shadow w-[48%]">
//             <View className="flex-row justify-between items-center mb-2">
//               <View className={`${item.color} p-2 rounded-lg`}>
//                 <Icon name={item.icon} size={20} color="white" />
//               </View>
//               <Text className="text-2xl font-bold text-gray-800">{item.value}</Text>
//             </View>
//             <Text className="text-gray-600 text-sm">{item.title}</Text>
//           </View>
//         ))}
//       </View>

//       <View className="flex-row justify-between mb-4">
//         {kpiData.slice(2, 4).map((item, index) => (
//           <View key={index} className="bg-white p-4 rounded-xl shadow w-[48%]">
//             <View className="flex-row justify-between items-center mb-2">
//               <View className={`${item.color} p-2 rounded-lg`}>
//                 <Icon name={item.icon} size={20} color="white" />
//               </View>
//               <Text className="text-2xl font-bold text-gray-800">{item.value}</Text>
//             </View>
//             <Text className="text-gray-600 text-sm">{item.title}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Monthly Earnings */}
//       <View className="bg-white p-4 rounded-xl shadow mb-4">
//         <Text className="text-lg font-semibold text-gray-800 mb-4">📈 Monthly Earnings</Text>
//         {monthlyEarnings.map((item, index) => (
//           <View key={index} className="flex-row items-center justify-between mb-2">
//             <Text className="text-gray-600 text-sm w-10">{item.month}</Text>
//             <View className="flex-1 mx-3">
//               <View className="bg-gray-200 h-2 rounded-full">
//                 <View
//                   className={`h-2 rounded-full ${
//                     item.percentage > 0 ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-300'
//                   }`}
//                   style={{ width: `${item.percentage}%` }}
//                 />
//               </View>
//             </View>
//             <Text className="text-gray-800 text-sm font-medium">{item.amount}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Recent Earnings */}
//       <View className="bg-white p-4 rounded-xl shadow mb-4">
//         <Text className="text-lg font-semibold text-gray-800 mb-4">💸 Recent Earnings</Text>
//         {recentEarnings.map((item, index) => (
//           <View key={index} className="flex-row justify-between items-center border-b border-gray-100 pb-3 mb-3">
//             <View className="flex-row items-center">
//               <View className="bg-blue-100 p-2 rounded-full mr-3">
//                 <Icon name={item.icon} size={16} color="#3b82f6" />
//               </View>
//               <View>
//                 <Text className="text-gray-800 font-medium">{item.plan}</Text>
//                 <Text className="text-gray-600 text-sm">{item.customer}</Text>
//               </View>
//             </View>
//             <View className="items-end">
//               <Text className="text-gray-800 font-semibold">{item.amount}</Text>
//               <Text className="text-gray-500 text-xs">{item.date}</Text>
//             </View>
//           </View>
//         ))}
//       </View>

//       {/* Subscription Plans with Circular Progress */}
//       <View className="bg-white p-4 rounded-xl shadow mb-6">
//         <Text className="text-lg font-semibold text-gray-800 mb-4">📦 Subscription Plans</Text>
//         <View className="flex-row items-center justify-between">
//           {/* Circular Progress */}
//           <View className="relative">
//             <View className="w-24 h-24 bg-gray-200 rounded-full items-center justify-center">
//               <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center">
//                 <Text className="text-white font-bold text-lg">100%</Text>
//               </View>
//             </View>
//           </View>
//           {/* Labels */}
//           <View>
//             {subscriptionPlans.map((item, index) => (
//               <View key={index} className="mb-2">
//                 <View className="flex-row items-center mb-1">
//                   <View style={{ backgroundColor: item.color }} className="w-3 h-3 rounded-full mr-2" />
//                   <Text className="text-gray-800 font-medium">
//                     {item.name}: {item.percentage}%
//                   </Text>
//                 </View>
//                 <Text className="text-gray-600 text-sm">{item.technicians} technician</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default Dashboard;
