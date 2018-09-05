import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    cellphone: null,
    password: null,
    isError: false,
  
    session: service('session'),
  
    isLoginButtonDisabled: Ember.computed('cellphone', 'password', function(){
      return Ember.isEmpty(this.get('cellphone')) || Ember.isEmpty(this.get('password'));
    }).readOnly(),
  
  
    actions: {
      authenticate(){
        // this.loader.setLoading(true);
        this.get('session').authenticate('authenticator:authenticator',
          this.get('cellphone'), this.get('password')).then(()=>{
            // this.loader.setLoading(false);
        }).catch((reason) => {
        //   this.loader.setLoading(false);
          this.set('isError', true);
        });
      }
    }
  });