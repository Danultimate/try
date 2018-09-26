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
      console.log('entro al test action')
      console.log(this.get('token'))
      let record = this.get('session').data.authenticated.user;
      mixpanel.identify(record.id)
      mixpanel.people.append({"$android_devices": this.get('token')});
    },
  }
});
