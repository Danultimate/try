import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';
import $ from 'jquery';

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
            // Interaction Tracker
            $.getJSON('https://json.geoiplookup.io').then((data) => {
                let browser_info = JSON.stringify(data, null, 2);
                let record = this.store.createRecord('interaction', {
                    action: 'watched',
                    current_url: window.location.href,
                    browser_info: browser_info,
                    session_info: JSON.stringify(this.get('session').data)
                  });
                record.save().then(() => {
                    // this.loader.setLoading(false);
                    // this.transitionToRoute(record, 'record')
                }).catch((reason) => {
                    // this.loader.setLoading(false);
                    this.set('isError', true);
                });
            });
            
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
