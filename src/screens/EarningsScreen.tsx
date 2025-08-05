import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getFranchiseAccount } from "../api/apiMethods";

type AccountEntry = {
  _id: string;
  createdAt: string;
  technicianName: string;
  category?: string;
  categoryId?: string;
  subscriptionName: string;
  amount: number;
};

const DEMO_FRANCHISE_ID = "6884601d37c29d81756e5835";

const EarningsScreen: React.FC = () => {
  const [accountEntries, setAccountEntries] = useState<AccountEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch account data
  useEffect(() => {
    const fetchAccount = async () => {
      setLoading(true);
      setError("");
      try {
        const franchiseId = DEMO_FRANCHISE_ID;
        if (!franchiseId) {
          setError("Franchise ID is missing");
          setLoading(false);
          return;
        }
        const response = await getFranchiseAccount(franchiseId);
        if (response && response.result && Array.isArray(response.result)) {
          const mapped = response.result.map((entry: any) => ({
            _id: entry._id,
            createdAt: entry.createdAt,
            technicianName: entry.technicianName,
            category: entry.category || "-",
            categoryId: entry.categoryId || "-",
            subscriptionName: entry.subscriptionName,
            amount: entry.amount,
          }));
          setAccountEntries(mapped);
        } else {
          setError("No earnings data found.");
        }
      } catch (err) {
        setError("Failed to fetch earnings data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  // Calculate total earnings and this month's earnings
  const { totalEarnings, thisMonthEarnings } = useMemo(() => {
    let total = 0;
    let monthTotal = 0;
    const now = new Date();
    accountEntries.forEach(entry => {
      total += entry.amount;
      const createdAt = new Date(entry.createdAt);
      if (
        createdAt.getFullYear() === now.getFullYear() &&
        createdAt.getMonth() === now.getMonth()
      ) {
        monthTotal += entry.amount;
      }
    });
    return { totalEarnings: total, thisMonthEarnings: monthTotal };
  }, [accountEntries]);

  // Format currency
  const formatCurrency = (amount: number) =>
    `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  // Sort recent earnings (latest first)
  const recentEarnings = useMemo(() => {
    return [...accountEntries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [accountEntries]);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="space-y-8 pb-8">
        {/* Summary Cards */}
        <View className="space-y-6">
          {/* Total Earnings Card */}
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

          {/* This Month Card */}
          <View className="mt-4 bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
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

          {/* Total Transactions Card */}
          <View className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
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
        <View className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Earnings
          </Text>
          
          {loading ? (
            <View className="py-8 items-center">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="text-gray-500 mt-2">Loading earnings...</Text>
            </View>
          ) : error ? (
            <View className="py-8 items-center">
              <Feather name="alert-circle" size={24} color="#ef4444" />
              <Text className="text-red-500 mt-2">{error}</Text>
            </View>
          ) : recentEarnings.length === 0 ? (
            <View className="py-8 items-center">
              <Feather name="database" size={24} color="#9ca3af" />
              <Text className="text-gray-500 mt-2">No earnings found</Text>
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
                  className={`flex-row px-4 py-3 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } ${
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