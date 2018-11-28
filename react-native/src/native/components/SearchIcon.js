import React from "react";
import PropTypes from "prop-types";
import { Icon, Button } from "native-base";
import { Actions } from "react-native-router-flux";

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string
};

const defaultProps = {
  focused: false,
  title: ""
};

const SearchIcon = props => (
  <Button transparent light onPress={Actions.search}>
    <Icon
      type="SimpleLineIcons"
      name="magnifier"
      style={{
        width: 24,
        textAlign: "center",
        marginBottom: -4,
        color: "white"
      }}
    />
  </Button>
);

SearchIcon.propTypes = propTypes;
SearchIcon.defaultProps = defaultProps;

export default SearchIcon;
