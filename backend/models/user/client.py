from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Client(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'client'

    old_consumer = db.Column(db.Boolean, nullable=False)
    seller_id = db.Column(db.ForeignKey(
        'seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    user_id = db.Column(db.ForeignKey(
        'user.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    profile_id = db.Column(db.ForeignKey('profile.id', deferrable=True,
                                         initially='DEFERRED'), nullable=False, index=True, default=1)

    seller = db.relationship('Seller')
    user = db.relationship('User')
    profile = db.relationship('Profile')
    orders = db.relationship('Order')
    
    def __str__(self):
        return str(self.id) + '. ' + self.user.first_name + ' ' + self.user.last_name
