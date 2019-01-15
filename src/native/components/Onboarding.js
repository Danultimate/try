import React from "react";
import PropTypes from "prop-types";
import {
  Platform,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Container, Icon, Text, Button, View } from "native-base";
import OnboardingComponent from "react-native-onboarding-swiper";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import { Mixpanel } from "../../actions/mixpanel";
import Share from "./CustomShareModule";

const onboardingPages = [
  {
    title: "¡Comenzar a vender con Elenas es muy fácil!",
    pretitle: "Presenta tu nuevo emprendimiento",
    text:
      "Comparte tu mensaje de presentación cómo embajadora de Elenas con 5 amigos y familiares. ¡Tus conocidos son la mejor forma de comenzar a vender!",
    borderedButton: true,
    callToAction: "Compartir mensaje",
    action: async () => {
      // TODO: change content
      let message = "Hola soy embajadora"
      let fileNames = ["Providers_1024x1024.jpg"]
      let priceTags = [""]
      images = ["https://cdn.shopify.com/s/files/1/0009/1186/7955/files/Providers_1024x1024.jpg?v=1542751666"]
      await Share.share(message, fileNames, priceTags, images);
    },
    image: require("../assets/images/onboarding-1.jpg"),
    color: Colors.brandPrimary
  },
  {
    title: "¡Comparte productos y promociones exclusivas!",
    pretitle: "Despierta interés con las promociones",
    text:
      "Los productos más vendidos son una manera segura de despertar el interés de tus posibles clientes. Compártelos con quienes creas que les interese.",
    borderedButton: true,
    callToAction: "Compartir productos",
    action: () => {},
    image: require("../assets/images/onboarding-2.jpg"),
    color: Colors.brandPrimary
  },
  {
    title: "¡Conoce nuestra tienda Elenas y guía a tu cliente!",
    pretitle: "Aprende a manejar tu tienda en línea",
    text:
      "Ingresa en Elenas.la y ayuda a tu cliente a encontrar y elegir el producto que necesita, o guíalo para que pueda completar su pedido sin problemas.",
    borderedButton: true,
    callToAction: "Ir a la tienda",
    action: () => {
      Actions.store();
      console.log(this);
      // this.flatList.scrollToIndex({
      //   animated: true,
      //   index: this.state.currentPage + 1
      // });
    },
    image: require("../assets/images/onboarding-3.jpg"),
    color: Colors.brandPrimary
  },
  {
    title: "¡Ahora es tu turno de ganar dinero vendiendo!",
    pretitle: "Es el mejor momento para comenzar",
    text:
      "Pagamos comisiones cada 15 días. Cada comisión será efectiva en cuanto tus clientes completen el pago. Solo debes agregar tu cuenta Nequi.",
    borderedButton: false,
    callToAction: "¡Comenzar a vender y ganar!",
    action: () => {
      Actions.home();
    },
    image: require("../assets/images/onboarding-4.jpg"),
    color: Colors.brandSuccess
  }
];

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

const Banner = ({ image, color }) => (
  <View style={[styles.onboardingBanner, { backgroundColor: color }]}>
    <View style={styles.onboardingImgWrapper}>
      <Image style={styles.onboardingImg} source={image} />
    </View>
  </View>
);

const Header = ({ pretitle, title, color }) => (
  <View style={{ backgroundColor: "white", width: "100%", paddingTop: 32 }}>
    <Text style={[styles.pretitle, styles.textCenter, { color: color }]}>
      {pretitle}
    </Text>
    <Text style={[styles.header, styles.textCenter]}>{title}</Text>
  </View>
);

const Body = ({ text, callToAction, action, bordered }) => (
  <View
    style={{
      backgroundColor: "white",
      paddingBottom: 60,
      paddingHorizontal: 16
    }}
  >
    <Text style={[styles.onboardingText]}>{text}</Text>
    <Button
      style={[styles.callToAction]}
      success={true}
      bordered={bordered}
      onPress={action}
    >
      <Text style={[styles.textCenter]}>{callToAction}</Text>
    </Button>
  </View>
);

const Onboarding = () => {
  Mixpanel.screen("Onboarding");
  return (
    <Container style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
      <OnboardingComponent
        DotComponent={Dot}
        DoneButtonComponent={Done}
        showSkip={false}
        showNext={false}
        showDone={false}
        bottomBarHighlight={false}
        controlStatusBar={false}
        containerStyles={{
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "white"
        }}
        imageContainerStyles={{
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
          zIndex: 3,
          position: "relative"
        }}
        pages={[
          {
            backgroundColor: "white",
            image: (
              <Banner
                image={onboardingPages[0].image}
                color={onboardingPages[0].color}
              />
            ),
            title: (
              <Header
                title={onboardingPages[0].title}
                pretitle={onboardingPages[0].pretitle}
                color={onboardingPages[0].color}
              />
            ),
            subtitle: (
              <Body
                text={onboardingPages[0].text}
                action={onboardingPages[0].action}
                callToAction={onboardingPages[0].callToAction}
                bordered={onboardingPages[0].borderedButton}
              />
            ),
            titleStyles: { backgroundColor: "white", width: "100%" }
          },
          {
            backgroundColor: "white",
            image: (
              <Banner
                image={onboardingPages[1].image}
                color={onboardingPages[1].color}
              />
            ),
            title: (
              <Header
                title={onboardingPages[1].title}
                pretitle={onboardingPages[1].pretitle}
                color={onboardingPages[1].color}
              />
            ),
            subtitle: (
              <Body
                text={onboardingPages[1].text}
                action={onboardingPages[1].action}
                callToAction={onboardingPages[1].callToAction}
                bordered={onboardingPages[1].borderedButton}
              />
            )
          },
          {
            backgroundColor: "white",
            image: (
              <Banner
                image={onboardingPages[2].image}
                color={onboardingPages[2].color}
              />
            ),
            title: (
              <Header
                title={onboardingPages[2].title}
                pretitle={onboardingPages[2].pretitle}
                color={onboardingPages[2].color}
              />
            ),
            subtitle: (
              <Body
                text={onboardingPages[2].text}
                action={onboardingPages[2].action}
                callToAction={onboardingPages[2].callToAction}
                bordered={onboardingPages[2].borderedButton}
              />
            )
          },
          {
            backgroundColor: "white",
            image: (
              <Banner
                image={onboardingPages[3].image}
                color={onboardingPages[3].color}
              />
            ),
            title: (
              <Header
                title={onboardingPages[3].title}
                pretitle={onboardingPages[3].pretitle}
                color={onboardingPages[3].color}
              />
            ),
            subtitle: (
              <Body
                text={onboardingPages[3].text}
                action={onboardingPages[3].action}
                callToAction={onboardingPages[3].callToAction}
                bordered={onboardingPages[3].borderedButton}
              />
            )
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
    lineHeight: 28,
    paddingHorizontal: 8
  },
  pretitle: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
    paddingHorizontal: 8
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
  overlay: {
    backgroundColor: "white"
  },
  authCard: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0
  },
  onboardingBanner: {
    width: "100%",
    paddingTop: 48,
    alignItems: "center",
    alignSelf: "flex-start",
    top: 0
  },
  onboardingImgWrapper: {
    marginBottom: -16,
    paddingBottom: 0,
    shadowColor: "#2F156B",
    shadowOpacity: 0.6,
    shadowOffset: { height: 1 },
    shadowRadius: 2,
    elevation: 2
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
  callToAction: {
    alignSelf: "center",
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.brandSuccess
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
  onboardingText: {
    textAlign: "center",
    marginBottom: 12
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
