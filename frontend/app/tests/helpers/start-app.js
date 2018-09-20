import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

import { run } from '@ember/runloop';
import { assign } from '@ember/polyfills';

// Ember.assing and Ember.merge do the same thing:
// https://emberjs.com/api/api/ember/release/functions/@ember%2Fpolyfills/merge
// https://emberjs.com/api/api/ember/release/functions/@ember%2Fpolyfills/assign
//const assign = Ember.assign || Ember.merge;

export default function startApp(attrs) {
  let application;

  let attributes = assign({rootElement: "#test-root"}, config.APP);
  attributes = assign(attributes, attrs); // use defaults, but you can override;

  run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
