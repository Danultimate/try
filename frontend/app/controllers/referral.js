import Controller from '@ember/controller';

export default Controller.extend({

  first_name: null,
  last_name: null,
  cellphone: null,

  actions: {
    save() {
      let record = this.store.createRecord('referral', {
        first_name: this.get('first_name'),
        last_name: this.get('last_name'),
        cellphone: this.get('cellphone')
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

// record.save().then(() => {
//   this.transitionToRoute(record, record)
// },
//   () => { });

//this.transitionToRoute(record, record)