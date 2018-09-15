from backend.resources.test import TestMethodView
from backend.resources.user import *
from backend.resources.product import *
from backend.resources.order import *
from backend.resources.task import *
from backend.resources.content import *
from backend.resources.auth_views import *
from backend.resources.interactions import *


__all__ = [

    'UserLoginMethodView',
    'UserLogoutMethodView',

    'TestMethodView',

    'UserMethodView',
    'SellerMethodView',
    'ClientMethodView',
    'ReferralMethodView',

    'ProductMethodView',

    'ContentMethodView',

    'OrderMethodView',

    'TaskMethodView',
    'NotificationMethodView',

    'InteractionMethodView'


]
