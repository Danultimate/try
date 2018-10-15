from sqlalchemy.dialects.postgresql.json import JSONB

from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Interaction(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'user_interaction'

    action = db.Column(db.String(), default="watched")
    extra_info = db.Column(JSONB(astext_type=db.Text()), nullable=True)
    current_url = db.Column(db.Text())
    browser_info = db.Column(JSONB(astext_type=db.Text()), nullable=False)
    session_info = db.Column(JSONB(astext_type=db.Text()))
