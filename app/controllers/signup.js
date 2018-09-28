import Controller from '@ember/controller';
import $ from 'jquery';


export default Controller.extend({

  first_name: null,
  last_name: null,
  identification: null,
  cellphone: null,
  email: null,
  ds_experience: null,
  password: null,

  actions: {
    disableSubmitButton() {
      //disable the submit button
      $('#btnSubmit').attr('disabled', true);
      return true;
    },

//Maybe we can use this: https://github.com/poteto/ember-changeset-validations
    save() {
      this.actions.disableSubmitButton();
      let record = this.store.createRecord('user', {
        first_name: this.get('first_name'),
        last_name: this.get('last_name'),
        identification: this.get('identification'),
        cellphone: this.get('cellphone'),
        email: this.get('email'),
        password: this.get('password')
      });
      record.save().then(() => {
        let seller_record = this.store.createRecord('seller', {
          user: record,
          ds_experience: this.get('ds_experience'),
          referred_by_code: this.get('seller_code'),
          commission: 0.3,
        });
        seller_record.save().then(() => {
          //redirect to Intro pages
          window.mixpanel.people.set({
              "$distinct_id": record.id,
              "$email": record.email,    // only special properties need the $

              "$created": new Date(),
              "$last_login": new Date(),         // properties can be dates...

              "$cellphone": record.cellphone,
              "first_name": record.first_name,
              "last_name": record.first_name,
              "seller_code": seller_record.code,
          });
          this.transitionToRoute('login')
        }).catch((reason) => {
          // Error saving seller
          this.set('isError', true);
        })
      }).catch((reason) => {
        // Error saving user
        this.set('isError', true);
      });
    },
  }
});
