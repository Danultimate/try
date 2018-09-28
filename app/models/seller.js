import DS from 'ember-data';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { mapBy, sum, filterBy } from '@ember/object/computed';
import attr from 'ember-data/attr';
import { schedule } from '@ember/runloop';

export default DS.Model.extend({
    commission: attr('number'),
    code: attr('string'),
    user: belongsTo('user'),
    referred_by_code: attr('string'),
    orders: hasMany('order'),
    clients: hasMany('client'),
    tasks: hasMany('task'),
    notifications: hasMany('notification'),
    referrals: hasMany('referral'),
    
    total_per_order:  mapBy('orders', 'total'),
    tax_per_order:  mapBy('orders', 'tax'),
    shipping_per_order:  mapBy('orders', 'shipping'),

    total: sum('total_per_order'),
    total_shipping: sum('shipping_per_order'),
    total_tax: sum('tax_per_order'),

    tasksCompleted: filterBy('tasks', 'done', true),
    tasksUncompleted: filterBy('tasks', 'done', false),

    ordersActive: filterBy('orders', 'status', 'ordered'),
    ordersDitribution: filterBy('orders', 'status', 'distribution'),

    non_paid_referrals: filterBy('referrals', 'paid', false),

});