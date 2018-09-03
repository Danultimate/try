from backend import db
from backend.models import BaseColumnsMixin, DictMixin
import random
import string

from itsdangerous import BadSignature, SignatureExpired
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from passlib.hash import bcrypt as pwd_context

#TODO: replace this secret_key
secret_key = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(32))

class User(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'user'
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    cellphone = db.Column(db.BigInteger, nullable=False, unique=True, index=True)
    #TODO: change to required!
    password_hash = db.Column(db.String(64))#, nullable=False)
    picture = db.Column(db.String)
    email = db.Column(db.String, index=True)
    birth = db.Column(db.DateTime)
    total_active_points = db.Column(db.Numeric(10), nullable=False, default=0)

    def hash_password(self, password):
        self.password_hash = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration=600):
        s = Serializer(secret_key, expires_in = expiration)
        return s.dumps({'id': self.id })

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(secret_key)
        try:
            data = s.loads(token)
        except SignatureExpired:
            #Valid Token, but expired
            return None
        except BadSignature:
            #Invalid Token
            return None
        user_id = data['id']
        return user_id