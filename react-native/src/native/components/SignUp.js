import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
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
  CheckBox,
  Button,
  View
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";

import { Actions } from "react-native-router-flux";
import Loading from "./Loading";
import Messages from "./Messages";
import Header from "./Header";
import AppLogoAuth from "./AppLogoAuth";
import Spacer from "./Spacer";

import { Mixpanel } from "../../actions/mixpanel";

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onFormSuccess: PropTypes.func.isRequired
  };

  static defaultProps = {
    error: null,
    checked: false
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      cellphone: "",
      password: "",
      password2: "",
      referred_by: "",
      checked: false,
      userWithEmail: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  handleSubmit = () => {
    const { onFormSubmit, onFormSuccess } = this.props;
    onFormSubmit(this.state)
      .then(() => {
        onFormSuccess(this.state).then(data => {
          Mixpanel.alias(data.data.uid, {
            name: this.state.firstName + " " + this.state.lastName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.cellphone,
            created: new Date(),
            referred_by_code: this.state.referred_by
          });
          Mixpanel.track("New user");
          Actions.onboarding({});
        });
      })
      .catch(e => {
        Mixpanel.track("Signup Error");
        console.log(`Error: ${e}`);
      });
  };

  render() {
    const { loading, error } = this.props;

    Mixpanel.screen("Signup");

    if (loading) return <Loading />;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <Container>
          <Content padder>
            <AppLogoAuth />
            <Card style={styles.card}>
              <CardItem header style={styles.authCard}>
                <Image
                  style={styles.authImg}
                  source={require("../assets/images/signup.png")}
                />
              </CardItem>
              <CardItem style={styles.cardBody}>
                <Body style={styles.authCard}>
                  <Text
                    style={[
                      styles.header,
                      styles.primaryMsg,
                      styles.textCenter
                    ]}
                  >
                    Crea tu cuenta
                  </Text>
                  <Spacer size={8} />
                  <Text style={[styles.description, styles.textCenter]}>
                    ¡Obtén recomendaciones y aumenta tus ventas!
                  </Text>
                  {error && <Messages message={error} />}
                </Body>
              </CardItem>
              <CardItem style={styles.cardBody}>
                <Body style={styles.authCard}>
                  <Form style={styles.authForm}>
                    <Item floatingLabel style={styles.formElement}>
                      <Label style={styles.formLabel}>Nombre(s)</Label>
                      <Input
                        onChangeText={v => this.handleChange("firstName", v)}
                        value={this.state.firstName}
                      />
                    </Item>

                    <Item floatingLabel style={styles.formElement}>
                      <Label style={styles.formLabel}>Apellido(s)</Label>
                      <Input
                        onChangeText={v => this.handleChange("lastName", v)}
                        value={this.state.lastName}
                      />
                    </Item>

                    <Item floatingLabel style={styles.formElement}>
                      <Label style={styles.formLabel}>Teléfono celular</Label>
                      <Input
                        onChangeText={v => this.handleChange("cellphone", v)}
                        keyboardType="phone-pad"
                        value={this.state.cellphone}
                      />
                    </Item>

                    <Item floatingLabel style={styles.formElement}>
                      <Label style={styles.formLabel}>Correo electrónico</Label>
                      <Input
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={this.state.email}
                        onChangeText={v => this.handleChange("email", v)}
                      />
                    </Item>

                    <Item floatingLabel style={styles.formElement}>
                      <Label style={styles.formLabel} numberOfLines={1}>
                        Código Amiga Vendedora (Opcional)
                      </Label>
                      <Input
                        value={this.state.referred_by}
                        onChangeText={v => this.handleChange("referred_by", v)}
                      />
                    </Item>

                    <Item floatingLabel style={styles.formElement}>
                      <Label style={styles.formLabel}>Contraseña</Label>
                      <Input
                        secureTextEntry
                        onChangeText={v => this.handleChange("password", v)}
                      />
                    </Item>

                    <Item floatingLabel style={styles.formElement}>
                      <Label style={styles.formLabel}>
                        Confirmar contraseña
                      </Label>
                      <Input
                        secureTextEntry
                        onChangeText={v => this.handleChange("password2", v)}
                      />
                    </Item>
                    <Spacer size={16} />

                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1
                      }}
                    >
                      <CheckBox
                        color={Colors.brandPrimary}
                        style={{ marginLeft: -8, marginRight: 16 }}
                        checked={this.state.checked}
                        onPress={() =>
                          this.setState({ checked: !this.state.checked })
                        }
                      />
                      <View>
                        <Text style={[styles.supportText]}>
                          He leido y acepto los{" "}
                        </Text>
                        <TouchableOpacity onPress={Actions.terms}>
                          <Text style={styles.supportTextLink}>
                            Terminos y condiciones
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Spacer size={16} />

                    <Button block success onPress={this.handleSubmit}>
                      <Text>Crea tu cuenta</Text>
                    </Button>
                    <Spacer size={16} />
                    <TouchableOpacity onPress={Actions.login}>
                      <Text style={[styles.supportTextLink, styles.textCenter]}>
                        Ya tengo una cuenta
                      </Text>
                    </TouchableOpacity>
                  </Form>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  logoImg: {
    marginTop: 32,
    marginBottom: 24
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
    fontSize: 14,
    lineHeight: 20
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
    paddingLeft: 4,
    paddingTop: 8,
    fontSize: 12
  }
});
