from flask import jsonify, request
from flask.views import MethodView
from marshmallow import fields
from webargs.flaskparser import parser as flaskparser
import json

from backend import db
from backend.models import *
from backend.schemas import InteractionSchema

# Only Puts when 'done' is True
interaction_method_view_post_body = {
    'interaction': fields.Nested(InteractionSchema)
}


class InteractionMethodView(MethodView):

    def post(self):
        # dataDict = flaskparser.parse(
        #     interaction_method_view_post_body, request, locations=['json', 'form'])
        dataDict = request.get_json()['interaction']
        print('----------el diccionarioooo', dataDict)
        dataDict['browser_info'] = json.loads(dataDict['browser_info'])
        dataDict['session_info'] = json.loads(dataDict['session_info'])
        interaction = Interaction()
        interaction.from_dict(dataDict)
        db.session.add(interaction)
        db.session.commit()
        return jsonify({'interactions': [interaction.to_dict()]})
