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
  CheckBox,
  Button,
  View,
  H3
} from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";

import { Actions } from "react-native-router-flux";
import Loading from "./Loading";
import Messages from "./Messages";
import Header from "./Header";
import Spacer from "./Spacer";

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired
  };

  static defaultProps = {
    error: null
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: ""
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
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => Actions.login())
      .catch(e => console.log(`Error: ${e}`));
  };

  render() {
    const { loading, error } = this.props;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Card style={styles.card}>
            <CardItem header style={styles.authCard}>
              <Image
                style={styles.authImg}
                source={require("../assets/images/signup.png")}
              />
            </CardItem>
            <CardItem styles={styles.cardBody}>
              <Body style={styles.authCard}>
                <H3
                  style={[styles.header, styles.primaryMsg, styles.textCenter]}
                >
                  Crea tu cuenta
                </H3>
                <Spacer size={8} />
                <Text style={[styles.description, styles.textCenter]}>
                  ¡Obtén recomendaciones y aumenta tus ventas!
                </Text>
                {error && <Messages message={error} />}
              </Body>
            </CardItem>
            <CardItem styles={styles.cardBody}>
              <Body style={styles.authCard}>
                <Form style={styles.authForm}>
                  <Item floatingLabel style={styles.formElement}>
                    <Label style={styles.formLabel}>Nombre(s)</Label>
                    <Input
                      onChangeText={v => this.handleChange("firstName", v)}
                    />
                  </Item>

                  <Item floatingLabel style={styles.formElement}>
                    <Label style={styles.formLabel}>Apellido(s)</Label>
                    <Input
                      onChangeText={v => this.handleChange("lastName", v)}
                    />
                  </Item>

                  <Item floatingLabel style={styles.formElement}>
                    <Label style={styles.formLabel}>Teléfono celular</Label>
                    <Input
                      onChangeText={v => this.handleChange("cellphone", v)}
                    />
                  </Item>

                  <Item floatingLabel style={styles.formElement}>
                    <Label style={styles.formLabel}>Correo electrónico</Label>
                    <Input
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={v => this.handleChange("email", v)}
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
                    <Label style={styles.formLabel}>Confirmar contraseña</Label>
                    <Input
                      secureTextEntry
                      onChangeText={v => this.handleChange("password2", v)}
                    />
                  </Item>
                  <Spacer size={16} />
                  <View style={{ flexDirection: "row" }}>
                    <CheckBox
                      checked={false}
                      style={{ marginRight: 16, marginLeft: -8 }}
                    />
                    <Text style={[styles.supportText]}>
                      He leido y acepto los{" "}
                      <Text
                        style={[
                          styles.supportText,
                          { color: Colors.brandInfo }
                        ]}
                      >
                        Terminos y condiciones
                      </Text>
                    </Text>
                  </View>
                  <Spacer size={16} />

                  <Button block onPress={this.handleSubmit}>
                    <Text>Crea tu cuenta</Text>
                  </Button>
                  <Spacer size={16} />
                  <Text
                    style={[
                      styles.supportText,
                      styles.textCenter,
                      { color: Colors.brandInfo }
                    ]}
                  >
                    Ya tengo una cuenta
                  </Text>
                </Form>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default SignUp;

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
