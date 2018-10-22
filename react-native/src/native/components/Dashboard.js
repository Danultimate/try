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
  Card,
  CardItem,
  Body,
  Text,
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
      //.fetchAllWithProducts()
      .fetchAll()
      .then(collections => {
        // Do something with the collections
        console.log(
          "These are the collections: " + Object.keys(collections[0])
        );
        console.log("this is the image: ", collections[0].image);
        //console.log(collections[0].products);
        this.setState({
          isLoading: false,
          collections: collections
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));

    // this.props.shopify.product.fetchAll().then(res => {
    //   //console.log(res);
    //   console.log('These are the products: '+res);
    //   this.setState({
    //     products: res
    //   });
    // });
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
    //console.log('el member v2: '+ this.props.user.member.firstName)
    return (
      <Container>
        <Content padder>
          <Spacer size={30} />
          <H1 style={styles.header}>¡Hola XX, muy bien!</H1>
          <Spacer size={10} />

          <FlatList
            numColumns={1}
            data={this.state.collections}
            renderItem={({ item }) => (
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <TouchableOpacity
                    onPress={() => onPress(item)}
                    style={{ flex: 1 }}
                  >
                    {console.log(item)}
                    {item.image &&
                      item.image.src && (
                        <Image
                          source={{ uri: item.image.src }}
                          style={{
                            height: 100,
                            width: null,
                            flex: 1,
                            borderRadius: 5
                          }}
                        />
                      )}
                  </TouchableOpacity>
                </CardItem>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={10} />
                    <Text style={styles.header}>{item.title}</Text>
                    <Spacer size={15} />
                    <Button block small onPress={() => onPress(item)}>
                      <Text>View Recipe</Text>
                    </Button>
                    <Spacer size={5} />
                  </Body>
                </CardItem>
              </Card>
            )}
            //keyExtractor={keyExtractor}
            // refreshControl={
            //   <RefreshControl refreshing={loading} onRefresh={reFetch} />
            // }
          />

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
