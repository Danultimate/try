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
    // let seller = this.store.peekAll('seller')
    // console.log('el segment del seller: ', seller)
    // console.log('el segment del seller2: ', seller.firstObject)
    
    // let model = this.store.findAll('content').then((data) => {
    //   console.log('el el data '+data)
    //   return filter('data', function(item, index, array) {
    //     return item.segment==1;
    //   })

    // })

    
    // let model = this.store.query('content', {
    //   filter: {
    //     segment: 2
    //   }
    // })

    // return model;

  }
});
