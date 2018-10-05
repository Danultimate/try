'use strict';

module.exports = function(environment) {
  console.log('environment', environment)
  let ENV = {
    modulePrefix: 'frontend',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }, 

    SRI: {
      enabled: false,
      paranoidCheck: false,
      fingerprintCheck: false,
    },

    'ember-simple-auth': {
      authenticationRoute: 'landing',
      routeAfterAuthentication: 'seller',
      routeIfAlreadyAuthenticated: 'seller'
    },

    mixpanel: {
      enabled: true,
      LOG_EVENT_TRACKING: true,
      token: '86bd5bcb5906d87ff97eb567a4c0e57a'
    },

    host: 'http://localhost:5000'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

  }

  if (environment === 'test') {
    // Testem prefers this...
    // ENV.locationType = 'none';

    // // keep test console output quieter
    // ENV.APP.LOG_ACTIVE_GENERATION = false;
    // ENV.APP.LOG_VIEW_LOOKUPS = false;

    // ENV.APP.rootElement = '#ember-testing';
    // ENV.APP.autoboot = false;
    ENV.host = 'https://seller-server-dev.herokuapp.com';
    ENV.mixpanel = {
      enabled: true,
      LOG_EVENT_TRACKING: true,
      token: '7c5582209ad60d202024e04001bf8af6'
    };
  }

  if (environment === 'production') {
    ENV.host = 'https://seller-server.herokuapp.com';
    // here you can enable a production-specific feature
    ENV.mixpanel = {
      enabled: true,
      LOG_EVENT_TRACKING: false,
      token: '7c5582209ad60d202024e04001bf8af6'
    };
  }

  return ENV;
};
