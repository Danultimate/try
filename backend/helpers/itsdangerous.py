from itsdangerous import (JSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

import random
import string

from backend import app

secret_temp_key = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(32))
print('seeeecreeet', secret_temp_key)
#serializer = Serializer(app.config.get('SECRET_KEY'))
serializer = Serializer(secret_temp_key)


def sign(obj):
    return serializer.dumps(obj)


def get_data(token):
    try:
        return serializer.loads(token)
    except BadSignature:
        print("Bad Signature")
    return None
