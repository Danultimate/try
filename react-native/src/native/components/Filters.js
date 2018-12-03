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

import { Mixpanel } from "../../actions/mixpanel";

const categories = [
  {
    name: "Todas",
    selected: true,
    id: 0
  },
  {
    name: "Belleza",
    selected: false,
    id: 1
  },
  {
    name: "Cosméticos",
    selected: false,
    id: 2
  },
  {
    name: "Accesorios",
    selected: false,
    id: 3
  },
  {
    name: "Labiales",
    selected: false,
    id: 4
  },
  {
    name: "Cuidado de la piel",
    selected: false,
    id: 5
  },
  {
    name: "Cabello",
    selected: false,
    id: 6
  }
];

const Filters = ({ error, content, seller_code }) => {
  Mixpanel.screen("Filters");

  const keyExtractor = item => item.id.toString();

  const onPress = item => {
    console.log(item.id);
  };

  // Error
  // if (error) return <Error content={error} />;

  // Recipe not found
  // if (!content)
  //   return (
  //     <View>
  //       <StatusBar barStyle="dark-content" />
  //       <Error content={ErrorMessages.content404} />
  //     </View>
  //   );

  return (
    <Container style={styles.container}>
      {Platform.OS === "iOS" && <StatusBar barStyle="dark-content" />}
      <Content>
        <FlatList
          numColumns={1}
          data={categories}
          renderItem={({ item }) => (
            <ListItem
              selected={item.selected}
              style={styles.listItem}
              button
              onPress={() => onPress(item)}
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
  );
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
