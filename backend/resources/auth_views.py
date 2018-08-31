from backend import *
from flask import jsonify
from backend.models import *
from backend.schemas import *
from flask import g as flask_globals

@app.route('/login', methods=['POST'])
def login():
    cel = 1234 # TODO: get from the request and verify each all?
    user = User.get(celphone=cel)
    flask_globals.user = user

@app.add_url_rule('logout')
def logout(request):

    pass
