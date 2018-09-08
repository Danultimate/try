from marshmallow import Schema, fields


class InteractionSchema(Schema):
    action = fields.Str(),
    current_url = fields.Str(),
    browser_info = fields.Str(),
    session_info = fields.Str()

    class Meta:
        strict = True
