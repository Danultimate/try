from backend import db
from backend.models import BaseColumnsMixin, DictMixin

class Segment(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'segment'

    name = db.Column(db.String(255), nullable=False)

class Seller(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'seller'

    time_investment = db.Column(db.Interval)#, nullable=False)
    income_from_DS = db.Column(db.Numeric(10, 2))#, nullable=False)
    segment_id = db.Column(db.ForeignKey('segment.id', deferrable=True, initially='DEFERRED'), index=True)
    user_id = db.Column(db.ForeignKey('user.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    goal =  db.Column(db.Numeric(10, 2))
    comission =  db.Column(db.Numeric(2, 2))#, nullable=False)