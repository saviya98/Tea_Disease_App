import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Button,
  Image,
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
import { colors, parameters } from "../global/styles";
import { WebView } from "react-native-webview";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as geolib from "geolib";
import { firebase } from "../global/firebase";
// import db from '../db/firestore';

const DispersionPattern = () => {
  const [riskCal, setRiskCal] = useState([{}]);

  useEffect(() => {
    fetch("http://192.168.8.100:3009/risk")
      .then((res) => res.json())
      .then((riskCal) => {
        setRiskCal(riskCal);
        console.log(riskCal);
      });
  }, []);

  //get user permission to access device location data
  const checkPermission = async () => {
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if (hasPermission.status === "granted") {
      const permission = await askPermission();
      return permission;
    }
    return true;
  };

  const askPermission = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    return permission.status === "granted";
  };

  //get device's location data
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setLocation({ latitude, longitude });
    } catch (err) {
      // Handle the error here
    }
  };

  const [location, setLocation] = useState({});

  const _map = useRef(1);

  useEffect(() => {
    checkPermission();
    getLocation(), [];
  });

  //fucntion to get current location
  const useCurrentLocation = async () => {
    let current_location = await Location.getCurrentPositionAsync({});
    return current_location.coords;
  };

  const [current_location, setLocation2] = React.useState({
    latitude: 0,
    longitude: 0,
  });

  React.useEffect(() => {
    useCurrentLocation().then((coords) => {
      setLocation2(coords);
    });
  }, []);

  // save the risk to the firestore
  sendRisk = (risk_passed) => {
    const db = firebase.firestore();
    db.collection("blisterAround").doc("GW3R012XPiV1LVXXFR1q").update({
      risk: risk_passed,
    });
  };
  return (
    <>
      <View>
        {typeof riskCal.risk === "undefined" ? (
          <Text>Loading...</Text>
        ) : (
          riskCal.risk.map((risk, i) => {
            const myRiskVariable = risk; // Assigning the value of `risk` to a variable called `myRiskVariable`
            sendRisk(risk);
            return (
              <Text
                style={{
                  textAlign: "center",
                  color: "#6d597a",
                  fontSize: 25,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
                key={i}
              >
                Dispersion Risk Level : {risk}
              </Text>
            );
          })
        )}
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MapView
          //dispplay current user location
          ref={_map}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={false}
          followsUserLocation={true}
          zoomEnabled={false}
          rotateEnabled={false}
          region={{
            //focus the map for current user location
            latitude: current_location.latitude,
            longitude: current_location.longitude,
            // focus the map with 5km radius based, on current user location
            latitudeDelta: 2 / 111.32,
            longitudeDelta: 2 / (111.32 * Math.cos(current_location.latitude)),
          }}
        >
          <Marker
            //add a custom image to visulaize current user location
            coordinate={current_location}
            // image={require('../assets/icons8-standing-man-100_2_60.png')}
            image={require("../backend/dispersionForecast/plot2.png")}
            title={"Me"}
          />

          {/* {near_Locations.map((item, index) =>
                        // visulaize near identified locations on the map
                        <Marker
                            coordinate={item.geo}
                            key={index.toString()}
                            pinColor={item.color} />
                    )} */}
        </MapView>
      </View>
    </>
  );
};
// console.log()
export default DispersionPattern;

//styles for the relavent items
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 0,
    paddingTop: 0,
    // paddingTop:parameters.statusBarHeight
  },
  header: {
    backgroundColor: "#085E22",
    height: parameters.headerHeight,
    alignItems: "flex-start",
  },

  map: {
    height: 550,
    marginVertical: 0,
    width: SCREEN_WIDTH,
    paddingBottom: 0,
    paddingTop: 0,
  },
  text6: {
    fontSize: 15,
    color: colors.black,
    marginLeft: 105,
    marginRight: 5,
    marginTop: -8,
  },
  text4: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.white,
    marginLeft: 200,
    marginTop: -40,
  },

  icon1: {
    marginLeft: 10,
    marginTop: 5,
  },

  blisterAround: {
    width: 28,
    height: 14,
  },

  colorIndicatorContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingBottom: 10,
  },
  colorIndicator: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    borderRadius: 10,
    marginRight: 10,
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  colorIndicatorIcon: {
    width: 15,
    height: 15,
    marginRight: 2,
    marginLeft: -2,
  },
  colorIndicatorText: {
    fontWeight: "bold",
    color: "black",
    marginRight: -25,
  },
  colorIndicatorCol: {
    flexDirection: "column",
    alignItems: "center",
  },
});
