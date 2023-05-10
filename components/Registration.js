import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../global/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Button } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const Registration = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const registerUser = async (
    email,
    password,
    firstName,
    lastName,
    mobile,
    address
  ) => {
    try {
      // await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/loginbac.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.loginform}>
        {/* <View style={styles.loingImg}>
          <Avatar.Image
            source={require("../assets/logo.png")}
            style={{ backgroundColor: "white" }}
            size={200}
          />
        </View> */}

        <View style={styles.textInputContainer}>
          <View style={styles.regTag}>
            <Text style={styles.regTagText}>Register Here</Text>
          </View>
          <View style={styles.input}>
            <MaterialIcons name="person" size={25} color="green" />
            <TextInput
              style={styles.inputInside}
              onChangeText={setFirstName}
              value={firstName}
              placeholder="First Name"
            />
          </View>
          <View style={styles.input}>
            <MaterialIcons name="person" size={25} color="green" />
            <TextInput
              style={styles.inputInside}
              onChangeText={setLastName}
              value={lastName}
              placeholder="Last Name"
            />
          </View>
          <View style={styles.input}>
            <MaterialIcons name="email" size={25} color="green" />
            <TextInput
              style={styles.inputInside}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
              inputMode="email"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.input}>
            <MaterialIcons name="dialpad" size={25} color="green" />
            <TextInput
              style={styles.inputInside}
              onChangeText={setMobile}
              value={mobile}
              placeholder="Mobile Number"
              inputMode="tel"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.input}>
            <MaterialIcons name="home" size={25} color="green" />
            <TextInput
              style={styles.inputInside}
              onChangeText={setAddress}
              value={address}
              placeholder="Address"
            />
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons
              name="form-textbox-password"
              size={24}
              color="green"
            />
            <TextInput
              secureTextEntry={true}
              style={styles.inputInside}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            registerUser(email, password, firstName, lastName, mobile, address)
          }
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center", // added to center content
    paddingHorizontal: width / 17,
    paddingTop: height / 13,
    flex: 1,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: "6%",
    height: "7%",
    width: "80%",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 3,
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
  },
  inputInside: {
    paddingLeft: 10,
    width: width,
  },
  textInputContainer: {
    width: "90%",
    height: "70%",
    marginTop: "18%",
    justifyContent: "center",
    backgroundColor: "white",
    marginHorizontal: "2%",
    borderRadius: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  loginform: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  loingImg: {
    width: "40%",
    height: "30%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  regTag: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
  },
  regTagText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

export default Registration;
