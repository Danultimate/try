import { mapBy, sum } from '@ember/object/computed';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
    name: attr('string'),
    status: attr('date'),
    client: belongsTo('client'),
    products: hasMany('product'),
    seller: belongsTo('seller'),
    status: attr('number'),
    date: attr('date'),
    
    // get prices of all related items (automatically updated when added/removed)
    purchasePrices:  mapBy('product', 'price'),
    // calculate sum of items
    purchaseSum: sum('purchasePrices'),

    purchasePoints:  mapBy('product', 'point'),
    purchasePointsSum: sum('purchasePoints')

});
