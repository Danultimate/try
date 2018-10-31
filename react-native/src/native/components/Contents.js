import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Share
} from "react-native";
import {
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import Spacer from "./Spacer";

import TimeAgo from "react-native-timeago";

const keyExtractor = item => item.id.toString();

const onPress = item => {
  console.log(item.id);
  Actions.preview({ match: { params: { id: String(item.id) } } });
};

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.shape())
};

const defaultProps = {
  focused: false,
  contents: []
};

const Contents = props => (
  <FlatList
    numColumns={1}
    data={props.contents}
    renderItem={({ item }) => (
      <Card style={styles.card}>
        {!!item.image &&
          !!item.image.src && (
            <CardItem cardBody>
              <TouchableOpacity
                onPress={() => onPress(item)}
                style={{ flex: 1 }}
              >
                <Image
                  source={{ uri: item.image.src }}
                  style={{
                    height: 192,
                    width: null,
                    flex: 1
                  }}
                />
              </TouchableOpacity>
            </CardItem>
          )}
        <CardItem cardBody>
          <Body style={[styles.cardBody, styles.cardSuccess]}>
            <Spacer size={8} />
            <TouchableOpacity onPress={() => onPress(item)}>
              <Text style={styles.header}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={styles.meta}>
              <Text style={[styles.meta, styles.category, styles.successMsg]}>
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
              <Icon type="SimpleLineIcons" name="heart" />
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
              onPress={() => {
                Share.share({ message: item.wp_message }, {});
              }}
            >
              <Icon type="SimpleLineIcons" name="share-alt" />
              <Text style={styles.cardButtonText}>Compartir</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    )}
    keyExtractor={keyExtractor}
  />
);

Contents.propTypes = propTypes;
Contents.defaultProps = defaultProps;

export default Contents;

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
    lineHeight: 28
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
