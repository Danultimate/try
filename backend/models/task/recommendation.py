from backend import db
from backend.models.mixins import BaseColumnsMixin, DictMixin, updated_at_default


class ClientSuggestions(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'client_suggestion'

    task_id = db.Column(db.ForeignKey(
        'task.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    client_id = db.Column(db.ForeignKey(
        'client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    sent = db.Column(db.Boolean, nullable=False, default=False)
    sent_at = db.Column(db.DateTime(timezone=True), default=updated_at_default, onupdate=updated_at_default,
                        info={'hidden': True})
    text_content = db.Column(db.Text())

    client = db.relationship('Client')
    task = db.relationship('Task')


class ProductSuggestions(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'product_suggestion'

    client_id = db.Column(db.ForeignKey(
        'client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    product_id = db.Column(db.ForeignKey(
        'product.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    product = db.relationship('Product')
    client = db.relationship('Client')
