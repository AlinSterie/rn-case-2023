import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BikesScreen from "./Bikes/BikesScreen";
import ParkingsScreen from "./Parkings/ParkingsScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Bikes" component={BikesScreen} />
      <Tab.Screen name="Parkings" component={ParkingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
