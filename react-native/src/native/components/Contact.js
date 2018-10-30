import React from "react";
import { Container, Content, Text, H1, H2, H3 } from "native-base";
import Spacer from "./Spacer";

const Contact = () => (
  <Container>
    <Content padder>
      <Spacer size={30} />
      <H1>Contáctanos</H1>
      <Spacer size={10} />
      <Text>
        Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
        commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit
        amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed
        odio dui.{" "}
      </Text>
      <Spacer size={10} />
      <Text>Calle 71 #13-66</Text>

      <Spacer size={10} />
      <Text>Bogotá, Colombia</Text>
    </Content>
  </Container>
);

export default Contact;
