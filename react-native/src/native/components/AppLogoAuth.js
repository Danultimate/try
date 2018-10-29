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
          marginTop: 32,
          marginBottom: 24
        }}
        source={require("../assets/images/logo-p.png")}
      />
    </View>
  );
};

export default AppLogoAuth;
