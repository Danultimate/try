import React from "react";
import PropTypes from "prop-types";
import { AppLoading, Asset, Font } from "expo";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  Share
} from "react-native";
import {
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
  Button,
  H1,
  H2,
  H3
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import Spacer from "./Spacer";

import Notifications from "./Notifications";
import Contents from "./Contents";
import Products from "./Products";

import TimeAgo from "react-native-timeago";
import moment from "moment"; //load moment module to set local language
import "moment/locale/es"; //for import moment local language file during the application build
moment.locale("es");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      products: [],
      notifications: [
        {
          title: "Nueva Orden",
          description:
            "¡Juliana Villa ha completado una orden de 3 productos por $75,000!",
          createdAt: "2018-10-25T13:51:12-04:00",
          id: 1
        },
        {
          title: "Pedido Entregado",
          description: "Teresa Lizcano ha recibido su orden por 5 productos",
          createdAt: "2018-09-25T13:51:12-04:00",
          id: 2
        },
        {
          title: "Nueva Orden",
          description:
            "¡Juliana Villa ha completado una orden de 3 productos por $75,000!",
          createdAt: "2018-10-25T13:51:12-04:00",
          id: 3
        }
      ],
      error: null,
    };
  }

  componentWillMount() {
    const productQuery = {
      first: 5,
      query: "tag:['halloween']"
    };

    this.props.shopify.product
      .fetchQuery(productQuery)
      .then(res => {
        this.setState({
          products: res,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    const keyExtractor = item => item.id.toString();

    const onPress = item => {
      console.log(item.id);
      Actions.preview({ match: { params: { id: String(item.id) } } });
    };

    if (this.state.isLoading) {
      return <AppLoading />;
    }
    return (
      <Container style={styles.container}>
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
                ¡Hola {this.props.member.firstName}, muy bien!
              </Text>
              <Text style={styles.userMessage}>
                Vas mejorando tu anterior mes :)
              </Text>
              <Spacer size={10} />
              <View style={styles.userNumbers}>
                <Text style={styles.userNumberLabel}>Ventas </Text>
                <Text style={styles.userSales}>
                  <Text style={styles.userCurrency}>$</Text>258.650
                </Text>
                <Spacer size={10} />
                {!!this.props.member.clients.length > 0 ? (
                  <Text style={styles.userClients}>
                    {this.props.member.clients.length}
                  </Text>) : (
                  <Text style={styles.userClients}>
                      0
                  </Text>
                )}
                <Text style={styles.userNumberLabel}> clientes</Text>
              </View>
            </View>
          </View>

          <Notifications notifications={this.state.notifications}></Notifications>

          <Contents contents={this.props.contents}></Contents>
          <Spacer size={8} />
          <Products products={this.state.products}></Products>


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
                <H3
                  style={[styles.header, styles.warningMsg, styles.textCenter]}
                >
                  Tu cliente abandonó el carrito de compra
                </H3>
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
                  onPress={() => onPress(item)}
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
                <H3
                  style={[styles.header, styles.primaryMsg, styles.textCenter]}
                >
                  ¡Gana $50,000 por cada amiga referida!
                </H3>
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
                  onPress={() => onPress(item)}
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
            <H3
              style={[
                styles.header,
                styles.primaryMsg,
                styles.textCenter,
                styles.supportHeader
              ]}
            >
              ¿Tienes alguna duda?
            </H3>
            <Text style={[styles.textCenter, styles.supportText]}>
              <Text style={[{ color: Colors.brandInfo }, styles.supportText]}>
                Contáctanos{" "}
              </Text>
              o visita nuestro{" "}
              <Text style={[{ color: Colors.brandInfo }, styles.supportText]}>
                Centro de Soporte
              </Text>
            </Text>
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
  member: {},
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
    lineHeight: 28,
    fontWeight: "700"
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
