import React, { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "../global/firebase";
import HomeScreen from "./Home";
import BbDateScreen from "./BbDate";
import DispersionPatternScreen from "./DispersionPattern";
import BbMapScreen from "./BbMap";
import BlisterMapAllScreen from "./Blister_Map_All";
import BlisterMapNearScreen from "./Blister_Map_Near";
import * as Notifications from "expo-notifications";
import BlisterIdentificationScreen from "./Blister_Identification";
import SeverityScreen from "./Severity";

import BlisterSampleScreen from "./BlisterSample";
import CultivarScreen from "./Cultivar";

const Stack = createStackNavigator();

const headerStyle = {
  height: 100,
  backgroundColor: "#085E22",
  shadowColor: "#000",
  elevation: 25,
};

console.disableYellowBox = true;

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    try {
      // Get the token that uniquely identifies this device
      const tokenObject = await Notifications.getExpoPushTokenAsync();
      const token = tokenObject.data;
      console.log("Token:", token);
      // save the token to Firebase Firestore
      const currentUser = firebase.auth().currentUser;
      const db = firebase.firestore();
      db.collection("Users").doc(currentUser.uid).update({
        push_token: token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setCurrentUser(firebase.auth().currentUser);
      await registerForPushNotificationsAsync();
    };
    fetchCurrentUser();
  }, []);

  // sendPushNotification = (pushToken) => {
  //   console.log("SEND")
  //   let response = fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       to: pushToken,
  //       sound: 'default',
  //       title: 'Alert',
  //       body: 'You are in blister identified area.'
  //     })
  //   });
  // };

  // const push_tokens = ['ExponentPushToken[9DEVmGIEsRztlViD5ZXTyT]','ExponentPushToken[3iYa_YCOJyJO7TcPOrWXGS]']// ['ExponentPushToken[zm25DyHvYiKbj5-P_tb267]','ExponentPushToken[0Dk-EjCaeBjY5ipmnGYs3-]'];
  // this.sendPushNotification(push_tokens)

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle,
          headerTintColor: "white",
          headerRight: () => (
            <Button title="Logout" onPress={() => firebase.auth().signOut()} />
          ),
        }}
      />
      <Stack.Screen
        name="Blister Emergence Date"
        component={BbDateScreen}
        options={{ headerStyle }}
      />
      <Stack.Screen
        name="Dispersion Pattern"
        component={DispersionPatternScreen}
        options={{ headerStyle }}
      />
      <Stack.Screen
        name="Blister Risk Map"
        component={BbMapScreen}
        options={{ headerStyle }}
      />
      <Stack.Screen
        name="Blister Map"
        component={BlisterMapAllScreen}
        options={{ headerStyle }}
      />
      <Stack.Screen
        name="Blister Map(Near locations)"
        component={BlisterMapNearScreen}
        options={{ headerStyle }}
      />
      <Stack.Screen
        name="Blister Identification"
        component={BlisterIdentificationScreen}
        options={{ headerStyle }}
      />
      <Stack.Screen
        name="Severity Symptom Identification"
        component={SeverityScreen}
        options={{ headerStyle }}
      />
      <Stack.Screen
        name="Blister Sample Count"
        component={BlisterSampleScreen}
        options={{ headerStyle }}
      />
      <Stack.Screen
        name="Cultivar"
        component={CultivarScreen}
        options={{ headerStyle }}
      />
    </Stack.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 0,
  },
});
