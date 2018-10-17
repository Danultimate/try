import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    session: service('session'),
    mixpanel: service('mixpanel'),
    last_content: null,

    actions: {
        invalidateSession() {
            this.get('session').invalidate();
            window.location = '/';
        },
    }
    
});
