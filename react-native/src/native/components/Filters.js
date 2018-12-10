import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share,
  FlatList
} from "react-native";
import {
  View,
  Container,
  Content,
  Icon,
  Left,
  Right,
  Body,
  ListItem,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import ErrorMessages from "../../constants/errors";
import Error from "./Error";
import Spacer from "./Spacer";
import Products from "./Products";

import TimeAgo from "react-native-timeago";
import moment from "moment"; //load moment module to set local language
import "moment/locale/es"; //for import moment local language file during the application build
moment.locale("es");

import { decode as atob } from "base-64";
import shopifyAPI from "../../constants/shopify_axios";
import { Actions } from "react-native-router-flux";

import { Mixpanel } from "../../actions/mixpanel";

const keyExtractor = item => item.id.toString();

const categoriesDefault = [
  {
    name: "Todas",
    handle: "",
    selected: false,
    id: 0
  },
  {
    name: "Belleza y Cosméticos",
    handle: "maquillaje",
    selected: false,
    id: 1
  },
  {
    name: "Fragancias",
    handle: "fragancia",
    selected: false,
    id: 2
  },
  {
    name: "Cuidado de la piel",
    handle: "cuidado-de-piel",
    selected: false,
    id: 3
  },
  {
    name: "Cabello",
    handle: "cabello",
    selected: false,
    id: 4
  },
  {
    name: "Cuidado personal",
    handle: "cuidado-personal",
    selected: false,
    id: 5
  },
  {
    name: "Accesorios para mujeres",
    handle: "accesorios-mujer",
    selected: false,
    id: 6
  },
  {
    name: "Accesorios para hombres",
    handle: "accesorios-hombre",
    selected: false,
    id: 7
  } 
];

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      categories: categoriesDefault,
      selections: [false, false, false, false, false, false, false, false]
    }
  }
// const Filters = props => {


  render() {
    Mixpanel.screen("Filters");
    return (
    <Container style={styles.container}>
      {Platform.OS === "iOS" && <StatusBar barStyle="dark-content" />}
      <Content>
        <FlatList
          numColumns={1}
          data={this.state.categories}
          renderItem={({ item }) => (
            <ListItem
              selected={this.state.selections[item.id]}
              style={styles.listItem}
              button
              onPress={() => {
                this.setState({selections: [false, false, false, false, false, false, false, false]});
                this.state.selections[item.id] = true;
                // console.log(this.state.categories)
                // this.state.categories = categoriesDefault;
                Actions.search({ filter: item });
              }}
            >
              <Body>
                <Text>{item.name}</Text>
              </Body>
            </ListItem>
          )}
          keyExtractor={keyExtractor}
        />
      </Content>
    </Container>
    )
  };
};

Filters.propTypes = {
  error: PropTypes.string
  // contentId: PropTypes.string.isRequired
  //feed: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

Filters.defaultProps = {
  error: null
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  listItem: {
    borderBottomWidth: 0
  }
});
