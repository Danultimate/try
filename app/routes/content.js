import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        return this.store.findRecord('content', params.content_id);
    }
});
