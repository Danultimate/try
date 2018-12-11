import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import { Icon } from "native-base";

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string
};

const defaultProps = {
  focused: false,
  title: ""
};

const TabIcon = props => (
  <Icon
    type="SimpleLineIcons"
    name={props.iconName}
    style={{
      width: 24,
      textAlign: "center",
      marginBottom: -4,
      color: props.focused ? "#0089FF" : "#A492D1"
    }}
  />
);

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;

export default TabIcon;
