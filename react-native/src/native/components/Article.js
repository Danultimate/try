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
  Button,
  View
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import Spacer from "./Spacer";

import TimeAgo from "react-native-timeago";
import { decode as atob } from "base-64";
import shopifyAPI from "../../constants/shopify_axios";

// import WebView from "./OpenInBrowser";

import { WebView, Linking } from "react-native";

const keyExtractor = item => item.id.toString();

export function openLink(collection) {
  const uri = "https://google.com.co";
  <WebView
    ref={ref => {
      this.webview = ref;
    }}
    source={{ uri }}
    onNavigationStateChange={event => {
      if (event.url !== uri) {
        this.webview.stopLoading();
        Linking.openURL(event.url);
      }
    }}
  />;
}

const onPress = item => {
  // Actions.preview({ match: { params: { id: String(item.id) } } });
  Actions.previewBlog({ content: item });
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

const Contents = props => {
  // console.log(props.contents[0])
  return (
    <Card style={styles.card}>
      {!!props.item.image &&
        !!props.item.image.src && (
          <CardItem cardBody>
            <TouchableOpacity
              onPress={() => onPress(props.item)}
              style={{ flex: 1 }}
            >
              <Image
                source={{ uri: props.item.image.src }}
                style={{
                  height: 134,
                  width: null,
                  flex: 1
                }}
              />
            </TouchableOpacity>
          </CardItem>
        )}
      <CardItem cardBody>
        <Body style={[styles.cardBody, styles.cardDanger]}>
          <Spacer size={8} />
          <View style={styles.metaBar}>
            <Text
              style={[
                styles.meta,
                styles.category,
                styles.dangerMsg,
                styles.leftContainer
              ]}
            >
              ¡Para ti!{" "}
            </Text>
            <Text
              style={[
                styles.meta,
                styles.date,
                styles.textRight,
                styles.rightContainer
              ]}
            >
              <Icon style={[styles.meta, styles.date]} name="event" />{" "}
              <TimeAgo time={props.item.created_at} />
            </Text>
          </View>
          <Spacer size={8} />
          <TouchableOpacity onPress={() => onPress(props.item)}>
            <Text style={styles.header}>{props.item.title}</Text>
          </TouchableOpacity>
          {!!props.item.body_html && (
            <Text numberOfLines={3} style={styles.description}>
              {props.item.description ||
                props.item.body_html.replace(/<(?:.|\n)*?>/gm, "")}
            </Text>
          )}
          <Spacer size={16} />
        </Body>
      </CardItem>
      <CardItem style={styles.cardFooter} footer>
        {/*
        TO DO add favorite button when functionality OK
        <Left>
        <Button
            style={styles.cardButton}
            block
            transparent
            info
            small
            iconLeft
            onPress={() => onPress(props.item)}
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
            Share.share({ message: props.item.wp_message || props.item.title }, {});
            }}
        >
            <Icon type="SimpleLineIcons" name="share-alt" />
            <Text style={styles.cardButtonText}>Compartir</Text>
        </Button>
        </Right>
        */}

        <Body>
          <Button
            style={styles.cardButton}
            block
            transparent
            info
            small
            iconLeft
            onPress={() => onPress(props.item)}
          >
            <Icon
              style={styles.cardButtonIcon}
              type="SimpleLineIcons"
              name="plus"
            />
            <Text style={styles.cardButtonText}>Ver Mas</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  );
};

Contents.propTypes = propTypes;
Contents.defaultProps = defaultProps;

export default Contents;

const styles = StyleSheet.create({
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
  metaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  leftContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  rightContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  meta: {
    fontSize: 10,
    color: Colors.tabBarTextColor
  },
  description: {
    fontSize: 18
  },
  category: {
    fontWeight: "bold"
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  cardDanger: {
    borderTopColor: Colors.brandDanger,
    borderTopWidth: 2
  },
  cardButtonText: {
    paddingLeft: 8,
    paddingRight: 8
  },
  cardButtonIcon: {
    lineHeight: 20
  },
  cardFooter: {
    borderBottomWidth: 0,
    borderTopColor: "#EBEDF0",
    paddingHorizontal: 0
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  successMsg: {
    color: Colors.brandSuccess
  },
  warningMsg: {
    color: Colors.brandWarning
  },
  dangerMsg: {
    color: Colors.brandDanger
  },
  primaryMsg: {
    color: Colors.brandPrimary
  },
  loadMore: {
    backgroundColor: "blue",
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
