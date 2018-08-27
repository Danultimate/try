from backend import *
from backend.models.mixins import *

class Profile(BaseColumnsMixin, db.Model):
    __tablename__ = 'profile'

    name = db.Column(db.String(255), nullable=False)