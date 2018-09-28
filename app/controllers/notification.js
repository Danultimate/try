import Controller from '@ember/controller';
import { schedule } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Controller.extend({
  queryParams: ['token', 'otherstuff'],
  token: null,
  otherstuff: [],
  session: service('session'),

  init() {
    this._super();
    schedule("afterRender",this,function() {
      this.send("updateToken");
    });
  },


  actions: {
    updateToken() {
      console.log('entro al test action');
      let token = this.get('token');
      console.log(token);
      this.store.findRecord('user', this.get('session').data.authenticated.user.id)
      .then(function(record) {
        console.log(record);
        mixpanel.identify(record.id);
        mixpanel.people.append({"$android_devices": token});
        record.set('device_token', token);
        record.save().then(() => {
          window.location = '/';
        })
        .catch((reason) => {
            console.log('Error @user.updateToken: '+ reason)
            this.set('isError', true);
        });
       
      });
    },
  }
});
