import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    // use peekall since we know the records are already in the store
    return this.store.peekAll('order');
  }
});
