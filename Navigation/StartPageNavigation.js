import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartPage from "../components/StartPage";
import Dashboard from "../components/Dashboard";
import { firebase } from "../global/firebase";

const Stack = createStackNavigator();

const StartPageNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="startPage"
        component={StartPage}
        options={{
          title: "Home",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#085E22" },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logout}
              onPress={() => firebase.auth().signOut()}
            >
              <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Dash"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StartPageNavigation;

const styles = StyleSheet.create({});
