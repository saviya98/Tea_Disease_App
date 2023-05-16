import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../global/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Button } from "react-native-paper";
import AppLoader from "./AppLoader";

const { height, width } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (email, password) => {
    try {
      setIsLoading(true);
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

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
        <View style={styles.loingImg}>
          <Avatar.Image
            source={require("../assets/logo.png")}
            style={{ backgroundColor: "white" }}
            size={200}
          />
        </View>
        <View style={styles.textInputContainer}>
          <View style={styles.input}>
            <MaterialIcons name="email" size={25} color="green" />
            <TextInput
              style={styles.inputInside}
              onChangeText={setEmail}
              value={email}
              placeholder="Email"
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
          onPress={() => loginUser(email, password)}
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "white" }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Registration")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
            Register Now
          </Text>
        </TouchableOpacity>
      </View>
      {isLoading ? <AppLoader /> : null}
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
    opacity: 0.8,
    borderColor: "3085E22",
    borderWidth: 1,
  },
  inputInside: {
    paddingLeft: 10,
    width: width,
  },
  textInputContainer: {
    width: "90%",
    height: "30%",
    marginTop: "10%",
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
});

export default Login;
