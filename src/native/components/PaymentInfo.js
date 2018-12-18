import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import {
  Container,
  Content,
  Icon,
  Form,
  Item,
  Card,
  CardItem,
  ListItem,
  Left,
  Right,
  Body,
  Label,
  Input,
  Text,
  CheckBox,
  Button,
  View
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";

import Messages from "./Messages";
import Loading from "./Loading";
import Header from "./Header";
import Spacer from "./Spacer";
import SupportWidget from "./SupportWidget";

import { Mixpanel } from "../../actions/mixpanel";
import { Actions } from "react-native-router-flux";

class PaymentInfo extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    error: null,
    success: null
  };

  constructor(props) {
    super(props);
    this.state = {
      callToAction: props.member.bankAccount || "Agregar cuenta de Nequi"
    };

  }


  render() {
    Mixpanel.screen("Update Profile");
    const { loading, error, success } = this.props;
    const {callToAction} = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.card}>
            <CardItem header style={styles.authCard}>
              <Image
                style={styles.authImg}
                source={require("../assets/images/login.png")}
              />
            </CardItem>
            <CardItem style={styles.cardBody}>
              <Body style={styles.authCard}>
                <Text
                  style={[styles.header, styles.primaryMsg, styles.textCenter]}
                >
                  Información de pago
                </Text>
                <Spacer size={8} />
                <Text style={[styles.description, styles.textCenter]}>
                  Mantén actualizada la información de la cuenta donde recibirás
                  tu comisión.
                </Text>
                {error && <Messages message={error} />}
                {success && <Messages message={success} type="success" />}
              </Body>
            </CardItem>
            <CardItem button onPress={Actions.paymentInfoAdd}>
              <Image source={require("../assets/images/nequi-logo-sm.png")} />
              <Text style={!this.props.member.bankAccount ? styles.infoMsg : null}>{this.props.member.bankAccount || "Agregar cuenta de Nequi"}</Text>
              <Right style={styles.rightArrow}>
                <Icon name="arrow-right" />
              </Right>
            </CardItem>
            <CardItem style={{ flexDirection: "column" }} button onPress={()=>Linking.openURL("market://details?id=com.nequi.MobileApp")}>
              <Text note style={[styles.textCenter]}>
                ¿Aún no tienes tu cuenta Nequi?
              </Text>
              <TouchableOpacity>
                <Text note style={[styles.infoMsg, styles.textCenter]}>
                  Crea tu cuenta
                </Text>
              </TouchableOpacity>
            </CardItem>
          </Card>
          <Spacer size={30} />

          <SupportWidget />

          <Spacer size={30} />
        </Content>
      </Container>
    );
  }
}

export default PaymentInfo;

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
    shadowRadius: 0,
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
  infoMsg: {
    color: Colors.brandInfo
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
    paddingLeft: 4,
    paddingTop: 8,
    fontSize: 12
  }
});
