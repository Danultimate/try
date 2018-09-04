import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  price: attr('number'),
  image: attr('string'),
  campaign:  attr('string'),
  color: attr('string'),
  promotion: attr('boolean'),
  sku: attr('string'),

  catalog:  belongsTo('catalog'),
  category: belongsTo('category'),
  orders: hasMany('order')
  
});
