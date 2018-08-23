from backend.resources import *
from backend import app

test_method_view = TestMethodView.as_view('test')
app.add_url_rule('/api/test', view_func=test_method_view)
