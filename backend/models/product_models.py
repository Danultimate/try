from backend import *
from backend.models.mixins import *

class Profile(BaseColumnsMixin):
    __tablename__ = 'profile'

    name = db.Column(db.String(255), nullable=False)

class Category(BaseColumnsMixin):
    __tablename__ = 'category'

    name = db.Column(db.String(255), nullable=False)
    parentID = db.Column(db.Integer, nullable=False)

class Catalog(BaseColumnsMixin):
    __tablename__ = 'catalog'

    name = db.Column(db.String(255), nullable=False)

class Productprofileweight(BaseColumnsMixin):
    __tablename__ = 'productprofileweight'

    weight = db.Column(db.Float(53), nullable=False)
    product_id = db.Column(db.ForeignKey('product.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    profile_id = db.Column(db.ForeignKey('profile.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    product = db.relationship('Product')
    profile = db.relationship('Profile')

class Product(BaseColumnsMixin):
    __tablename__ = 'product'

    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    image = db.Column(db.String(200), nullable=False)
    campaign = db.Column(db.String(255), nullable=False)
    sku = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(255), nullable=False)
    promotion = db.Column(db.Boolean, nullable=False)
    catalog_id = db.Column(db.ForeignKey('catalog.id', deferrable=True, initially='DEFERRED'), index=True)
    category_id = db.Column(db.ForeignKey('category.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    catalog = db.relationship('Catalog')
    category = db.relationship('Category')

class ContentProduct(BaseColumnsMixin):
    __tablename__ = 'content_products'
    __table_args__ = (
        db.UniqueConstraint('content_id', 'product_id'),
    )

    content_id = db.Column(db.ForeignKey('content.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    product_id = db.Column(db.ForeignKey('product.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    content = db.relationship('Content')
    product = db.relationship('Product')