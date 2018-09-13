import DS from 'ember-data';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { mapBy, sum, filterBy } from '@ember/object/computed';
import attr from 'ember-data/attr';

export default DS.Model.extend({
    commission: attr('number'),
    code: attr('string'),
    user: belongsTo('user'),
    orders: hasMany('order'),
    clients: hasMany('client'),
    tasks: hasMany('task'),
    notifications: hasMany('notification'),

    total_per_order:  mapBy('orders', 'purchaseSum'),
    total: sum('total_per_order'),

    // total_points_per_order:  mapBy('orders', 'purchasePointsSum'),
    // total_points: sum('total_points_per_order'),

    tasksCompleted: filterBy('tasks', 'done', true),
    tasksUncompleted: filterBy('tasks', 'done', false),

    ordersActive: filterBy('orders', 'status', 0),

});