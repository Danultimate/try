import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
   first_name: attr('string'),
   last_name: attr('string'),
   cellphone: attr('string'),
   picture: attr('string')

});
