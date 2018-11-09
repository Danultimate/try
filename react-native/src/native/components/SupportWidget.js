import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Image, Share } from "react-native";
import { View, Text, Button } from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";
import Spacer from "./Spacer";

const SupportWidget = props => (
  <View style={styles.supportWidget}>
    <Image source={require("../assets/images/support.png")} />
    <Text
      style={[
        styles.header,
        styles.primaryMsg,
        styles.textCenter,
        styles.supportHeader
      ]}
    >
      ¿Tienes alguna duda?
    </Text>

    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={Actions.contact}>
        <Text style={[{ color: Colors.brandInfo }, styles.supportText]}>
          Contáctanos{" "}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.textCenter, styles.supportText]}>
        o visita nuestro{" "}
      </Text>
    </View>
    <TouchableOpacity onPress={Actions.support}>
      <Text style={[{ color: Colors.brandInfo }, styles.supportText]}>
        Centro de Soporte
      </Text>
    </TouchableOpacity>
  </View>
);

SupportWidget.propTypes = {
  code: PropTypes.string
};

SupportWidget.defaultProps = {
  code: ""
};

export default SupportWidget;

const styles = StyleSheet.create({
  header: {
    fontFamily: "playfair",
    fontSize: 32,
    marginBottom: 8,
    lineHeight: 28
  },
  successMsg: {
    color: Colors.brandSuccess
  },
  warningMsg: {
    color: Colors.brandWarning
  },
  primaryMsg: {
    color: Colors.brandPrimary
  },
  textCenter: {
    textAlign: "center"
  },
  supportWidget: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40
  },
  supportHeader: {
    fontSize: 24
  },
  supportText: {
    fontSize: 14
  },
  SupportWidgetsCode: {
    fontWeight: "bold",
    fontSize: 20
  }
});
