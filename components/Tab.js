import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign,Feather, FontAwesome } from "@expo/vector-icons";

const Tab = ({ color, tab, onPress, icon, tabIcon }) => {
  //console.log("tab color", color);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <AntDesign name={icon} size={20} color={color} />}
      {tabIcon && <FontAwesome name={tabIcon} size={20} color={color} />}
      <Text style={{ color }}> {tab.name} </Text>
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});
