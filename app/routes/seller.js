import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        //TODO: how to get and save the current user -> seller id
        return this.store.findRecord('seller', 1);
    }
});
