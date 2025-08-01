import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global.css";
import Lohi from "./src/screens/Lohi";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Lohi">
      <Stack.Screen name="Lohi" component={Lohi} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}