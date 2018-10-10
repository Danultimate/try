from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Referral(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'referral'

    referred_by_id = db.Column(db.ForeignKey(
        'seller.id', deferrable=True, initially='DEFERRED', ondelete='CASCADE'), nullable=False, index=True)
    referred_id = db.Column(db.ForeignKey(
        'seller.id', deferrable=True, initially='DEFERRED', ondelete='CASCADE'), nullable=False, index=True)
    paid = db.Column(db.Boolean, default=False)

    referred_by = db.relationship('Seller', foreign_keys=[referred_by_id])
    referred = db.relationship('Seller', foreign_keys=[referred_id])
