from marshmallow import Schema, fields
from backend.models import User


class Password(fields.Field):
    def _deserialize(self, value, attr, data):
        if not value or not isinstance(value, str):  # or len(value) < 8:
            self.fail('invalid')
        u = User()
        u.hash_password(value)
        return u.password_hash


class UserSchema(Schema):
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    password = Password(attribute="password_hash")
    cellphone = fields.Integer(
        required=True, validate=lambda x: x > 3000000000)
    # email = fields.String(required=True)
    # identification = fields.Int(required=True)
    # picture = fields.String(required=False, default='')
    # birth = fields.Date(required=False, default='')

    class Meta:
        strict = True
