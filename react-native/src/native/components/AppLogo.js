import React from "react";
import PropTypes from "prop-types";
import { Platform, View, Image } from "react-native";
import Spacer from "./Spacer";

const AppLogo = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left: 0,
        right: 0
      }}
    >
      <Image
        source={require("../assets/images/logo-w.png")}
        style={{
          width: 102,
          height: 24,
          marginLeft: Platform.OS === "android" ? -20 : 0
        }}
      />
    </View>
  );
};

export default AppLogo;
