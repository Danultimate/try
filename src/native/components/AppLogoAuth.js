import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import Spacer from "./Spacer";

const AppLogoAuth = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        style={{
          marginTop: 24,
          marginBottom: 16
        }}
        source={require("../assets/images/logo-p.png")}
      />
    </View>
  );
};

export default AppLogoAuth;
