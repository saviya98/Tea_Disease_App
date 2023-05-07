import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import { firebase } from "../global/firebase";

const Severity = ({ navigation }) => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const getImageURL = async () => {
      const imageRef = firebase.firestore().collection("severity").doc("s1");
      const imageDoc = await imageRef.get();
      const imageURL = imageDoc.data().sev_img3;
      setImageURL(imageURL);
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
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
