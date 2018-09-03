from marshmallow import Schema, fields
from backend.helpers import marshmellow_fields
from backend import ma
from backend.models import *

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User

class SocialnetworkSchema(ma.ModelSchema):
    class Meta:
        model = SocialNetwork

class UsersocialnetworkSchema(ma.ModelSchema):
    class Meta:
        model = UserSocialNetwork

class SegmentSchema(ma.ModelSchema):
    class Meta:
        model = Segment

