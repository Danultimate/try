from marshmallow import Schema, fields


class InteractionSchema(Schema):
    action = fields.Str(),
    extra_info = fields.Str(allow_none=True),
    current_url = fields.Str(),
    browser_info = fields.Str(),
    session_info = fields.Str()

    class Meta:
        strict = True
