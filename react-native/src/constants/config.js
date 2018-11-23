const devMode = process.env.NODE_ENV === "development";

let baseURL;

if (devMode) {
  baseURL = 'https://seller-backend-test.herokuapp.com/api'
} else {
  baseURL = 'https://seller-server-dev.herokuapp.com/api'
}

export default {
  // App Details
  appName: "Elenas",

  baseURL: baseURL,

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: devMode ? "UA-84284256-2" : "UA-84284256-1"

};
