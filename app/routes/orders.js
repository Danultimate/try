import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    // use findAll since we know the records are already in the store
    return this.store.findAll('order');
  }
});
