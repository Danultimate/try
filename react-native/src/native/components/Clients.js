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

const ClientListing = ({ error, loading, member }) => {
  // Loading
  if (loading) return <Loading />;

  console.log(clients[0].avatar);

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id.toString();

  console.log(member.clients);
  // const onPress = item =>
  //   Actions.recipe({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        {!member.clients || member.clients.length<1 ? (
          <View style={styles.supportWidget}>
            <Spacer size={16} />
            <Image source={require("../assets/images/support.png")} />
            <Spacer size={16} />
            <Text style={[styles.header, styles.primaryMsg, styles.textCenter]}>
              ¡Aún no tienes clientes!
            </Text>
            <Spacer size={16} />
            <Text style={styles.textCenter}>
              Comparte el contenido con posibles clientes cómo tus familiares o
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
        ) : (
          <FlatList
            numColumns={1}
            data={member.clients}
            renderItem={({ item }) => (
              <Card transparent style={styles.card}>
                <CardItem style={styles.cardBody}>
                  <Left style={styles.clientLeft}>
                    <View style={styles.clientImg}>
                      <Thumbnail
                        source={require("../assets/images/avatar.png")}
                        small
                      />
                      <Button
                        style={styles.callButton}
                        block
                        transparent
                        info
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
                    <Body>
                      <Text numberOfLines={1} style={styles.name}>
                        {item.user.first_name} {item.user.last_name}
                      </Text>
                      <Text note style={styles.meta}>
                        <TimeAgo time={item.addedAt} />
                      </Text>
                      <Spacer size={4} />
                      <Text style={styles.clientTotal}>
                        ${item.total_ordered}
                      </Text>
                      <Text note style={styles.meta}>
                        Ordenes Totales
                      </Text>
                    </Body>
                  </Left>
                  <Right style={styles.clientRight}>
                    <Text style={styles.textRight}>
                      <Text note style={styles.meta}>
                        Orden promedio{" "}
                      </Text>{" "}
                      ${item.avg_order}
                    </Text>

                    <Spacer size={8} />
                    <Text style={styles.textRight}>
                      <Text note style={styles.meta}>
                        Última orden{" "}
                      </Text>{" "}
                      ${item.last_order}
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
  );
};

ClientListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  member: PropTypes.shape({})
};

ClientListing.defaultProps = {
  error: null,
  loading: false,
  member: {}
};

export default ClientListing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
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
