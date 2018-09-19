import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import { observer } from '@ember/object';
import { next } from '@ember/runloop';

export default Controller.extend({

    // ready: observer('currentPath', function () {   
    //     next(this, function () {
    //         window.mixpanel.track('on content')
    //     });
    // }),
    
    //naturalia_clients: filterby(this.get('clients'), 'profile', 'Naturalia'),
    // trendy_clients: filterby(this.get('clients'), 'profile', 'Trendy'),
    // autentica_clients: filterby(this.get('clients'), 'profile', 'Autentica'),
    // general_clients: filterby(this.get('clients'), 'profile', 'General'),

    actions: {
        share(content) {
            window.mixpanel.track('share from content', {
                                'content_id': content.id,
                                'content_name': content.name,
                                'content_description': content.description
                                });
            if (!("share" in navigator)) {
                console.log('este es el print ' + content.url + ' '+ content.description);
                if (content.media_type == "imagen") {
                    Android.share(content.description, content.url);
                }
                else {
                    Android.share(content.description + " " + content.url);
                }
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
