import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import Cultivar from "./Cultivar";
import ImageViewer from "./ImageViewer";

const PlaceholderImage = require("../assets/upload-image.png");

const Blister_Identification = ({ navigation }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);

  const [cultivarData, setCultivarData] = useState(null);
  const [cultivar, setCultivar] = useState(null);

  const [blisterData, setBlisterData] = useState(null);
  const [blister, setBlister] = useState(null);

  const [isImageUploaded, setIsImageUploaded] = useState(false);

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
      axios
        .post("http://192.168.1.7:3009/getCultivar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          setImage(result.assets[0].uri);
          console.log("Response ---- ", response.data);
          setCultivarData(response.data);
          setCultivar(response.data.Cultivar[0]);
          setIsImageUploaded(true);

          console.log("Cultivar -> ", response.data.Cultivar[0]);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .post("http://192.168.1.7:3009/getBlister", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response2) => {
          setImage(result.assets[0].uri);
          console.log("Response ---- ", response2.data);
          setBlisterData(response2.data);
          setBlister(response2.data.Blister[0]);

          console.log("Blister -> ", response2.data.Blister[0]);
        })
        .catch((error) => {
          console.log(error);
        });

      //  // Create a reference to the Firebase Storage bucket
      //  const storageRef = firebase.storage().ref().child('cultivarImage/' + image.split('/').pop());

      //  // Upload the image to Firebase Storage
      //  const responseUrl = await fetch(image);
      //  const blob = await responseUrl.blob();
      //  const snapshot = await storageRef.put(blob);

      //  // Create a reference to the Firestore collection
      //  const collectionRef1 = firebase.firestore().collection('cultivar');

      //  // Add the image metadata to the Firestore collection
      //  collectionRef1.add({
      //    image: await snapshot.ref.getDownloadURL(),
      //    cultivar: cultivar
      //  }).then((docRef) => {
      //    console.log("Document written with ID: ", docRef.id);
      //  }).catch((error) => {
      //    console.error("Error adding document: ", error);
      //  });
    }

    function sendPushNotification(pushToken) {
      console.log("SEND");
      let response = fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: pushToken,
          sound: "default",
          title: "Alert",
          body: "You are in blister identified area.",
        }),
      });
    }

    const push_tokens = [
      "ExponentPushToken[9DEVmGIEsRztlViD5ZXTyT]",
      "ExponentPushToken[3iYa_YCOJyJO7TcPOrWXGS]",
    ]; // ['ExponentPushToken[zm25DyHvYiKbj5-P_tb267]','ExponentPushToken[0Dk-EjCaeBjY5ipmnGYs3-]'];
    sendPushNotification(push_tokens);
  };
  function sendPushNotification(pushToken) {
    console.log("SEND");
    let response = fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        sound: "default",
        title: "Alert",
        body: "You are in blister identified area.",
      }),
    });
  }

  const push_tokens = [
    "ExponentPushToken[9DEVmGIEsRztlViD5ZXTyT]",
    "ExponentPushToken[3iYa_YCOJyJO7TcPOrWXGS]",
  ]; // ['ExponentPushToken[zm25DyHvYiKbj5-P_tb267]','ExponentPushToken[0Dk-EjCaeBjY5ipmnGYs3-]'];
  sendPushNotification(push_tokens);

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerText}>
        <Text style={styles.header}>Blister Identification View</Text>
      </View>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={image}
        />
      </View>
      {/* <View style={styles.footerContainer}> */}
      {/* <Button
            title="Take a Picture"
            onPress={() => pickImage()}
          />
          <View style={{ height: 20 }} />
          <Button
            title="Upload a Picture"
            onPress={() => pickImage()}
          /> */}
      {/* </View>  */}
      <View style={styles.buttonContainer}>
        <Button
          title="Take a Picture"
          onPress={() => pickImage()}
          style={styles.button}
        />
        <Button
          title="Upload a Picture"
          onPress={() => pickImage()}
          style={styles.button}
        />
      </View>
      <View >
        {image && (
          <Text >
            Blister: Blister Identified
          </Text>
        )}
      </View>

      <View style={{ alignItems: "center", marginLeft: 40}}>
        {image && (
          <Text>
            Cultivar: {cultivar}
          </Text>
        )}
      </View>
      <View>
      {isImageUploaded ? (
        <View><Button onPress={() => navigation.navigate('Severity Symptom Identification')} title='Severity Symptom Identification'></Button><Button onPress={() => navigation.navigate('Dispersion Pattern')} title='Blister Dispersion'></Button></View>
      ) : (
        <View><Button onPress={() => navigation.navigate('Severity Symptom Identification')} title='Severity Symptom Identification'></Button><Button onPress={() => navigation.navigate('Dispersion Pattern')} title='Blister Dispersion'></Button></View>
     
      )}
    </View>
    </View>

    // <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>
    //     <View  style={styles.headerText}>
    //     <Text style={styles.header} >Blister Identification View</Text>
    //     </View>
    //     <View>

    //     <View style={{ alignItems: 'center', marginTop: 15 }}>
    //     {image && <Image source={{ uri: image }} style={{ width: 300, height: 300, marginTop:50, }} />}
    // </View>

    // <Image source={image} />

    /* <View style={{  justifyContent: 'space-between', paddingHorizontal: 60 ,marginTop: 50 }}>
            <Button title='Take a Picture' onPress={() => pickImage()} style={{ width: '40%', marginBottom: 20 }} />
            <View style={{ height: 20 }} />
            <Button title='Upload a Picture' onPress={() => pickImage()} style={{ width: '40%' }} />
        </View>

      
            </View>
            

            <Button onPress={() => navigation.navigate('Severity Symptom Identification')} title='Severity Symptom Identification'></Button>
            <Button onPress={() => navigation.navigate('Dispersion Pattern')} title='Blister Dispersion'></Button>
            <Button onPress={() => navigation.navigate('Cultivar')} title='Blister Identification' style={{ width: '40%', marginBottom: 20 }} ></Button>
        </View> */
  );
};
const styles = StyleSheet.create({
  header: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    color: COLORS.primary,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    color: COLORS.primary,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    paddingTop: 20,
    marginBottom:20
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFD700",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
export default Blister_Identification;
