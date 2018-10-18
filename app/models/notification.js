import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    description: attr('string'),
    close_text: attr('string'),
    close_link: attr('string'),
    seller: belongsTo('seller'),
    read: attr('boolean', { defaultValue: false }),
});
