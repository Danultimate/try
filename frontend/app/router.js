import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: 'auto',
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('index', { path: '/index' });
  this.route('login', { path: '/login' });
  this.route('signup', { path: '/sign_up' });
  this.route('landing', { path: '/landing' });
  this.route('term_conditions');
  this.route('terms_conditions_1');
  this.route('thanks');

  // all routes that require the session to be authenticated
  this.route('seller', { path: '/' });
  this.route('orders');
  // this.route('order', { path: '/orders/:order_id' })
  this.route('clients');
  this.route('client', { path: '/clients/:client_id' });
  this.route('tasks');
  this.route('task', { path: '/tasks/:task_id' });
  this.route('contents');
  this.route('content', { path: '/contents/:content_id' });
  this.route('notification', { path: '/config' });
  this.route('referral');
  // this.route('products');
  // this.route('product', { path: '/products/:product_id' });
  this.route('new_client');
  this.route('login_admin');
});

export default Router;


// export default SimpleAuthConfig;