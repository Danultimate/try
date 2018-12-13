import React from "react";
import Styl from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "native-base";
import Spacer from "./Spacer";

const SideMenu = () => (
  <View style={styles.container}>
    <Text>menu items go here</Text>
  </View>
);

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#F5FCFF",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10
  }
});
