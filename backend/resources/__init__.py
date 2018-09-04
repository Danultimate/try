from backend.resources.test import TestMethodView
from backend.resources.user import *
from backend.resources.product import *
from backend.resources.order import *
from backend.resources.task import *
from backend.resources.content import *
from backend.resources.auth_views import *


__all__ = [

    'UserLoginMethodView',

    'TestMethodView',

    'UserMethodView',
    'SellerMethodView',
    'ClientMethodView',

    'ProductMethodView',

    'ContentMethodView',

    'OrderMethodView',

    'TaskMethodView',
    'NotificationMethodView'


]
