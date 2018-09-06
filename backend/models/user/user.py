from passlib.hash import bcrypt as pwd_context

from backend import db
from backend.models.mixins import BaseColumnsMixin, DictMixin


class User(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'user'
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    identification = db.Column(db.BigInteger, unique=True, index=True)
    cellphone = db.Column(db.BigInteger, nullable=False,
                          unique=True, index=True)
    password_hash = db.Column(
        db.String(64), nullable=False, info={'hidden': True})
    picture = db.Column(db.String)
    email = db.Column(db.String, index=True)
    birth = db.Column(db.DateTime)

    def hash_password(self, password):
        self.password_hash = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)
