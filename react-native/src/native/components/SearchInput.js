import React from "react";
import PropTypes from "prop-types";
import { Input } from "native-base";

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string
};

const defaultProps = {
  focused: false,
  title: ""
};

const SearchInput = props => (
  <Input placeholder="Busca productos, categorías o colecciones." />
);

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
