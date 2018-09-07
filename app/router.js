import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: 'auto',
  rootURL: config.rootURL
});

Router.map(function() {
  //this.route('index', { path: '/' });
  this.route('seller', { path: '/seller' });
  this.route('orders');
  this.route('order', { path: '/orders/:order_id' })
  this.route('clients');
  this.route('client', { path: '/clients/:client_id' });
  this.route('products');
  this.route('product', { path: '/products/:product_id' });
  this.route('tasks');
  this.route('task', { path: '/tasks/:task_id' });
  this.route('contents');
  this.route('content', { path: '/contents/:content_id' });
  this.route('notification');
  this.route('referral');
  this.route('login', { path: '/login' });
  this.route('signup', { path: '/sign_up' });
  this.route('term_conditions');
  this.route('landing', { path: '/' });
});

export default Router;
