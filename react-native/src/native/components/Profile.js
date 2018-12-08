import React from "react";
import PropTypes from "prop-types";
import { View, Image, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Text,
  Icon
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import Spacer from "./Spacer";
import Header from "./Header";
import Referral from "./Referral";
import SupportWidget from "./SupportWidget";

import { Mixpanel } from "../../actions/mixpanel";

const Profile = ({ member, logout }) => {
  Mixpanel.screen("Profile");
  console.log(member);
  return (
    <Container style={styles.container}>
      <Content padder>
        {member && (
          <View style={styles.userBar}>
            <View style={styles.userImg}>
              <Image
                style={styles.userAvatar}
                source={require("../assets/images/avatar.png")}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userGreeting}>
                {member.firstName
                  ? "¡Hola " + member.firstName + ", muy bien!"
                  : "¡Hola, mujer poderosa!"}
              </Text>
              {member.email && (
                <Text style={styles.userMessage}>
                  Tu correo es member.email
                </Text>
              )}
              <Spacer size={8} />
              <View style={styles.userNumbers}>
                <View>
                  <Text style={styles.userCode}>{member.code}</Text>
                  <Text style={styles.userNumberLabel}>Tu código</Text>
                </View>
                <Spacer size={20} />

                <Spacer size={20} />
                <View>
                  <Text style={styles.userClients}>
                    {member.clients ? member.clients.length : 0}
                  </Text>
                  <Text style={styles.userNumberLabel}> Clientes</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/*
            <Spacer size={16} />
            <Text style={styles.meta}>{"¿Cómo vas este mes?".toUpperCase()}</Text>
        <Card style={styles.card}>
          {member &&
            member.email && (
              <View>
                <CardItem bordered icon>
                  <Icon
                    style={styles.userSales}
                    type="SimpleLineIcons"
                    name="graph"
                  />
                  <Text
                    style={[styles.userSales, styles.leftText]}
                    numberOfLines={1}
                  >
                    Ventas del mes
                  </Text>
                  <Right style={styles.rightNumber}>
                    <Text style={[styles.rightText, styles.userSales]}>
                      ${member.validOrders
                        ? Math.round(
                            member.validOrders.reduce(
                              (a, b) => +a + b.total - b.tax - b.shipping,
                              0
                            )
                          ).toLocaleString("es-CO", {
                            maximumFractionDigits: 0
                          })
                        : 0}
                    </Text>
                  </Right>
                </CardItem>
                <CardItem icon>
                  <Icon type="SimpleLineIcons" name="calculator" />
                  <Text style={styles.leftText} numberOfLines={1}>
                    Ganancias del mes
                  </Text>
                  <Right style={styles.rightNumber}>
                    <Text style={styles.rightText}>
                      ${member.validOrders
                        ? Math.round(
                            member.validOrders.reduce(
                              (a, b) => +a + b.total - b.tax - b.shipping,
                              0
                            ) * member.commission
                          ).toLocaleString("es-CO", {
                            maximumFractionDigits: 0
                          })
                        : 0}
                    </Text>
                  </Right>
                </CardItem>
                <CardItem icon>
                  <Icon type="SimpleLineIcons" name="share-alt" />
                  <Text style={styles.leftText} numberOfLines={1}>
                    Ganancias por referidos
                  </Text>
                  <Right style={styles.rightNumber}>
                    <Text style={styles.rightText}>$35.500</Text>
                  </Right>
                </CardItem>
                <CardItem icon>
                  <Icon type="SimpleLineIcons" name="wallet" />
                  <Text style={styles.leftText} numberOfLines={1}>
                    Tu próximo pago
                  </Text>
                  <Right style={styles.rightNumber}>
                    <Text style={styles.rightText}>$25.500</Text>
                  </Right>
                </CardItem>
                <CardItem icon>
                  <Icon type="SimpleLineIcons" name="refresh" />
                  <Text style={styles.leftText} numberOfLines={1}>
                    Ganancias en proceso
                  </Text>
                  <Right style={styles.rightNumber}>
                    <Text style={styles.rightText}>$35.500</Text>
                  </Right>
                </CardItem>
                <CardItem icon>
                  <Icon type="SimpleLineIcons" name="bag" />
                  <Text style={styles.leftText} numberOfLines={1}>
                    Última orden
                  </Text>
                  <Right style={styles.rightNumber}>
                    <Text style={styles.rightText}>$35.500</Text>
                  </Right>
                </CardItem>
                <CardItem icon>
                  <Icon type="SimpleLineIcons" name="basket-loaded" />
                  <Text style={styles.leftText} numberOfLines={1}>
                    Ordenes del mes
                  </Text>
                  <Right style={styles.rightNumber}>
                    <Text style={styles.rightText}>8</Text>
                  </Right>
                </CardItem>
              </View>
            )}
        </Card>
        */}
        <Spacer size={16} />
        <Text style={styles.meta}>{"Todos tus números".toUpperCase()}</Text>
        <Card style={styles.card}>
          {member && (
            <View>
              {/* <CardItem button onPress={Actions.updateProfile}>
                <Icon type="SimpleLineIcons" name="pencil" />
                <Text>Actualizar mi perfil</Text>
                <Right style={styles.rightNumber}>
                  <Icon name="arrow-right" />
                </Right>
              </CardItem> */}

              <CardItem bordered icon>
                <Icon
                  style={styles.userSales}
                  type="SimpleLineIcons"
                  name="graph"
                />
                <Text
                  style={[styles.userSales, styles.leftText]}
                  numberOfLines={1}
                >
                  Ventas totales
                </Text>
                <Right style={[styles.rightNumber, { flex: 2 }]}>
                  <Text style={[styles.rightText, styles.userSales]}>
                    ${member.validOrders
                      ? Math.round(
                          member.validOrders.reduce(
                            (a, b) => +a + b.total - b.tax - b.shipping,
                            0
                          )
                        ).toLocaleString("es-CO", {
                          maximumFractionDigits: 0
                        })
                      : 0}
                  </Text>
                </Right>
              </CardItem>
              <CardItem icon>
                <Icon type="SimpleLineIcons" name="calculator" />
                <Text style={styles.leftText} numberOfLines={1}>
                  Ganancias totales
                </Text>
                <Right style={styles.rightNumber}>
                  <Text style={styles.rightText}>
                    ${member.validOrders
                      ? Math.round(
                          member.validOrders.reduce(
                            (a, b) => +a + b.total - b.tax - b.shipping,
                            0
                          ) * member.commission
                        ).toLocaleString("es-CO", {
                          maximumFractionDigits: 0
                        })
                      : 0}
                  </Text>
                </Right>
              </CardItem>
              <CardItem icon>
                <Icon type="SimpleLineIcons" name="share-alt" />
                <Text style={styles.leftText} numberOfLines={1}>
                  Ganancias por referidos
                </Text>
                <Right style={styles.rightNumber}>
                  <Text style={styles.rightText}>
                    ${member.referrals
                      ? Math.round(
                          member.referrals.length * 20000
                        ).toLocaleString("es-CO", {
                          maximumFractionDigits: 0
                        })
                      : 0}
                  </Text>
                </Right>
              </CardItem>
              <CardItem icon>
                <Icon type="SimpleLineIcons" name="bag" />
                <Text style={styles.leftText} numberOfLines={1}>
                  Orden promedio
                </Text>
                <Right style={styles.rightNumber}>
                  <Text style={styles.rightText}>
                    ${member.validOrders && member.validOrders.length > 0
                      ? Math.round(
                          member.validOrders.reduce(
                            (a, b) => +a + b.total - b.tax - b.shipping,
                            0
                          ) / member.validOrders.length
                        ).toLocaleString("es-CO", {
                          maximumFractionDigits: 0
                        })
                      : 0}
                  </Text>
                </Right>
              </CardItem>
              <CardItem icon>
                <Icon type="SimpleLineIcons" name="basket-loaded" />
                <Text style={styles.leftText} numberOfLines={1}>
                  Total de ordenes
                </Text>
                <Right style={styles.rightNumber}>
                  <Text style={styles.rightText}>
                    {member.validOrders ? member.validOrders.length : 0}
                  </Text>
                </Right>
              </CardItem>
            </View>
          )}
        </Card>
        <Spacer size={30} />
        {member && member.code && <Referral code={member.code} />}
        <Spacer size={30} />
        <SupportWidget />
        <Spacer size={30} />
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired
};

Profile.defaultProps = {
  member: {}
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  meta: {
    fontSize: 10,
    marginBottom: 8,
    color: Colors.tabBarTextColor
  },
  userBar: {
    // flexDirection: "row",
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
    lineHeight: 24,
    textAlign: "center"
  },
  userMessage: {
    color: "#B09DE0",
    fontSize: 12,
    textAlign: "center"
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
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 12
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
  leftText: {
    flex: 1.75,
    fontSize: 14,
    flexWrap: "wrap"
  },
  rightText: {
    fontSize: 15
  },
  rightNumber: {
    flex: 1
  }
});
