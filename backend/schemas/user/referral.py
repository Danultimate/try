from marshmallow import Schema, fields

class ReferralSchema(Schema):
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    cellphone = fields.Int(required=True)

    # class Meta:
    #     strict = True

