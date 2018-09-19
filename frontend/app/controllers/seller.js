import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Controller.extend({

    session: service('session'),
    mixpanel: service('mixpanel'),
    
});
