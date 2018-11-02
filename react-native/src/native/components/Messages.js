import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { Text } from "native-base";

import Colors from "../../../native-base-theme/variables/commonColor";

const Messages = ({ message, type }) => (
  <View
    style={{
      backgroundColor:
        type === "error"
          ? Colors.brandDanger
          : type === "success"
            ? Colors.brandSuccess
            : Colors.brandInfo,
      paddingVertical: 8,
      paddingHorizontal: 4,
      marginTop: 16,
      borderRadius: 3
    }}
  >
    <Text style={{ color: "#fff", textAlign: "center", fontSize: 14 }}>
      {message}
    </Text>
  </View>
);

Messages.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["error", "success", "info"])
};

Messages.defaultProps = {
  message: "Un error inesperado ha surgido",
  type: "error"
};

export default Messages;
