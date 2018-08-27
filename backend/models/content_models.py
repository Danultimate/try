from backend import *
from backend.models.mixins import *
from sqlalchemy.dialects.postgresql.json import JSONB
# Content
class Content(db.Model, BaseColumnsMixin):
    __tablename__ = 'content'

    name = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(True), nullable=False)

# Social Media
class Somepost(db.Model, BaseColumnsMixin):
    __tablename__ = 'somepost'

    created_at = db.Column(db.DateTime(True), nullable=False)
    seller_id = db.Column(db.ForeignKey('seller.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    shared_content_id = db.Column(db.ForeignKey('content.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    social_network_id = db.Column(db.ForeignKey('socialnetwork.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    seller = db.relationship('Seller')
    shared_content = db.relationship('Content')
    social_network = db.relationship('Socialnetwork')

class Quiz(db.Model, BaseColumnsMixin):
    __tablename__ = 'quiz'

    form_id = db.Column(db.String(255), nullable=False, unique=True)
    quiz_type = db.Column(db.String(255), nullable=False)
    questions = db.Column(JSONB(astext_type=db.Text()), nullable=False)
    raw_data = db.Column(JSONB(astext_type=db.Text()), nullable=False)
    client_id_question_id = db.Column(db.String(255), nullable=False)

class Quizresult(db.Model, BaseColumnsMixin):
    __tablename__ = 'quizresult'

    time_taken = db.Column(db.Interval, nullable=False)
    network_id = db.Column(db.String(255), nullable=False)
    answers = db.Column(JSONB(astext_type=db.Text()), nullable=False)
    raw_data = db.Column(JSONB(astext_type=db.Text()), nullable=False)
    client_id = db.Column(db.ForeignKey('client.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    quiz_id = db.Column(db.ForeignKey('quiz.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)
    result_id = db.Column(db.ForeignKey('profile.id', deferrable=True, initially='DEFERRED'), nullable=False, index=True)

    client = db.relationship('Client')
    quiz = db.relationship('Quiz')
    result = db.relationship('Profile')