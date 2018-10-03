import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

  session: service('session'),

  actions: {
        share() {
            let code = this.get('session').data.authenticated.seller.code
            let text = "🎉Te invito a conocer Descubre - la nueva forma de vender productos de belleza💄. 30% de comisión, sin orden mínima y Descubre entrega y cobra 🚚. Regístrate en la app 📱 (http://bit.ly/appdescubre) usando mi código "+ code +" y obten 20 mil 💸 en bonos de regalo 🎉"
          
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
