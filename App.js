import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-native";
import { firebase } from "./global/firebase";
import Header from "./components/Header";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";

import TabNavigator from "./Navigation/TabNavigator";

import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //handle use state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="Login" />,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name="Registration" />,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="tabNavigator" //"Dashboard"
        component={TabNavigator}
        options={{
          headerTitle: () => <Header name="Dashboard" />,
          headerStyle: {
            height: 70,
            // borderBottomLeftradius:50,
            // borderBottomRightradius:50,
            backgroundColor: "#00e4d0",
            shadowColor: "#000",
            elevation: 25,
          },
          headerRight: () => (
            <Button title="Logout" onPress={() => firebase.auth().signOut()} />
          ),
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
