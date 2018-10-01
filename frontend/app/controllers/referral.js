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
            let text = ":gorro_de_fiesta:Te invito a conocer Descubre - la nueva forma de vender productos de belleza:lápiz_labial:. 30% de comisión, sin orden mínima y Descubre entrega y cobra :camión:. Regístrate en la app :iphone: (http://bit.ly/appdescubre) usando mi código "+ code +" y obten 20 mil :dinero_con_alas: en bonos de regalo :gorro_de_fiesta:"
          
            window.mixpanel.track('share code from referral');
          if (!("share" in navigator)) {
            if (typeof Android !== 'undefined'){
                Android.share(text)
                return;
            }
            else {
                text = encodeURIComponent(text);
                window.location = 'whatsapp://send?text='+text;
                return;
            }

              
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
