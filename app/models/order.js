import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
    order_number: attr('number'),
    client: belongsTo('client'),
    seller: belongsTo('seller'),
    status: attr('string'),
    date: attr('date'),
    total: attr('number'),
    tax: attr('number'),
    shipping: attr('number'),
    paid: attr('boolean'),
});
