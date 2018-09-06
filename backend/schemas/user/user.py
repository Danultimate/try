from marshmallow import Schema, fields
from backend.helpers import marshmellow_fields
from backend import ma
from backend.models import User


class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
