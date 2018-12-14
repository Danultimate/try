// symbol polyfills
global.Symbol = require("core-js/es6/symbol");
require("core-js/fn/symbol/iterator");

// collection fn polyfills
require("core-js/fn/map");
require("core-js/fn/set");
require("core-js/fn/array/find");
import React from "react";
import { StatusBar, Platform, AsyncStorage } from "react-native";
import {
  AppLoading,
  Asset,
  Font,
  Permissions,
  Notifications,
  Icon
} from "expo";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, Actions } from "react-native-router-flux";
import { PersistGate } from "redux-persist/es/integration/react";

import { Root, StyleProvider } from "native-base";
import getTheme from "../../native-base-theme/components";
import theme from "../../native-base-theme/variables/commonColor";

import Routes from "./routes/index";
import PublicRoutes from "./routes/public";
import PrivateRoutes from "./routes/private";
import Loading from "./components/Loading";

import registerForPushNotificationsAsync from "../constants/notifications";

// Get rid of “Remote debugger is in a background tab” warning
import { YellowBox } from "react-native";
YellowBox.ignoreWarnings(["Remote debugger"]);

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === "android") {
  StatusBar.setHidden(false);
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasToken: false,
      isLoadingComplete: false,
      notification: {}
    };
  }

  componentDidMount() {
    registerForPushNotificationsAsync();
    AsyncStorage.getItem("token").then(token => {
      this.setState({ hasToken: token !== null, isLoaded: true });
    });

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
    // TODO: has token as backend AND firebase
    if (this.state.hasToken) {
      Actions.home({});
    } else {
      Actions.welcome({});
    }
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
              <Router>{Routes}</Router>
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
        require("./assets/images/support.png"),
        require("./assets/images/first-order.png"),
        require("./assets/images/welcome-1.png"),
        require("./assets/images/welcome-2.png"),
        require("./assets/images/welcome-3.png"),
        require("./assets/images/onboarding-1.png"),
        require("./assets/images/onboarding-2.png"),
        require("./assets/images/onboarding-3.png"),
        require("./assets/images/onboarding-4.png"),
        require("./assets/images/onboarding-5.png"),
        require("./assets/images/onboarding-6.png"),
        require("./assets/images/nequi-logo.png"),
        require("./assets/images/nequi-logo-sm.png")
      ]),
      Font.loadAsync({
        ...Icon.SimpleLineIcons.font,
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
