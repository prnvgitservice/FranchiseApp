import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Category {
  _id: string;
  category_name: string;
  category_image: string;
  status: number;
}

const bgColors = [
  'bg-red-100', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100',
  'bg-purple-100', 'bg-pink-100', 'bg-indigo-100', 'bg-emerald-100', 'bg-orange-100'
];

const getRandomBgColor = (): string => {
  const i = Math.floor(Math.random() * bgColors.length);
  return bgColors[i];
};

// Provided category data
const categories: Category[] = [
  {
    "_id": "6864fbee0fdacf74e69ddda2",
    "category_name": "Generator Repair & Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/d16e6872dbc7db7a73102d0b38ab89a4.svg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69ddda1",
    "category_name": "Dishwasher Repair & Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/1c47c06ac2e293c09fa0fafa023c92de.svg",
    "status": 1
  },
  {
    "_id": "6864fbee0fdacf74e69ddda3",
    "category_name": "Fabricator Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/b0526ec41e6690fb0ef6df2c7501c681.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69ddda4",
    "category_name": "Laundry Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/ce1b3d1615a41ecb0df253061b48b8aa.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69ddda5",
    "category_name": "Sanitization Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/63625746483df02c05df565d30b01403.svg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69ddda6",
    "category_name": "Ambulance Service",
    "category_image": "https://prnvservices.com/uploads/category_images/images/6636f98426a9ebaba80ac9b2014c667d.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69ddda7",
    "category_name": "Mobile Point Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/d2a5308b7096bb44855427b3232a29f7.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69ddda8",
    "category_name": "Event Organizer Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/d1afbe66aa0ee99fdbcb5d4418cb3b7d.svg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69ddda9",
    "category_name": "Nursing Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/79eb8c581a2930e188395abf75b9f660.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddaa",
    "category_name": "Water Dispenser Repair & Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/50e728ba47aaa82efef28a501e7ea5c9.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddab",
    "category_name": "Home Theatre Repair & Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/70e46de76a5b10e38ab1b437a10a8aa2.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddac",
    "category_name": "Security System & Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/cbc0a4226cb78842f7435d42609a6d4f.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddad",
    "category_name": "Maid Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/df1914be0a5a703cdf00775285ccbb1f.jpg",
    "status": 1
  },
  {
    "_id": "6864fbee0fdacf74e69dddae",
    "category_name": "Scrap Dealers",
    "category_image": "https://prnvservices.com/uploads/category_images/images/ce442c81a06da6877f661e6c362373aa.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddaf",
    "category_name": "Car Repair & Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/f3ef7820d6c6eea3c541c7962433b372.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb0",
    "category_name": "Babysitting Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/4fd9900bf79188fd8d2819ac0dc04907.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb1",
    "category_name": "Photography & Videography Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/355c71946db22cbd5439140ca9e3173f.svg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb2",
    "category_name": "Doctor Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/2d3803dc493ce322f1188e5e211ad1eb.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb3",
    "category_name": "Restaurant",
    "category_image": "https://prnvservices.com/uploads/category_images/images/23bcc54d694bd6c2e7188f2238d2348d.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb4",
    "category_name": "Rental Car Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/29d06c9ddf4a6c15d947fdac67c3a2b4.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb5",
    "category_name": "Rental House Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/30cdc76d10f612e4ae39baedb6789f77.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb6",
    "category_name": "Supermarket Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/b88e259303b22a014295c5f7782619da.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb7",
    "category_name": "Vegetable Shop",
    "category_image": "https://prnvservices.com/uploads/category_images/images/d6f20dc12f2cdf08b474d757119c8e00.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb8",
    "category_name": "Gas Pipe Installation Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/432dacd9197c74def34537bffe2b1a09.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddb9",
    "category_name": "Tuitions/Tutorial Services",
    "category_image": "https://prnvservices.com/uploads/category_images/images/e54767892da264f4181b6ebf185acfa8.svg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddba",
    "category_name": "Real Estate",
    "category_image": "https://prnvservices.com/uploads/category_images/images/56312c08c1bed381adb970def32b5f1a.jpg",
    "status": 1
  },
  {
    "_id": "6864fbee0fdacf74e69dddbb",
    "category_name": "Chicken & Mutton",
    "category_image": "https://prnvservices.com/uploads/category_images/images/2fea5d38425288eaf3c8cd97f26a5f99.jpg",
    "status": 0
  },
  {
    "_id": "6864fbee0fdacf74e69dddbc",
    "category_name": "Kirana Shops",
    "category_image": "https://prnvservices.com/uploads/category_images/images/3d571094a09dc260cc33a8feea40ed77.jpg",
    "status": 0
  }
];

const CategoryScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView className="flex-1 bg-white px-4 py-4">
      <View className="max-w-screen-xl mx-auto">
        <Text className="text-xl font-bold text-gray-900 mb-4 text-left">
          Most Popular Categories
        </Text>
        <View className="flex-row flex-wrap justify-between gap-4">
          {categories.filter(category => category.status === 1).map((category) => {
            const bgColor = getRandomBgColor();
            return (
              <TouchableOpacity
                key={category._id}
                className="w-[47%] bg-white rounded-lg border border-gray-200 p-4 items-center"
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Technicians', { categoryId: category._id })}
              >
                <View
                  className={`w-20 h-20 ${bgColor} rounded-full items-center justify-center mb-4 overflow-hidden`}
                >
                  <Image
                    source={{ uri: category.category_image }}
                    alt={category.category_name}
                    className="w-12 h-12"
                    style={styles.categoryImage}
                  />
                </View>
                <Text className="text-sm font-medium text-gray-700 text-center leading-tight">
                  {category.category_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="mt-7">
          <Text className="text-xl font-bold text-gray-900 mb-4 text-left">
            Upcoming Categories
          </Text>
          <View className="flex-row flex-wrap justify-between gap-4">
            {categories.filter(category => category.status === 0).map((category) => {
              const bgColor = getRandomBgColor();
              return (
                <View
                  key={category._id}
                  className="w-[47%] bg-white rounded-lg border border-gray-200 p-4 items-center"
                  style={styles.categoryCard}
                >
                  <View
                    className={`w-20 h-20 ${bgColor} rounded-full items-center justify-center mb-4 overflow-hidden`}
                  >
                    <Image
                      source={{ uri: category.category_image }}
                      alt={category.category_name}
                      className="w-12 h-12"
                      style={styles.categoryImage}
                    />
                  </View>
                  <Text className="text-sm font-medium text-gray-700 text-center leading-tight">
                    {category.category_name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryImage: {
    resizeMode: 'contain',
  },
});

export default CategoryScreen;
// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { getAllCategories } from '../api/apiMethods';

// interface Category {
//   _id: string;
//   category_name: string;
//   category_image: string;
//   status: number;
// }

// const bgColors = [
//   'bg-red-100', 'bg-green-100', 'bg-blue-100', 'bg-yellow-100',
//   'bg-purple-100', 'bg-pink-100', 'bg-indigo-100', 'bg-emerald-100', 'bg-orange-100'
// ];

// const getRandomBgColor = (): string => {
//   const i = Math.floor(Math.random() * bgColors.length);
//   return bgColors[i];
// };

// const CategoryScreen: React.FC = () => {
//   const navigation = useNavigation<any>();
//   const [allCategories, setAllCategories] = useState<Category[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = async () => {
//     try {
//       const response = await getAllCategories();
//       if (response.success === true && Array.isArray(response.data)) {
//         setAllCategories(response.data);
//       } else {
//         setError('Invalid response format');
//       }
//     } catch (err: any) {
//       setError(err?.message || 'Failed to fetch categories');
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <ScrollView className="flex-1 bg-white px-4 py-4">
//       <View className="max-w-screen-xl mx-auto">
//         <Text className="text-xl font-bold text-gray-900 mb-4 text-left">
//           Most Popular Categories
//         </Text>
//         <View className="flex-row flex-wrap justify-between gap-4">
//           {allCategories.filter(category => category?.status === 1).map((category, index) => {
//             const bgColor = getRandomBgColor();
//             return (
//               <TouchableOpacity
//                 key={category._id}
//                 className="w-[47%] bg-white rounded-lg border border-gray-200 p-4 items-center"
//                 style={styles.categoryCard}
//                 onPress={() => navigation.navigate('Technicians', { categoryId: category._id })}
//               >
//                 <View
//                   className={`w-20 h-20 ${bgColor} rounded-full items-center justify-center mb-4 overflow-hidden`}
//                 >
//                   <Image
//                     source={{ uri: category.category_image }}
//                     alt={category.category_name}
//                     className="w-12 h-12"
//                     style={styles.categoryImage}
//                   />
//                 </View>
//                 <Text className="text-sm font-medium text-gray-700 text-center leading-tight">
//                   {category.category_name}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <View className="mt-7">
//           <Text className="text-xl font-bold text-gray-900 mb-4 text-left">
//             Upcoming Categories
//           </Text>
//           <View className="flex-row flex-wrap justify-between gap-4">
//             {allCategories.filter(category => category?.status === 0).map((category, index) => {
//               const bgColor = getRandomBgColor();
//               return (
//                 <View
//                   key={category._id}
//                   className="w-[47%] bg-white rounded-lg border border-gray-200 p-4 items-center"
//                   style={styles.categoryCard}
//                 >
//                   <View
//                     className={`w-20 h-20 ${bgColor} rounded-full items-center justify-center mb-4 overflow-hidden`}
//                   >
//                     <Image
//                       source={{ uri: category.category_image }}
//                       alt={category.category_name}
//                       className="w-12 h-12"
//                       style={styles.categoryImage}
//                     />
//                   </View>
//                   <Text className="text-sm font-medium text-gray-700 text-center leading-tight">
//                     {category.category_name}
//                   </Text>
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   categoryCard: {
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   categoryImage: {
//     resizeMode: 'contain',
//   },
// });

// export default CategoryScreen;