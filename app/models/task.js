import Model from 'ember-data/model';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { computed } from '@ember/object';

export default Model.extend({
    task_description: attr('string'),
    planned_date: attr('date'),
    num_of_clients: attr('number'),
    done: attr('boolean', { defaultValue: false }),
    excuted_date: attr('date'),
    users: hasMany('user'),
    // social_media: hasMany('')
    client_suggestions: hasMany('client-suggestions'),
    seller: belongsTo('seller'),
    content: belongsTo('content'),

    filteredClientSuggestions: computed('users', function () {
      //FIXME: Delete this when we can filter the full list into the front, (i.e. with a responsive
        //table or 'show more', show less options)
      let clientSuggestionsLimit = 5;
      let clientSuggestions = this.get('users');
      console.log(`This is clientSuggestions ${clientSuggestions}`);
      let filteredResponse = [];

      if (clientSuggestionsLimit < clientSuggestions.length ) {
        for (let i=0; i<clientSuggestionsLimit; i++) {
          filteredResponse.push(clientSuggestions[i]);
          console.log(clientSuggestions[i]);
        }
      } else {
        for (let i=0; i<=clientSuggestions.length; i++) {
          filteredResponse.push(clientSuggestions[i]);
          console.log(`clientSuggestions[${i}] = ${clientSuggestions[i]}`);
          console.log(`clientSuggestions[] length = ${clientSuggestions.length}`);
        }
      }
      return filteredResponse
    })



});
