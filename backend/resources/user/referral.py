from flask.views import MethodView
from flask import jsonify, abort, request
from marshmallow import fields

from backend import db
from backend.models import *
from backend.schemas import *
from backend.helpers.security import SecurityUtils

from flask import request
from webargs.flaskparser import parser as flaskparser


referral_method_view_post_body = {
    'referral': fields.Nested(ReferralSchema)
}


class ReferralMethodView(MethodView):

    def post(self):
        dataDict = flaskparser.parse(
            referral_method_view_post_body, request, locations=['json', 'form'])

        referral = Referral().from_dict(dataDict['referral'])
        
        seller = SecurityUtils.get_current_seller()
        if seller is not None:
            referral.seller_id = seller.id

            db.session.add(referral)
            db.session.commit()
            return jsonify({'referrals': [referral.to_dict()]})

        abort(401)
