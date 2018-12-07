import React from "react";
import PropTypes from "prop-types";
import {
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

import shopify from "../../constants/shopify";

import Loading from "./Loading";
import Spacer from "./Spacer";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");

import { Mixpanel } from "../../actions/mixpanel";

import Share from "./CustomShareModule";

const { height, width } = Dimensions.get("window");
const itemWidth = (width - Colors.contentPadding) / 3;

const onPress = (item, sellerCode) => {
  Actions.previewProduct({ product: item, sellerCode: sellerCode });
};

const keyExtractor = item => item.id.toString();

class ProductsGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingCollection: true,
      products: []
    };
  }

  componentWillMount() {
    console.log(this.props.content.id);
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

    // const productQuery = {
    //   first: 30,
    //   query: "collectionId:[" + this.props.content.id + "]"
    // };

    shopify.collection
      .fetchWithProducts(this.props.content.id)
      .then(res => {
        console.log(res.products);
        this.setState({
          collection: res,
          loadingCollection: false
        });
      })
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    Mixpanel.screen("ProductsGrid");
    // Loading
    if (this.state.loadingCollection) return <Loading />;

    return (
      <Container style={styles.container}>
        <Content padder>
          <FlatList
            numColumns={3}
            data={this.state.collection.products}
            contentContainerStyle={styles.list}
            columnWrapperStyle={styles.element}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => onPress(item, this.props.sellerCode)}
                style={styles.link}
              >
                <ImageBackground
                  source={
                    item.images.length && item.images[0].src
                      ? { uri: item.images[0].src }
                      : require("../assets/images/default.png")
                  }
                  style={styles.imgBackground}
                >
                  <View style={styles.imgOverlay}>
                    <Text numberOfLines={1} style={styles.imgText}>
                      {item.title}
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

ProductsGrid.propTypes = {
  error: PropTypes.string
};

ProductsGrid.defaultProps = {
  error: null
};

export default ProductsGrid;

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
    fontSize: 14,
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
