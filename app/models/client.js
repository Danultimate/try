import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { filterBy } from '@ember/object/computed';

export default Model.extend({
  user: belongsTo('user'),
  old_consumer: attr('boolean', { defaultValue: false }),
  seller: belongsTo('seller'),
  orders: hasMany('order'),

  ordersActive: filterBy('orders', 'status', 0),
  ordersCompleted: filterBy('orders', 'status', 1),
  ordersCancelled: filterBy('orders', 'status', 2)

});
