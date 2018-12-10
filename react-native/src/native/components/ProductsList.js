import React from "react";
import PropTypes from "prop-types";
import {
  View,
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

import Share from "./CustomShareModule";

moment.locale("es");

import { Mixpanel } from "../../actions/mixpanel";

const onPress = (item, sellerCode) => {
  console.log(item.id);
  Actions.previewProduct({ product: item, sellerCode: sellerCode });
};

const keyExtractor = item => item.id.toString();

const propTypes = {
  ProductsListTitle: PropTypes.string,
  ProductsList: PropTypes.arrayOf(PropTypes.shape()),
  horizontal: PropTypes.bool
};

const defaultProps = {
  ProductsListTitle: "Productos de la colección",
  products: [],
  horizontal: false
};

const ProductsList = props => {
  return (
    <View>
      <FlatList
        horizontal={props.horizontal}
        showsHorizontalScrollIndicator={false}
        data={props.products}
        initialNumToRender={3}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <CardItem cardBody>


              {!!item.image && !!item.image.src ? (
                <TouchableOpacity
                onPress={() => onPress(item, props.sellerCode)}
                style={{ flex: 1 }}
                >
                  <Image
                    source={{ uri: item.image.src }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1,
                      resizeMode: "contain"
                    }}
                  />
                </TouchableOpacity>
              ) : !!item.images && !!item.images[0] && !!item.images[0].src ? (
                <TouchableOpacity
                onPress={() => onPress(item, props.sellerCode)}
                style={{ flex: 1 }}
                >
                  <Image
                    source={{ uri: item.images[0].src }}
                    style={{
                      height: 200,
                      width: null,
                      flex: 1,
                      resizeMode: "contain"
                    }}
                  />
                </TouchableOpacity>
              ) : null}

            </CardItem>
            <View style={styles.promoWrap}>
              <Text style={styles.cardPromo}>
                {item.discount > 0
                  ? "Descuento " + Math.round(item.discount) + "%"
                  : "Producto poderoso"}
              </Text>
              <View style={styles.promoShape} />
            </View>

            <CardItem
              cardBody
              style={[
                styles.productCard,
                props.horizontal && styles.horizontalCard
              ]}
            >
              <Body style={[styles.cardBody, styles.cardSuccess]}>
                <Spacer size={8} />
                <TouchableOpacity
                  onPress={() => onPress(item, props.sellerCode)}
                >
                  <Text numberOfLines={1} style={styles.header}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.meta, { marginLeft: 0 }]}>
                  {item.vendor.toUpperCase()}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer style={styles.cardFooter}>
              <Left
                style={[styles.cardFooterLeft, { flexDirection: "column" }]}
              >
                {item.variants[0].compare_at_price && (
                  <Text style={styles.productPriceCompare} note>
                    ${Number(item.variants[0].compare_at_price).toLocaleString(
                      "es-CO",
                      {
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0
                      }
                    )}
                  </Text>
                )}
                <Text style={styles.productPrice}>
                  ${item.variants[0].price
                    ? Number(item.variants[0].price).toLocaleString("es-CO", {
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0
                      })
                    : 0}
                </Text>
              </Left>
              <Right style={styles.cardFooterRight}>
                <Button
                  style={styles.cardButton}
                  block
                  bordered
                  success
                  small
                  iconLeft
                  onPress={() => {
                    Mixpanel.track("Share Product", {
                      product_id: item.id,
                      product_name: item.title,
                      page: "preview_product"
                    });
                    Mixpanel.track("Share Product: " + item.title);

                    let url = `https://elenas.la/products/${item.handle}`;

                    message = `¡Te recomiendo este producto super poderoso! 😍 🎁 ${url}.`
                    if (props.seller_code){
                      message += `Envío gratis con mi código: *${props.sellerCode}*`;
                    }
                    let price = `$${Number(item.variants[0].price).toLocaleString("es-CO", {
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0
                        })}`
                      
                    Share.share(message, [`${item.images[0].src.split("=")[1]}.png`], [price], [item.images[0].src]);
                  }}
                >
                  <Icon
                    style={styles.cardButtonIcon}
                    type="FontAwesome"
                    name="whatsapp"
                  />
                  <Text style={styles.cardButtonText}>Compartir ahora</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        )}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

ProductsList.propTypes = propTypes;
ProductsList.defaultProps = defaultProps;

export default ProductsList;

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
    elevation: 1
  },
  header: {
    fontFamily: "playfair",
    marginBottom: 8,
    fontSize: 18,
    lineHeight: 16
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
  promoWrap: {
    position: "absolute",
    top: 176,
    left: 8,
    zIndex: 2,
    paddingRight: 24
  },
  cardPromo: {
    fontSize: 12,
    color: "white",
    backgroundColor: Colors.brandSuccess,
    fontWeight: "700",
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: 24
  },
  promoShape: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 24,
    borderBottomWidth: 24,
    borderRightColor: "transparent",
    borderBottomColor: Colors.brandSuccess,
    top: -24,
    left: "100%"
  },
  cardSuccess: {
    borderTopColor: Colors.brandSuccess,
    borderTopWidth: 2
  },
  cardButton: {
    height: 40,
    shadowColor: "transparent",
    shadowOpacity: 0,
    borderLeftWidth: Colors.borderWidth,
    borderTopWidth: Colors.borderWidth,
    borderRightWidth: Colors.borderWidth,
    borderBottomWidth: Colors.borderWidth
  },
  cardButtonText: {
    paddingLeft: 8,
    paddingRight: 8
  },
  cardButtonIcon: {
    alignSelf: "flex-end"
  },
  cardFooter: {
    flexDirection: "row",
    paddingTop: 0,
    paddingLeft: 16,
    paddingRight: 16
  },
  cardFooterLeft: {
    flex: 0.4
  },
  cardFooterRight: {
    flex: 0.6
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
  horizontalCard: {
    width: 128
  },
  productCard: {},
  productPrice: {
    marginLeft: 0,
    alignSelf: "flex-start",
    fontWeight: "700",
    fontSize: 15
  },
  productPriceCompare: {
    marginLeft: 0,
    alignSelf: "flex-start",
    textDecorationLine: "line-through",
    color: Colors.tabBarTextColor,
    fontSize: 12
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