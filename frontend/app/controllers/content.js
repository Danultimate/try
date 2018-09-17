import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({

    //naturalia_clients: filterby(this.get('clients'), 'profile', 'Naturalia'),
    // trendy_clients: filterby(this.get('clients'), 'profile', 'Trendy'),
    // autentica_clients: filterby(this.get('clients'), 'profile', 'Autentica'),
    // general_clients: filterby(this.get('clients'), 'profile', 'General'),

    actions: {
        share(content) {
            if (!("share" in navigator)) {
                console.log('este es el print ' + content.url + ' '+ content.description);
                // if (content.get('media_type') === "image") {
                //     Android.share(content.description, content.url);
                // }
                // else {
                //     Android.share(content.description + " " + content.url);
                // }
                Android.share("Esto es lo que comparto", "pasoe");
                return;
                
            };
    
            navigator.share({
                title: 'Descubre tu belleza',
                text: 'Mira este contenido ',
                url: content.get('url')
                })
                .then(() => console.log('Successful share'))
                .catch(error => console.log('Error sharing:', error));
        }

    }
});
