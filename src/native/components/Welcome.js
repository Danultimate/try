import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  Container,
  Content,
  Icon,
  Form,
  Item,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Label,
  Input,
  Text,
  Button,
  View
} from "native-base";
import SwiperFlatList from "react-native-swiper-flatlist";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Mixpanel } from "../../actions/mixpanel";
import { Actions } from "react-native-router-flux";
import AppLogoAuth from "./AppLogoAuth";
import Spacer from "./Spacer";

const Welcome = () => {
  Mixpanel.track("Opened app");
  AsyncStorage.getItem("token").then(token => {
    if (token) {
      Mixpanel.track("Usario con token");
      //TODO: change back to Actions.home() after mocking up FirstOrderModal
      // Actions.firstOrder();
      Actions.home();
    }
  });
  Mixpanel.screen("Welcome");

  return (
    <Container style={styles.container}>
      <Content padder>
        {Platform.OS === "ios" ? <StatusBar barStyle="dark-content" /> : null}

        <AppLogoAuth />
        <Card style={styles.card}>
          <CardItem style={styles.cardBody}>
            <Body style={styles.authCard}>
              <Spacer size={16} />
              <SwiperFlatList
                showPagination
                paginationDefaultColor={"#F7F7FF"}
                paginationActiveColor={Colors.brandPrimary}
              >
                <View style={[styles.child]}>
                  <Text
                    style={[
                      styles.header,
                      styles.primaryMsg,
                      styles.textCenter
                    ]}
                  >
                    ¡Bienvenida a Elenas!
                  </Text>
                  <Spacer size={8} />

                  <Text style={[styles.description, styles.textCenter]}>
                    Únete a nuestra comunidad, somos miles de mujeres que
                    ganamos un ingreso extra vendiendo cosméticos.
                  </Text>
                  <Spacer size={16} />
                  <Image
                    style={styles.onboardingImg}
                    source={require("../assets/images/welcome-1.png")}
                  />
                </View>
                <View style={[styles.child]}>
                  <Text
                    style={[
                      styles.header,
                      styles.primaryMsg,
                      styles.textCenter
                    ]}
                  >
                    Gana dinero...
                  </Text>
                  <Spacer size={8} />
                  <Text style={[styles.description, styles.textCenter]}>
                    Cada vez que una clienta tuya hace una compra, te ganas una
                    comisión del 30%. Así de fácil.
                  </Text>
                  <Spacer size={16} />
                  <Image
                    style={styles.onboardingImg}
                    source={require("../assets/images/welcome-2.png")}
                  />
                </View>
                <View style={[styles.child]}>
                  <Text
                    style={[
                      styles.header,
                      styles.primaryMsg,
                      styles.textCenter
                    ]}
                  >
                    ...fácil y sin riesgo
                  </Text>
                  <Spacer size={8} />
                  <Text style={[styles.description, styles.textCenter]}>
                    Nosotros entregamos los productos y hacemos el cobro. Tú te
                    enfocas en promocionarlos.
                  </Text>
                  <Spacer size={16} />
                  <Image
                    style={styles.onboardingImg}
                    source={require("../assets/images/welcome-3.png")}
                  />
                </View>
              </SwiperFlatList>
              <Spacer size={40} />
            </Body>
          </CardItem>
          <CardItem styles={styles.cardBody}>
            <Body style={styles.authCard}>
              <Button block primary onPress={Actions.login}>
                <Text>Ingresa a tu cuenta</Text>
              </Button>
              <Spacer size={16} />
              <Button block success onPress={Actions.signUp}>
                <Text>Crea tu cuenta</Text>
              </Button>
              <Spacer size={16} />
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
export default Welcome;

export const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  child: {
    height: 258,
    width: width - Colors.contentPadding * 2 - 46,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: width * 0.5,
    textAlign: "center"
  },
  card: {
    flex: 1,
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
    fontSize: 17
  },
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 12
  },
  authCard: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0
  },
  onboardingImg: {
    marginTop: 8
  },
  cardSuccess: {
    borderTopColor: Colors.brandSuccess,
    borderTopWidth: 2
  },
  cardButton: {
    height: 40,
    shadowColor: "transparent",
    shadowOpacity: 0
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
  transparentCard: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    width: 128
  },
  formElement: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: -1,
    backgroundColor: "#FBFAFF",
    padding: 4,
    borderColor: "#EEEDF2",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  formLabel: {
    paddingTop: 8,
    paddingLeft: 4
  }
});
