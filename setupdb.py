from backend import app, db
from backend.models import  *

#db.drop_all()

try:
    db.create_all()
except Exception as e:
    print(e)
