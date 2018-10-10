import DS from 'ember-data';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { mapBy, sum, filterBy, filter } from '@ember/object/computed';
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
    
    // Order computations
    activeOrders: function() {
        return this.get('orders').filter(function(item, index, enumerable){
          return item.status == 'ordered' || item.status == 'distribution';
        });
      }.property('orders.@each'),
    
    unpaidOrders: function() {
        return this.get('orders').filter(function(item, index, enumerable){
          return item.paid == false && item.status != 'cancelled';
        });
      }.property('orders.@each'),

    total_per_order:  mapBy('unpaidOrders', 'total'),
    tax_per_order:  mapBy('unpaidOrders', 'tax'),
    shipping_per_order:  mapBy('unpaidOrders', 'shipping'),

    total_sold: sum('total_per_order'),
    total_shipping: sum('shipping_per_order'),
    total_tax: sum('tax_per_order'),

    total: function(){
        return this.get('total_sold') - this.get('total_shipping') - this.get('total_tax');
      }.property('total_sold', 'total_shipping', 'total_tax'),

    // Task Computations
    tasksCompleted: filterBy('tasks', 'done', true),
    tasksUncompleted: filterBy('tasks', 'done', false),

    // Referral Computations
    non_paid_referrals: filterBy('referrals', 'paid', false),

});