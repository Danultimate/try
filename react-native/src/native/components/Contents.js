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
import { decode as atob } from "base-64";
import shopifyAPI from "../../constants/shopify_axios";

const keyExtractor = item => item.id.toString();

export function shareMessage(collection) {
  console.log(collection.id)
  id_number = atob(collection.id).split("/")[4];

  shopifyAPI
    .get(`/collections/${id_number}/metafields.json`)
    .then(metafields => {
      console.log('los metafields')
      metafields.data.metafields.forEach(metafield => {
        console.log(metafield)
        if (metafield.key == "wp_message") {
          message = metafield.value;
        }
        
      });
      Share.share({ message: message || collection.title }, {});
    })
    .catch(error => {
      console.log(error);
      Share.share({ message: collection.title }, {});
    });
}

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
                Share.share({ message: item.wp_message || item.title }, {});
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
              onPress={()=> Share.share({ message: item.wp_message || collection.title })}
            >
              <Icon type="SimpleLineIcons" name="share-alt" />
              <Text style={styles.cardButtonText}>Compartir</Text>
            </Button>
          </Body>
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
  textCenter: {
    textAlign: "center"
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
