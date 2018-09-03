from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class SoMePost(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'somepost'
    
    seller_id = db.Column(db.ForeignKey('seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    shared_content_id = db.Column(db.ForeignKey('content.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    social_network_id = db.Column(db.ForeignKey('socialnetwork.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    seller = db.relationship('Seller')
    shared_content = db.relationship('Content')
    social_network = db.relationship('SocialNetwork')