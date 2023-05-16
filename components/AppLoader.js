import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";

const AppLoader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]} acc>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
