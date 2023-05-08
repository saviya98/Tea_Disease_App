import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
const { height, width } = Dimensions.get("window");

const BlisterSampleResult = ({
  image,
  translucent,
  necro,
  blisterUpper,
  blisterUnder,
}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "2%",
          }}
        >
          Blister infected ratio within the quadrant area
        </Text>

        <View style={{ justifyContent: "center", marginTop: "2%" }}>
          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../Translucent.jpg")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>
                Translucent spots : {translucent}%
              </Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../Blister_Upper.jpg")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>
                Blister Upper spots: {blisterUpper}%
              </Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../Blister_Under.jpg")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>
                Blister Under spots: {blisterUnder}%
              </Text>
            </View>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../Necro.jpg")}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Necrotic spots : {necro}%</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  cardContent: {
    width: "98%",
    height: height / 3,
    marginTop: height / 45,
    borderRadius: 9,
    borderColor: "#085E22",
    borderWidth: 0.7,
  },
  cardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 9,
  },
  imageContainer: {
    height: "85%",
    width: "100%",
    borderRadius: 9,
  },
  cardTitle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default BlisterSampleResult;
