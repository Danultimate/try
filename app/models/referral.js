import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    referred_by: belongsTo('seller'),
    referred: attr('string'),
    paid: attr('boolean'),
    
    //seller: belongsTo('seller'),
});
