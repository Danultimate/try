from marshmallow import Schema, fields
from backend.models import Task


class TaskSchema(Schema):
    done = fields.Boolean(required=True, validate=lambda x: x is True)

    class Meta:
        model = Task
        strict = True
