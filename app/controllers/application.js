import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';

export default Controller.extend({

    session: service('session'),

    actions: {
        invalidateSession() {
            this.get('session').invalidate();
            window.location = '/';
        },
        goBack(){
            window.history.back();
        }
    }
});
