import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { firebase } from "../global/firebase";
import AppLoader from "./AppLoader";
const { height, width } = Dimensions.get("window");

const Severity = ({ navigation }) => {
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getImageURL = async () => {
      setIsLoading(true);
      const imageRef = firebase.firestore().collection("severity").doc("s1");
      const imageDoc = await imageRef.get();
      const imageURL = imageDoc.data().sev_img3;
      setImageURL(imageURL);
      setIsLoading(false);
    };
    getImageURL();
  }, []);

  console.log(imageURL);

  const downloadImage = async () => {
    const storageRef = storage().refFromURL(imageURL);
    const url = await storageRef.getDownloadURL();
    return url;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageURL ? (
          <Image source={{ uri: imageURL }} style={styles.image} />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.txtContainer}>
        {imageURL && (
          <Text style={styles.textIdentification}>Severity Level: </Text>
        )}

        {imageURL && (
          <Text style={styles.textIdentification1}>Blister Stage</Text>
        )}
      </View>
      {isLoading ? <AppLoader /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 18,
  },
  imageContainer: {
    alignItems: "center",
    padding: "4%",
  },
  txtContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },

  textIdentification: {
    fontSize: 20,
  },
  textIdentification1: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Severity;
