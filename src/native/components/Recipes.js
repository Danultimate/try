import React from "react";
import PropTypes from "prop-types";
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
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";
import Loading from "./Loading";
import Error from "./Error";
import Spacer from "./Spacer";

const RecipeListing = ({ error, loading, recipes, reFetch }) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id.toString();

  const onPress = item =>
    Actions.recipe({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        <FlatList
          numColumns={1}
          data={recipes}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <TouchableOpacity
                  onPress={() => onPress(item)}
                  style={{ flex: 1 }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 100,
                      width: null,
                      flex: 1,
                      borderRadius: 5
                    }}
                  />
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
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={reFetch} />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RecipeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func
};

RecipeListing.defaultProps = {
  error: null,
  reFetch: null
};

export default RecipeListing;

const styles = StyleSheet.create({
  header: {
    fontFamily: "playfair"
  }
});
