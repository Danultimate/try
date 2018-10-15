import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
    session: service('session'),

    actions: {
        share(content) {
            window.mixpanel.track('share from content', {
                                'content_id': content.id,
                                'content_name': content.name,
                                'content_description': content.description
                                });
            $.getJSON('https://json.geoiplookup.io').then((data) => {
                let browser_info = JSON.stringify(data, null, 2);
                let record = this.store.createRecord('interaction', {
                                action: 'share from content',
                                extra_info: JSON.stringify({"type": "content",
                                            "id": content.id,
                                            "name": content.name,
                                            "description": content.description}),
                                current_url: window.location.href,
                                browser_info: browser_info,
                                session_info: JSON.stringify(this.get('session').data)
                            });
                record.save()
            });
            if (!("share" in navigator)) {

                if (typeof Android !== 'undefined'){
                    console.log('este es el print ' + content.url + ' '+ content.description);
                    if (content.media_type == "imagen") {
                        Android.share(content.description, content.url);
                    }
                    else {
                        Android.share(content.description + " " + content.url);
                    }
                    return;
                }
                else {
                    let text = encodeURIComponent(content.description + " " + content.url);
                    window.location = 'whatsapp://send?text='+text;
                    return;
                }
                
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

