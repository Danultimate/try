from marshmallow import Schema, fields
from backend.models import Seller


class Referred_by(fields.Field):
    def _deserialize(self, value, attr, data):
        if not value or not isinstance(value, str):
            self.fail('invalid')
        seller_referent = Seller.query.filter_by(code=value.lower()).all()
        if len(seller_referent) == 0:
            self.fail('invalid')
        return seller_referent[0].id


class SellerSchema(Schema):
    commission = fields.Decimal()
    # time_duing_DS = fields.TimeDelta(required=True)
    user = fields.Int(required=True, attribute="user_id")
    referred_by_code = Referred_by(attribute="referred_by_id")

    class Meta:
        strict = True
