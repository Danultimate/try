from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Catalog(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'catalog'

    name = db.Column(db.String(255), nullable=False)


class SellerCatalogs(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'seller_catalogs'

    seller_id = db.Column(db.ForeignKey(
        'seller.id', deferrable=True, initially='DEFERRED'), index=True)
    catalog_id = db.Column(db.ForeignKey(
        'catalog.id', deferrable=True, initially='DEFERRED'), index=True)

    catalog = db.relationship('Catalog')
    seller = db.relationship('Seller')
