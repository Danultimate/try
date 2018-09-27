import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
   first_name: attr('string'),
   last_name: attr('string'),
   cellphone: attr('number'),
   identification: attr('number'),
   picture: attr('string'),
   password: attr('string'),
   email: attr('string'),
   birth: attr('string'),
   device_token: attr('string'),
});
