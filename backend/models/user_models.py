import datetime
import random
import string

from itsdangerous import BadSignature, SignatureExpired
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from backend import db
from backend.models.mixins import *
from passlib.apps import custom_app_context as pwd_context

secret_key = ''.join(random.choice(string.ascii_uppercase + string.digits) for x in range(32))

class User(BaseColumnsMixin, db.Model):
    __tablename__ = 'user'
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    cellphone = db.Column(db.BigInteger, nullable=False, unique=True, index=True)
    password_hash = db.Column(db.String(64))
    picture = db.Column(db.String)
    email = db.Column(db.String, index=True)
    birth = db.Column(db.DateTime)

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

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

class Socialnetwork(BaseColumnsMixin, db.Model):
    __tablename__ = 'socialnetwork'

    name = db.Column(db.String(255), nullable=False)

class Usersocialnetwork(BaseColumnsMixin, db.Model):
    __tablename__ = 'usersocialnetwork'

    social_network = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.ForeignKey('user.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    user = db.relationship('User')

class Segment(BaseColumnsMixin, db.Model):
    __tablename__ = 'segment'

    name = db.Column(db.String(255), nullable=False)

class Seller(BaseColumnsMixin, db.Model):
    __tablename__ = 'seller'

    time_investment = db.Column(db.Interval, nullable=False)
    income_from_DS = db.Column(db.Numeric(10, 2), nullable=False)
    segment_id = db.Column(db.ForeignKey('segment.id', deferrable=True, initially='DEFERRED'), index=True)
    user_id = db.Column(db.ForeignKey('user.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)


class Client(BaseColumnsMixin, db.Model):
    __tablename__ = 'client'

    old_consumer = db.Column(db.Boolean, nullable=False)
    seller_id = db.Column(db.ForeignKey('seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    user_id = db.Column(db.ForeignKey('user.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    seller = db.relationship('Seller')
    user = db.relationship('User')
