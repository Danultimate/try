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

const SearchButton = props => (
  <Button transparent primary onPress={Actions.search}>
    <Icon
      type="SimpleLineIcons"
      name="magnifier"
      style={{
        width: 24,
        textAlign: "center",
        marginBottom: -4
      }}
    />
  </Button>
);

SearchButton.propTypes = propTypes;
SearchButton.defaultProps = defaultProps;

export default SearchButton;
