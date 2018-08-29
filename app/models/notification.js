import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    description: attr('text'),
    seller: belongsTo('seller'),
    date: attr('date'),
    read: attr('boolean', { defaultValue: false }),
});
