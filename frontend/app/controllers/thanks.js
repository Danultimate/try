import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    share(params) {
      console.log('params', params)
      if (!("share" in navigator)) {
        let text = encodeURIComponent(params[0])
        window.location = 'whatsapp://send?text=' + text
        return;
      }

      navigator.share({
        title: 'Descubre la manera de vender más',
        text: text,
        url: 'https://seller-client.herokuapp.com'
      })
        .then(() => console.log('Successful share'))
        .catch(error => console.log('Error sharing:', error));
    },

    shareWhatsapp(message, phone) {
      let text = encodeURIComponent(message)
      window.location = 'whatsapp://send?text=' + text + '&phone=' + phone
    }

  }
});
