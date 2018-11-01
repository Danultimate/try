import React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { Container, Content } from "native-base";
import Colors from "../../../native-base-theme/variables/commonColor";
import Spacer from "./Spacer";

const About = () => (
  <Container>
    <Content padder>
      <View style={styles.supportWidget}>
        <Spacer size={16} />
        <Image source={require("../assets/images/referral.png")} />
        <Spacer size={16} />
        <Text style={[styles.header, styles.primaryMsg, styles.textCenter]}>
          Acerca de Elenas
        </Text>
        <Spacer size={16} />
        <Text style={[{ fontWeight: "bold" }, styles.paragraph]}>
          ¡Hola! Soy Cristina, Gerente General y co-fundadora de elenas.
        </Text>
        <Spacer size={16} />
        <Text style={styles.paragraph}>
          Se preguntarán, ¿como se juntan una colombiana, un alemán y un gringo
          para crear una compañía de venta directa digital en Latino América?
          Todo parte de un propósito común, empoderar a las mujeres
          Latinoamericanas para generar ingresos adicionales en menos tiempo y
          sin correr riesgos. Es así como nace elenas, una nueva experiencia de
          venta para nuestras embajadoras y una forma de lograr independencia y
          control sin correr riesgos. Porque nuestras embajadoras se enfocan en
          vender y en elenas entregamos y cobramos, ¡así de fácil!
        </Text>
        <Spacer size={16} />
        <Text style={styles.paragraph}>
          También nos inspiran las clientes de nuestras embajadoras. Queremos
          brindarles una experiencia de compra emocionante y personalizada en la
          que pueden confiar. Es así como, de la mano de su embajadora de
          confianza, nuestras clientes pueden encontrar los productos de belleza
          ideales para ellas de manera divertida y sin perder tiempo con
          productos irrelevantes. Buscando que se sientan bien con ellas mismas
          y que se consientan con lo mejor, sin remordimientos.
        </Text>
        <Spacer size={16} />
        <Text style={styles.paragraph}>
          ¿Y porque elenas? Significa "Mujer que brilla junto al sol". Y en
          numerología es el #1, que se define por ser independiente, audaz y
          siempre lista para el éxito. Elenas es una marca para mujeres latinas,
          llenas de color y pasión, mujeres diferentes, mujeres poderosas.
          Nuestro símbolo representa fuego, una llama que abraza y crece
          formando una e. ¡Por eso somos elenas, mujeres poderosas!
        </Text>
        <Spacer size={16} />

        <Text
          style={[
            styles.supportText,
            styles.textCenter,
            { color: Colors.brandInfo }
          ]}
        >
          hola@elenas.la
        </Text>
      </View>
    </Content>
  </Container>
);

export default About;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7F7FF"
  },
  header: {
    fontFamily: "playfair",
    fontSize: 32,
    marginBottom: 8,
    lineHeight: 28
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 20
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
  }
});
