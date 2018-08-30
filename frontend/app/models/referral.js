import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    name: attr('string'),
    phone: attr('string'),
    description: attr('string'),
    //TODO: seller: belognsTo('seller') //backend??

});
