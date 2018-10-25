import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image } from "react-native";
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
  View,
  H3
} from "native-base";
import Onboarding from "react-native-onboarding-swiper";
import Colors from "../../../native-base-theme/variables/commonColor";
import Spacer from "./Spacer";

const Welcome = () => (
  <Container>
    <Content>
      <Onboarding
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.authImg}
                source={require("../assets/images/onboarding.png")}
              />
            ),
            title: (
              <H3 style={[styles.header, styles.primaryMsg, styles.textCenter]}>
                ¡Bienvenido a Elenas!
              </H3>
            ),
            subtitle:
              "Únete a la comunidad de mujeres empoderadas y emprendedoras."
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.authImg}
                source={require("../assets/images/onboarding.png")}
              />
            ),
            title: (
              <H3 style={[styles.header, styles.primaryMsg, styles.textCenter]}>
                ¡Mejora tus ventas!
              </H3>
            ),
            subtitle:
              "Únete a la comunidad de mujeres empoderadas y emprendedoras."
          }
        ]}
      />
      <Card style={styles.card}>
        <CardItem styles={styles.cardBody}>
          <Body style={styles.authCard}>
            <Spacer size={16} />
            <H3 style={[styles.header, styles.primaryMsg, styles.textCenter]}>
              ¡Bienvenido a Elenas!
            </H3>
            <Spacer size={8} />
            <Text style={[styles.description, styles.textCenter]}>
              Únete a la comunidad de mujeres empoderadas y emprendedoras.
            </Text>
            <Spacer size={16} />
            <Image
              style={styles.authImg}
              source={require("../assets/images/onboarding.png")}
            />
            <Spacer size={32} />

            <Button block primary onPress={this.handleSubmit}>
              <Text>Ingresa a tu cuenta</Text>
            </Button>
            <Spacer size={16} />
            <Button block success onPress={this.handleSubmit}>
              <Text>Crea tu cuenta</Text>
            </Button>
          </Body>
        </CardItem>
      </Card>
    </Content>
  </Container>
);

export default Welcome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  card: {
    shadowColor: "#E2E1E6",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  header: {
    fontFamily: "playfair",
    fontSize: 32,
    marginBottom: 8,
    lineHeight: 30
  },
  meta: {
    fontSize: 10,
    color: "#C3C5C7"
  },
  description: {
    fontSize: 18
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
  authImg: {
    marginTop: 8
  },
  authForm: {
    width: "100%"
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
