import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const Profile = () => {
  const [image, setImage] = useState(null);

  const [userDetails, setUserDetails] = useState({});

  return (
    <View style={styles.container}>
      <View style={styles.profilePicContainer}>
        <Avatar.Image
          source={
            image === null ? require("../assets/images.png") : { uri: image }
          }
          size={200}
        />
      </View>
      <View style={styles.profileDetailsContainer}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: "7%",
            justifyContent: "center",
          }}
        >
          <View style={styles.input}>
            <MaterialIcons name="person" size={25} color="green" />
            <TextInput
              style={styles.inputInside}
              value={"firstName"}
              editable={false}
            />
          </View>
          <View style={styles.input}>
            <MaterialIcons name="person" size={25} color="green" />
            <TextInput
              style={styles.inputInside}
              value={"lastName"}
              editable={false}
            />
          </View>
        </View>
        <View style={styles.inputCon}>
          <MaterialIcons name="email" size={25} color="green" />
          <TextInput style={styles.inputInside} value={"email"} />
        </View>
        <View style={styles.inputCon}>
          <MaterialIcons name="dialpad" size={25} color="green" />
          <TextInput style={styles.inputInside} value={"mobile"} />
        </View>
        <View style={styles.inputCon}>
          <MaterialIcons name="home" size={25} color="green" />
          <TextInput
            style={styles.inputInside}
            value={"address"}
            placeholder="Address"
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
    marginBottom: height / 10,
  },
  profilePicContainer: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileDetailsContainer: {
    width: "100%",
    height: "60%",
  },
  input: {
    flexDirection: "row",
    backgroundColor: "#F1F6FB",
    padding: 13,
    // paddingTop: 10,
    // paddingBottom: 100,
    margin: 15,
    marginTop: 0,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 0,
    borderColor: "3085E22",
    borderWidth: 1,
    width: "42%",
  },
  inputCon: {
    flexDirection: "row",
    backgroundColor: "#F1F6FB",
    padding: 13,
    // paddingTop: 10,
    // paddingBottom: 100,
    margin: 15,
    marginTop: 0,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 0,
    borderColor: "3085E22",
    borderWidth: 1,
  },
  inputInside: {
    paddingLeft: 10,
    color: "black",
  },
});
