import React from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Icon,
  Card,
  CardItem,
  Body,
  Text,
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import TimeAgo from "react-native-timeago";
import moment from "moment"; //load moment module to set local language
import "moment/locale/es"; //for import moment local language file during the application build
moment.locale("es");

const keyExtractor = item => item.id.toString();

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
  notificationsTitle: PropTypes.string,
  notifications: PropTypes.arrayOf(PropTypes.shape())
};

const defaultProps = {
  focused: false,
  notificationsTitle: "Notificaciones",
  notifications: [],
};

const Notifications = props => (
  <View style={styles.notifications}>
    <Text style={styles.meta}>
      {props.notificationsTitle.toUpperCase()}
    </Text>
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={props.notifications}
      renderItem={({ item }) => (
        <TouchableOpacity>
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
                      <Icon
                        type="SimpleLineIcons"
                        name="info"
                        style={styles.notificationTitle}
                      />
                      {" " + item.title}
                    </Text>
                  </View>
                  <View style={styles.rightContainer}>
                    <Text
                      style={[styles.meta, styles.notificationDate]}
                    >
                      <TimeAgo time={item.createdAt} />
                    </Text>
                  </View>
                </View>
                <Text style={styles.notificationText}>
                  {item.description}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      )}
      keyExtractor={keyExtractor}
    />
  </View>
);

Notifications.propTypes = propTypes;
Notifications.defaultProps = defaultProps;

export default Notifications;

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
