import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
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

const ClientDetail = ({ error, loading, member, ordersTitle }) => {
  Mixpanel.screen("Client");
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  console.log(member.clients);
  // const onPress = item =>
  //   Actions.recipe({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        {member.clients || member.clients.length > 0 ? (
          <View>
            <View style={styles.userBar}>
              <View style={styles.userImg}>
                <Image
                  style={styles.userAvatar}
                  source={require("../assets/images/avatar.png")}
                />
                <Button
                  style={styles.callButton}
                  block
                  transparent
                  light
                  small
                  iconLeft
                  onPress={() =>
                    call({
                      number: "" + item.user.cellphone,
                      prompt: false
                    })
                  }
                >
                  <Icon
                    style={styles.callButtonIcon}
                    type="SimpleLineIcons"
                    name="phone"
                  />
                  <Text style={styles.callButtonText}>Llamar</Text>
                </Button>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userGreeting} numberOfLines={1}>
                  {member.clients[0].user.first_name}{" "}
                  {member.clients[0].user.last_name}
                </Text>
                <Text style={styles.userMessage}>
                  Tu cliente hace <TimeAgo time={member.clients[0].date} />
                </Text>

                <Spacer size={8} />
                <View style={styles.userNumbers}>
                  <View>
                    <Text style={styles.userCode}>
                      ${Math.round(
                        member.clients[0].total_ordered
                      ).toLocaleString("es-CO", {
                        maximumFractionDigits: 0
                      })}
                    </Text>
                    <Text style={styles.userNumberLabel}>Ordenes Totales</Text>
                  </View>
                  <Spacer size={20} />

                  <Spacer size={20} />
                  <View>
                    <Text style={styles.userClients}>
                      {member.clients ? member.clients.length : 0}
                    </Text>
                    <Text style={styles.userNumberLabel}>Ordenes</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.meta}>{ordersTitle.toUpperCase()}</Text>
              <Spacer size={8} />
            </View>
            <FlatList
              numColumns={1}
              data={member.orders}
              renderItem={({ item }) => (
                <Card transparent style={styles.card}>
                  <CardItem style={styles.cardBody}>
                    <Left style={styles.orderLeft}>
                      <View>
                        <Text numberOfLines={1} style={styles.name}>
                          {/* TODO: create clients model */}
                          {item.client_name}
                        </Text>

                        <Text style={styles.orderTotal}>
                          ${Math.round(
                            item.total - item.tax - item.shipping
                          ).toLocaleString("es-CO", {
                            maximumFractionDigits: 0
                          })}
                        </Text>
                      </View>
                    </Left>
                    <Right style={styles.orderRight}>
                      {item.status === "ordered" && (
                        <Badge primary>
                          <Text style={styles.badge}>Ordenado</Text>
                        </Badge>
                      )}
                      {item.status === "distribution" && (
                        <Badge info>
                          <Text style={styles.badge}>En Distribución</Text>
                        </Badge>
                      )}
                      {item.status === "completed" && (
                        <Badge success>
                          <Text style={styles.badge}>Completado</Text>
                        </Badge>
                      )}
                      {item.status === "cancelled" && (
                        <Badge danger>
                          <Text style={styles.badge}>Cancelado</Text>
                        </Badge>
                      )}
                      <Text
                        note
                        numberOfLines={1}
                        style={[styles.meta, styles.orderDate]}
                      >
                        Actualizado <TimeAgo time={item.date} />
                      </Text>
                    </Right>
                  </CardItem>
                </Card>
              )}
              keyExtractor={keyExtractor}
            />
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

ClientDetail.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  member: PropTypes.shape({}),
  ordersTitle: PropTypes.string
};

ClientDetail.defaultProps = {
  error: null,
  loading: false,
  member: {},
  ordersTitle: "Historial de Ordenes"
};

export default ClientDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  userBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.brandPrimary,
    // height: 104,
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
    fontSize: 12
  },
  userNumberLabel: {
    color: "#B09DE0",
    fontSize: 10
  },
  userNumbers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  userNumber: {
    justifyContent: "flex-end",
    marginBottom: 8
  },
  userSales: {
    fontSize: 20,
    color: Colors.brandPrimary,
    marginVertical: 16
  },
  userCurrency: {
    fontSize: 16,
    color: "white"
  },
  userCode: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    marginTop: 8
  },
  userClients: {
    fontSize: 15,
    color: "white",
    marginTop: 8,
    textAlign: "center"
  },
  userImg: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  userAvatar: {
    marginBottom: 12
  },
  userInfo: {
    flex: 1,
    width: "100%"
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
  meta: {
    fontSize: 10,
    color: "#C3C5C7"
  },
  orderDate: {
    alignSelf: "flex-end",
    marginTop: 4,
    minWidth: 125,
    textAlign: "right"
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 0
  },
  meta: {
    fontSize: 10,
    color: "#C3C5C7",
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
    paddingHorizontal: 16,
    paddingTop: 12
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
