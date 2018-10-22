import React from "react";
import { AppLoading, Asset, Font } from "expo";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image
} from "react-native";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Button,
  H1,
  H2,
  H3
} from "native-base";
// import axios from "axios";

import Spacer from "./Spacer";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      loadedFonts: false,
      collections: [],
      error: null
    };
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([require("../assets/images/drawable-hdpi/logo.png")]),
      Font.loadAsync({
        playfair: require("../assets/fonts/PlayfairDisplay-Bold.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ loadedFonts: true });
  };

  componentWillMount() {
    this.props.shopify.collection
      .fetchAllWithProducts()
      .then(collections => {
        // Do something with the collections
        console.log(collections);
        console.log(collections[0].products);
        this.setState({
          isLoading: false,
          collections: collections
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));

    this.props.shopify.product.fetchAll().then(res => {
      console.log(res);
      this.setState({
        isLoading: false,
        products: res
      });
    });
  }
  render() {
    if (this.state.isLoading && !this.state.loadedFonts) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Container>
        <Content padder>
          <Spacer size={30} />
          <H1 style={styles.header}>¡Hola Paula, muy bien!</H1>
          <Spacer size={10} />

          <FlatList
            data={this.state.collections}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
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
