import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({

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

