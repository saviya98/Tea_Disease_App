import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { firebase } from "../global/firebase";
import BlisterSampleResult from "./BlisterSampleResult";
const { height, width } = Dimensions.get("window");

const BlisterSample = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [date, setDate] = useState(null);

  const [blisterSampleData, setBlisterSampleData] = useState(null);
  const [translucent, setTranslucent] = useState(null);
  const [blisterUnder, setBlisterUnder] = useState(null);
  const [blisterUpper, setBlisterUpper] = useState(null);
  const [necro, setNecro] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        name: "test.jpg",
        type: "image/jpeg",
      });
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      axios
        .post("http://192.168.8.100:3009/geo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          setImage(result.assets[0].uri);
          // console.log("Response ",response);
          setGeoData(response.data);
          setLatitude(response.data.lat[0]);
          setLongitude(response.data.lon[0]);
          setDate(response.data.date[0]);

          console.log(response.data.lat[0]);
          console.log(response.data.lon[0]);
          console.log(response.data.date[0]);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .post("http://192.168.8.100:3009/blisterSample", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response2) => {
          setImage(result.assets[0].uri);
          // console.log("Response ",response);
          setBlisterSampleData(response2.data);
          setTranslucent(response2.data.Translucent[0]);
          setBlisterUnder(response2.data.BlisterUnder[0]);
          setNecro(response2.data.Necro[0]);
          setBlisterUpper(response2.data.BlisterUpper[0]);

          console.log("Translucent", response2.data.Translucent[0]);
          console.log(response2.data.BlisterUnder[0]);
          console.log(response2.data.Necro[0]);
        })
        .catch((error) => {
          console.log(error);
        });

      // Create a reference to the Firebase Storage bucket
      const storageRef = firebase
        .storage()
        .ref()
        .child("SeveritySample/" + image.split("/").pop());

      // Upload the image to Firebase Storage
      const responseUrl = await fetch(image);
      const blob = await responseUrl.blob();
      const snapshot = await storageRef.put(blob);

      // Create a reference to the Firestore collection
      const collectionRef1 = firebase.firestore().collection("SeveritySample");
      console.log("HIII1");
      // Add the image metadata to the Firestore collection
      collectionRef1
        .add({
          image: await snapshot.ref.getDownloadURL(),
          date: date,
          geo: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
          sampleData: {
            Translucent: translucent + "%",
            Blister_Upper: blisterUpper + "%",
            Blister_Under: blisterUnder + "%",
            Necro: necro + "%",
          },
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      console.log("HIII2");
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  };

  if (image && translucent && blisterUpper && blisterUnder && necro) {
    return (
      <BlisterSampleResult
        image={image}
        translucent={translucent}
        necro={necro}
        blisterUpper={blisterUpper}
        blisterUnder={blisterUnder}
      />
    );
  } else if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  } else {
    return (
      <View style={styles.container}>
        {/* <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 30 ,marginLeft:10, fontWeight: 'bold'}}>
    Please use the quadrant shape object like the below image. 
  </Text>     */}

        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/IMG_3875.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => pickImage()} style={styles.btn}>
            <Text style={styles.btnTxt}>Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage()} style={styles.btn}>
            <Text style={styles.btnTxt}>Upload a Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default BlisterSample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    marginBottom: height / 10,
  },
  imageContainer: {
    width: "100%",
    height: "80%",
    borderRadius: 9,
  },
  btnContainer: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 9,
  },
  btn: {
    alignSelf: "center",
    borderColor: "#085E22",
    borderWidth: 1,
    borderRadius: 9,
  },
  btnTxt: { padding: "3%", fontWeight: "bold", color: "#085E22", fontSize: 19 },
});
