import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { Container, Icon, Text, Button, View } from "native-base";
import OnboardingComponent from "react-native-onboarding-swiper";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";
import AppLogoAuth from "./AppLogoAuth";

import { Mixpanel } from "../../actions/mixpanel";

const Dot = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? Colors.brandPrimary : "rgba(91, 42, 208, .2)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 3,
        backgroundColor
      }}
    />
  );
};

const backgroundColor = isLight => (isLight ? "white" : Colors.brandPrimary);
const color = isLight => backgroundColor(!isLight);

const Done = ({ isLight, ...props }) => (
  <Button full transparent {...props}>
    <Text />
    <Icon
      style={{ color: isLight ? Colors.brandSuccess : "white" }}
      type="SimpleLineIcons"
      name="check"
    />
  </Button>
);

const Skip = ({ isLight, skipLabel, ...props }) => (
  <Button small full transparent {...props}>
    <Text style={{ color: color(isLight), fontWeight: "400" }}>
      {skipLabel}
    </Text>
  </Button>
);

const Next = ({ isLight, nextLabel, ...props }) => (
  <Button small full transparent {...props}>
    <Text style={{ color: color(isLight) }}>{nextLabel}</Text>
  </Button>
);

const Onboarding = () => {
  Mixpanel.screen("Onboarding");
  return (
    <Container style={styles.container}>
      <OnboardingComponent
        DotComponent={Dot}
        DoneButtonComponent={Done}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        nextLabel={"Continuar"}
        skipLabel={"Ver productos"}
        onSkip={Actions.store}
        onDone={Actions.home}
        bottomBarHighlight={false}
        containerViewStyles={{ alignItems: "flex-start" }}
        imageContainerStyles={{ paddingBottom: 24 }}
        subTitleStyles={{ paddingHorizontal: 8 }}
        pages={[
          {
            backgroundColor: Colors.brandLight,
            image: (
              <Image
                style={styles.onboardingImg}
                source={require("../assets/images/onboarding-1.png")}
              />
            ),
            title: (
              <Text
                style={[styles.header, styles.primaryMsg, styles.textCenter]}
              >
                ¿Como vendo?
              </Text>
            ),
            subtitle:
              "Comparte productos y colecciones con tus amigas, conocidos y familiares directamente desde la app. Nuestras colecciones son catálogos, de 7 a 10 productos, con las mejores ofertas y nuevos lanzamientos de Elenas."
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.onboardingImg}
                source={require("../assets/images/onboarding-2.png")}
              />
            ),
            title: (
              <Text
                style={[styles.header, styles.primaryMsg, styles.textCenter]}
              >
                ¿Como compran mis clientes?
              </Text>
            ),
            subtitle:
              "Tus clientes compran en nuestra página web. Cada vez que alguien compra usando tu código de embajadora tu ganas una comisión del 30%. Encuentra tú código abajo de tu foto de perfil en la aplicación."
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.onboardingImg}
                source={require("../assets/images/onboarding-3.png")}
              />
            ),
            title: (
              <Text
                style={[styles.header, styles.primaryMsg, styles.textCenter]}
              >
                ¿Tengo que entregar y cobrar?
              </Text>
            ),
            subtitle:
              "Nosotros entregamos los productos a tus clientes y cobramos (ofrecemos pago contra entrega para la comodidad de tus clientes)."
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image
                style={styles.onboardingImg}
                source={require("../assets/images/onboarding-4.png")}
              />
            ),
            title: (
              <Text
                style={[styles.header, styles.primaryMsg, styles.textCenter]}
              >
                ¿Como me pagan?
              </Text>
            ),
            subtitle:
              "Pagamos comisiones cada 15 días a través de la aplicación de Bancolombia Nequi – es súper fácil. En las próximas 24 horas una de nuestras coordinadoras de ventas te va a llamar para explicarlo mejor."
          },
          {
            backgroundColor: Colors.brandPrimary,
            image: (
              <Image
                style={styles.onboardingImg}
                source={require("../assets/images/onboarding-5.png")}
              />
            ),
            title: (
              <Text
                style={[styles.header, styles.textCenter, { color: "white" }]}
              >
                ¿Que debo hacer ahora?
              </Text>
            ),
            subtitle:
              "Comparte los productos o colecciones para generar tus primeras ventas y comenzar como embajadora de Elenas."
          }
        ]}
      />
    </Container>
  );
};
export default Onboarding;

export const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  text: {
    fontSize: width * 0.5,
    textAlign: "center"
  },
  card: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
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
    marginTop: 0
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
