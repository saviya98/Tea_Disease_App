import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import TabBar from "../components/TabBar";
import OpenCamera from "../components/OpenCamera";
import Profile from "../components/Profile";
import StartPageNavigation from "./StartPageNavigation";
//invoke navigation function. it will return a component
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={StartPageNavigation}
        initialParams={{ icon: "home" }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Menu"
        component={Dashboard}
        initialParams={{ icon: "dashboard" }}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Camera"
        component={OpenCamera}
        initialParams={{ icon: "camera" }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        initialParams={{ icon: "user" }}
        options={{
          title: "Profile",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#085E22" },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
