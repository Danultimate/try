import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
  model(){
    // use findAll since we know the records are already in the store
    return this.store.findAll('order');
  }
});
