import React from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Text, H1, H2, H3 } from "native-base";
import { AppLoading, Font } from "expo";

import Spacer from "./Spacer";

class Dashboard extends React.Component {
  state = { isReady: false };
  componentWillMount() {
    (async () => {
      await Font.loadAsync({
        playfair: require("../assets/fonts/PlayfairDisplay-Bold.ttf")
      });
      this.setState({ isReady: true });
    })();
  }
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Container>
        <Content padder>
          <Spacer size={30} />
          <H1 style={styles.header}>¡Hola Paula, muy bien!</H1>
          <Spacer size={10} />
          <Text>
            Donec id elit non mi porta gravida at eget metus. Fusce dapibus,
            tellus ac cursus commodo, tortor mauris condimentum nibh, ut
            fermentum massa justo sit amet risus. Etiam porta sem malesuada
            magna mollis euismod. Donec sed odio dui.{" "}
          </Text>

          <Spacer size={30} />
          <H2 style={styles.header}>Heading 2</H2>
          <Spacer size={10} />
          <Text>
            Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
            cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
            justo sit amet risus. Etiam porta sem malesuada magna mollis
            euismod. Donec sed odio dui.{" "}
          </Text>

          <Spacer size={30} />
          <H3 style={styles.header}>Heading 3</H3>
          <Spacer size={10} />
          <Text>
            Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
            cursus commodo, tortor mauris condimentum nibh, ut fermentum massa
            justo sit amet risus. Etiam porta sem malesuada magna mollis
            euismod. Donec sed odio dui.{" "}
          </Text>
        </Content>
      </Container>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  header: {
    fontFamily: "playfair"
  }
});
