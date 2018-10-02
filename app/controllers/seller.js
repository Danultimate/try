import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';

export default Controller.extend({

    session: service('session'),
    mixpanel: service('mixpanel'),

    init() {
        this._super();
        schedule("afterRender",this,function() {
            window.mixpanel.track('watch dashboard');
        });
    },

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
