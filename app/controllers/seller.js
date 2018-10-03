import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    session: service('session'),
    mixpanel: service('mixpanel'),

    actions: {
        invalidateSession() {
            this.get('session').invalidate();
            window.location = '/';
        },
        error() {
            console.log('entra aqui wii')
        },
    }
    
});
