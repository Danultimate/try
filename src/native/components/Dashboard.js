import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Share,
  AsyncStorage
} from "react-native";
import {
  View,
  Container,
  Content,
  Icon,
  Card,
  CardItem,
  Body,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import Loading from "./Loading";
import Error from "./Error";
import Spacer from "./Spacer";
import FilterBar from "./FilterBar";
import Referral from "./Referral";
import SupportWidget from "./SupportWidget";

import OrderNotifications from "./OrderNotifications";
import Feed from "./Feed";
import Products from "./Products";

import moment from "moment";
import "moment/locale/es";
moment.locale("es");
import RNWootric from "react-native-wootric";
var jsonQuery = require("json-query");

import API from "../../constants/api";
import publicAPI from "../../constants/api_public";
import axios from "axios";

import { Mixpanel } from "../../actions/mixpanel";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      products: [],
      articles: [],
      orders: [],
      feed: [],
      headerMessage: [],
      error: null
    };
  }
  componentDidUpdate() {
    if (Platform.OS === "ios") {
      StatusBar.setBarStyle("light-content", true);
    }
  }
  componentWillMount() {
    if (Platform.OS === "ios") {
      StatusBar.setBarStyle("light-content", true);
    }
    AsyncStorage.getItem("token")
      .then(token => {
        console.log("el tooooken");
        console.log(token);

        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        publicAPI.defaults.headers.common = {};
        API.get("/feed")
          .then(res => {
            //console.log('la respuesta')
            //console.log(res)
            let response = res.data;
            console.log("Retrieve Feed");
            console.log(response.feed[0].type);
            this.setState({
              feed: response.feed,
              products: response.products,
              orders: response.orders,
              topMessage: response.top_message.value,
              bottomMessage: response.bottom_message.value,
              loading: false
            });
          })
          .catch(error => {
            console.log("Error @getting content1");
            console.log(error);
            // console.log(error.response);
          });

        // Wootric part
        if (typeof RNWootric != "undefined"){
          createdAt = new Date(this.props.member.createdAt.replace(" ", "T"));
          seconds = createdAt.getTime() / 1000;
          RNWootric.configureWithClientID(
            "4861a7f425fd8cedc0dd064081beadd72f9e529ee48a14496725a49b68db0767",
            "NPS-6deaea6a"
          );
          RNWootric.setEndUserEmail(this.props.member.email);
          RNWootric.setEndUserCreatedAt(seconds);
          RNWootric.setEndUserPhoneNumber(this.props.member.cellphone);
          RNWootric.setEndUserProperties({
            first_name: this.props.member.firstName,
            last_name: this.props.member.lastName
          });
          RNWootric.showSurvey();
        }
      })
      .catch(error => {
        console.log("Error @getting content2");
        console.log(error);
        this.setState({
          loading: false
        });
      });
  }
  render() {
    Mixpanel.screen("Dashboard");
    // Loading
    if (this.state.loading) return <Loading />;

    // Error
    if (this.state.error) return <Error content={this.state.error} />;

    const keyExtractor = item => item.id.toString();
    const feedKeyExtractor = item => {
      return item.content.id.toString();
    };

    return (
      <Container style={styles.container}>
        <Content padder>
          <View style={styles.userBar}>
            <View style={styles.userImg}>
              <Image
                style={styles.userAvatar}
                source={require("../assets/images/avatar.png")}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userGreeting}>
                {this.state.topMessage
                  ? this.state.topMessage
                  : "¡Hola, mujer poderosa!"}
              </Text>
              <Text style={styles.userMessage}>
                Tu código:{" "}
                <Text style={styles.userCode}>{this.props.member.code}</Text>
              </Text>
            </View>
            <View style={styles.userNumbers}>
              <Text style={styles.userSales}>
                <Text style={styles.userCurrency}>$</Text>
                {this.props.member.validOrders
                  ? Math.round(
                      this.props.member.validOrders.reduce(
                        (a, b) => +a + b.total - b.tax - b.shipping,
                        0
                      )
                    ).toLocaleString("es-CO", {
                      maximumFractionDigits: 0
                    })
                  : 0}
              </Text>
              <Text style={styles.userNumberLabel}>Ventas </Text>
            </View>
          </View>

          {/*this.props.member.orders ? (
            <OrderNotifications orders={this.props.member.orders.slice(0, 4)} />
          ) : (
            <OrderNotifications orders={[]} />
          )*/}

          {/* TODO: uncomment */}
          {/* <FilterBar /> */}

          <FlatList
            numColumns={1}
            data={this.state.feed}
            renderItem={({ item }) => (
              <Feed item={item} sellerCode={this.props.member.code} />
            )}
            keyExtractor={feedKeyExtractor}
          />

          {/* <Spacer size={8} />
          <Products products={this.state.products} /> */}

          {/* <Button style={styles.loadMore} block light>
            <Text style={styles.loadMoreText}>Cargar más</Text>
          </Button> */}

          {this.props.member && this.props.member.code && (
            <Referral code={this.props.member.code} />
          )}

          <Spacer size={30} />

          <SupportWidget />

          <Spacer size={30} />
        </Content>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  eror: PropTypes.string,
  //loading: PropTypes.bool.isRequired,
  //feed: PropTypes.arrayOf(PropTypes.shape()).isRequired,
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
    padding: 12,
    marginTop: -10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: 10
  },
  userGreeting: {
    fontFamily: "playfair",
    color: "white",
    fontSize: 20,
    lineHeight: 20
  },
  userMessage: {
    color: "#B09DE0",
    fontSize: 10
  },
  userNumberLabel: {
    color: "#B09DE0",
    fontSize: 10,
    textAlign: "right"
  },
  userSales: {
    fontSize: 20,
    color: "white",
    textAlign: "right"
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
    marginBottom: 10
  },
  userCode: {
    fontSize: 11,
    color: "#B09DE0",
    fontWeight: "700"
  },
  userInfo: {
    flex: 0.45,
    marginRight: 8
  },
  userNumbers: {
    flex: 0.35
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
    color: Colors.tabBarTextColor
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
