import React from "react";
import { StatusBar, Platform } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, Stack } from "react-native-router-flux";
import { PersistGate } from "redux-persist/es/integration/react";

import { Root, StyleProvider } from "native-base";
import getTheme from "../../native-base-theme/components";
import theme from "../../native-base-theme/variables/commonColor";

import Routes from "./routes/index";
import Loading from "./components/Loading";

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === "android") StatusBar.setHidden(false);

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    const { store, persistor } = this.props;

    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <StyleProvider style={getTheme(theme)}>
              <Router>
                <Stack key="root">{Routes}</Stack>
              </Router>
            </StyleProvider>
          </PersistGate>
        </Provider>
      </Root>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/logo-p.png"),
        require("./assets/images/logo-w.png"),
        require("./assets/images/avatar.png"),
        require("./assets/images/login.png"),
        require("./assets/images/signup.png"),
        require("./assets/images/notification.png"),
        require("./assets/images/onboarding-1.png"),
        require("./assets/images/onboarding-2.png"),
        require("./assets/images/onboarding-3.png")
      ]),
      Font.loadAsync({
        playfair: require("./assets/fonts/PlayfairDisplay-Bold.ttf")
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

App.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired
};

export default App;
