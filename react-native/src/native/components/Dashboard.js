import React from "react";
import { AppLoading, Asset, Font } from "expo";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image
} from "react-native";
import {
  Container,
  Content,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Text,
  Button,
  H1,
  H2,
  H3
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
// import axios from "axios";

import Spacer from "./Spacer";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      loadedFonts: false,
      collections: [],
      products: [],
      error: null
    };
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("../assets/images/logo.png"),
        require("../assets/images/avatar.png")
      ]),
      Font.loadAsync({
        playfair: require("../assets/fonts/PlayfairDisplay-Bold.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ loadedFonts: true });
  };

  componentWillMount() {
    const collectionQuery = {
      first: 3,
      reverse: true
    };
    const productQuery = {
      first: 3,
      query: "tag:['halloween']"
    };
    this.props.shopify.collection
      .fetchQuery(collectionQuery)
      .then(collections => {
        this.setState({
          isLoading: false,
          collections: collections
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));

    this.props.shopify.product
      .fetchQuery(productQuery)
      .then(res => {
        console.log(res);
        this.setState({
          products: res
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    const keyExtractor = item => item.id.toString();

    if (this.state.isLoading && !this.state.loadedFonts) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Container>
        <Content padder>
          <View style={styles.userBar}>
            <View style={styles.userImg}>
              <Image source={require("../assets/images/avatar.png")} />
              <Text style={styles.userCode}>pau-qmj</Text>
            </View>
            <View style={styles.userInfo}>
              <H3 style={styles.userGreeting}>
                ¡Hola {this.props.member.firstName}, muy bien!
              </H3>
              <Text style={styles.userMessage}>
                Vas mejorando tu anterior mes :)
              </Text>
              <Spacer size={10} />
              <View style={styles.userNumbers}>
                <Text style={styles.userNumberLabel}>Ventas</Text>
                <Text style={styles.userSales}>
                  <Text style={styles.userCurrency}>$</Text>258.650
                </Text>
                <Spacer size={10} />
                <Text style={styles.userClients}>32</Text>
                <Text style={styles.userNumberLabel}>clientes</Text>
              </View>
            </View>
          </View>
          <FlatList
            numColumns={1}
            data={this.state.collections}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <CardItem cardBody>
                  <TouchableOpacity
                    onPress={() => onPress(item)}
                    style={{ flex: 1 }}
                  >
                    {!!item.image &&
                      !!item.image.src && (
                        <Image
                          source={{ uri: item.image.src }}
                          style={{
                            height: 192,
                            width: null,
                            flex: 1
                          }}
                        />
                      )}
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body style={styles.cardBody}>
                    <Spacer size={8} />
                    <H3 style={styles.header}>{item.title}</H3>
                    <Text style={styles.meta}>
                      <Text style={[styles.meta, styles.category]}>
                        Para compartir{" "}
                      </Text>
                      <Text style={[styles.meta, styles.date]}>
                        • Hace 30 minutos
                      </Text>
                    </Text>
                    <Spacer size={8} />
                    {!!item.description && (
                      <Text style={styles.description}>{item.description}</Text>
                    )}
                    <Spacer size={16} />
                  </Body>
                </CardItem>
                <CardItem style={styles.cardFooter} footer bordered>
                  <Left>
                    <Button
                      style={styles.cardButton}
                      block
                      transparent
                      info
                      small
                      iconLeft
                      onPress={() => onPress(item)}
                    >
                      <Icon type="FontAwesome" name="star" />
                      <Text style={styles.cardButtonText}>Me encanta</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Button
                      style={styles.cardButton}
                      block
                      transparent
                      info
                      small
                      iconLeft
                      onPress={() => onPress(item)}
                    >
                      <Icon type="FontAwesome" name="share-square" />
                      <Text style={styles.cardButtonText}>Compartir</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            )}
            keyExtractor={keyExtractor}
          />
          <Spacer size={8} />
          <Text style={styles.meta}>PRODUCTOS DE LA CAMPAÑA</Text>
          <Spacer size={8} />
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.products}
            renderItem={({ item }) => (
              <Card transparent style={styles.transparentCard}>
                <CardItem cardBody>
                  <TouchableOpacity
                    onPress={() => onPress(item)}
                    style={{ flex: 1 }}
                  >
                    {!!item.images &&
                      !!item.images[0].src && (
                        <Image
                          source={{ uri: item.images[0].src }}
                          style={{
                            height: 168,
                            width: null,
                            flex: 1
                          }}
                        />
                      )}
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody style={styles.transparentCard}>
                  <Body>
                    <Spacer size={8} />
                    <H3 style={[styles.header, styles.productTitle]}>
                      {item.title}
                    </H3>
                    <Text style={styles.meta}>{item.vendor.toUpperCase()}</Text>
                    <Spacer size={16} />
                  </Body>
                </CardItem>
              </Card>
            )}
            keyExtractor={keyExtractor}
          />

          <Spacer size={30} />
          <H2 style={styles.header}>Heading 2</H2>
          <Spacer size={10} />
          <Text>
            Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
            cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
            justo sit amet risus. Etiam porta sem malesuada magna mollis
            euismod. Donec sed odio dui.{" "}
          </Text>

          <Spacer size={30} />
          <H3 style={styles.header}>Heading 3</H3>
          <Spacer size={10} />
          <Text>
            Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
            cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
            justo sit amet risus. Etiam porta sem malesuada magna mollis
            euismod. Donec sed odio dui.{" "}
          </Text>
        </Content>
      </Container>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  userBar: {
    flexDirection: "row",
    backgroundColor: Colors.brandPrimary,
    height: 104,
    padding: 12,
    marginTop: -10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10
  },
  userGreeting: {
    fontFamily: "playfair",
    color: "white",
    fontSize: 24,
    lineHeight: 24
  },
  userMessage: {
    color: "#B09DE0",
    fontSize: 14
  },
  userNumberLabel: {
    color: "#B09DE0",
    fontSize: 10,
    marginTop: 16
  },
  userSales: {
    fontSize: 26,
    color: "white"
  },
  userCurrency: {
    fontSize: 16,
    color: "white"
  },
  userClients: {
    fontSize: 18,
    color: "white",
    marginTop: 8
  },
  userImg: {
    flex: 0.2,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  userCode: {
    fontSize: 10,
    textAlign: "center",
    color: "#B09DE0"
  },
  userInfo: { flex: 0.8 },
  userNumbers: {
    flexDirection: "row",
    height: 32
  },
  card: {
    shadowColor: "#E2E1E6",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  header: {
    fontFamily: "playfair",
    fontSize: 32,
    marginBottom: 8,
    lineHeight: 30
  },
  meta: {
    fontSize: 10
  },
  description: {
    fontSize: 18
  },
  category: {
    fontWeight: "bold",
    color: Colors.brandSuccess,
    marginBottom: 8
  },
  cardBody: {
    borderTopColor: Colors.brandSuccess,
    borderTopWidth: 2,
    paddingHorizontal: 16,
    paddingTop: 12
  },
  cardButtonText: {
    paddingHorizontal: 2
  },
  cardFooter: {
    borderBottomWidth: 0,
    borderTopColor: "#EBEDF0",
    paddingHorizontal: 0
  },
  horizontalScroll: {},
  transparentCard: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: 128
  },
  productTitle: {
    fontSize: 16,
    lineHeight: 16
  }
});
