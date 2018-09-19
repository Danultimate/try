from backend import app
from backend.helpers.itsdangerous import *
from backend.resources import *

NAME_SPACE = '/api'


def register_route(view, endpoint, url, pk='id', pk_type='int'):
    url = NAME_SPACE + url
    view_func = view.as_view(endpoint)

    app.add_url_rule(url, defaults={pk: None},
                     view_func=view_func, methods=['GET', ])
    app.add_url_rule(url, view_func=view_func, methods=['POST', ])
    app.add_url_rule('%s/<%s:%s>' % (url, pk_type, pk), view_func=view_func,
                     methods=['GET', 'PUT', 'DELETE'])


register_route(TestMethodView, 'test', '/')
register_route(UserLoginMethodView, 'login', '/login')
register_route(UserLogoutMethodView, 'logout', '/logout')

register_route(UserMethodView, 'user_model', '/users', pk='user_id')
register_route(SellerMethodView, 'seller_model', '/sellers', pk='seller_id')
register_route(ClientMethodView, 'client_model', '/clients', pk='client_id')
register_route(ReferralMethodView, 'referral_model', '/referrals', pk='referral_id')

register_route(ProductMethodView, 'product_model', '/products', pk='product_id')
register_route(ProfileMethodView, 'profile_model', '/profiles', pk='profile_id')

register_route(ContentMethodView, 'content_model', '/contents', pk='content_id')

register_route(OrderMethodView, 'order_model', '/orders', pk='order_id')

register_route(TaskMethodView, 'task_model', '/tasks', pk='task_id')

register_route(NotificationMethodView, 'notification_model', '/notifications', pk='notification_id')

register_route(InteractionMethodView, 'interaction_model', '/interactions', pk='interaction_id')
