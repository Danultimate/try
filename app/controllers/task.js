import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    share(content) {
        if (!("share" in navigator)) {
            if (content.get('media_type') === "image") {
                Android.share(content.description, content.url);
            }
            else {
                Android.share(content.description + " " + content.url);
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
