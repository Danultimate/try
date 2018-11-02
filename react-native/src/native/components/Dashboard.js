import React from "react";
import PropTypes from "prop-types";
import { Asset, Font } from "expo";
import {
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  Share
} from "react-native";
import {
  View,
  Container,
  Content,
  Icon,
  Thumbnail,
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

import Loading from "./Loading";
import Error from "./Error";
import Spacer from "./Spacer";

import Notifications from "./Notifications";
import Contents from "./Contents";
import Products from "./Products";

import TimeAgo from "react-native-timeago";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: [],
      error: null
    };
  }

  componentWillMount() {
    const productQuery = {
      first: 5,
      query: "tag:['diciembre']"
    };

    this.props.shopify.product
      .fetchQuery(productQuery)
      .then(res => {
        this.setState({
          products: res,
          loading: false
        });
      })
      .catch(error => this.setState({ error, loading: false }));
  }
  render() {
    // Loading
    if (this.state.loading) return <Loading />;

    // Error
    if (this.state.error) return <Error content={this.state.error} />;

    const keyExtractor = item => item.id.toString();

    const onPress = item => {
      console.log(item.id);
      Actions.preview({ match: { params: { id: String(item.id) } } });
    };

    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Content padder>
          <View style={styles.userBar}>
            <View style={styles.userImg}>
              <Image
                style={styles.userAvatar}
                source={require("../assets/images/avatar.png")}
              />
              <Text style={styles.userCode}>{this.props.member.code}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userGreeting}>
                {this.props.member.firstName
                  ? "¡Hola " + this.props.member.firstName + ", muy bien!"
                  : "¡Hola, mujer poderosa!"}
              </Text>
              <Text style={styles.userMessage}>
                {this.props.member.total_month
                  ? "Vas mejorando tu anterior mes :)"
                  : "Hoy puede ser un gran día :)"}
              </Text>
              <Spacer size={10} />
              <View style={styles.userNumbers}>
                <Text style={styles.userNumberLabel}>Ventas </Text>
                <Text style={styles.userSales}>
                  <Text style={styles.userCurrency}>$</Text>
                  {this.props.member.total_month
                    ? this.props.member.total_month
                    : 0}
                </Text>
                <Spacer size={10} />
                <Text style={styles.userClients}>
                  {this.props.member.clients
                    ? this.props.member.clients.length
                    : 0}
                </Text>
                <Text style={styles.userNumberLabel}> clientes</Text>
              </View>
            </View>
          </View>

          <Notifications orders={this.props.member.orders} />

          <Contents contents={this.props.contents} />
          <Spacer size={8} />
          <Products products={this.state.products} />

          <Card style={styles.card}>
            <CardItem
              header
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 0
              }}
            >
              <Image source={require("../assets/images/msg-success.png")} />
            </CardItem>
            <CardItem style={styles.cardBody}>
              {/* aqui colocar el condicional */}
              <Body>
                <Text
                  style={[styles.header, styles.successMsg, styles.textCenter]}
                >
                  ¡Eres una vendedora super poderosa!
                </Text>
                <Text style={[styles.meta, styles.date]}>Hace 26 minutos</Text>
                <Spacer size={8} />
                <Text style={styles.description}>
                  Tus ventas de la semana pasada te colocan dentro de nuestras
                  mejores 50 vendedoras. ¡Felicitaciones!
                </Text>
                <Spacer size={16} />
              </Body>
              {/* aqui terminar el condicional */}
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
                  <Icon type="SimpleLineIcons" name="heart" />
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
                  onPress={() => {
                    Share.share(
                      {
                        message:
                          "¡Conviertete cómo yo en una vendedora super poderosa con Elenas!"
                      },
                      {}
                    );
                  }}
                >
                  <Icon type="SimpleLineIcons" name="share-alt" />
                  <Text style={styles.cardButtonText}>Compartir</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
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
                <Text
                  style={[styles.header, styles.warningMsg, styles.textCenter]}
                >
                  Tu cliente abandonó el carrito de compra
                </Text>
                <Text style={[styles.meta, styles.date]}>Hace 26 minutos</Text>
                <Spacer size={8} />
                <Text style={styles.description}>
                  Tu cliente Maria Perez agregó tres productos pero no terminó
                  su proceso de compra en el sitio web de Elenas…
                  <Text style={{ color: Colors.brandInfo }}>Ver más</Text>
                </Text>
                <Spacer size={16} />
              </Body>
            </CardItem>
            <CardItem style={styles.cardFooter} footer bordered>
              <Body>
                <Button
                  style={styles.cardButton}
                  block
                  transparent
                  info
                  small
                  iconLeft
                >
                  <Icon type="SimpleLineIcons" name="phone" />
                  <Text style={styles.cardButtonText}>Llamar</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          <Button style={styles.loadMore} block light>
            <Text style={styles.loadMoreText}>Cargar más</Text>
          </Button>

          <Card style={styles.card}>
            <CardItem
              header
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 0
              }}
            >
              <Image source={require("../assets/images/referral.png")} />
            </CardItem>
            <CardItem style={styles.cardBody}>
              <Body>
                <Text
                  style={[styles.header, styles.primaryMsg, styles.textCenter]}
                >
                  ¡Gana $50,000 por cada amiga referida!
                </Text>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  <Text style={[styles.meta, styles.textCenter]}>
                    Tu código de referidos:
                  </Text>
                  <Text style={[styles.referralCode, styles.textCenter]}>
                    {this.props.member.code}
                  </Text>
                </View>
                <Spacer size={8} />
                <Text style={styles.description}>
                  Comparte tu código y gana $50.000 que podrás reclamar en tu
                  próxima compra.
                </Text>
                <Spacer size={16} />
              </Body>
            </CardItem>
            <CardItem style={styles.cardFooter} footer bordered>
              <Body>
                <Button
                  style={styles.cardButton}
                  block
                  transparent
                  info
                  small
                  iconLeft
                  onPress={() => {
                    Share.share(
                      {
                        message:
                          "¡Compra en Elenas.la los mejores productos de belleza, y con mi código de vendedora recibe el envío grátis: " +
                          this.props.member.code +
                          "!"
                      },
                      {}
                    );
                  }}
                >
                  <Icon type="SimpleLineIcons" name="share-alt" />
                  <Text style={styles.cardButtonText}>Compartir</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          <Spacer size={30} />

          <View style={styles.supportWidget}>
            <Image source={require("../assets/images/support.png")} />
            <Text
              style={[
                styles.header,
                styles.primaryMsg,
                styles.textCenter,
                styles.supportHeader
              ]}
            >
              ¿Tienes alguna duda?
            </Text>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={Actions.contact}>
                <Text style={[{ color: Colors.brandInfo }, styles.supportText]}>
                  Contáctanos{" "}
                </Text>
              </TouchableOpacity>
              <Text style={[styles.textCenter, styles.supportText]}>
                o visita nuestro{" "}
              </Text>
            </View>
            <TouchableOpacity onPress={Actions.support}>
              <Text style={[{ color: Colors.brandInfo }, styles.supportText]}>
                Centro de Soporte
              </Text>
            </TouchableOpacity>
          </View>

          <Spacer size={30} />
        </Content>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  eror: PropTypes.string,
  //loading: PropTypes.bool.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  member: PropTypes.shape({}),
  reFetch: PropTypes.func
};

Dashboard.defaultProps = {
  error: null,
  reFetch: null,
  member: {}
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
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
  userAvatar: {
    marginBottom: 12
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
