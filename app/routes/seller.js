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
});
