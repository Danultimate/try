import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Footer,
  FooterTab,
  View,
  Icon,
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
import ProductsList from "./ProductsList";

import TimeAgo from "react-native-timeago";
import moment from "moment"; //load moment module to set local language
import "moment/locale/es"; //for import moment local language file during the application build
moment.locale("es");

import { decode as atob } from "base-64";
import shopifyAPI from "../../constants/shopify_axios";

import { Mixpanel } from "../../actions/mixpanel";

import Share from "./CustomShareModule";

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const Preview = ({ error, content, sellerCode }) => {
  if (Platform.OS === "ios") {
    StatusBar.setBarStyle("dark-content", true);
  }
  Mixpanel.screen("Preview Content");
  // Error
  if (error) return <Error content={error} />;

  // console.log("hey esto es Preview Component: id, feed:");
  // console.log(contentId);
  // console.log(content);

  // Get this Recipe from all recipes
  // let content = null;

  // if (contentId && feed) {
  //   content = feed.find(
  //     //item => parseInt(item.id, 10) === parseInt(contentId, 10)
  //     item => item.id === contentId
  //   );
  // }

  // Recipe not found
  if (!content) return <Error content={ErrorMessages.content404} />;

  return (
    <Container style={styles.container}>
      <Content padder>
        <View style={styles.collectionBar}>
          <Text style={[styles.meta, styles.category, styles.successMsg]}>
            ¡Gana dinero compartiendo!{" "}
          </Text>
          <Text style={styles.header}>{content.title}</Text>
          {!!content.image &&
            !!content.image.src && (
              <Image
                source={{ uri: content.image.src }}
                style={{
                  height: 192,
                  width: null,
                  flex: 1,
                  marginBottom: 16
                }}
              />
            )}
          <Text style={styles.description}>
            {content.description ||
              content.body_html.replace(/<(?:.|\n)*?>/gm, "")}
          </Text>
          <Spacer size={16} />
          <View style={styles.cardFooter}>
            <Left style={styles.cardFooterLeft}>
              <Text style={[styles.meta, styles.successMsg]}>
                <Icon style={[styles.meta, styles.successMsg]} name="present" />{" "}
                Entrega gratuita:
              </Text>
              <Text style={[styles.meta]}>5 a 10 días hábiles</Text>
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
                    content_id: content.id,
                    content_name: content.title
                  });

                  console.log(content);

                  message = `Envío gratis con mi código: *${sellerCode}*`;

                  const start = async () => {
                    let images = [];
                    let priceTags = [];
                    let fileNames = [];
                    await asyncForEach(content.products, async product => {
                      images.push(product.image.src);
                      fileNames.push(`${product.image.src.split("=")[1]}.png`);
                      priceTags.push(
                        `$${Number(product.variants[0].price).toLocaleString(
                          "es-CO",
                          {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0
                          }
                        )}`
                      );
                    });

                    Share.share(message, fileNames, priceTags, images);
                  };
                  start();
                }}
              >
                <Icon name="whatsapp" type="FontAwesome" />
                <Text style={styles.cardButtonText}>Compartir</Text>
              </Button>
            </Right>
          </View>
        </View>

        <Spacer size={8} />
        <View style={styles.productsBar}>
          <Text style={[styles.meta, styles.leftContainer]}>
            {content.products.length} productos
          </Text>
          <Text style={[styles.meta, styles.rightContainer]}>
            desde ${Math.round(content.min_price).toLocaleString("es-CO", {
              maximumFractionDigits: 0
            })}
          </Text>
        </View>
        <Spacer size={8} />
        <ProductsList products={content.products} sellerCode={sellerCode} />
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
              Mixpanel.track("Share Content", {
                content_id: content.id,
                content_name: content.title
              });

              message = `Envío gratis con mi código: *${sellerCode}*`;

              const start = async () => {
                let images = [];
                let priceTags = [];
                let fileNames = [];
                await asyncForEach(content.products, async product => {
                  images.push(product.image.src);
                  fileNames.push(`${product.image.src.split("=")[1]}.png`);
                  priceTags.push(
                    `$${Number(product.variants[0].price).toLocaleString(
                      "es-CO",
                      {
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0
                      }
                    )}`
                  );
                });

                Share.share(message, fileNames, priceTags, images);
              };
              start();
            }}
          >
            <Icon
              name="whatsapp"
              type="FontAwesome"
              style={{ color: "white", marginRight: 0 }}
            />
            <Text style={{ color: "white", fontSize: 16 }}>
              Compartir toda la colección
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

Preview.propTypes = {
  error: PropTypes.string
  // contentId: PropTypes.string.isRequired
  //feed: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

Preview.defaultProps = {
  error: null
};

export default Preview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.brandLight
  },
  collectionBar: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginTop: -10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10
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
    height: 40,
    shadowColor: "transparent",
    shadowOpacity: 0
  },
  cardButtonText: {
    paddingLeft: 8,
    paddingRight: 8
  },
  cardFooter: {
    flexDirection: "row"
  },
  productsBar: {
    flexDirection: "row"
  },
  cardFooterLeft: {
    flex: 0.5
  },
  cardFooterRight: {
    flex: 0.5
  },
  cardFooterText: {
    fontSize: 12,
    marginLeft: 0,
    color: Colors.tabBarTextColor
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
    alignItems: "center",
    textAlign: "right"
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
    lineHeight: 16
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
