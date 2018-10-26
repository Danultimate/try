import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Icon,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  H3,
  List,
  ListItem,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import ErrorMessages from "../../constants/errors";
import Error from "./Error";
import Spacer from "./Spacer";

const Preview = ({ error, contents, contentId }) => {
  // Error
  if (error) return <Error content={error} />;

  console.log('hey esto es Preview Component: id, contents:')
  console.log(contentId);
  console.log(contents);

  // Get this Recipe from all recipes
  let content = null;

  // if (contentId && contents) {
  //   content = contents.find(
  //     item => parseInt(item.id, 10) === parseInt(contentId, 10)
  //   );
  // }

  // Recipe not found
  if (!content)
    return (
      // <Error content={ErrorMessages.content404} />
      <Container>
        <Content padder>
          <Card style={styles.card}>
            <CardItem cardBody>
              <TouchableOpacity
                onPress={() => onPress(item)}
                style={{ flex: 1 }}
              >
                <Image
                  source={require("../assets/images/default.png")}
                  style={{
                    height: 192,
                    width: null,
                    flex: 1
                  }}
                />
              </TouchableOpacity>
            </CardItem>
            <CardItem cardBody>
              <Body style={[styles.cardBody, styles.cardSuccess]}>
                <Spacer size={8} />
                <H3 style={styles.header}>
                  Titulo de noticia o nombre de producto
                </H3>
                <Text style={styles.meta}>
                  <Text
                    style={[styles.meta, styles.category, styles.successMsg]}
                  >
                    Para compartir{" "}
                  </Text>
                  <Text style={[styles.meta, styles.date]}>
                    • Hace 3 minutos
                  </Text>
                </Text>
                <Spacer size={8} />
                <Text style={styles.description}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
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
                  <Icon type="FontAwesome" name="star" />
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
                  onPress={() => onPress(item)}
                >
                  <Icon type="FontAwesome" name="share-square" />
                  <Text style={styles.cardButtonText}>Compartir</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );

  // Build Ingredients listing
  // const ingredients = recipe.ingredients.map(item => (
  //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
  //     <Text>
  //       {item}
  //     </Text>
  //   </ListItem>
  // ));

  // Build Method listing
  // const method = recipe.method.map(item => (
  //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
  //     <Text>
  //       {item}
  //     </Text>
  //   </ListItem>
  // ));

  return (
    <Container>
      <Content padder>
        <Image
          source={{ uri: content.image }}
          style={{ height: 100, width: null, flex: 1 }}
        />

        <Spacer size={25} />
        <H3>{content.title}</H3>
        <Text>by {content.author}</Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>About this recipe</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{content.description}</Text>
            </Body>
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

Preview.propTypes = {
  error: PropTypes.string,
  contentId: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

Preview.defaultProps = {
  error: null
};

export default Preview;

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
    lineHeight: 16,
    marginBottom: 0
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
