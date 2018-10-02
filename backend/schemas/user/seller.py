from marshmallow import Schema, fields
from backend.models import Seller


class Referred_by(fields.Field):
    def _deserialize(self, value, attr, data):
        print("hey esta deserializando: ", value)
        if not value or not isinstance(value, str):
            return None
        seller_referent = Seller.query.filter_by(code=value.lower()).all()
        if len(seller_referent) == 0:
            return 1  # Default when code does not exist
        return seller_referent[0].id


class SellerSchema(Schema):
    commission = fields.Decimal()
    # time_duing_DS = fields.TimeDelta(required=True)
    user = fields.Int(required=True, attribute="user_id")
    referred_by_code = Referred_by(attribute="referred_by_id")

    class Meta:
        strict = True
