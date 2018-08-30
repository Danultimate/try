import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: 'none',
  rootURL: config.rootURL
});

Router.map(function() {
  //this.route('index', { path: '/' });
  this.route('orders', { path: '/' });
  this.route('order', { path: '/orders/:order_id' })
  this.route('clients');
  this.route('client', { path: '/clients/:client_id' });
  this.route('items');
  this.route('item', { path: '/items/:item_id' });
  this.route('tasks');
  this.route('task', { path: '/tasks/:task_id' });
  this.route('contents');
  this.route('content', { path: '/contents/:content_id' });
  this.route('seller', { path: '/seller' });
  this.route('notification');
  this.route('referral');
});

export default Router;
