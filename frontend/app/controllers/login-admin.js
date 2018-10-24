import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';

export default Controller.extend({

    cellphone: null,
    password: null,
    isError: false,
  
    session: service('session'),
  
    isLoginButtonDisabled: computed('cellphone', 'password', function(){
      return isEmpty(this.get('cellphone')) || isEmpty(this.get('password'));
    }).readOnly(),
  
    actions: {
      authenticate(){
        // this.loader.setLoading(true);
        console.log(this.get('cellphone'), this.get('password'))
        this.get('session').authenticate('authenticator:authenticatoradmin',
          this.get('cellphone'), this.get('password')).then(()=>{
            if (typeof Android !== 'undefined'){
              //window.location = 'config://get_token';
              window.location = '/';
            }
            else {
              window.location = '/';
            }
        }).catch((reason) => {
          console.log(reason)
          this.set('isError', reason);
        });
      }
    }
  });