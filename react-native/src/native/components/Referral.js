import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Image, Share } from "react-native";
import {
  View,
  Container,
  Content,
  Icon,
  Card,
  CardItem,
  Body,
  Text,
  Button
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import Spacer from "./Spacer";

import { Mixpanel } from "../../actions/mixpanel";

const Referral = props => (
  <Card style={styles.card}>
    <CardItem
      header
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 0
      }}
    >
      <Image source={require("../assets/images/referral.png")} />
    </CardItem>
    <CardItem style={styles.cardBody}>
      <Body>
        <Text style={[styles.header, styles.primaryMsg, styles.textCenter]}>
          ¡Gana $20.000 por cada amiga referida!
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Text style={[styles.meta, styles.textCenter]}>
            Tu código de referidos:
          </Text>
          <Text style={[styles.referralCode, styles.textCenter]}>
            {props.code}
          </Text>
        </View>
        <Spacer size={8} />
        <Text style={styles.description}>
          Comparte tu código y gana $20.000 por cada amiga que realiza su
          primera orden.
        </Text>
        <Spacer size={16} />
      </Body>
    </CardItem>
    <CardItem style={styles.cardFooter} footer bordered>
      <Body>
        <Button
          style={styles.cardButton}
          block
          transparent
          info
          small
          iconLeft
          onPress={() => {
            Mixpanel.track("Share Referral Code", {
              referral_code: props.code
            });
            Share.share(
              {
                message:
                  "Te recomiendo que te registras en Elenas, la nueva manera de vender productos de belleza. Es fácil, no tienes ningún riesgo y por cada venta de ganas una comisión del 30% (solo aplica para las Pioneras, las primeras 1.000 embajadoras y ya vamos en 700). Baja la app ahora por http://bit.ly/elenas-app y regístrate usando mi código de vendedora: " +
                  props.code
              },
              {}
            );
          }}
        >
          <Icon type="SimpleLineIcons" name="share-alt" />
          <Text style={styles.cardButtonText}>Compartir</Text>
        </Button>
      </Body>
    </CardItem>
  </Card>
);

Referral.propTypes = {
  code: PropTypes.string
};

Referral.defaultProps = {
  code: ""
};

export default Referral;

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
    fontSize: 9,
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
    lineHeight: 18,
    marginBottom: 0
  },
  notificationTitleIcon: {
    fontSize: 6,
    lineHeight: 24
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
