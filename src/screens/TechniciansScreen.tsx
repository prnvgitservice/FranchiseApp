import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllTechniciansByFranchise } from "../api/apiMethods";

type RootStackParamList = {
  Tabs: undefined;
  Technicians: undefined;
  FranchisePlan: undefined;
  AboutUs: undefined;
  KeyFeatures: undefined;
  AllSubscriptions: undefined;
  LeaveReview: undefined;
  Login: undefined;
  AddTechnician: undefined;
  ViewTechnician: { tech: any };
  EditTechnician: { tech: any };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Subscription {
  subscriptionId: string;
  subscriptionName: string;
  startDate: string;
  endDate: string;
  leads: number | null;
  ordersCount: number;
  _id: string;
}

interface Technician {
  id: string;
  franchiseId: string;
  username: string;
  userId: string;
  phoneNumber: string;
  role: string;
  category: string;
  buildingName: string;
  areaName: string;
  city: string;
  state: string;
  pincode: string;
  subscription: Subscription;
}

const TechniciansScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [allTechs, setAllTechs] = useState<Technician[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Static subscription plans, modified to include only Economy Plan
  const subscriptionPlans = ["all", "Economy Plan"];

  // Fetch franchiseId from AsyncStorage and technicians
  const fetchTechsByFranchise = async () => {
    try {
      setLoading(true);
      setError("");
      const franchiseId = await AsyncStorage.getItem("franchiseId");
      if (!franchiseId) {
        setError("Franchise ID not found");
        setAllTechs([]);
        return;
      }
      const response = await getAllTechniciansByFranchise(franchiseId);
      if (Array.isArray(response?.result)) {
        setAllTechs(response.result);
      } else {
        setAllTechs([]);
        setError("No technicians found");
      }
    } catch (error: any) {
      setError(error?.message || "Failed to fetch technicians");
      setAllTechs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechsByFranchise();
  }, []);

  // Memoize filtered technicians
  const filteredTechnicians = useMemo(() => {
    return allTechs.filter((tech) => {
      const matchesSearch =
        tech.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlan =
        filterPlan === "all" ||
        tech.subscription?.subscriptionName === filterPlan;
      return matchesSearch && matchesPlan;
    });
  }, [allTechs, searchTerm, filterPlan]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTechnicians.length / itemsPerPage);
  const paginatedTechnicians = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTechnicians.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTechnicians, currentPage]);

  // Format date to "DD MMM YYYY"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 px-4 pt-6">
      <View className="pb-12">
        {/* Header */}
        <View className="space-y-3">
          <View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Technicians
            </Text>
            <Text className="text-base text-gray-500 m-2">
              Manage your network of technicians
            </Text> 
          </View>
          {/* <TouchableOpacity
            className="bg-indigo-600 rounded-full py-3 px-4 flex-row items-center justify-center shadow-md"
            onPress={() => navigation.navigate("AddTechnician")}
          >
            <Feather name="plus" size={18} color="#ffffff" />
            <Text className="text-white font-semibold ml-2 text-base">
              Add Technician
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* Error Message */}
        {error ? (
          <View className="bg-red-100 text-red-700 p-4 rounded-xl my-4">
            <Text>{error}</Text>
          </View>
        ) : null}

        {/* Search and Filter */}
        <View className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 mt-6">
          <View className="space-y-4">
            <View className="relative">
            <Feather name="search" size={18} color="black" className="absolute left-3 top-1/2 -translate-y-1/2 z-10" />

              <TextInput
                placeholder="Search by name or category..."
                value={searchTerm}
                onChangeText={setSearchTerm}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 mb-2 text-base"
              />
            </View>
            <View className="flex-row items-center space-x-3 gap-1">
            <Feather name="filter" size={20} color="black" />
              <View className="flex-1 bg-white rounded-lg border border-gray-300 overflow-hidden">
                <Picker
                  selectedValue={filterPlan}
                  onValueChange={(value) => setFilterPlan(value)}
                  style={{ fontSize: 16 , color: "#111827" }}
                >
                  {subscriptionPlans.map((plan) => (
                    <Picker.Item
                      key={plan}
                      label={plan === "all" ? "All Plans" : plan}
                      value={plan}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        {/* Technicians Table */}
        <View className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mt-6">
          {/* Table Header */}
          <View className="flex-row bg-gray-100 px-5 py-4 border-b border-gray-200">
            <Text className="flex-1 text-sm font-semibold text-gray-700">Technician</Text>
            <Text className="w-1/3 text-sm font-semibold text-gray-700">Plan</Text>
            <Text className="w-1/4 text-sm font-semibold text-gray-700 text-right">Actions</Text>
          </View>

          {/* Table Body */}
          {loading ? (
            <View className="py-16 items-center">
              <Text className="text-lg font-medium text-gray-600">Loading...</Text>
            </View>
          ) : paginatedTechnicians.length === 0 ? (
            <View className="py-16 items-center">
              <Feather name="users" size={48} color="#6b7280" />
              <Text className="text-lg font-medium text-gray-900 mt-4">No technicians found</Text>
              <Text className="text-sm text-gray-500 mt-1">Add a technician to get started</Text>
            </View>
          ) : (
            paginatedTechnicians.map((tech, index) => (
              <View
                key={tech.id}
                className={`flex-row px-5 py-4 ${index < paginatedTechnicians.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                {/* Technician Info */}
                <View className="flex-1 pr-2">
                  <Text className="text-sm font-semibold text-gray-900">{tech.username}</Text>
                  <Text className="text-sm text-gray-600">{tech.phoneNumber}</Text>
                  <Text className="text-sm text-indigo-600">{tech.category}</Text>
                  <Text className="text-xs text-gray-400">{`${tech.areaName}, ${tech.city}, ${tech.pincode}`}</Text>
                </View>

                {/* Plan Info */}
                <View className="w-1/3 justify-center">
                  <Text className="text-sm font-medium text-gray-900">
                    {tech.subscription?.subscriptionName || "N/A"}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {tech.subscription?.endDate
                      ? formatDate(tech.subscription.endDate)
                      : tech.subscription?.leads
                      ? `${tech.subscription.leads} leads`
                      : "N/A"}
                  </Text>
                </View>

                {/* Action Buttons */}
                <View className="w-1/4 flex-row justify-end items-center space-x-3">
                  <Pressable
                    className="p-2"
                    onPress={() => navigation.navigate("ViewTechnician", { tech })}
                  >
                    <Feather name="eye" size={20} color="#2563eb" />
                  </Pressable>
                  <Pressable
                    className="p-2"
                    onPress={() => navigation.navigate("EditTechnician", { tech })}
                  >
                    <Feather name="edit" size={20} color="#15803d" />
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Pagination */}
        {totalPages > 1 && (
          <View className="flex-row justify-center items-center space-x-3 py-6">
            <TouchableOpacity
              className={`px-5 py-2.5 bg-gray-200 rounded-full ${currentPage === 1 ? "opacity-50" : ""}`}
              onPress={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text className="text-gray-600 font-medium">Previous</Text>
            </TouchableOpacity>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <TouchableOpacity
                key={page}
                className={`px-5 py-2.5 rounded-full ${currentPage === page ? "bg-indigo-600" : "bg-gray-200"}`}
                onPress={() => handlePageChange(page)}
              >
                <Text className={`${currentPage === page ? "text-white" : "text-gray-600"} font-medium`}>
                  {page}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className={`px-5 py-2.5 bg-gray-200 rounded-full ${currentPage === totalPages ? "opacity-50" : ""}`}
              onPress={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Text className="text-gray-600 font-medium">Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default TechniciansScreen;
// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Pressable,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "expo-router";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// type RootStackParamList = {
//   Tabs: undefined;
//   Technicians: undefined;
//   FranchisePlan: undefined;
//   AboutUs: undefined;
//   KeyFeatures: undefined;
//   AllSubscriptions: undefined;
//   LeaveReview: undefined;
//   Login: undefined;
//   AddTechnician: undefined;
//   ViewTechnician: { tech: any };
//   EditTechnician: { tech: any };
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const TechniciansScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   // Fake data for UI
//   const fakeTechnicians = [
//     {
//       id: "1",
//       username: "John Doe",
//       phoneNumber: "+91 98765 43210",
//       category: "Plumbing",
//       areaName: "Koramangala",
//       city: "Bangalore",
//       pincode: "560034",
//       subscription: {
//         subscriptionName: "Gold Plan",
//         endDate: "2025-12-31T23:59:59Z",
//       },
//     },
//     {
//       id: "2",
//       username: "Jane Smith",
//       phoneNumber: "+91 87654 32109",
//       category: "Electrical",
//       areaName: "Indiranagar",
//       city: "Bangalore",
//       pincode: "560038",
//       subscription: {
//         subscriptionName: "Economy Plan",
//         endDate: "2025-11-30T23:59:59Z",
//       },
//     },
//     {
//       id: "3",
//       username: "Ravi Kumar",
//       phoneNumber: "+91 76543 21098",
//       category: "Carpentry",
//       areaName: "Whitefield",
//       city: "Bangalore",
//       pincode: "560066",
//       subscription: {
//         subscriptionName: "Platinum Plan",
//         leads: 50,
//       },
//     },
//   ];

//   // Static subscription plans
//   const subscriptionPlans = [
//     "all",
//     "Economy Plan",
//     "Gold Plan",
//     "Platinum Plan",
//   ];

//   // Format date to "DD MMM YYYY"
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-50 px-4 pt-6">
//       <View className=" pb-12">
//         {/* Header */}
//         <View className="space-y-3">
//           <View>
//             <Text className="text-3xl font-bold text-gray-900 mb-2">
//               Technicians
//             </Text>
//             <Text className="text-base text-gray-500 m-2">
//               Manage your network of technicians
//             </Text>
//           </View>
//           <TouchableOpacity
//             className="bg-indigo-600 rounded-full py-3 px-4 flex-row items-center justify-center shadow-md"
//             onPress={() => navigation.navigate("AddTechnician")}
//           >
//             <Feather name="plus" size={18} color="#ffffff" />
//             <Text className="text-white font-semibold ml-2 text-base">
//               Add Technician
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Search and Filter */}
//         <View className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
//           <View className="space-y-4">
//             <View className="relative">
//               <Feather
//                 name="search"
//                 size={20}
//                 color="#6b7280"
//                 className="absolute left-3 top-1/2 -translate-y-1/2"
//               />
//               <TextInput
//                 placeholder="Search by name or category..."
//                 value=""
//                 className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 mb-2"
//                 style={{ fontSize: 16 }}
//               />
//             </View>
//             <View className="flex-row items-center space-x-3">
//               <Feather name="filter" size={20} color="#6b7280" />
//               <View className="flex-1 border border-gray-200 rounded-xl bg-gray-50">
//                 <Picker
//                   selectedValue="all"
//                   style={{ height: 48, color: "#111827" }}
//                 >
//                   {subscriptionPlans.map((plan) => (
//                     <Picker.Item
//                       key={plan}
//                       label={plan === "all" ? "All Plans" : plan}
//                       value={plan}
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Technicians Table */}
//         <View className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
//           {/* Table Header */}
//           <View className="flex-row bg-gray-100 px-5 py-4 border-b border-gray-200">
//             <Text className="flex-1 text-sm font-semibold text-gray-700">
//               Technician
//             </Text>
//             <Text className="w-1/3 text-sm font-semibold text-gray-700">
//               Plan
//             </Text>
//             <Text className="w-1/4 text-sm font-semibold text-gray-700 text-right">
//               Actions
//             </Text>
//           </View>

//           {/* Table Body */}
//           {fakeTechnicians.length === 0 ? (
//             <View className="py-16 items-center">
//               <Feather name="users" size={48} color="#6b7280" />
//               <Text className="text-lg font-medium text-gray-900 mt-4">
//                 No technicians found
//               </Text>
//               <Text className="text-sm text-gray-500 mt-1">
//                 Add a technician to get started
//               </Text>
//             </View>
//           ) : (
//             fakeTechnicians.map((tech, index) => (
//               <View
//                 key={tech.id}
//                 className={`flex-row px-5 py-4 ${
//                   index < fakeTechnicians.length - 1
//                     ? "border-b border-gray-100"
//                     : ""
//                 }`}
//               >
//                 {/* Technician Info */}
//                 <View className="flex-1 pr-2">
//                   <Text className="text-sm font-semibold text-gray-900">
//                     {tech.username}
//                   </Text>
//                   <Text className="text-sm text-gray-600">
//                     {tech.phoneNumber}
//                   </Text>
//                   <Text className="text-sm text-indigo-600">
//                     {tech.category}
//                   </Text>
//                   <Text className="text-xs text-gray-400">
//                     {`${tech.areaName}, ${tech.city}, ${tech.pincode}`}
//                   </Text>
//                 </View>

//                 {/* Plan Info */}
//                 <View className="w-1/3 justify-center">
//                   <Text className="text-sm font-medium text-gray-900">
//                     {tech.subscription?.subscriptionName || "N/A"}
//                   </Text>
//                   <Text className="text-xs text-gray-500">
//                     {tech.subscription?.endDate
//                       ? formatDate(tech.subscription.endDate)
//                       : tech.subscription?.leads
//                       ? `${tech.subscription.leads} leads`
//                       : "N/A"}
//                   </Text>
//                 </View>

//                 {/* Action Buttons */}
//                 <View className="w-1/4 flex-row justify-end items-center space-x-3">
//                   <Pressable
//                     className="p-2"
//                     onPress={() => navigation.navigate("ViewTechnician", { tech })}
//                   >
//                     <Feather name="eye" size={20} color="#2563eb" />
//                   </Pressable>
//                   <Pressable
//                     className="p-2"
//                     onPress={() => navigation.navigate("EditTechnician", { tech })}
//                   >
//                     <Feather name="edit" size={20} color="#15803d" />
//                   </Pressable>
//                 </View>
//               </View>
//             ))
//           )}
//         </View>

//         {/* Pagination */}
//         <View className="flex-row justify-center items-center space-x-3 py-6">
//           <TouchableOpacity
//             className="px-5 py-2.5 bg-gray-200 rounded-full"
//             disabled
//           >
//             <Text className="text-gray-600 font-medium">Previous</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="px-5 py-2.5 bg-indigo-600 rounded-full">
//             <Text className="text-white font-medium">1</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="px-5 py-2.5 bg-gray-200 rounded-full">
//             <Text className="text-gray-600 font-medium">2</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="px-5 py-2.5 bg-gray-200 rounded-full">
//             <Text className="text-gray-600 font-medium">Next</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default TechniciansScreen;
// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "expo-router";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// type RootStackParamList = {
//   Tabs: undefined;
//   Technicians: undefined;
//   FranchisePlan: undefined;
//   AboutUs: undefined;
//   KeyFeatures: undefined;
//   AllSubscriptions: undefined;
//   LeaveReview: undefined;
//   Login: undefined;
//   AddTechnician: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const TechniciansScreen: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   // Fake data for UI
//   const fakeTechnicians = [
//     {
//       id: "1",
//       username: "John Doe",
//       phoneNumber: "+91 98765 43210",
//       category: "Plumbing",
//       areaName: "Koramangala",
//       city: "Bangalore",
//       pincode: "560034",
//       subscription: {
//         subscriptionName: "Gold Plan",
//         endDate: "2025-12-31T23:59:59Z",
//       },
//     },
//     {
//       id: "2",
//       username: "Jane Smith",
//       phoneNumber: "+91 87654 32109",
//       category: "Electrical",
//       areaName: "Indiranagar",
//       city: "Bangalore",
//       pincode: "560038",
//       subscription: {
//         subscriptionName: "Economy Plan",
//         endDate: "2025-11-30T23:59:59Z",
//       },
//     },
//     {
//       id: "3",
//       username: "Ravi Kumar",
//       phoneNumber: "+91 76543 21098",
//       category: "Carpentry",
//       areaName: "Whitefield",
//       city: "Bangalore",
//       pincode: "560066",
//       subscription: {
//         subscriptionName: "Platinum Plan",
//         leads: 50,
//       },
//     },
//   ];

//   // Static subscription plans
//   const subscriptionPlans = [
//     "all",
//     "Economy Plan",
//     "Gold Plan",
//     "Platinum Plan",
//   ];

//   // Format date to "DD MMM YYYY"
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-100 p-4">
//       <View className="space-y-6 pb-8">
//         {/* Header */}
//         <View className="space-y-4 flex-1 gap-2">
//           <View>
//             <Text className="text-2xl font-bold text-gray-900">
//               Technicians Management
//             </Text>
//             <Text className="text-gray-600 mt-1">
//               Manage and monitor all technicians in your network
//             </Text>
//           </View>
//           <TouchableOpacity
//             className="bg-green-500 rounded-xl w-auto p-3 flex-row items-center justify-center"
//             onPress={() => navigation.navigate("AddTechnician")}
//           >
//             <Feather name="plus" size={16} color="#ffffff" />
//             <Text className="text-white font-medium ml-2">Add Technician</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Search and Filter */}
//         <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
//           <View className="space-y-4">
//             <View className="relative">
//               <Feather
//                 name="search"
//                 size={20}
//                 color="#9ca3af"
//                 className="absolute left-3 top-1/2 -translate-y-1/2"
//               />
//               <TextInput
//                 placeholder="Search technicians by name or category..."
//                 value=""
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-gray-900"
//                 style={{ fontSize: 16 }}
//               />
//             </View>
//             <View className="flex-row items-center space-x-2">
//               <Feather name="filter" size={20} color="#9ca3af" />
//               <View className="flex-1 border border-gray-300 rounded-xl">
//                 <Picker
//                   selectedValue="all"
//                   style={{ height: 48, color: "#111827" }}
//                 >
//                   {subscriptionPlans.map((plan) => (
//                     <Picker.Item
//                       key={plan}
//                       label={plan === "all" ? "All Plans" : plan}
//                       value={plan}
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Technicians Table */}
//         <View className="bg-white rounded-2xl shadow-sm border border-gray-200">
//           <View className="w-full">
//             {/* Table Header */}
//             <View className="flex-row bg-gray-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
//               <Text className="w-[45%] text-xs font-medium text-gray-700">
//                 Technician
//               </Text>
//               <Text className="w-[35%] text-xs font-medium text-gray-700">
//                 Plan
//               </Text>
//               <Text className="w-[20%] text-xs font-medium text-gray-700 text-right">
//                 Action
//               </Text>
//             </View>

//             {/* Table Body */}
//             {fakeTechnicians.length === 0 ? (
//               <View className="py-12 items-center">
//                 <Feather name="users" size={48} color="#9ca3af" />
//                 <Text className="text-lg font-medium text-gray-900 mt-4">
//                   No technicians found
//                 </Text>
//               </View>
//             ) : (
//               fakeTechnicians.map((tech, index) => (
//                 <View
//                   key={tech.id}
//                   className={`flex-row px-4 py-4 ${
//                     index < fakeTechnicians.length - 1
//                       ? "border-b border-gray-200"
//                       : "rounded-b-lg"
//                   }`}
//                 >
//                   {/* Technician Info */}
//                   <View className="w-[45%] p-1">
//                     <Text className="text-xs font-semibold text-gray-900">
//                       {tech.username}
//                     </Text>
//                     <Text className="text-xs text-gray-700">
//                       {tech.phoneNumber}
//                     </Text>
//                     <Text className="text-xs text-gray-600">
//                       {tech.category}
//                     </Text>
//                     <Text className="text-[10px] text-gray-400">
//                       {`${tech.areaName}, ${tech.city}, ${tech.pincode}`}
//                     </Text>
//                   </View>

//                   {/* Plan Info */}
//                   <View className="w-[35%] justify-center">
//                     <Text className="text-xs text-gray-900 font-medium">
//                       {tech.subscription?.subscriptionName || "N/A"}
//                     </Text>
//                     <Text className="text-[10px] text-gray-500">
//                       {tech.subscription?.endDate
//                         ? formatDate(tech.subscription.endDate)
//                         : tech.subscription?.leads
//                         ? `${tech.subscription.leads} leads`
//                         : "N/A"}
//                     </Text>
//                   </View>

//                   {/* Action Buttons */}
//                   <View className="w-[20%] flex-row justify-end space-x-2 gap-2">
//                     <TouchableOpacity
//                       onPress={() => navigation.navigate("ViewTechnician", { tech })}
//                     >
//                       <Feather name="eye" size={18} color="#2563eb" />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                     onPress={() => navigation.navigate("EditTechnician", { tech })}
//                     >
//                       <Feather name="edit" size={16} color="#15803d" />
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               ))
//             )}
//           </View>

//           {/* Pagination (Static UI) */}
//           <View className="flex-row justify-center items-center space-x-2 py-4">
//             <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-xl opacity-50">
//               <Text className="text-gray-700">Previous</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="px-4 py-2 bg-indigo-600 rounded-xl">
//               <Text className="text-white">1</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-xl">
//               <Text className="text-gray-700">2</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-xl">
//               <Text className="text-gray-700">Next</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default TechniciansScreen;
