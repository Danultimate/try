import React from "react";
import PropTypes from "prop-types";
import { Icon, Button } from "native-base";
import { Actions } from "react-native-router-flux";

const propTypes = {
  dark: PropTypes.bool
};

const defaultProps = {
  dark: false
};

const SearchIcon = props => (
  <Button transparent light onPress={Actions.search}>
    {/* TODO: uncomment */}
    {/* <Icon
      type="SimpleLineIcons"
      name="magnifier"
      style={{
        width: 24,
        textAlign: "center",
        color: props.dark ? "#5B2AD0" : "white"
      }}
    /> */}
  </Button>
);

SearchIcon.propTypes = propTypes;
SearchIcon.defaultProps = defaultProps;

export default SearchIcon;
