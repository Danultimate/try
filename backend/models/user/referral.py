from backend import db
from backend.models import BaseColumnsMixin, DictMixin

class Referral(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'referral'
    
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    cellphone = db.Column(db.BigInteger, nullable=False, unique=True, index=True)
    description = db.Column(db.Text())
    seller_id = db.Column(db.ForeignKey('seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    
    seller = db.relationship('Seller')
    