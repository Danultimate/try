import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
   first_name: attr('string'),
   last_name: attr('string'),
   cellphone: attr('number'),
   identification: attr('number'),
   picture: attr('string'),
   password: attr('string'),
   email: attr('string')
});
