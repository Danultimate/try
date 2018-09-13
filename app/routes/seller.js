import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        this.store.findAll('user');
        this.store.findAll('order');
        this.store.findAll('task');
        return this.store.findAll('seller');
    }
});
