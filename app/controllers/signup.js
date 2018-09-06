import Controller from '@ember/controller';

export default Controller.extend({

  first_name: null,
  last_name: null,
  identification: null,
  cellphone: null,
  email: null,
  ds_experience: null,
  password: null,

  actions: {
    save() {
      let record = this.store.createRecord('user', {
        first_name: this.get('first_name'),
        last_name: this.get('last_name'),
        identification: this.get('identification'),
        cellphone: this.get('cellphone'),
        email: this.get('email'),
        ds_experience: this.get('ds_experience'),
        password: this.get('password')
      });
      record.save().then(() => {
        // this.loader.setLoading(false);
        // this.transitionToRoute(record, 'record')
      }).catch((reason) => {
        //   this.loader.setLoading(false);
        this.set('isError', true);
      });
    },
  }
});
