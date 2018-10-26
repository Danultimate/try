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

import TimeAgo from "react-native-timeago";
import moment from "moment"; //load moment module to set local language
import "moment/locale/es"; //for import moment local language file during the application build
moment.locale("es");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      collections: [],
      products: [],
      notificationsTitle: "Notificaciones",
      notifications: [
        {
          title: "Nueva Orden",
          description:
            "¡Juliana Villa ha completado una orden de 3 productos por $75,000!",
          createdAt: "Hace 3 minutos",
          id: 1
        },
        {
          title: "Pedido Entregado",
          description: "Teresa Lizcano ha recibido su orden por 5 productos",
          createdAt: "Hace 3 minutos",
          id: 2
        },
        {
          title: "Nueva Orden",
          description:
            "¡Juliana Villa ha completado una orden de 3 productos por $75,000!",
          createdAt: "Hace 3 minutos",
          id: 3
        }
      ],
      error: null,
      productsTitle: "Productos de la campaña"
    };
  }

  componentWillMount() {
    const collectionQuery = {
      first: 3,
      reverse: true
    };
    const productQuery = {
      first: 5,
      query: "tag:['halloween']"
    };
    this.props.shopify.collection
      .fetchQuery(collectionQuery)
      .then(collections => {
        //console.log(collections);
        this.setState({
          isLoading: false,
          collections: collections
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));

    this.props.shopify.product
      .fetchQuery(productQuery)
      .then(res => {
        //console.log(res);
        this.setState({
          products: res
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
              <Text style={styles.userCode}>pau-qmj</Text>
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
                <Text style={styles.userClients}>32</Text>
                <Text style={styles.userNumberLabel}> clientes</Text>
              </View>
            </View>
          </View>

          <View style={styles.notifications}>
            <Text style={styles.meta}>
              {this.state.notificationsTitle.toUpperCase()}
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={this.state.notifications}
              renderItem={({ item }) => (
                <Card style={styles.notification}>
                  <CardItem cardBody>
                    <Body style={styles.notificationBody}>
                      <View style={styles.notificationHeader}>
                        <View style={styles.leftContainer}>
                          <Text
                            style={[
                              styles.header,
                              styles.notificationTitle,
                              styles.primaryMsg
                            ]}
                            numberOfLines={1}
                          >
                            <Image
                              source={require("../assets/images/notification.png")}
                            />
                            {" " + item.title}
                          </Text>
                        </View>
                        <View style={styles.rightContainer}>
                          <Text style={[styles.meta, styles.notificationDate]}>
                            {item.createdAt}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.notificationText}>
                        {item.description}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
              )}
              keyExtractor={keyExtractor}
            />
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
                  <Body style={[styles.cardBody, styles.cardSuccess]}>
                    <Spacer size={8} />
                    <H3 style={styles.header}>{item.title}</H3>
                    <Text style={styles.meta}>
                      <Text
                        style={[
                          styles.meta,
                          styles.category,
                          styles.successMsg
                        ]}
                      >
                        Para compartir{" "}
                      </Text>
                      <Text style={[styles.meta, styles.date]}>
                        • <TimeAgo time={item.updatedAt} />
                      </Text>
                    </Text>
                    <Spacer size={8} />
                    {!!item.description && (
                      <Text numberOfLines={3} style={styles.description}>
                        {item.description}
                      </Text>
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
          <Text style={styles.meta}>
            {this.state.productsTitle.toUpperCase()}
          </Text>
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
              <Body>
                <H3
                  style={[styles.header, styles.successMsg, styles.textCenter]}
                >
                  ¡Eres una vendedora super poderosa!
                </H3>
                <Text style={[styles.meta, styles.date]}>Hace 26 minutos</Text>
                <Spacer size={8} />
                <Text style={styles.description}>
                  Tus ventas de la semana pasada te colocan dentro de nuestras
                  mejores 50 vendedoras. ¡Felicitaciones!
                </Text>
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
                  <Icon type="FontAwesome" name="phone" />
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
                    YW6Op98
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
                  <Icon type="FontAwesome" name="share-square" />
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
    lineHeight: 30
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
