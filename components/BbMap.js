import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Button,
  Image,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

import { colors, parameters } from "../global/styles";
import { StatusBar } from "expo-status-bar";
import { blisterAround } from "../global/data";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import * as geolib from "geolib";
import { firebase } from "../global/firebase";
import { Avatar } from "react-native-paper";

const { height, width } = Dimensions.get("window");
const BbMap = ({ navigation }) => {
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

  //console.log(current_location)
  //variables to store data from firebase
  const [blister_locations, setUsers_blocations] = useState([]);
  const todoRef = firebase.firestore().collection("blisterC");

  //useEffect hook is used to fetch data from the Firestore collection and update the state variable,
  //blister_locations when the component mounts or updates
  useEffect(() => {
    const unsubscribe = todoRef.onSnapshot((querySnapshot) => {
      const blister_locations = [];
      querySnapshot.forEach((doc) => {
        const { color, geo, risk, plumeImage } = doc.data();
        blister_locations.push({
          //fields need to be extracted from the firestore collection
          color,
          geo,
          risk,
          plumeImage,
        });
      });
      setUsers_blocations(blister_locations); //update the blister_locations state variable
    });

    return () => {
      // unsubscribes the listener from the Firestore collection when the component unmounts or updates
      unsubscribe();
    };
  }, []);

  const mapRef = useRef(null);

  const getImageSize = (zoom) => {
    // Set the image size based on the zoom level
    if (zoom < 10) {
      return { width: 50, height: 50 };
    } else if (zoom < 15) {
      return { width: 75, height: 75 };
    } else {
      return { width: 100, height: 100 };
    }
  };

  //get locations which are in 5 radius of current location
  const filteredLocations = blister_locations.filter((item) => {
    const distance = geolib.getDistance(current_location, item.geo);
    return distance <= 5000;
  });
  //console.log(filteredLocations);

  const near_Locations = filteredLocations;

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markerImageSize = 5000; // adjust this to match the radius of the marker in meters

  // calculate the size of the marker image based on the zoom level of the map
  const imageWidth = markerImageSize / Math.pow(2, region.zoom);
  const imageHeight = imageWidth;

  // calculate the center offset to center the image over the marker position
  const centerOffsetX = imageWidth / 2;
  const centerOffsetY = imageHeight / 2;

  //console.log(current_location);

  return (
    <View>
      {/* menu bar */}
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={false}
            followsUserLocation={true}
            zoomEnabled={false}
            rotateEnabled={false}
            region={{
              latitude: current_location.latitude,
              longitude: current_location.longitude,
              latitudeDelta: 2 / 111.32,
              longitudeDelta:
                2 / (111.32 * Math.cos(current_location.latitude)),
            }}
          >
            <Marker
              coordinate={current_location}
              image={require("../assets/icons8-standing-man-100_2_60.png")}
              title={"Me"}
            />

            {near_Locations.map((item, index) => (
              // if(item.geo)

              <Marker
                coordinate={item.geo}
                key={index.toString()}
                pinColor={item.color}
                //Image source={{ uri: imageURL }} style={{ width: 200, height: 200 }}
                //image={require('../backend/dispersionForecast/plot2.png')}
                image={{ uri: item.plumeImage }}
                //imageStyle={mapRef.current ? getImageSize(mapRef.current.getZoom()) : {}}
              >
                <Callout>
                  <View style={{ backgroundColor: "white", padding: 10 }}>
                    <Text>{item.risk}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Blister Emergence Date")}
        style={{
          alignSelf: "center",
          marginTop: "125%",
          borderColor: "#085E22",
          borderWidth: 1,
          borderRadius: 9,
        }}
      >
        <Text style={{ padding: "2%", fontWeight: "bold", color: "#085E22" }}>
          Blister Emergence Date
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BbMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  header: {
    backgroundColor: "#085E22",
    height: parameters.headerHeight,
    alignItems: "flex-start",
  },

  map: {
    height: 1270,
    marginVertical: 0,
    width: SCREEN_WIDTH,
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
    //   marginBottom:-30,
    marginTop: -40,
  },

  icon1: { marginLeft: 10, marginTop: 5 },

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
