import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  TouchableOpacity
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

import Share from "./CustomShareModule";

import { Mixpanel } from "../../actions/mixpanel";

const PreviewProduct = ({ error, product, sellerCode, eventName }) => {
  console.log(product);
  if (Platform.OS === "ios") {
    StatusBar.setBarStyle("dark-content", true);
  }

  Mixpanel.screen("Preview Product");
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
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
      <Content padder>
        <View style={styles.productBar}>
          <Text style={[styles.meta, styles.category, styles.successMsg]}>
            ¡Gana dinero compartiendo!{" "}
          </Text>
          <Text style={styles.header}>{product.title}</Text>
          <Text style={styles.meta}>{product.vendor.toUpperCase()}</Text>
          <Spacer size={8} />
          {product.variants.length && product.variants[0].compare_at_price ? (
            <Text style={styles.productPriceCompare} note>
              $
              {Number(product.variants[0].compare_at_price).toLocaleString(
                "es-CO",
                {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0
                }
              )}
            </Text>
          ) : product.variants.edges &&
            product.variants.edges.length &&
            product.variants.edges[0].node.compareAtPrice ? (
            <Text style={styles.productPriceCompare} note>
              $
              {Number(
                product.variants.edges[0].node.compareAtPrice
              ).toLocaleString("es-CO", {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
              })}
            </Text>
          ) : null}
          <Text style={styles.productPrice}>
            $
            {product.variants.length && product.variants[0].price
              ? Number(product.variants[0].price).toLocaleString("es-CO", {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0
                })
              : product.variants.edges &&
                product.variants.edges.length &&
                product.variants.edges[0].node.price
              ? Number(product.variants.edges[0].node.price).toLocaleString(
                  "es-CO",
                  {
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0
                  }
                )
              : 0}
          </Text>
          <Spacer size={8} />
          {!!product.image && !!product.image.src ? (
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
          ) : !!product.images[0] && !!product.images[0].src ? (
            <Image
              source={{ uri: product.images[0].src }}
              style={{
                height: 208,
                width: null,
                flex: 1,
                resizeMode: "contain",
                marginBottom: 16
              }}
            />
          ) : !!product.images.edges[0] &&
            !!product.images.edges[0].node.src ? (
            <Image
              source={{ uri: product.images.edges[0].node.src }}
              style={{
                height: 208,
                width: null,
                flex: 1,
                resizeMode: "contain",
                marginBottom: 16
              }}
            />
          ) : null}

          <Spacer size={16} />
          <View style={styles.cardFooter}>
            <Left style={styles.cardFooterLeft}>
              <View style={styles.promoWrap}>
                <Text style={styles.cardPromo}>
                  {product.discount > 0
                    ? "Descuento " + Math.round(product.discount, 0) + "%"
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
          {product.description
            ? product.description
            : product.body_html
            ? product.body_html.replace(/<(?:.|\n)*?>/gm, "")
            : null}
        </Text>
        <Spacer size={40} />
      </Content>
      <Footer
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          height: 96,
          elevation: 1,
          borderTopColor: "#EBEDF0",
          borderTopWidth: 1
        }}
      >
        <FooterTab>
          <Button
            full
            success
            style={{
              flexDirection: "row",
              borderRadius: 5
            }}
            onPress={() => {
              Mixpanel.track(eventName || "Share Product", {
                product_id: product.id,
                product_name: product.title,
                page: "preview_product"
              });
              Mixpanel.track("Share Product: " + product.title);

              let url = `https://elenas.la/products/${product.handle}`;
              message = `${url} \n🎁🎄 *20% de descuento* en compras mayores a 100 mil pesos con el código de descuento *NAVIDAD* 🎉🎄.`;
              if (sellerCode) {
                message += `\nEnvío gratis con mi código de embajadora: *${sellerCode}*`;
              }

              {
                product.variants.length
                  ? (price = `$${Number(
                      product.variants[0].price
                    ).toLocaleString("es-CO", {
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0
                    })}`)
                  : product.variants.edges && product.variants.edges.length
                  ? (price = `$${Number(
                      product.variants.edges[0].node.price
                    ).toLocaleString("es-CO", {
                      maximumFractionDigits: 0,
                      minimumFractionDigits: 0
                    })}`)
                  : null;
              }

              //image_url
              {
                !!product.image && !!product.image.src
                  ? (image_url = product.image.src)
                  : !!product.images[0] && !!product.images[0].src
                  ? (image_url = product.images[0].src)
                  : !!product.images.edges[0] &&
                    !!product.images.edges[0].node.src
                  ? (image_url = product.images.edges[0].node.src)
                  : null;
              }

              Share.share(
                message,
                [`${image_url.split("=")[1]}.png`],
                [price],
                [image_url]
              );
            }}
          >
            <Icon
              name="whatsapp"
              type="FontAwesome"
              style={{ color: "white", marginRight: 0 }}
            />
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
    paddingHorizontal: 24,
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
  cardFooterLeft: {
    flex: null
  },
  cardFooterRight: {
    paddingBottom: 4
  },
  promoWrap: {
    paddingRight: 24,
    position: "absolute",
    bottom: -40
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
