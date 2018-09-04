import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        //
        //TODO: set notification token
        this.store.findAll('order');
        this.store.findAll('task');
        return this.store.findRecord('seller', 1);
    }
});
