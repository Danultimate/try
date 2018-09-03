from backend.resources.test import TestMethodView
from backend.resources.user import *
from backend.resources.product import *
from backend.resources.order import *
from backend.resources.task import *
from backend.resources.content import *


__all__ = [
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
