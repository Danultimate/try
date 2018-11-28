import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Share,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import {
  Icon,
  Card,
  CardItem,
  Body,
  Right,
  Left,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import Spacer from "./Spacer";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import { Mixpanel } from "../../actions/mixpanel";

const keyExtractor = item => item.id.toString();

const propTypes = {
  focused: PropTypes.bool,
  productsTitle: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.shape())
};

const defaultProps = {
  focused: false,
  productsTitle: "Productos de la colección",
  products: []
};

const Products = props => {
  // const onPress = item => {
  // console.log(item);
  // Actions.previewProduct({
  //   match: { params: { id: String(item.id) } }
  // });
  // };
  return (
    <View>
      <View style={styles.productsBar}>
        <Text style={styles.meta}>{props.productsTitle.toUpperCase()}</Text>
        <TouchableOpacity
          style={{ justifyContent: "flex-end", flex: 1 }}
          onPress={Actions.store}
        >
          <Text style={[styles.meta, styles.infoMsg, { textAlign: "right" }]}>
            Ver en elenas.la
          </Text>
        </TouchableOpacity>
      </View>
      {props.products && props.products.length > 0 &&
       (<FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={props.products}
          renderItem={({ item }) => {
            console.log(item.images[0].src)
            return (
            <Card transparent style={styles.transparentCard}>
              <CardItem cardBody>
                {item && item.images &&
                  item.images[0] && (
                    <Image
                      source={{ uri: item.images[0].src }}
                      style={{
                        height: 168,
                        width: null,
                        flex: 1
                      }}
                    />
                  )}
              </CardItem>
              <CardItem cardBody style={styles.transparentCard}>
                <Body>
                  <Spacer size={8} />
                  <Text
                    numberOfLines={1}
                    style={[styles.header, styles.productTitle]}
                  >
                    {item.title}
                  </Text>
                  <Text style={[styles.meta, { marginLeft: 0 }]}>
                    {item.vendor.toUpperCase()}
                  </Text>
                </Body>
              </CardItem>
              <CardItem cardBody style={styles.transparentCard}>
                <Left style={{ flexDirection: "column" }}>
                  <Text style={styles.productPriceCompare} note>
                    ${item.variants[0].compare_at_price
                      ? Number(item.variants[0].compare_at_price).toLocaleString(
                          "es-CO",
                          {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0
                          }
                        )
                      : 0}
                  </Text>
                  <Text style={styles.productPrice}>
                    ${item.variants[0].price
                      ? Number(item.variants[0].price).toLocaleString("es-CO", {
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0
                        })
                      : 0}
                  </Text>
                </Left>
                <Right>
                  <Button
                    style={styles.cardButton}
                    block
                    transparent
                    info
                    small
                    iconLeft
                    onPress={() => {
                      Mixpanel.track("Share Product", {
                        product_id: item.id,
                        product_name: item.title
                      });
                      Mixpanel.track("Share Product: " + item.title);
                      let url = `https://elenas.la/products/${item.handle}`;
                      Share.share({
                        message: `¡Te recomiendo este producto super poderoso! 😍 🎁 ${url}. Recuerda que con mi código de vendedora recibes envío gratis: *${props.seller_code}*`,
                        title: item.title
                        // url: "https://elenas.la/products/" + item.handle
                      });
                    }}
                  >
                    <Icon
                      style={styles.cardButtonIcon}
                      type="SimpleLineIcons"
                      name="share-alt"
                    />
                  </Button>
                </Right>
              </CardItem>
            </Card>
          )}
        }
          keyExtractor={keyExtractor}
        />)
      }
    </View>
  );
};

Products.propTypes = propTypes;
Products.defaultProps = defaultProps;

export default Products;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
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
    lineHeight: 28,
    fontWeight: "700"
  },
  meta: {
    fontSize: 10,
    marginBottom: 8,
    color: Colors.tabBarTextColor
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
  cardButton: {
    alignSelf: "flex-end"
  },
  cardButtonText: {
    paddingLeft: 8,
    paddingRight: 8
  },
  cardButtonIcon: {
    alignSelf: "flex-end"
  },
  cardFooter: {
    borderBottomWidth: 0,
    borderTopColor: "#EBEDF0",
    paddingHorizontal: 0
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
  infoMsg: {
    color: Colors.brandInfo
  },
  textCenter: {
    textAlign: "center"
  },
  supportWidget: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 40
  },
  supportHeader: {
    fontSize: 24
  },
  supportText: {
    fontSize: 14
  },
  horizontalScroll: {},
  transparentCard: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: 128
  },
  notifications: {
    backgroundColor: "#EDEBF5",
    padding: 12,
    paddingRight: 0,
    marginTop: -10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10
  },
  notification: {
    width: 224,
    height: 88,
    borderRadius: 0,
    shadowColor: "#E2E1E6"
  },
  notificationHeader: {
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
  notificationDate: {
    alignSelf: "flex-end"
  },
  notificationTitle: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 0
  },
  notificationTitleIcon: {
    fontSize: 6,
    lineHeight: 24
  },
  notificationText: {
    fontSize: 12,
    lineHeight: 18
  },
  notificationBody: {
    paddingHorizontal: 8,
    paddingVertical: 8
  },
  referralCode: {
    fontWeight: "bold",
    fontSize: 20
  },
  productTitle: {
    fontSize: 16,
    lineHeight: 16,
    height: 18
  },
  productPrice: {
    marginLeft: 0,
    alignSelf: "flex-start",
    fontWeight: "700",
    fontSize: 13
  },
  productPriceCompare: {
    marginLeft: 0,
    alignSelf: "flex-start",
    textDecorationLine: "line-through",
    color: Colors.tabBarTextColor,
    fontSize: 10
  },
  productsBar: {
    flexDirection: "row"
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
