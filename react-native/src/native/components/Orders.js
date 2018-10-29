import React from "react";
import PropTypes from "prop-types";
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

const OrderListing = ({ error, loading, member }) => {
  const orders = [
    {
      clientName: "Juliana Villa",
      addedAt: "20181028",
      value: 67950,
      status: "Ordenado",
      id: 1
    },
    {
      clientName: "Pedro Iriarte",
      addedAt: "20181027",
      value: 78950,
      status: "Entregado",
      id: 2
    },
    {
      clientName: "Julia Barrera",
      addedAt: "20181026",
      value: 89950,
      status: "Distribución",
      id: 3
    }
  ];
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id.toString();

  // const onPress = item =>
  //   Actions.recipe({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
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
                    <Text style={styles.orderTotal}>${item.total-item.tax-item.shipping}</Text>
                  </View>
                  <Body style={styles.orderDate}>
                    <Text note style={styles.meta}>
                      <TimeAgo time={item.date} />
                    </Text>
                  </Body>
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
                </Right>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

OrderListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  member: PropTypes.shape({}),
};



OrderListing.defaultProps = {
  error: null,
  loading: false,
  member: {}
};

export default OrderListing;

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
  name: {
    fontFamily: "playfair",
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 0,
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
  orderDate: {
    alignSelf: "flex-start",
    marginTop: 4
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
