import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
    model(params){
        this.store.findAll('client');
        return this.store.findRecord('content', params.content_id);
    }
});
