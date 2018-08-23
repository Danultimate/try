from marshmallow import Schema, fields


class DeviceSchema(Schema):
    name = fields.Str(required=True)

    class Meta:
        strict = True
