import { mapBy, sum } from '@ember/object/computed';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    order_number: attr('number'),
    client: belongsTo('client'),
    seller: belongsTo('seller'),
    status: attr('number'),
    date: attr('date'),
    total: attr('number')
});
