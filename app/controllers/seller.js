import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    session: service('session'),
    mixpanel: service('mixpanel'),
    last_content: null,

    actions: {
        goContent(content_id) {
            window.mixpanel.track('click semanazo at dashboard');
            $.getJSON('https://json.geoiplookup.io').then((data) => {
                let browser_info = JSON.stringify(data, null, 2);
                let record = this.store.createRecord('interaction', {
                                action: 'click semanazo at dashboard',
                                current_url: window.location.href,
                                browser_info: browser_info,
                                session_info: JSON.stringify(this.get('session').data)
                            });
                record.save()
            });
            window.location = 'contents/'+content_id;
        },
        invalidateSession() {
            this.get('session').invalidate();
            window.location = '/';
        },
    }
    
});
