import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {

    model(params){
        if (!this.get('session').data.authenticated.seller){
            this.get('session').invalidate(),
            window.location = '/'
        }
        let record = this.get('session').data.authenticated.user;
        let seller_record = this.get('session').data.authenticated.seller;

        mixpanel.identify(record.id);
        mixpanel.track('watch dashboard');
        $.getJSON('https://json.geoiplookup.io').then((data) => {
            let browser_info = JSON.stringify(data, null, 2);
            let record = this.store.createRecord('interaction', {
                            action: 'watch dashboard',
                            current_url: window.location.href,
                            browser_info: browser_info,
                            session_info: JSON.stringify(this.get('session').data)
                        });
            record.save()
        });

        Sentry.configureScope((scope) => {
            scope.setUser({"id": record.id,
                            "username": seller_record.code,
                            });
            scope.setExtra("seller_name", record.first_name + " " + record.last_name);
          });

        // Temporal position for the people set
        mixpanel.people.set_once({
            "$distinct_id": record.id,
            "$email": record.email,    // only special properties need the $
            
            "$created": new Date(),
            "$last_login": new Date(),         // properties can be dates...
            
            "$cellphone": record.cellphone,
            "first_name": record.first_name,
            "last_name": record.last_name,
            "seller_code": seller_record.code,
        });

        this.store.findAll('user');
        this.store.findAll('referral');
        this.store.findAll('order');
        this.store.findAll('task');
        return this.store.findAll('seller');
    },


    setupController(controller, model) {
        controller.set('model', model.firstObject);
        this.store.findAll('content').then(function(contents) {
            console.log('el content len '+contents._length)
            console.log('el content '+contents.firstObject)
            controller.set('last_content', contents.firstObject);
        });
    }
});
