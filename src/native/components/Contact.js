import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Container, Content, Text, H1, H2, H3 } from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import Spacer from "./Spacer";

import { Mixpanel } from "../../actions/mixpanel";

const Contact = () => {
  Mixpanel.screen("Contact");
  return (
    <Container style={styles.container}>
      <Content padder>
        <View style={styles.supportWidget}>
          <Spacer size={16} />
          <Image source={require("../assets/images/support.png")} />
          <Spacer size={16} />
          <Text style={[styles.header, styles.primaryMsg, styles.textCenter]}>
            ¡Contáctanos!
          </Text>
          <Spacer size={16} />
          <Text style={styles.textCenter}>
            ¡Nos encanta que nos escribas! Te dejamos nuestros datos de
            contacto:
          </Text>
          <Spacer size={16} />

          <Text
            style={[
              styles.supportText,
              styles.textCenter,
              { color: Colors.brandInfo }
            ]}
          >
            hola@elenas.la
          </Text>
        </View>
      </Content>
    </Container>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  header: {
    fontFamily: "playfair",
    fontSize: 32,
    marginBottom: 8,
    lineHeight: 28
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
  }
});
