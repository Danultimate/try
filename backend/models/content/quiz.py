from sqlalchemy.dialects.postgresql.json import JSONB

from backend import db
from backend.models import BaseColumnsMixin, DictMixin


class Quiz(db.Model, BaseColumnsMixin, DictMixin):
    __tablename__ = 'quiz'

    form_id = db.Column(db.String(255), nullable=False, unique=True)
    quiz_type = db.Column(db.String(255), nullable=False)
    questions = db.Column(JSONB(astext_type=db.Text()), nullable=False)
    raw_data = db.Column(JSONB(astext_type=db.Text()), nullable=False)
    client_id_question_id = db.Column(db.String(255), nullable=False)


class QuizResult(db.Model, BaseColumnsMixin, DictMixin):
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