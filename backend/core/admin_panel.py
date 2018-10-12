from flask_admin import Admin
from flask_admin.contrib import sqla
from flask_admin.contrib.sqla import filters


class SellerView(sqla.ModelView):
    column_display_pk = True # optional, but I like to see the IDs in the list
    column_hide_backrefs = False
    column_list = ('user', 'user.cellphone', 'referred_by', 'created_at', 'code', 'commission', 'updated_at')


class UserView(sqla.ModelView):
    column_list = ('created_at', 'first_name', 'last_name', 'cellphone', 'staff', 'device_token', 'password_hash', 'identification', 'email', 'birth', 'picture')


class CustomAdmin(Admin):
    def __init__(self, app, db, models, name='descubre-admin', template_mode='bootstrap3'):
        self.admin = Admin(app, name, template_mode)
        self.admin.add_view(UserView(models.User, db.session))
        self.admin.add_view(sqla.ModelView(models.Client, db.session))
        self.admin.add_view(sqla.ModelView(models.Content, db.session))
        self.admin.add_view(sqla.ModelView(models.Task, db.session))
        self.admin.add_view(sqla.ModelView(models.Order, db.session))
        self.admin.add_view(sqla.ModelView(models.Referral, db.session))
        self.admin.add_view(SellerView(models.Seller, db.session))
