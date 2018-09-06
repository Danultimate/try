from itsdangerous import (JSONWebSignatureSerializer
                          as Serializer, BadSignature)

from backend import app

serializer = Serializer(app.config.get('SECRET_KEY'))


def sign(obj):
    return serializer.dumps(obj)


def get_data(token):
    try:
        return serializer.loads(token)
    except BadSignature:
        print("Bad Signature")
    return None
