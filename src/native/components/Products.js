import React from "react";
import PropTypes from "prop-types";
import {
  StatusBar,
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import {
  View,
  Container,
  Content,
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

import Loading from "./Loading";
import Spacer from "./Spacer";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import { Mixpanel } from "../../actions/mixpanel";

import Share from "./CustomShareModule";
import Client from "graphql-js-client";

// This is the generated type bundle from graphql-js-schema
import types from "../../constants/types";

const acessToken = "c00853c510a8221f272e03e862d884d7";
const storeUrl = "https://descubre-belleza.myshopify.com/api/graphql";

export const client = new Client(types, {
  url: storeUrl,
  fetcherOptions: {
    headers: {
      "X-Shopify-Storefront-Access-Token": acessToken
    }
  }
});

const { height, width } = Dimensions.get("window");
const itemWidth = (width - Colors.contentPadding) / 2;

const onPress = (item, sellerCode) => {
  Actions.productsGrid({ content: item, sellerCode: sellerCode });
};

const keyExtractor = item => item.node.id.toString();

class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingCollections: true,
      collections: []
    };
  }

  componentWillMount() {
    let titles = "'Maquillaje' OR 'Cuidado de piel' OR 'Cuidado del cabello' OR 'Cuidado personal' OR 'Accesorios para mujer' OR 'Accesorios para hombre' OR 'Fragancias' NOT 'Regala' NOT 'Año'";
    const query = client.query(root => {
      root.add("shop", shop => {
        // shop.add("name");
        shop.add(
          "collectionByHandle",
          { args: { handle: "black-friday" }, alias: "blackFriday" },
          collection => {
            collection.add("title");
            collection.add("image", image => {
              image.add("src");
            });
            collection.addConnection(
              "products",
              { args: { first: 30 } },
              product => {
                product.add("title");
                product.add("vendor");
                product.add("description");
                product.add("descriptionHtml");
                product.addConnection(
                  "images",
                  { args: { first: 1 } },
                  image => {
                    image.add("src");
                  }
                );
                product.addConnection(
                  "variants",
                  { args: { first: 1 } },
                  variant => {
                    variant.add("compareAtPrice");
                    variant.add("price");
                  }
                );
              }
            );
          }
        );
        shop.add(
          "collectionByHandle",
          { args: { handle: "fragancias" }, alias: "Fragancias" },
          collection => {
            collection.add("title");
            collection.add("image", image => {
              image.add("src");
            });
            collection.addConnection(
              "products",
              { args: { first: 30 } },
              product => {
                product.add("title");
                product.add("vendor");
                product.add("description");
                product.add("descriptionHtml");
                product.addConnection(
                  "images",
                  { args: { first: 1 } },
                  image => {
                    image.add("src");
                  }
                );
                product.addConnection(
                  "variants",
                  { args: { first: 1 } },
                  variant => {
                    variant.add("compareAtPrice");
                    variant.add("price");
                  }
                );
              }
            );
          }
        );
        shop.addConnection(
          "collections",
          { args: { first: 7, reverse: true, query:`title:${titles}`} },
          collection => {
            collection.add("title");
            collection.add("image", image => {
              image.add("src");
            });
            collection.addConnection(
              "products",
              { args: { first: 30 } },
              product => {
                product.add("title");
                product.add("vendor");
                product.add("description");
                product.add("descriptionHtml");
                product.addConnection(
                  "images",
                  { args: { first: 1 } },
                  image => {
                    image.add("src");
                  }
                );
                product.addConnection(
                  "variants",
                  { args: { first: 1 } },
                  variant => {
                    variant.add("compareAtPrice");
                    variant.add("price");
                  }
                );
              }
            );
          }
        );
        // shop.addConnection("productTypes", { args: { first: 10 } });
      });
    });

    let objects;

    client.send(query).then(({ model, data }) => {
      objects = model;
      //console.log(model); // The serialized model with rich features
      //console.log(data.shop.collections.edges); // The raw data returned from the API endpoint
      this.setState({
        collections: data.shop.collections.edges,
        loadingCollections: false
      });
    });
    // const shopQuery = {
    //   shop {
    //     name
    //     collections(first: 5) {
    //       edges {
    //         node {
    //           products(first: 5) {
    //             edges {
    //               node {
    //                 title
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // };
    // shopify.shop
    //   .fetchInfo()
    //   .then(res => {
    //     console.log(res);
    //     // this.setState({
    //     //   collection: res,
    //     //   loadingCollection: false
    //     // });
    //   })
    //   .catch(error => this.setState({ error, loading: false }));
    //
    // const collectionQuery = {
    //   last: 10,
    //   query:
    //     "title:'Maquillaje' OR 'Fragancia'  OR 'Cabello'  OR 'Piel'  OR 'Depilación'  OR 'Personal' OR 'Accesorios'"
    // };
    //
    // shopify.collection
    //   .fetchQuery(collectionQuery)
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       collections: res,
    //       loadingCollections: false
    //     });
    //   })
    //   .catch(error => this.setState({ error, loadingCollections: false }));
  }

  render() {
    Mixpanel.screen("Products");
    if (Platform.OS === "ios") {
      StatusBar.setBarStyle("dark-content", true);
    }
    // Loading
    if (this.state.loadingCollections) return <Loading />;

    return (
      <Container style={styles.container}>
        <Content padder>
          <FlatList
            numColumns={2}
            data={this.state.collections}
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.element}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onPress(item, this.props.member.code)}
                style={styles.link}
              >
                <ImageBackground
                  source={
                    item.node.image
                      ? { uri: item.node.image.src }
                      : require("../assets/images/default.png")
                  }
                  style={styles.imgBackground}
                >
                  <View style={styles.imgOverlay}>
                    <Text numberOfLines={1} style={styles.imgText}>
                      {item.node.title}
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
            keyExtractor={keyExtractor}
          />
        </Content>
      </Container>
    );
  }
}

Products.propTypes = {
  error: PropTypes.string
};

Products.defaultProps = {
  error: null
};

export default Products;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  list: {
    justifyContent: "space-between"
  },
  element: {
    justifyContent: "space-between",
    marginHorizontal: -Colors.contentPadding / 2
  },
  link: {
    width: itemWidth,
    padding: Colors.contentPadding / 2
  },
  imgBackground: {
    height: itemWidth
  },
  imgOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(32,18,62,.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  imgText: {
    fontSize: 20,
    marginTop: 0,
    color: "white",
    fontFamily: "playfair",
    lineHeight: itemWidth,
    textAlign: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    maxWidth: itemWidth - 2 * Colors.contentPadding
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
