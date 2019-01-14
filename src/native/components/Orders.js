import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StatusBar,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
  ScrollView
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
moment.locale("es");

import { Mixpanel } from "../../actions/mixpanel";

const onPress = item => {
  Actions.order({ order: item });
};


const OrdersList = ({ error, loading, member }) => {
  if (Platform.OS === "ios") {
    StatusBar.setBarStyle("dark-content");
  }
  Mixpanel.screen("Orders");
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id.toString();

  return (
    <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={Actions.orders}
          />
        }
      >
      <Container style={styles.container}>
      <Content padder>
        {!member.orders || member.orders.length < 1 ? (
          <View style={styles.supportWidget}>
            <Spacer size={16} />
            <Image source={require("../assets/images/support.png")} />
            <Spacer size={16} />
            <Text style={[styles.header, styles.primaryMsg, styles.textCenter]}>
              ¡Aún no tienes órdenes!
            </Text>
            <Spacer size={16} />
            <Text style={styles.textCenter}>
              Comparte el contenido con tus clientes para ganar dinero extra con
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
        ) : (
          <FlatList
            numColumns={1}
            data={member.orders}
            renderItem={({ item }) => (
              <Card transparent style={styles.card}>
                <CardItem
                  style={styles.cardBody}
                  button
                  onPress={() => onPress(item)}
                >
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
        )}

        <Spacer size={20} />
      </Content>
    </Container>
    </ScrollView>
  );
};

OrdersList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  member: PropTypes.shape({})
};

OrdersList.defaultProps = {
  error: null,
  loading: false,
  member: {}
};

export default OrdersList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  orderImg: {
    justifyContent: "center",
    alignItems: "center"
  },
  orderInfo: {
    width: "50%"
  },
  orderTotal: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 0
  },
  orderRight: {
    flex: 0.35
  },
  orderLeft: {
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
    marginLeft: 0,
    lineHeight: 18
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
  orderDate: {
    alignSelf: "flex-end",
    marginTop: 4,
    minWidth: 125,
    textAlign: "right"
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
    alignItems: "flex-start",
    justifyContent: "flex-start"
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
