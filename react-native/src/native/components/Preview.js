import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  H3,
  List,
  ListItem,
  Text
} from "native-base";
import ErrorMessages from "../../constants/errors";
import Error from "./Error";
import Spacer from "./Spacer";

const Preview = ({ error, contents, contentId }) => {
  // Error
  if (error) return <Error content={error} />;

  console.log(contentId);
  console.log(contents);

  // Get this Recipe from all recipes
  let content = null;

  // if (contentId && contents) {
  //   content = contents.find(
  //     item => parseInt(item.id, 10) === parseInt(contentId, 10)
  //   );
  // }

  // Recipe not found
  if (!content) return <Error content={ErrorMessages.content404} />;

  // Build Ingredients listing
  // const ingredients = recipe.ingredients.map(item => (
  //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
  //     <Text>
  //       {item}
  //     </Text>
  //   </ListItem>
  // ));

  // Build Method listing
  // const method = recipe.method.map(item => (
  //   <ListItem key={item} rightIcon={{ style: { opacity: 0 } }}>
  //     <Text>
  //       {item}
  //     </Text>
  //   </ListItem>
  // ));

  return (
    <Container>
      <Content padder>
        <Image
          source={{ uri: content.image }}
          style={{ height: 100, width: null, flex: 1 }}
        />

        <Spacer size={25} />
        <H3>{content.title}</H3>
        <Text>by {content.author}</Text>
        <Spacer size={15} />

        <Card>
          <CardItem header bordered>
            <Text>About this recipe</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{content.description}</Text>
            </Body>
          </CardItem>
        </Card>

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

Preview.propTypes = {
  error: PropTypes.string,
  contentId: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

Preview.defaultProps = {
  error: null
};

export default Preview;
