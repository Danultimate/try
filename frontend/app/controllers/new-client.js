import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  session: service('session'),
  first_name: null,
  last_name: null,
  cellphone: null,

  actions: {
    save() {
        let record = this.store.createRecord('user', {
            first_name: this.get('first_name'),
            last_name: this.get('last_name'),
            cellphone: this.get('cellphone'),
          });
        record.save().then(() => {
            let client_record = this.store.createRecord('seller', {
                user: record,
                seller: this.get('session').data.authenticated.seller.id,
                old_consumer: true,
            });
            client_record.save().then(() => {
                this.transitionToRoute('clients')
            }).catch((reason) => {
                // Error saving client
                this.set('isError', true);
            })
        }).catch((reason) => {
        // Error saving user
        this.set('isError', true);
        });
    },
  }

});
