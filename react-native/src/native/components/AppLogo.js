import React from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import Spacer from "./Spacer";

const AppLogo = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 0 }}>
      <Image
        source={require("../assets/images/logo-w.png")}
        style={{ width: 102, height: 24 }}
      />
    </View>
  );
};

export default AppLogo;
