import { mapBy, sum } from '@ember/object/computed';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    name: attr('string'),
    date: attr('date'),
    client: belongsTo('client'),
    items: hasMany('item'),
    seller: belongsTo('seller'),
    
    // get prices of all related items (automatically updated when added/removed)
    purchasePrices:  mapBy('items', 'price'),
    // calculate sum of items
    purchaseSum: sum('purchasePrices')
});
