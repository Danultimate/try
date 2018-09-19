import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';

export default Controller.extend({
    
    session: service('session'),
    currentUrl: null,
    hide_nav_endpoints: ['/landing', '/sign_up', '/login', '/term_conditions', '/thanks', '/index'],
    show_nav: true,
    
    onPathChanged: observer('currentPath', function () {
        
        next(this, function () {
            if (this.hide_nav_endpoints.includes(window.location.pathname)){
                this.set('show_nav', false);
            }
        });
    }),
    

    actions: {
        invalidateSession() {
            this.get('session').invalidate();
            window.location = '/'
        },
        goBack(){
            window.history.back();
        }
    }
});
