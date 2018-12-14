import React from "react";
import PropTypes from "prop-types";
import {
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
import Colors from "../../../native-base-theme/variables/commonColor";
import { Mixpanel } from "../../actions/mixpanel";
import { Actions } from "react-native-router-flux";
import Spacer from "./Spacer";

const FirstOrderModal = () => {
  Mixpanel.screen("FirstOrderModal");

  return (
    <Container style={styles.container}>
      <Content padder>
        <Spacer size={16} />
        <Card style={styles.card}>
          <CardItem style={styles.cardBody}>
            <Body style={styles.authCard}>
              <Spacer size={16} />
              <Image
                style={styles.onboardingImg}
                source={require("../assets/images/first-order.png")}
              />
              <Spacer size={16} />
              <Text
                style={[styles.header, styles.successMsg, styles.textCenter]}
              >
                ¡Eres oficialmente una mujer poderosa!
              </Text>
              <Spacer size={8} />

              <Text style={[styles.description, styles.textCenter]}>
                ¡Felicitaciones por tu primera venta! Agrega tu información de
                pago para recibir tu comisión una vez que tu cliente reciba y
                pague la orden.
              </Text>
            </Body>
          </CardItem>
          <CardItem styles={styles.cardBody}>
            <Body style={styles.authCard}>
              <Button
                style={styles.cardButton}
                block
                success
                onPress={(Actions.pop, Actions.paymentInfo)}
              >
                <Text style={styles.cardButtonText}>
                  Agregar información de pago
                </Text>
              </Button>
              <Spacer size={16} />
              <TouchableOpacity onPress={Actions.pop}>
                <Text style={[styles.supportTextLink, styles.textCenter]}>
                  Lo haré despues
                </Text>
              </TouchableOpacity>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
export default FirstOrderModal;

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
    fontSize: 17,
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
  supportTextLink: {
    fontSize: 14,
    color: Colors.brandInfo
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
