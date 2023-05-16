import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const StartPage = ({ navigation, route }) => {
  return (
    <View style={styles.startPageCon}>
      <View style={styles.startPageTop}>
        <Avatar.Image
          source={require("../assets/logo.png")}
          size={400}
          style={styles.image}
        />
      </View>

      <View style={styles.startPageBot}>
        <View style={styles.bottomTopic}>
          <View style={styles.container}>
            <View style={styles.txtCon}>
              <View
                style={{
                  width: "40%",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.topicTxtfront}>Welcome to</Text>
              </View>
              <View
                style={{
                  width: "60%",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.topicTxt}>BB-RELIEF</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomTxt}>
          <View style={styles.container}>
            <View style={styles.bodyTxtCon}>
              <Text style={styles.bodyTxt}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.Lorem
                Ipsum has been the industry's standard dummy text ever since the
                1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book
              </Text>
            </View>
            <View style={styles.bodyNextCon}>
              <TouchableOpacity onPress={() => navigation.navigate("Dash")}>
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "bold",
                    textAlign: "right",
                    color: "#062b10",
                  }}
                >
                  Let's Start
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  startPageCon: {
    backgroundColor: "#085E22",
    width: "100%",
    height: "100%",
  },
  startPageTop: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  startPageBot: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  image: {
    backgroundColor: "#085E22",
  },
  bottomTopic: {
    width: "100%",
    backgroundColor: "black",
    height: "15%",
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  bottomTxt: {
    width: "100%",
    height: "85%",
  },
  topicTxt: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "7%",
  },
  topicTxtfront: {
    color: "gray",
    fontSize: 20,
    textAlign: "right",
  },
  txtCon: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bodyTxt: {
    color: "#085E22",
    fontSize: 19,
    textAlign: "justify",
  },
  bodyTxtCon: {
    width: "100%",
    height: "65%",
  },
  bodyNextCon: {
    width: "100%",
    height: "35%",
    marginBottom: height / 15,
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
});
