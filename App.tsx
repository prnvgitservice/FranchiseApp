import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}