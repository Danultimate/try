import React from "react";
import PropTypes from "prop-types";
import { Input, View, Icon, Button, InputGroup } from "native-base";
import shopify from "../../constants/shopify";
import { Actions } from "react-native-router-flux";

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
  keyword: PropTypes.string
};

const defaultProps = {
  focused: false,
  title: "",
  keyword: ""
};

const SearchInput = props => {
  return (
    <InputGroup>
      <Input
        placeholder="Busca productos, categorías o colecciones."
        onChangeText={text => (props.keyword = text)}
        returnKeyType="search"
      />
      <Button
        transparent
        primary
        onPress={() => {
          console.log("@search input|keyboard var");
          console.log(props.keyword);
          Actions.search({ keyword: props.keyword });
        }}
      >
        <Icon
          type="SimpleLineIcons"
          name="magnifier"
          style={{
            width: 24,
            textAlign: "right",
            marginBottom: -4
          }}
        />
      </Button>
    </InputGroup>
  );
};

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
