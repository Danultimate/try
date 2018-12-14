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

import { Mixpanel } from "../../actions/mixpanel";
import { Actions } from "react-native-router-flux";

class PaymentInfo extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      cellphone: PropTypes.string,
      identification: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    error: null,
    success: null
  };

  constructor(props) {
    super(props);
    this.state = {
      cellphone: props.member.cellphone || "",
      identification: props.member.id || "",
      editInfo: false
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
    this.setState({
      editInfo: false
    });
    onFormSubmit(this.state)
      .then(() => console.log("Added Payment Info"))
      .catch(e => console.log(`Error: ${e}`));
  };

  edit = () => {
    this.setState({
      editInfo: true
    });
  };

  render() {
    Mixpanel.screen("Add Payment Info");
    const { loading, error, success } = this.props;
    const { cellphone, identification } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.card}>
            <CardItem header style={styles.authCard}>
              <Body>
                <Image
                  style={styles.nequiLogo}
                  source={require("../assets/images/nequi-logo.png")}
                />
              </Body>
              <Right style={{ position: "absolute", right: 4, top: 8 }}>
                {!this.state.editInfo && (
                  <Button
                    small
                    transparent
                    info
                    style={{
                      flexDirection: "column"
                    }}
                    onPress={this.edit}
                  >
                    <Icon name="pencil" />
                    <Text style={styles.cardButtonText}>Editar</Text>
                  </Button>
                )}
              </Right>
            </CardItem>
            <Spacer size={8} />
            {error && <Messages message={error} />}
            {success && <Messages message={success} type="success" />}
            {!this.state.editInfo ? (
              <View>
                <Item stackedLabel style={styles.readOnlyElement}>
                  <Label style={styles.formLabel}>
                    Celular registrado en Nequi
                  </Label>
                  <Text style={styles.formInfo}>310 688 8990</Text>
                </Item>
                <Item stackedLabel style={styles.readOnlyElement}>
                  <Label style={styles.formLabel}>Cédula de ciudadanía</Label>
                  <Text style={styles.formInfo}>80'133.984</Text>
                </Item>
              </View>
            ) : (
              <CardItem styles={styles.cardBody}>
                <Body style={styles.authCard}>
                  <Form style={styles.authForm}>
                    <View>
                      <Item floatingLabel style={styles.formElement}>
                        <Label style={styles.formLabel}>
                          Celular registrado en Nequi
                        </Label>
                        <Input
                          onChangeText={v => this.handleChange("cellphone", v)}
                          keyboardType="phone-pad"
                        />
                      </Item>

                      <Item floatingLabel style={styles.formElement}>
                        <Label style={styles.formLabel}>
                          Cédula de ciudadanía
                        </Label>
                        <Input
                          onChangeText={v =>
                            this.handleChange("identification", v)
                          }
                          keyboardType="number-pad"
                        />
                      </Item>
                    </View>

                    <Spacer size={16} />

                    <Button
                      block
                      success
                      onPress={this.handleSubmit}
                      style={styles.cardButton}
                      disabled={
                        this.state.cellphone.length !== 10 ||
                        this.state.identification.length < 6
                      }
                    >
                      <Text>Guardar</Text>
                    </Button>
                  </Form>
                </Body>
              </CardItem>
            )}
          </Card>
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
  headerRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  meta: {
    fontSize: 10,
    color: Colors.tabBarTextColor
  },
  label: {
    fontSize: 14,
    color: Colors.tabBarTextColor
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
    alignItems: "flex-end",
    paddingBottom: 0
  },
  nequiLogo: {
    marginTop: 8,
    alignSelf: "center"
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
  },
  formInfo: {
    alignSelf: "flex-start",
    paddingLeft: 4,
    paddingTop: 8
  },
  readOnlyElement: {
    marginLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EAE7F7"
  }
});
