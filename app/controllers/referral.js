import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  // first_name: null,
  // last_name: null,
  // cellphone: null,

  // actions: {
  //   save() {
  //     let record = this.store.createRecord('referral', {
  //       first_name: this.get('first_name'),
  //       last_name: this.get('last_name'),
  //       cellphone: this.get('cellphone')
  //     });
  //     record.save().then(() => {
  //       // this.loader.setLoading(false);
  //       // this.transitionToRoute(record, 'record')
  //     }).catch((reason) => {
  //       //   this.loader.setLoading(false);
  //       this.set('isError', true);
  //     });
  //   },
  // }
  session: service('session'),

  actions: {
        share() {
            let code = this.get('session').data.authenticated.seller.code
            let text = "Ahora soy parte de Descubre Cosmeticos y me gustaria que me acompanaras, usa mi codigo "+ code + " al registrarte en la app: https://play.google.com/store/apps/details?id=com.descubrecosmeticos.descubre"
          
            window.mixpanel.track('share code from referral');
          if (!("share" in navigator)) {
              Android.share(text)
              return;
          };

          navigator.share({
              title: 'Descubre tu belleza',
              text: text
              })
              .then(() => console.log('Successful share'))
              .catch(error => console.log('Error sharing:', error));
      }
    }


});
