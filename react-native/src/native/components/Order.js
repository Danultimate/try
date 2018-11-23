import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StatusBar,
  Image
} from "react-native";
import {
  View,
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Right,
  Body,
  Badge,
  Text,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";
import Colors from "../../../native-base-theme/variables/commonColor";
import Loading from "./Loading";
import Error from "./Error";
import Spacer from "./Spacer";

import TimeAgo from "react-native-timeago";
import moment from "moment"; //load moment module to set local language
import "moment/locale/es"; //for import moment local language file during the application build
import call from "react-native-phone-call";
moment.locale("es");

import { Mixpanel } from "../../actions/mixpanel";

const keyExtractor = item => item.id.toString();

const OrderDetail = ({ error, loading, member, ordersTitle }) => {
  Mixpanel.screen("Client");
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // const onPress = item =>
  //   Actions.recipe({ match: { params: { id: String(item.id) } } });
  console.log("el member");
  console.log(member);
  return (
    <Container style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Content padder>
        {member.orders[0] ? (
          <View>
            <View style={styles.orderBar}>
              <View style={styles.orderInfo}>
                <View style={styles.orderLeft}>
                  <Text style={styles.orderUser} numberOfLines={1}>
                    {member.orders[0].client_name}
                  </Text>
                  <Text style={styles.orderDate}>
                    Realizó una orden <TimeAgo time={member.orders[0].date} />
                  </Text>
                </View>
                <View style={styles.orderRight}>
                  {member.orders[0].status === "ordered" && (
                    <Badge primary>
                      <Text style={styles.badge}>Ordenado</Text>
                    </Badge>
                  )}
                  {member.orders[0].status === "distribution" && (
                    <Badge info>
                      <Text style={styles.badge}>En Distribución</Text>
                    </Badge>
                  )}
                  {member.orders[0].status === "completed" && (
                    <Badge success>
                      <Text style={styles.badge}>Completado</Text>
                    </Badge>
                  )}
                  {member.orders[0].status === "cancelled" && (
                    <Badge danger>
                      <Text style={styles.badge}>Cancelado</Text>
                    </Badge>
                  )}
                </View>
              </View>
              <Spacer size={8} />
              <View style={styles.orderNumbers}>
                <View>
                  <Text style={styles.orderTotal}>
                    ${Math.round(member.orders[0].total).toLocaleString(
                      "es-CO",
                      {
                        maximumFractionDigits: 0
                      }
                    )}
                  </Text>
                  <Text style={styles.orderNumberLabel}>Valor total</Text>
                </View>
                <View>
                  <Text style={styles.orderNumber}>
                    {member.orders[0].order_number}
                  </Text>
                  <Text style={styles.orderNumberLabel}>No. de orden</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.meta}>{ordersTitle.toUpperCase()}</Text>
              <Spacer size={8} />
            </View>
            <FlatList
              numColumns={1}
              data={member.clients[0].orders}
              renderItem={({ item }) => (
                <Card transparent style={styles.card}>
                  <CardItem style={styles.cardBody}>
                    <Left style={styles.orderLeft}>
                      <Image
                        style={{ width: 55, height: 72 }}
                        source={{
                          uri:
                            "https://placehold.it/1000x1500?text=Product+Image"
                        }}
                      />
                      <Body style={styles.orderLeftBody}>
                        <Text
                          numberOfLines={1}
                          style={[styles.header, styles.productTitle]}
                        >
                          {"Sombras Hd"}
                        </Text>
                        <Text style={[styles.meta, { marginLeft: 0 }]}>
                          {"ESIKA"}
                        </Text>
                      </Body>
                    </Left>
                    <Right style={styles.orderRight}>
                      <Text style={styles.itemPrice}>
                        ${Math.round(
                          item.total - item.tax - item.shipping
                        ).toLocaleString("es-CO", {
                          maximumFractionDigits: 0
                        })}
                      </Text>
                    </Right>
                  </CardItem>
                </Card>
              )}
              keyExtractor={keyExtractor}
            />
            <View style={styles.orderTotalBar}>
              <Text style={styles.orderTotalBarLabel}>{"Total"}</Text>
              <Text style={styles.orderTotalBarNumber}>{"$124.000"}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.supportWidget}>
            <Spacer size={16} />
            <Image source={require("../assets/images/support.png")} />
            <Spacer size={16} />
            <Text style={[styles.header, styles.primaryMsg, styles.textCenter]}>
              ¡Aún no tienes clientes!
            </Text>
            <Spacer size={16} />
            <Text style={styles.textCenter}>
              Comparte las campañas con posibles clientes cómo tus familiares o
              amigos cercanos y comienza hoy mismo a ganar dinero extra con
              Elenas.
            </Text>
            <Spacer size={16} />

            <TouchableOpacity onPress={Actions.home}>
              <Text
                style={[
                  styles.supportText,
                  styles.textCenter,
                  { color: Colors.brandInfo }
                ]}
              >
                Ir al contenido
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

OrderDetail.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  client: PropTypes.shape({}),
  ordersTitle: PropTypes.string
};

OrderDetail.defaultProps = {
  error: null,
  loading: false,
  client: {},
  ordersTitle: "Detalle de la Orden"
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  orderBar: {
    backgroundColor: "#fff",
    borderBottomColor: "#EEEDF2",
    borderBottomWidth: 1,
    padding: 12,
    marginTop: -10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10
  },
  orderLeftBody: {
    alignSelf: "flex-start"
  },
  orderRight: {
    alignSelf: "flex-start"
  },
  orderUser: {
    fontFamily: "playfair",
    color: Colors.brandPrimary,
    fontSize: 24,
    lineHeight: 24
  },
  orderNumberLabel: {
    color: Colors.tabBarTextColor,
    fontSize: 10
  },
  orderNumbers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  orderCurrency: {
    fontSize: 16,
    color: Colors.brandPrimary
  },
  orderTotal: {
    color: Colors.brandPrimary,
    marginTop: 8,
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 0
  },
  orderDate: {
    marginTop: 4,
    minWidth: 125,
    color: Colors.tabBarTextColor,
    fontSize: 12
  },
  orderNumber: {
    fontSize: 24,
    color: Colors.brandPrimary,
    marginTop: 8,
    textAlign: "center"
  },
  orderInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  orderTotalBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: Colors.brandLight,
    padding: 12
  },
  orderTotalBarLabel: {
    fontFamily: "playfair",
    color: Colors.brandPrimary
  },
  orderTotalBarNumber: {
    alignSelf: "flex-end",
    textAlign: "right",
    fontWeight: "700",
    color: Colors.brandPrimary
  },
  clientImg: {
    justifyContent: "center",
    alignItems: "center"
  },
  clientInfo: {
    width: "50%"
  },
  clientTotal: {
    fontSize: 20,
    fontWeight: "bold"
  },
  clientRight: {
    flex: 0.35
  },
  clientLeft: {
    flex: 0.65
  },
  itemPrice: {
    fontWeight: "700"
  },
  header: {
    fontFamily: "playfair",
    fontSize: 24,
    marginBottom: 8,
    lineHeight: 28
  },
  name: {
    fontFamily: "playfair",
    fontSize: 16,
    marginBottom: 4,
    lineHeight: 18,
    fontWeight: "700"
  },
  callButton: {
    paddingLeft: 0,
    paddingRight: 0
  },
  callButtonText: {
    paddingLeft: 2,
    paddingRight: 2,
    fontSize: 10
  },
  callButtonIcon: {
    marginLeft: 0,
    fontSize: 10
  },
  productTitle: {
    fontSize: 16,
    lineHeight: 16,
    height: 18
  },
  productPrice: {
    marginLeft: 0,
    alignSelf: "flex-start",
    fontWeight: "700",
    fontSize: 13
  },
  meta: {
    fontSize: 10,
    color: Colors.tabBarTextColor,
    marginLeft: 0,
    textAlignVertical: "top"
  },
  badge: {
    fontSize: 10,
    marginLeft: 0,
    lineHeight: 20
  },
  card: {
    marginTop: 0,
    marginBottom: 1,
    shadowColor: "#E2E1E6",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 0,
    elevation: 2
  },
  cardBody: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 12,
    alignItems: "flex-start"
  },
  cardSuccess: {
    borderTopColor: Colors.brandSuccess,
    borderTopWidth: 2
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
  textRight: {
    textAlign: "right"
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
  }
});
