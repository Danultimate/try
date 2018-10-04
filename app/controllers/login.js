import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

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
        this.get('session').authenticate('authenticator:authenticator',
          this.get('cellphone'), this.get('password')).then(()=>{
            if (typeof Android !== 'undefined'){
              window.location = 'config://get_token';
            }
            else {
              window.location = '/';
            }
        }).catch((reason) => {
          console.log("Reason why cant login",reason)
          this.set('isError', "Datos ingresados incorrectos");
        });
      }
    }
  });