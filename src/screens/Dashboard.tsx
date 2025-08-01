import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import DashboardCard from '../components/dashboard/DashboardCards'
import MonthlyEarningsChart from '../components/dashboard/MonthlyEarningsChart'
import PlansChart from '../components/dashboard/PlansChart'
import RecentEarningsChart from '../components/dashboard/RecentEarningsChart'
import { MainAppNavigationProp } from '../navigation/types'

function Dashboard() {
  const navigation = useNavigation<MainAppNavigationProp>();

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Dashboard</Text>
        
        {/* Navigation Test Button */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Lohi')}
          className="bg-blue-500 p-3 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold">
            Navigate to Lohi Screen
          </Text>
        </TouchableOpacity>
        
        {/* Dashboard Cards */}
        <View className="flex-row mb-4">
          <DashboardCard title="Total Revenue" value="$12,450" icon="💰" />
          <DashboardCard title="Active Franchises" value="24" icon="🏢" />
        </View>
        
        <View className="flex-row mb-4">
          <DashboardCard title="Monthly Growth" value="+15%" icon="📈" />
          <DashboardCard title="Pending Orders" value="8" icon="📋" />
        </View>
        
        {/* Charts */}
        <MonthlyEarningsChart />
        <PlansChart />
        <RecentEarningsChart />
      </View>
    </ScrollView>
  )
}

export default Dashboard