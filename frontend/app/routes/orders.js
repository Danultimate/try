import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
  model(){
    window.mixpanel.track('watch orders');
    //return this.store.query('order', {});
    return this.store.findAll('order', {shouldReloadAll: true})
  },
  
});
