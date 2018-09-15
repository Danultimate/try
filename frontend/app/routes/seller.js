import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
    model(params){
        this.store.findAll('user');
        this.store.findAll('order');
        this.store.findAll('task');
        return this.store.findAll('seller');
    }
});
