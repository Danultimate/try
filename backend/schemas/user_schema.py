from marshmallow import Schema, fields
from backend.helpers import marshmellow_fields


class UserSchema(Schema):
    email = fields.Email(required=True)
    email_confirm = fields.Email(required=False, missing=None)
    password = marshmellow_fields.Password(required=True)
    password_confirm = marshmellow_fields.Password(required=False, missing=None)

    class Meta:
        strict = True
