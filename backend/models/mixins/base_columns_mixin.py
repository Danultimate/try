from backend.helpers.time import utcnow_with_utc_timezone
from backend import db

def created_by_default():
    return 0


def created_at_default():
    return utcnow_with_utc_timezone()


def updated_by_default():
    return 0


def updated_at_default():
    return utcnow_with_utc_timezone()


class BaseColumnsMixin:
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    
    created_at = db.Column(db.DateTime(timezone=True), default=created_at_default, nullable=False,
                           info={'hidden': True})
    created_by = db.Column(db.Integer, default=created_by_default, nullable=False, info={'hidden': True})
    updated_at = db.Column(db.DateTime(timezone=True), default=updated_at_default, onupdate=updated_at_default,
                           info={'hidden': True})
    updated_by = db.Column(db.Integer, default=0, info={'hidden': True})
