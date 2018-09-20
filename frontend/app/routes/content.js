import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { hash } from 'rsvp';

export default Route.extend(AuthenticatedRouteMixin, {
    model(params){
        return hash({
            content: this.store.findRecord('content', params.content_id),
            clients: this.store.findAll('client')
          });
    },

});
