import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
  model(){
    window.mixpanel.track('watch contents');
    $.getJSON('https://json.geoiplookup.io').then((data) => {
        let browser_info = JSON.stringify(data, null, 2);
        let record = this.store.createRecord('interaction', {
                        action: 'watch contents',
                        current_url: window.location.href,
                        browser_info: browser_info,
                        session_info: JSON.stringify(this.get('session').data)
                    });
        record.save()
    });
    return this.store.findAll('content');
    // let seller = this.store.findAll('seller');
    // return this.store.query("content", {
    //   filter: seller.segment
    // });
  }
});
