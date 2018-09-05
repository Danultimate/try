import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    first_name: attr('string'),
    last_name: attr('string'),
    cellphone: attr('number'),
    // description: attr('string'),
    //TODO: seller: belognsTo('seller') //backend??

});
