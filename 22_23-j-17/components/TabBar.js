import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Tab from "./Tab";
const { width } = Dimensions.get("window");

const TabBar = ({ state, navigation }) => {
  //console.log(state);
  //console.log(state.routes);

  const [selected, setSelected] = useState("Home");
  const { routes } = state;

  const renderColors = (currentTab) => {
    //console.log("currentTab", currentTab, selected);
    currentTab === selected ? "#F1F6FB" : "black";
  };

  //console.log('',state.index);

  const handlePress = (activeTab, index) => {
    // console.log("active tab", activeTab, index);

    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  //console.log("TabBar : ", state.routes);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            tabIcon={route.params.tabIcon}
            onPress={() => handlePress(route.name, index)}
            color={renderColors(route.name)}
            key={route.key}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 20,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    width: 320,
    borderRadius: 100,
    elevation: 2,
  },
});

export default TabBar;
