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
import { Camera, CameraType } from "expo-camera";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoader from "./AppLoader";

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

  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [imageCapture, setImageCapture] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    setIsLoading(true);

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
        .post("http://192.168.1.21:3009/geo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (response) => {
          setImage(result.assets[0].uri);
          console.log("Response ", response.data);
          setGeoData(response.data);
          setLatitude(response.data.lat[0]);
          setLongitude(response.data.lon[0]);
          setDate(response.data.date[0]);

          console.log(response.data.lat[0]);
          console.log(response.data.lon[0]);
          console.log(response.data.date[0]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
      setIsLoading(true);

      axios
        .post("http://192.168.1.21:3009/blisterSample", formData, {
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
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
      setIsLoading(true);

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
          setIsLoading(false);

          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          setIsLoading(false);

          console.error("Error adding document: ", error);
        });
      console.log("HIII2");
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
        if (!image) {
          const formData = new FormData();
          formData.append("image", {
            uri: data.uri,
            name: "test.jpg",
            type: "image/jpeg",
          });
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          axios
            .post("http://192.168.1.21:3009/geo", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(async (response) => {
              console.log("Response ", response.data);
              setGeoData(response.data);
              setLatitude(response.data.lat[0]);
              setLongitude(response.data.lon[0]);
              setDate(response.data.date[0]);

              console.log(response.data.lat[0]);
              console.log(response.data.lon[0]);
              console.log(response.data.date[0]);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
          setIsLoading(true);

          axios
            .post("http://192.168.1.21:3009/blisterSample", formData, {
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
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
          setIsLoading(true);

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
          const collectionRef1 = firebase
            .firestore()
            .collection("SeveritySample");
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
              setIsLoading(false);

              console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
              setIsLoading(false);

              console.error("Error adding document: ", error);
            });
          console.log("HIII2");
          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (image && translucent && blisterUpper && blisterUnder && necro) {
    return (
      <View style={styles.containerRes}>
        <BlisterSampleResult
          image={image}
          translucent={translucent}
          necro={necro}
          blisterUpper={blisterUpper}
          blisterUnder={blisterUnder}
        />
      </View>
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
          {isShow ? (
            <View style={styles.cameraContainer}>
              <Camera
                style={styles.camera}
                type={type}
                ref={cameraRef}
                flashMode={flash}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 30,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setType(
                        type === CameraType.back
                          ? CameraType.front
                          : CameraType.back
                      );
                    }}
                  >
                    <MaterialIcons name="360" size={30} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      setFlash(
                        flash === Camera.Constants.FlashMode.off
                          ? Camera.Constants.FlashMode.on
                          : Camera.Constants.FlashMode.off
                      )
                    }
                  >
                    <MaterialIcons
                      name="flash-on"
                      color={
                        flash === Camera.Constants.FlashMode.off
                          ? "gray"
                          : "#fff"
                      }
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </Camera>

              <View style={styles.controls}>
                {image ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 50,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setImage(null)}
                      style={{ flexDirection: "row" }}
                    >
                      <MaterialIcons
                        name="repeat"
                        onPress={() => setImage(null)}
                        size={20}
                        color={"white"}
                      />
                      <Text style={{ color: "white" }}>Re-Take</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={takePicture}
                    icon="camera"
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <MaterialIcons name="camera" size={20} color={"white"} />
                    <Text style={{ color: "white" }}>Take a picture</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <Image
              source={require("../assets/instructions.jpeg")}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => setIsShow(true)} style={styles.btn}>
            <Text style={styles.btnTxt}>Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pickImage()} style={styles.btn}>
            <Text style={styles.btnTxt}>Upload a Photo</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? <AppLoader /> : null}
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
  containerRes: {
    flex: 1,
    paddingTop: height / 60,
    marginBottom: height / 10,
  },
  imageContainer: {
    width: "100%",
    height: "80%",
    borderRadius: 9,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  image: {
    width: "97%",
    height: "80%",
    borderRadius: 9,
  },
  btn: {
    alignSelf: "center",
    borderColor: "#085E22",
    borderWidth: 1,
    borderRadius: 9,
  },
  btnTxt: { padding: "3%", fontWeight: "bold", color: "#085E22", fontSize: 19 },
  cameraContainer: {
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 8,
    width: "100%",
    height: "100%",
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  controls: {
    flex: 0.7,
  },
  button: {
    height: "8%",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
