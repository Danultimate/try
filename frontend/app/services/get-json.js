import Service from '@ember/service';

export default Service.extend({
    getUrlData(url){

    let data = Ember.$.getJSON(url);

    return data.then((json) => {
      let records = JSON.stringify(json, null, 2);

      

      return records;
    });
  }

});