import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Right,
  Text,
  Icon
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import { Actions } from "react-native-router-flux";

import { Mixpanel } from "../../actions/mixpanel";

const More = ({ member, logout }) => {
  Mixpanel.screen("More");
  return (
    <Container>
      <Content padder>
        <Card style={styles.card}>
          {member && member.email ? (
            <View>
              <CardItem button onPress={Actions.updateProfile}>
                <Icon type="SimpleLineIcons" name="pencil" />
                <Text>Actualizar mi perfil</Text>
                <Right style={styles.rightArrow}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem button onPress={logout} icon>
                <Icon type="SimpleLineIcons" name="logout" />
                <Text>Cerrar sesión</Text>
                <Right style={styles.rightArrow}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
            </View>
          ) : (
            <View>
              <CardItem button onPress={Actions.login}>
                <Icon type="SimpleLineIcons" name="login" />
                <Text>Iniciar sesión</Text>
                <Right style={styles.rightArrow}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              <CardItem button onPress={Actions.signUp} icon>
                <Icon type="SimpleLineIcons" name="user-follow" />
                <Text>Crear cuenta</Text>
                <Right style={styles.rightArrow}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem>
              {/* <CardItem button onPress={Actions.forgotPassword} icon>
                <Icon type="SimpleLineIcons" name="key" />
                <Text>Olvidaste tu contraseña</Text>
                <Right style={styles.rightArrow}>
                  <Icon name="arrow-forward" />
                </Right>
              </CardItem> */}
            </View>
          )}
          <View>
            <CardItem button onPress={Actions.contact}>
              <Icon type="SimpleLineIcons" name="envelope-letter" />
              <Text>Contacto</Text>
              <Right style={styles.rightArrow}>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem button onPress={Actions.terms}>
              <Icon type="SimpleLineIcons" name="docs" />
              <Text>Terminos y condiciones</Text>
              <Right style={styles.rightArrow}>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem button onPress={Actions.support}>
              <Icon type="SimpleLineIcons" name="umbrella" />
              <Text>Soporte</Text>
              <Right style={styles.rightArrow}>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem button onPress={Actions.about}>
              <Icon type="SimpleLineIcons" name="symbol-female" />
              <Text>Acerca de Elenas</Text>
              <Right style={styles.rightArrow}>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </View>
        </Card>
      </Content>
    </Container>
  );
};

More.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired
};

More.defaultProps = {
  member: {}
};

export default More;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  userBar: {
    // flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.brandPrimary,
    // height: 104,
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
    lineHeight: 24,
    textAlign: "center"
  },
  userMessage: {
    color: "#B09DE0",
    fontSize: 14,
    textAlign: "center"
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
    flex: 0.5,
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
  userInfo: {
    flex: 1,
    width: "100%"
  },
  userNumbers: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
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
  cardBody: {
    paddingHorizontal: 16,
    paddingTop: 12
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
  rightArrow: {
    flex: 1
  }
});
