import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';

export default Controller.extend({
    
    session: service('session'),

    onPathChanged: observer('currentPath', function () {   
        next(this, function () {
            window.mixpanel.track('on landing')
        });
    }),
    
    beforeModel: observer('currentPath', function () {
        console.log('entra at leats')
        next(this, function () {
            console.log('entra at leats')
        if (this.get('session').isAuthenticated){
            window.location = '/seller'
        }
        
        });
    }),
});
