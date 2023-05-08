import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import TabBar from "../components/TabBar";
//invoke navigation function. it will return a component
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        initialParams={{ icon: "home" }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Camera"
        component={Dashboard}
        initialParams={{ icon: "camera" }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
