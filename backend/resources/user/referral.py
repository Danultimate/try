from flask.views import MethodView
from flask import jsonify
from marshmallow import fields

from backend import db
from backend.models import *
from flask import request
from webargs.flaskparser import parser as flask_parser

referral_method_view_post_body = {
    'first_name': fields.String(required=True),
    'last_name': fields.String(required=True),
    'cellphone': fields.Integer(required=True, validate=lambda x: x>3000000000),
}

class ReferralMethodView(MethodView):

    def post(self):
        dataDict = flask_parser(referral_method_view_post_body, request)

        referral = Referral.from_dict(dataDict)
        db.session.add(referral)
        db.session.commit()
        #TODO: return 200?