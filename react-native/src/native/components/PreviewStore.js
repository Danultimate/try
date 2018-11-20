const WEBVIEW_REF = "WEBVIEW_REF";
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  WebView,
  Linking,
  TouchableOpacity
} from "react-native";
import { Button, Icon } from "native-base";

import Colors from "../../../native-base-theme/variables/commonColor";

export default class WebPreview extends Component {
  constructor(props) {
    super(props);
    this.state = { canGoBack: false };
  }
  render() {
    const uri = "https://elenas.la/products";

    return (
      <View style={styles.container}>
        <WebView
          style={{ flex: 1 }}
          ref={WEBVIEW_REF}
          source={{ uri }}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
        {this.state.canGoBack && (
          <View style={styles.navbar}>
            <Button
              disabled={!this.state.canGoBack}
              onPress={this.onBack.bind(this)}
              small
              iconLeft
              transparent
              primary
            >
              <Icon type="SimpleLineIcons" name="arrow-left" />
              <Text>Volver</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }
  onBack() {
    this.refs[WEBVIEW_REF].goBack();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navbar: {
    height: 50,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 8,
    borderTopColor: "#ECEBF0",
    borderTopWidth: 1,
    backgroundColor: Colors.brandLight
  },
  topbarText: {
    color: Colors.brandInfo
  },
  topbarTextDisabled: {
    color: Colors.tabBarTextColor
  }
});
