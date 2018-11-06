import React from "react";
import PropTypes from "prop-types";
import {
  StatusBar,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
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
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../../../native-base-theme/variables/commonColor";

import { Actions } from "react-native-router-flux";
import Loading from "./Loading";
import Messages from "./Messages";
import Spacer from "./Spacer";
import AppLogoAuth from "./AppLogoAuth";
import axios from "axios";

import publicAPI from "../../constants/api_public";

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string
    }),
    locale: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    isHidden: PropTypes.bool.isRequired,
    userWithEmail: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired
  };

  static defaultProps = {
    error: null,
    success: null,
    locale: null,
    member: {},
    isHidden: true,
    userWithEmail: false,
    checked: false
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.member && props.member.email ? props.member.email : "",
      password: "",
      cellphone: "",
      isHidden: true,
      userWithEmail: false,
      checked: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    if (name === "cellphone" && val.length === 10) {
      publicAPI
        .post("/already_user", JSON.stringify({ cellphone: val }))
        .then(response => {
          this.setState({
            isHidden: false,
            userWithEmail: response.data.has_email,
            email: response.data.email,
            isUser: response.data.is_user
          });
        })
        .catch(error => console.log(error));
    } else if (name === "cellphone" && val.length !== 10) {
      this.setState({
        isHidden: true
      });
    }
    this.setState({
      [name]: val
    });
  };

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.home({}))
      .catch(e => console.log(`Error: ${e}`));
  };

  render() {
    const { loading, error, success, locale } = this.props;
    // const { email } = this.state;

    if (loading) return <Loading />;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Container>
          <Content padder>
            <AppLogoAuth />
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
                    style={[
                      styles.header,
                      styles.primaryMsg,
                      styles.textCenter
                    ]}
                  >
                    Inicia sesión
                  </Text>
                  <Spacer size={8} />
                  <Text style={[styles.description, styles.textCenter]}>
                    Comparte las campañas, revisa tus ordenes y aumenta tus
                    ventas.
                  </Text>
                  {success ? (
                    <Messages type="success" message={success} />
                  ) : null}
                  {error ? <Messages message={error} /> : null}
                </Body>
              </CardItem>
              <CardItem style={styles.cardBody}>
                <Body style={styles.authCard}>
                  <Form style={styles.authForm}>
                    <Item
                      floatingLabel
                      style={styles.formElement}
                      success={this.state.isUser ? true : false}
                    >
                      <Label style={styles.formLabel}>Teléfono celular</Label>
                      <Input
                        autoCapitalize="none"
                        keyboardType="phone-pad"
                        value={this.state.cellphone}
                        onChangeText={v => this.handleChange("cellphone", v)}
                      />
                      <Icon
                        type="SimpleLineIcons"
                        name={this.state.isUser ? "check" : "close"}
                        style={
                          this.state.isUser
                            ? { color: Colors.brandSuccess }
                            : !this.state.isUser && !this.state.isHidden
                              ? { color: Colors.brandDanger }
                              : { color: "transparent" }
                        }
                      />
                    </Item>
                    {this.state.isHidden && (
                      <View>
                        <Spacer size={8} />
                        <Text note>
                          Ingresa tu teléfono celular para continuar
                        </Text>
                      </View>
                    )}
                    {!this.state.isHidden &&
                      !this.state.isUser && (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 8
                          }}
                        >
                          <Text style={[styles.supportText, styles.textCenter]}>
                            Parece que no tienes una cuenta aún.{" "}
                          </Text>
                          <TouchableOpacity onPress={Actions.signUp}>
                            <Text style={styles.supportTextLink}>
                              Regístrate
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    {this.state.isUser &&
                      !this.state.isHidden &&
                      !this.state.userWithEmail && (
                        <View>
                          <Item floatingLabel style={styles.formElement}>
                            <Label style={styles.formLabel}>
                              Correo electrónico
                            </Label>
                            <Input
                              autoCapitalize="none"
                              value={this.state.email}
                              keyboardType="email-address"
                              onChangeText={v => this.handleChange("email", v)}
                            />
                          </Item>
                          <Item floatingLabel style={styles.formElement}>
                            <Label style={styles.formLabel}>Contraseña</Label>
                            <Input
                              secureTextEntry
                              onChangeText={v =>
                                this.handleChange("password", v)
                              }
                            />
                          </Item>
                          <Spacer size={16} />
                          {/*<TouchableOpacity onPress={Actions.forgotPassword}>
                              <Text
                                style={[
                                  styles.supportTextLink,
                                  { marginLeft: "auto" }
                                ]}
                              >
                                ¡Olvide mi contraseña!
                              </Text>
                            </TouchableOpacity>
                            <Spacer size={16} />
                            */}
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
                                He leido y acepto los nuevos{" "}
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
                            <Text>Inicia sesión</Text>
                          </Button>
                          <Spacer size={16} />
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Text
                              style={[styles.supportText, styles.textCenter]}
                            >
                              ¿No tienes una cuenta aún?{" "}
                            </Text>
                            <TouchableOpacity onPress={Actions.signUp}>
                              <Text style={styles.supportTextLink}>
                                Regístrate
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    {this.state.isUser &&
                      !this.state.isHidden &&
                      this.state.userWithEmail && (
                        <View>
                          <Item floatingLabel style={styles.formElement}>
                            <Label style={styles.formLabel}>Contraseña</Label>
                            <Input
                              secureTextEntry
                              onChangeText={v =>
                                this.handleChange("password", v)
                              }
                            />
                          </Item>
                          <Spacer size={16} />
                          {/*<TouchableOpacity onPress={Actions.forgotPassword}>
                            <Text
                              style={[
                                styles.supportTextLink,
                                { marginLeft: "auto" }
                              ]}
                            >
                              ¡Olvide mi contraseña!
                            </Text>
                          </TouchableOpacity>
                          <Spacer size={16} />
                          */}

                          <Button block success onPress={this.handleSubmit}>
                            <Text>Inicia sesión</Text>
                          </Button>
                          <Spacer size={16} />
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Text
                              style={[styles.supportText, styles.textCenter]}
                            >
                              ¿No tienes una cuenta aún?{" "}
                            </Text>
                            <TouchableOpacity onPress={Actions.signUp}>
                              <Text style={styles.supportTextLink}>
                                Regístrate
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
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

export default Login;

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
    lineHeight: 26,
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
