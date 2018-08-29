import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: 'none',
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('index', { path: '/' });	
    this.route('orders');
    this.route('order', { path: '/orders/:orderId' })
    this.route('clients');
    this.route('client', { path: '/clients/:clientId' });
    this.route('items');
    this.route('item', { path: '/items/:itemId' });
    this.route('tasks');
    this.route('task', { path: '/tasks/:taskId' });
    this.route('contents');
    this.route('content', { path: '/contents/:contentId' });
});

export default Router;
