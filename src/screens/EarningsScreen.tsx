import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

const EarningsScreen: React.FC = () => {
  // Placeholder data for UI
  const totalEarnings = 8000;
  const thisMonthEarnings = 5000;
  const recentEarnings = [
    {
      _id: "1",
      createdAt: "2025-08-01T10:00:00Z",
      technicianName: "John Doe",
      category: "Generator Repair & Services",
      subscriptionName: "Premium Plan",
      amount: 5000,
    },
    {
      _id: "2",
      createdAt: "2025-08-02T09:00:00Z",
      technicianName: "Jane Smith",
      category: "Fabricator Services",
      subscriptionName: "Basic Plan",
      amount: 3000,
    },
  ];

  // Format currency
  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="space-y-6 pb-8">
        {/* Summary Cards */}
        <View className="space-y-4">
          <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-medium text-gray-600">
                  Total Earnings
                </Text>
                <Text className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalEarnings)}
                </Text>
              </View>
              <View className="p-3 bg-green-100 rounded-xl">
                <Feather name="dollar-sign" size={24} color="#15803d" />
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-medium text-gray-600">
                  This Month
                </Text>
                <Text className="text-xl font-bold text-gray-900">
                  {formatCurrency(thisMonthEarnings)}
                </Text>
              </View>
              <View className="p-3 bg-blue-100 rounded-xl">
                <Feather name="calendar" size={24} color="#2563eb" />
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-medium text-gray-600">
                  Total Transactions
                </Text>
                <Text className="text-xl font-bold text-gray-900">
                  {recentEarnings.length}
                </Text>
              </View>
              <View className="p-3 bg-yellow-100 rounded-xl">
                <Feather name="repeat" size={24} color="#ca8a04" />
              </View>
            </View>
          </View>
        </View>

        {/* Recent Earnings Table */}
        <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Earnings
          </Text>
          {recentEarnings.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-gray-500">No earnings found.</Text>
            </View>
          ) : (
            <View className="w-full">
              {/* Table Header */}
              <View className="flex-row bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-300">
                <Text className="w-[40%] text-xs font-medium text-gray-700">
                  Technician
                </Text>
                <Text className="w-[30%] text-xs font-medium text-gray-700">
                  Plan
                </Text>
                <Text className="w-[30%] text-xs font-medium text-gray-700 text-right">
                  Commission
                </Text>
              </View>

              {/* Table Body */}
              {recentEarnings.map((earning, index) => (
                <View
                  key={earning._id}
                  className={`flex-row px-4 py-3 bg-white ${
                    index < recentEarnings.length - 1
                      ? "border-b border-gray-200"
                      : "rounded-b-lg"
                  }`}
                >
                  {/* Technician Details */}
                  <View className="w-[40%]">
                    <Text className="text-xs font-semibold text-gray-900">
                      {earning.technicianName || "-"}
                    </Text>
                    <Text className="text-xs text-gray-600">
                      {earning.category || "-"}
                    </Text>
                    <Text className="text-[10px] text-gray-400">
                      {new Date(earning.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </View>

                  {/* Plan */}
                  <View className="w-[30%] justify-center">
                    <Text className="text-xs text-gray-900">
                      {earning.subscriptionName || "-"}
                    </Text>
                  </View>

                  {/* Commission */}
                  <View className="w-[30%] justify-center items-end">
                    <Text className="text-xs font-semibold text-green-600">
                      {formatCurrency(earning.amount)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default EarningsScreen;
// import React from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import { Feather } from '@expo/vector-icons';

// const EarningsScreen: React.FC = () => {
//   // Placeholder data for UI
//   const totalEarnings = 8000;
//   const thisMonthEarnings = 5000;
//   const recentEarnings = [
//     {
//       _id: '1',
//       createdAt: '2025-08-01T10:00:00Z',
//       technicianName: 'John Doe',
//       categoryId: 'cat1',
//       subscriptionName: 'Premium Plan',
//       amount: 5000,
//     },
//     {
//       _id: '2',
//       createdAt: '2025-08-02T09:00:00Z',
//       technicianName: 'Jane Smith',
//       categoryId: 'cat2',
//       subscriptionName: 'Basic Plan',
//       amount: 3000,
//     },
//   ];

//   // Format currency
//   const formatCurrency = (amount: number) =>
//     `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

//   return (
//     <ScrollView className="flex-1 bg-gray-100 p-4">
//       <View className="space-y-6 pb-8">
//         {/* Summary Cards */}
//         <View className="space-y-4">
//           <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
//             <View className="flex-row justify-between items-center">
//               <View>
//                 <Text className="text-sm font-medium text-gray-600">Total Earnings</Text>
//                 <Text className="text-xl font-bold text-gray-900">
//                   {formatCurrency(totalEarnings)}
//                 </Text>
//               </View>
//               <View className="p-3 bg-green-100 rounded-xl">
//                 <Feather name="dollar-sign" size={24} color="#15803d" />
//               </View>
//             </View>
//           </View>

//           <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
//             <View className="flex-row justify-between items-center">
//               <View>
//                 <Text className="text-sm font-medium text-gray-600">This Month</Text>
//                 <Text className="text-xl font-bold text-gray-900">
//                   {formatCurrency(thisMonthEarnings)}
//                 </Text>
//               </View>
//               <View className="p-3 bg-blue-100 rounded-xl">
//                 <Feather name="calendar" size={24} color="#2563eb" />
//               </View>
//             </View>
//           </View>

//           <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
//             <View className="flex-row justify-between items-center">
//               <View>
//                 <Text className="text-sm font-medium text-gray-600">Total Transactions</Text>
//                 <Text className="text-xl font-bold text-gray-900">{recentEarnings.length}</Text>
//               </View>
//               <View className="p-3 bg-yellow-100 rounded-xl">
//                 <Feather name="repeat" size={24} color="#ca8a04" />
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Recent Earnings */}
//         <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
//           <Text className="text-lg font-semibold text-gray-900 mb-4">Earnings</Text>
//           {recentEarnings.length === 0 ? (
//             <View className="py-8 items-center">
//               <Text className="text-gray-500">No earnings found.</Text>
//             </View>
//           ) : (
//             <View className="space-y-4">
//               {recentEarnings.map((earning, index) => (
//                 <View
//                   key={earning._id}
//                   className={`pb-4 ${
//                     index < recentEarnings.length - 1 ? 'border-b border-gray-200' : ''
//                   }`}
//                 >
//                   <View className="flex-row justify-between">
//                     <Text className="text-sm font-medium text-gray-600">Date</Text>
//                     <Text className="text-sm text-gray-900">
//                       {new Date(earning.createdAt).toLocaleDateString('en-IN', {
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                       })}
//                     </Text>
//                   </View>
//                   <View className="flex-row justify-between mt-2">
//                     <Text className="text-sm font-medium text-gray-600">Technician</Text>
//                     <Text className="text-sm text-gray-900">{earning.technicianName || '-'}</Text>
//                   </View>
//                   <View className="flex-row justify-between mt-2">
//                     <Text className="text-sm font-medium text-gray-600">Category</Text>
//                     <Text className="text-sm text-gray-900">{earning.categoryId || '-'}</Text>
//                   </View>
//                   <View className="flex-row justify-between mt-2">
//                     <Text className="text-sm font-medium text-gray-600">Plan</Text>
//                     <Text className="text-sm text-gray-900">{earning.subscriptionName || '-'}</Text>
//                   </View>
//                   <View className="flex-row justify-between mt-2">
//                     <Text className="text-sm font-medium text-gray-600">Commission</Text>
//                     <Text className="text-sm font-semibold text-green-600">
//                       {formatCurrency(earning.amount)}
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default EarningsScreen;
