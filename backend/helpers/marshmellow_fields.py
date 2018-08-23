import hashlib
from marshmallow.fields import Field


class Password(Field):
    default_error_messages = {
        'invalid': 'Not a valid password.'
    }

    def __init__(self, *args, **kwargs):
        super(Password, self).__init__(*args, **kwargs)
        self.sha1 = hashlib.sha1()

    def _serialize(self, value, attr, obj):
        return None

    def _deserialize(self, value, attr, data):
        if not value or not isinstance(value, str) or len(value) < 8:
            self.fail('invalid')
        self.sha1.update(value.encode())
        return self.sha1.hexdigest()
