import Model from 'ember-data/model';
import DS from 'ember-data';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
    name: attr('string'),
    date: attr('date'),
    client: belongsTo('client'),
    items: hasMany('item'),
    
    // get prices of all related items (automatically updated when added/removed)
    purchasePrices:  Ember.computed.mapBy('items', 'price'),
    // calculate sum of items
    purchaseSum: Ember.computed.sum('purchasePrices')
});
