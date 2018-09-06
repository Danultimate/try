from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Product(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'product'

    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    campaign = db.Column(db.String(255), nullable=False)
    sku = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(255), nullable=False)
    promotion = db.Column(db.Boolean, nullable=False)
    catalog_id = db.Column(db.ForeignKey(
        'catalog.id', deferrable=True, initially='DEFERRED'), index=True)
    category_id = db.Column(db.ForeignKey(
        'category.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    catalog = db.relationship('Catalog')
    category = db.relationship('Category')


class ProductProfileWeight(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'productprofileweight'

    weight = db.Column(db.Float(53), nullable=False)
    product_id = db.Column(db.ForeignKey(
        'product.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    profile_id = db.Column(db.ForeignKey(
        'profile.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    product = db.relationship('Product')
    profile = db.relationship('Profile')
