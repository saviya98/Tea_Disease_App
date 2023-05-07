import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

import { colors, parameters } from "../global/styles";
import { StatusBar } from "expo-status-bar";
import { blisterAround } from "../global/data";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as geolib from "geolib";

//const markerIcon = require('../../assets/currentUser_new.png');

const BB_Cultivar_identification = () => {};

export default BB_Cultivar_identification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
  header: {
    backgroundColor: "#085E22",
    height: parameters.headerHeight,
    alignItems: "flex-start",
  },
});
