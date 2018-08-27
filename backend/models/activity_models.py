from backend import *
from backend.models.mixins import *

class Activity(db.Model, BaseColumnsMixin):
    __tablename__ = 'activity'
    
    type_of = db.Column(db.String(255), nullable=False)

class Activityregister(db.Model, BaseColumnsMixin):
    __tablename__ = 'activityregister'

    activity_description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(True), nullable=False)
    planned_date = db.Column(db.DateTime(True), nullable=False)
    excuted_date = db.Column(db.DateTime(True), nullable=False)
    activity_type_id = db.Column(db.ForeignKey('activity.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    client_id = db.Column(db.ForeignKey('client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    seller_id = db.Column(db.ForeignKey('seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    activity_type = db.relationship('Activity')
    client = db.relationship('Client')
    seller = db.relationship('Seller')

class Recommendation(db.Model, BaseColumnsMixin):
    __tablename__ = 'recommendation'

    created_at = db.Column(db.DateTime(True), nullable=False)
    client_id = db.Column(db.ForeignKey('client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    medium_id = db.Column(db.ForeignKey('socialnetwork.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    seller_id = db.Column(db.ForeignKey('seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    client = db.relationship('Client')
    medium = db.relationship('Socialnetwork')
    seller = db.relationship('Seller')


class RecommendationProduct(db.Model, BaseColumnsMixin):
    __tablename__ = 'recommendation_products'
    __table_args__ = (
        db.UniqueConstraint('recommendation_id', 'product_id'),
    )

    recommendation_id = db.Column(db.ForeignKey('recommendation.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    product_id = db.Column(db.ForeignKey('product.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    product = db.relationship('Product')
    recommendation = db.relationship('Recommendation')