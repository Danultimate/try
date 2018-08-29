import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  user: belongsTo('user'),
  old_consumer: attr('boolean', { defaultValue: false }),
  seller: belongsTo('seller'),
  orders: hasMany('order'),

});
