from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class SocialNetwork(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'socialnetwork'

    name = db.Column(db.String(255), nullable=False)


class UserSocialNetwork(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'usersocialnetwork'

    social_network = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.ForeignKey(
        'user.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    user = db.relationship('User')
