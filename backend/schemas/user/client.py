from marshmallow import Schema, fields
from backend.models import Seller


class ClientSchema(Schema):
    user = fields.Int(required=True, attribute="user_id")
    seller = fields.Int(required=True, attribute="seller_id")

    class Meta:
        strict = True
