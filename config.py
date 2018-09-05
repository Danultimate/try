import os


# noinspection SpellCheckingInspection
class Production(object):
    # Location of Flask app
    PROJECT_DIR = os.path.dirname(os.path.realpath(__file__))
    ROOT_DIR = os.path.dirname(PROJECT_DIR)
    APP_DIR = os.path.join(PROJECT_DIR, 'backend')

    DEBUG = False
    DEVELOPMENT = False
    TESTING = False

    REDIS_URL = os.environ.get('REDIS_URL')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'this is a secret key'


# noinspection SpellCheckingInspection
class Development(Production):
    DEBUG = True
    DEVELOPMENT = False

    SQLALCHEMY_DATABASE_URI = 'postgres://postgres:control1234@localhost:5432/poc_content'
    REDIS_URL = ''

    SQLALCHEMY_ECHO = True


# noinspection SpellCheckingInspection
class Testing(Development):
    TESTING = True
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://descubre@/descubre-test'
