import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
    model(){
      window.mixpanel.track('watch tasks');
      $.getJSON('https://json.geoiplookup.io').then((data) => {
        let browser_info = JSON.stringify(data, null, 2);
        let record = this.store.createRecord('interaction', {
                        action: 'watch tasks',
                        current_url: window.location.href,
                        browser_info: browser_info,
                        session_info: JSON.stringify(this.get('session').data)
                    });
        record.save()
    });
      return this.store.findAll('task');
  }
});
