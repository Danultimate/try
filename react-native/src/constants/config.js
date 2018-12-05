const devMode = process.env.NODE_ENV === "development";

console.log(process.env.NODE_ENV)
let baseURL, appName;

if (devMode) {
  // baseURL = 'https://seller-backend-test.herokuapp.com/api';
  baseURL = 'https://seller-server-dev.herokuapp.com/api'
  appName = "ElenasDEV";
} else {
  baseURL = 'https://seller-server-dev.herokuapp.com/api'
  appName = "Elenas"
}

export default {
  // App Details
  appName: appName,

  baseURL: baseURL,

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: devMode ? "UA-84284256-2" : "UA-84284256-1"

};
