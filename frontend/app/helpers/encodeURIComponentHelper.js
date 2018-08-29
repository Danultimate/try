import Ember from 'ember';

export function encodeURIComponentHelper(params/*, hash*/) {
  return encodeURIComponent(params);
}

export default Ember.Helper.helper(encodeURIComponentHelper);
