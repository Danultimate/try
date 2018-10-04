import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

Ember.onerror = function (error) {
  console.log('Ember.onerror handler', error.message);
  //localStorage.clear();
  //window.location = '/';
};

Ember.RSVP.on('error', function (error) {
  console.log('Ember.RSVP error handler', error);
});

export default App;