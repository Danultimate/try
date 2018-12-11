import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Image, Share } from "react-native";
import {
  View,
  Container,
  Content,
  Icon,
  Card,
  CardItem,
  Body,
  Text,
  Button
} from "native-base";
import { Actions } from "react-native-router-flux";
import Colors from "../../../native-base-theme/variables/commonColor";
import Spacer from "./Spacer";

import { Mixpanel } from "../../actions/mixpanel";


const FilterBar = props => (
  <View style={styles.metaBar}>
    <Text style={[styles.meta, styles.leftContainer]}>
      {props.filterBarStatus}
    </Text>

    <Button
      style={[styles.filterButton, styles.rightContainer]}
      onPress={Actions.filters}
      small
      iconLeft
      transparent
      primary
    >
      <Icon style={styles.filterButtonIcon} name="equalizer" />
      <Text style={styles.filterButtonText} uppercase>
        Filtrar
      </Text>
    </Button>
  </View>
);

FilterBar.propTypes = {
  code: PropTypes.string
};

FilterBar.defaultProps = {
  code: ""
};

export default FilterBar;

const styles = StyleSheet.create({
  meta: {
    fontSize: 10,
    color: Colors.tabBarTextColor
  },
  metaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  leftContainer: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  rightContainer: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  filterButton: {
    paddingRight: 0
  },
  filterButtonIcon: {
    fontSize: 14
  },
  filterButtonText: {
    paddingLeft: 8,
    paddingRight: 0
  }
});
