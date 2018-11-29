import React from "react";
import PropTypes from "prop-types";
import {
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity,
  Share
} from "react-native";
import {
  Container,
  View,
  Content,
  Footer,
  FooterTab,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import ErrorMessages from "../../constants/errors";
import Error from "./Error";
import Spacer from "./Spacer";

import TimeAgo from "react-native-timeago";
import moment from "moment"; //load moment module to set local language
import "moment/locale/es"; //for import moment local language file during the application build
moment.locale("es");

import { Mixpanel } from "../../actions/mixpanel";

const PreviewProduct = ({ error, product, sellerCode }) => {
  console.log("el product");
  console.log(product);
  // Error
  if (error) return <Error product={error} />;

  // Get this Recipe from all recipes
  // let product = null;
  //
  // if (productId && products) {
  //   product = products.find(
  //     item => parseInt(item.id, 10) === parseInt(productId, 10)
  //     item => item.id === productId
  //   );
  // }

  // Recipe not found
  // if (!product) return <Error product={ErrorMessages.product404} />;

  // Build Ingredients listing
  // const ingredients = recipe.ingredients.map(item => (
  //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
  //     <Text>
  //       {item}
  //     </Text>
  //   </ListItem>
  // ));

  return (
    <Container style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Content padder>
        <View style={styles.productBar}>
          <Text style={[styles.meta, styles.category, styles.successMsg]}>
            ¡Gana dinero compartiendo!{" "}
          </Text>
          <Text style={styles.header}>{product.title}</Text>
          <Text style={styles.meta}>{product.vendor.toUpperCase()}</Text>
          <Spacer size={8} />
          {product.variants[0].compare_at_price && (
            <Text style={styles.productPriceCompare} note>
              ${Number(product.variants[0].compare_at_price).toLocaleString(
                "es-CO",
                {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0
                }
              )}
            </Text>
          )}
          <Text style={styles.productPrice}>
            ${product.variants[0].price
              ? Number(product.variants[0].price).toLocaleString("es-CO", {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0
                })
              : 0}
          </Text>
          {!!product.image &&
            !!product.image.src && (
              <Image
                source={{ uri: product.image.src }}
                style={{
                  height: 208,
                  width: null,
                  flex: 1,
                  resizeMode: "contain",
                  marginBottom: 16
                }}
              />
            )}

          <Spacer size={16} />
          <View style={styles.cardFooter}>
            <Left style={styles.cardFooterLeft}>
              <View style={styles.promoWrap}>
                <Text style={styles.cardPromo}>
                  {product.discount > 0
                    ? "Descuento " + product.discount + "%"
                    : "Producto poderoso"}
                </Text>
                <View style={styles.promoShape} />
              </View>
            </Left>
            <Right style={styles.cardFooterRight}>
              <Text style={[styles.meta, styles.successMsg]}>
                <Icon style={[styles.meta, styles.successMsg]} name="present" />{" "}
                Entrega gratuita:
              </Text>
              <Text style={[styles.meta]}>5 a 10 días hábiles</Text>
            </Right>
          </View>
        </View>
        <Text style={styles.description}>
          {product.description ||
            product.body_html.replace(/<(?:.|\n)*?>/gm, "")}
        </Text>
        <Spacer size={40} />
      </Content>
      <Footer
        style={{
          paddingHorizontal: 16,
          backgroundColor: "white"
        }}
      >
        <FooterTab style={{ bottom: 16 }}>
          <Button
            full
            success
            style={{
              flexDirection: "row",
              borderRadius: 5
            }}
            onPress={() => {
              Mixpanel.track("Share Content", {
                content_id: product.id,
                content_name: product.title
              });
              message = product.wp_message || product.title;
              message =
                message +
                `\n\nRecuerda que con mi código de vendedora recibes envío gratis: *${sellerCode}*`;
              Share.share({ message: message });
            }}
          >
            <Icon name="share-alt" style={{ color: "white", marginRight: 0 }} />
            <Text style={{ color: "white", fontSize: 16 }}>
              Compartir producto
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

PreviewProduct.propTypes = {
  error: PropTypes.string
  // productId: PropTypes.string.isRequired
  //products: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

PreviewProduct.defaultProps = {
  error: null
};

export default PreviewProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  productBar: {
    backgroundColor: "white",
    shadowColor: "#E2E1E6",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2,
    paddingHorizontal: 24,
    paddingBottom: 6,
    marginTop: -10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.brandSuccess
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
    lineHeight: 28
  },
  meta: {
    fontSize: 10,
    color: Colors.tabBarTextColor
  },
  description: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingTop: 24
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
    paddingHorizontal: 0,
    flexDirection: "row"
  },
  promoWrap: {
    position: "absolute",
    bottom: -18,
    left: 0
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
  successMsg: {
    color: Colors.brandSuccess
  },
  warningMsg: {
    color: Colors.brandWarning
  },
  primaryMsg: {
    color: Colors.brandPrimary
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
    lineHeight: 16,
    marginBottom: 0
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
    marginBottom: 8
  },
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
  }
});
