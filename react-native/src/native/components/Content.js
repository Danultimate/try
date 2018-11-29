import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
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
  Button,
  View
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import Spacer from "./Spacer";

import TimeAgo from "react-native-timeago";
import { decode as atob } from "base-64";
import shopifyAPI from "../../constants/shopify_axios";

import { Mixpanel } from "../../actions/mixpanel";

const keyExtractor = item => item.id.toString();

const onPress = (item, sellerCode) => {
  console.log(item.id);
  // Actions.preview({ match: { params: { id: String(item.id) } } });
  Actions.preview({ content: item, sellerCode: sellerCode });
};

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.shape())
};

const defaultProps = {
  focused: false,
  item: []
};

const Contents = props => {
  console.log(props.item);
  return (
    <Card style={styles.card}>
      {!!props.item.image &&
        !!props.item.image.src && (
          <CardItem cardBody>
            {props.item.image.src && props.item.products[0].images ? (
              <TouchableOpacity
                onPress={() => onPress(props.item, props.sellerCode)}
                style={{ flex: 1, flexDirection: "row" }}
              >
                <Image
                  source={{ uri: props.item.image.src }}
                  style={{
                    minHeight: 134,
                    width: null,
                    flex: 0.675
                  }}
                />
                <ImageBackground
                  source={{ uri: props.item.products[0].images[0].src }}
                  style={{
                    minHeight: 134,
                    width: null,
                    flex: 0.325
                  }}
                >
                  <Text
                    style={{
                      fontSize: 32,
                      marginTop: 0,
                      color: "white",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#20123E",
                      opacity: 0.5,
                      lineHeight: 134,
                      textAlign: "center"
                    }}
                  >
                    +{props.item.products.length}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ) : props.item.products[1].images &&
            props.item.products[1].images ? (
              <TouchableOpacity
                onPress={() => onPress(props.item, props.sellerCode)}
                style={{ flex: 1, flexDirection: "row" }}
              >
                <Image
                  source={{ uri: props.item.products[0].images[0].src }}
                  style={{
                    minHeight: 134,
                    width: null,
                    flex: 0.333
                  }}
                />
                <Image
                  source={{ uri: props.item.products[1].images[0].src }}
                  style={{
                    minHeight: 134,
                    width: null,
                    flex: 0.333
                  }}
                />
                <ImageBackground
                  source={{ uri: props.item.products[2].images[0].src }}
                  style={{
                    minHeight: 134,
                    width: null,
                    flex: 0.333
                  }}
                >
                  <Text
                    style={{
                      fontSize: 32,
                      marginTop: 0,
                      color: "white",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#20123E",
                      opacity: 0.5,
                      lineHeight: 134,
                      textAlign: "center"
                    }}
                  >
                    +{props.item.products.length}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onPress(props.item, props.sellerCode)}
                style={{ flex: 1, flexDirection: "row" }}
              >
                <Image
                  source={{ uri: props.item.products[0].images[0].src }}
                  style={{
                    minHeight: 134,
                    width: null,
                    flex: 0.675
                  }}
                />
                <ImageBackground
                  source={{ uri: props.item.products[0].images[0].src }}
                  style={{
                    minHeight: 134,
                    width: null,
                    flex: 0.325
                  }}
                >
                  <Text
                    style={{
                      fontSize: 32,
                      marginTop: 0,
                      color: "white",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      backgroundColor: "#20123E",
                      opacity: 0.5,
                      lineHeight: 134,
                      textAlign: "center"
                    }}
                  >
                    +{props.item.products.length}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          </CardItem>
        )}
      <CardItem cardBody>
        <Body style={[styles.cardBody, styles.cardSuccess]}>
          <View style={styles.promoWrap}>
            <Text style={styles.cardPromo}>
              {props.item.max_discount > 0
                ? "Hasta " + props.item.max_discount + "%"
                : "Producto poderoso"}
            </Text>
            <View style={styles.promoShape} />
          </View>

          <Spacer size={8} />
          <View style={styles.metaBar}>
            <Text
              style={[
                styles.meta,
                styles.category,
                styles.successMsg,
                styles.leftContainer
              ]}
            >
              ¡Gana dinero compartiendo!{" "}
            </Text>
            <Text
              style={[
                styles.meta,
                styles.successMsg,
                styles.textRight,
                styles.rightContainer
              ]}
            >
              <Icon style={[styles.meta, styles.successMsg]} name="present" />{" "}
              Entrega gratuita
            </Text>
          </View>
          <Spacer size={8} />
          <TouchableOpacity
            onPress={() => onPress(props.item, props.sellerCode)}
          >
            <Text style={styles.header}>{props.item.title}</Text>
          </TouchableOpacity>
        </Body>
      </CardItem>
      <CardItem style={styles.cardFooter} footer>
        <Left style={styles.cardFooterLeft}>
          <Text style={styles.cardFooterText} note>
            {props.item.products.length} productos desde ${Math.round(
              props.item.min_price
            ).toLocaleString("es-CO", {
              maximumFractionDigits: 0
            })}
          </Text>
        </Left>
        <Right style={styles.cardFooterRight}>
          <Button
            style={styles.cardButton}
            block
            small
            success
            iconLeft
            onPress={() => {
              Mixpanel.track("Share Content", {
                content_id: props.item.id,
                content_name: props.item.title
              });
              message = props.item.wp_message || props.item.title;
              message =
                message +
                `\n\nRecuerda que con mi código de vendedora recibes envío gratis: *${
                  props.sellerCode
                }*`;
              Share.share({ message: message });
            }}
          >
            <Icon type="SimpleLineIcons" name="share-alt" />
            <Text style={styles.cardButtonText}>Compartir ahora</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

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
  metaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  leftContainer: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  rightContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  rightIcon: {
    height: 10,
    width: 10,
    resizeMode: "contain",
    backgroundColor: "white"
  },
  meta: {
    fontSize: 10,
    color: "#C3C5C7"
  },
  description: {
    fontSize: 18
  },
  category: {
    fontWeight: "bold"
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  promoWrap: {
    position: "absolute",
    top: -24,
    left: 8
  },
  cardPromo: {
    fontSize: 12,
    color: "white",
    backgroundColor: Colors.brandSuccess,
    fontWeight: "700",
    paddingVertical: 4,
    paddingHorizontal: 8
  },
  promoShape: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 24,
    borderBottomWidth: 23,
    borderRightColor: "transparent",
    borderBottomColor: Colors.brandSuccess,
    position: "absolute",
    right: -24
  },
  cardSuccess: {
    borderTopColor: Colors.brandSuccess,
    borderTopWidth: 2
  },
  cardButton: {
    height: 40,
    shadowColor: "transparent",
    shadowOpacity: 0
  },
  cardButtonText: {
    paddingLeft: 8,
    paddingRight: 8
  },
  cardFooter: {
    borderBottomWidth: 0,
    borderTopColor: "#EBEDF0",
    paddingLeft: 16,
    paddingRight: 16
  },
  cardFooterLeft: {
    flex: 0.5
  },
  cardFooterRight: {},
  cardFooterText: {
    fontSize: 12,
    marginLeft: 0,
    color: Colors.tabBarTextColor
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
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
