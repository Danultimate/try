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
        dataDict = flaskparser.parse(referral_method_view_post_body, request, locations=['json', 'form'])
        print('------hey entra aca y', dataDict)
        referral = Referral()
        referral.from_dict(dataDict['referral'])
        user = SecurityUtils.get_current_user()
        if user is not None:
            seller = Seller.query.filter_by(user_id=user.id).first()
            if seller is not None:
                referral.seller_id = seller.id
                print('------hey 2 entra aca y', referral)
                db.session.add(referral)
                db.session.commit()
                return jsonify({'referrals': [referral.to_dict()]})

        abort(401)