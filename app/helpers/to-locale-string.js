import Ember from 'ember';

export function toLocaleString(params/*, hash*/) {
  return params[0].toLocaleString();
}

export default Ember.Helper.helper(toLocaleString);
