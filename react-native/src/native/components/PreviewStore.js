import React, { Component } from "react";
import { WebView, Linking } from "react-native";

export default class WebPreview extends Component {
  render() {
    const uri = "https://elenas.la/products";
    return (
      <WebView
        ref={ref => {
          this.webview = ref;
        }}
        source={{ uri }}
        onNavigationStateChange={event => {
          if (event.url !== uri && event.navigationType === "click") {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    );
  }
}
