import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    referred_by: attr('string'),
    referred_by: attr('string'),
    paid: attr('boolean')
});
