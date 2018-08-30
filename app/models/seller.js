import DS from 'ember-data';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { mapBy, sum, filterBy } from '@ember/object/computed';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    user: belongsTo('user'),
    orders: hasMany('order'),
    clients: hasMany('client'),
    tasks: hasMany('task'),
    notifications: hasMany('notification'),
    commision: attr('number'),

    // TODO: Computed each update or retreive?
    total_per_order:  mapBy('orders', 'purchaseSum'),
    total: sum('total_per_order'),

    tasksCompleted: filterBy('tasks', 'done', true),

    ordersActive: filterBy('orders', 'status', 0),

});
