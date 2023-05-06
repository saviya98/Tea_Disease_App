import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ImageBackground,
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

const ButtonDetails = [
  {
    id: 1,
    title: "Blister Identification",
    location: "Blister Identification",
    image: require("../assets/identi.jpg"),
  },
  {
    id: 2,
    title: "Blister identified near locations",
    location: "Blister Map(Near locations)",
  },
  {
    id: 3,
    title: "Blister Risk Assessment",
    location: "Blister Risk Map",
  },
  {
    id: 4,
    title: "Identified all Blister location",
    location: "Blister Map",
  },
  {
    id: 5,
    title: "Blister Sample Count",
    location: "Blister Sample Count",
  },
];

const { height, width } = Dimensions.get("window");
const CardComponent = ({ title, navigation, image, location, id }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(location)}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.cardContent} key={id}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const [imageURL, setImageURL] = useState("");

  const renderItem = ({ item }) => (
    <CardComponent
      title={item.title}
      location={item.location}
      navigation={navigation}
      image={item.image}
      id={item.id}
    />
  );

  useEffect(() => {
    const getImageURL = async () => {
      const imageRef = firebase
        .firestore()
        .collection("cultivar")
        .doc("xan5u18u79z111E07kDZ");
      const imageDoc = await imageRef.get();
      const imageURL = imageDoc.data().image;
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
    <View style={styles.container}>
      <FlatList
        data={ButtonDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        // numColumns={2}
        // columnWrapperStyle={{ justifyContent: "space-between" }}
        style={styles.homeList}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fonySize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },

  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    fonySize: 20,
    backgroundColor: "#026efd",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  homeList: {
    marginBottom: height / 8,
  },
  cardContent: {
    width: width,
    height: height / 8,
    marginTop: height / 45,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 25,
    color: "white",
  },

  image: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 9,
  },
  card: {
    borderRadius: 9,
  },
});
