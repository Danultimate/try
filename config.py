import os


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
    SECRET_KEY = b'OL{\x80\xb1YG\x87`\xc4xc.Odu'


# noinspection SpellCheckingInspection
class Development(Production):
    ENV = 'development'
    DEBUG = True
    DEVELOPMENT = True

    SQLALCHEMY_DATABASE_URI = 'postgres://postgres:control1234@localhost:5432/poc_content'
    REDIS_URL = ''

    KEY = '../ssl/server.key'
    CERT = '../ssl/server.crt'

    SQLALCHEMY_ECHO = True


# noinspection SpellCheckingInspection
class Testing(Development):
    TESTING = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
