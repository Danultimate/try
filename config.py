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

    # Shopify Production Store
    SHOPIFY_API_KEY = "02cfc71482e6552378bc7d11e3885bd6"
    SHOPIFY_PASSWORD = "e7b9cf6de401f56e47c5d6e2f2c92511"
    SHOPIFY_SECRET = "0e22d2e9b9ab59497a2c34e8419caf19"
    SHOP_URL = "descubre-belleza.myshopify.com"
    DEFAULT_PRICE_RULE_ID = 309536784435


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

    #Shopify Development Store:
    SHOPIFY_API_KEY = "c58cf5421a855067d083d607306cd924"
    SHOPIFY_PASSWORD = "113c8060ac069c14a73a59cea84b5005"
    # For webhooks identity validation:
    SHOPIFY_SECRET = "5f90f051e930b413248ce98e4871ef33"
    SHOP_URL = "descubre-testing.myshopify.com"
    DEFAULT_PRICE_RULE_ID = 319568281667


# noinspection SpellCheckingInspection
class Testing(Development):
    TESTING = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
