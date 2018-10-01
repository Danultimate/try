from flask.views import MethodView
from flask import jsonify, abort, request
from marshmallow import fields

from backend import db
from backend.models import *
from backend.helpers.security import SecurityUtils, authorized

from flask import request
from webargs.flaskparser import parser as flaskparser


class ReferralMethodView(MethodView):

    @authorized
    def get(self, referral_id=None):
        referrals = Referral.query.filter_by(referred_by_id=SecurityUtils.get_current_seller().id).all()
        return jsonify({
                        'referrals': [referral.to_dict() for referral in referrals]
                    })

