from backend.resources.test import TestMethodView
from backend.resources.user import *
from backend.resources.product import *
from backend.resources.order import *
from backend.resources.task import *
from backend.resources.content import *
from backend.resources.auth_views import *
from backend.resources.interactions import *


__all__ = [

    'LoginAdmin',
    'UserLoginMethodView',
    'UserLogoutMethodView',

    'TestMethodView',

    'UserMethodView',
    'SellerMethodView',
    'ClientMethodView',
    'ReferralMethodView',

    'ProductMethodView',
    'ProfileMethodView',

    'ContentMethodView',

    'OrderMethodView',

    'TaskMethodView',
    'NotificationMethodView',

    'InteractionMethodView'


]
