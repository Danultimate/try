from flask import jsonify
from flask.views import MethodView

from backend import db
from backend.models import *


class ContentMethodView(MethodView):

    def get(self, content_id=None):
        if content_id is not None:
            content = Content.query.get_or_404(content_id)
            products = ContentProduct.query.filter_by(content_id=content_id)
            profile = Profile.query.get_or_404(content.profile_id)
            return jsonify({
                'contents': [content.to_dict()],
                'topics': [content.topic.to_dict()],
                'categories': [content.category.to_dict()],
                'profiles': [profile.to_dict()],
                'products': [product.to_dict() for product in products],

            })

        contents = Content.query.all()
        output = {'contents': [], 'profiles': [], 'topics': [], 'products': []}

        for content in contents:
            output['contents'].append(content.to_dict())
            output['profiles'].append(content.profile.to_dict())
            output['topics'].append(content.topic.to_dict())

            products = ContentProduct.query.filter_by(content_id=content_id)
            print('Hey elmproductoo', products)
            # if products > 0:
            #     output['products'].append([product.to_dict()
            #                                for product in products])

        return jsonify(output)
