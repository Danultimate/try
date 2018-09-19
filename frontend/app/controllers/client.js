import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';

export default Controller.extend({
    
    // onPageReady: observer('currentPath', function () {
    //     next(this, function () {
    //         console.log('entrooo a client detaul')
    //         window.mixpanel.track('on client detail', {
    //             'client_id': this.get('model').id,
    //             'user_client_id': this.get('model').user.id,
    //             'client_name': this.get('model').user.first_name + ' ' + this.get('model').user.last_name,
    //         })
    //     });
    // }),

});
