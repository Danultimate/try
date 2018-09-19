from flask.views import MethodView
from flask import jsonify
from backend.models import *


class ProfileMethodView(MethodView):

    def get(self, profile_id=None):
        if profile_id is not None:
            profile = Profile.query.get_or_404(profile_id)
            # catalog_names = Catalog.query.filter_by()
            return jsonify({
                'profiles': [profile.to_dict()],
            })

        profiles = Profile.query.all()
        return jsonify({
            'profiles': [profile.to_dict() for profile in profiles]
        })
