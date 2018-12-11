import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Share
} from "react-native";
import {
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import Spacer from "./Spacer";
import call from "react-native-phone-call";

import TimeAgo from "react-native-timeago";
import { decode as atob } from "base-64";
import shopifyAPI from "../../constants/shopify_axios";

const keyExtractor = item => item.id.toString();

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.shape())
};

const defaultProps = {
  focused: false,
  item: []
};

const Contents = props => (
  <Card style={styles.card}>
    <CardItem
      header
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 0
      }}
    >
      <Image source={require("../assets/images/msg-warning.png")} />
    </CardItem>
    <CardItem style={styles.cardBody}>
      <Body>
        <Text style={[styles.header, styles.warningMsg, styles.textCenter]}>
          Tu cliente abandonó el carrito de compra
        </Text>
        <Text style={[styles.meta, styles.date]}>Hace 26 minutos</Text>
        <Spacer size={8} />
        <Text style={styles.description}>
          Tu cliente {props.item.shipping_address.first_name}{" "}
          {props.item.shipping_address.last_name} agregó tres productos pero no
          terminó su proceso de compra en el sitio web de Elenas…
          <Text style={{ color: Colors.brandInfo }}>Ver más</Text>
        </Text>
        <Spacer size={16} />
      </Body>
    </CardItem>
    <CardItem style={styles.cardFooter} footer>
      <Body>
        <Button style={styles.cardButton} block transparent info small iconLeft>
          <Icon type="SimpleLineIcons" name="phone" />
          <Text
            style={styles.cardButtonText}
            onPress={() =>
              call({
                number: "" + props.item.shipping_address.phone,
                prompt: false
              })
            }
          >
            Llamar
          </Text>
        </Button>
      </Body>
    </CardItem>
  </Card>
);

Contents.propTypes = propTypes;
Contents.defaultProps = defaultProps;

export default Contents;

const styles = StyleSheet.create({
  card: {
    shadowColor: "#E2E1E6",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2
  },
  header: {
    fontFamily: "playfair",
    fontSize: 32,
    marginBottom: 8,
    lineHeight: 28
  },
  meta: {
    fontSize: 10,
    color: "#C3C5C7"
  },
  description: {
    fontSize: 18
  },
  category: {
    fontWeight: "bold",
    marginBottom: 8
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  cardSuccess: {
    borderTopColor: Colors.brandSuccess,
    borderTopWidth: 2
  },
  cardButtonText: {
    paddingLeft: 8,
    paddingRight: 8
  },
  cardFooter: {
    borderBottomWidth: 0,
    borderTopColor: "#EBEDF0",
    paddingHorizontal: 0
  },
  textCenter: {
    textAlign: "center"
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
  loadMore: {
    backgroundColor: "#F1EDFA",
    marginTop: 8,
    marginBottom: 8,
    marginHorizontal: 2,
    shadowColor: "transparent"
  },
  loadMoreText: {
    fontSize: 14,
    color: Colors.brandInfo
  }
});
