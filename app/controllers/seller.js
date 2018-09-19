import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Controller.extend({

    session: service('session'),

    ready: observer('currentPath', function () {   
        next(this, function () {
            window.mixpanel.identify(this.get('session').data.authenticated.user.id)
            window.mixpanel.track('on home')
        });
    }),
    
});
