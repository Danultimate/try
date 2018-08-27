import os

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from backend import app, db
from backend.models import *

migrate = Migrate(app=app, db=db)

manager = Manager(app=app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
  manager.run()