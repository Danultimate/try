from marshmallow import Schema, fields


class SellerSchema(Schema):
    commission = fields.Decimal()
    # time_duing_DS = fields.TimeDelta(required=True)
    user = fields.Int(required=True, attribute="user_id")

    class Meta:
        strict = True
