from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Content(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'content'

    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    url = db.Column(db.String, nullable=False)
    thumbnailUrl = db.Column(db.String, nullable=False)

    media_type = db.Column(db.String)
    topic_id = db.Column(db.ForeignKey(
        'topic.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    profile_id = db.Column(db.ForeignKey(
        'profile.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    topic = db.relationship('Topic')
    profile = db.relationship('Profile')

    def __str__(self):
        return str(self.id) + '. ' + self.name


class ContentProduct(db.Model, BaseColumnsMixin):
    __tablename__ = 'content_products'
    __table_args__ = (
        db.UniqueConstraint('content_id', 'product_id'),
    )

    content_id = db.Column(db.ForeignKey(
        'content.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    product_id = db.Column(db.ForeignKey(
        'product.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    content = db.relationship('Content')
    product = db.relationship('Product')
