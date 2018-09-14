import shopify
import datetime
import logging
import os
import traceback

# Aggregated Postgresql functions
from sqlalchemy import func

import sys
sys.path.append("../..")
from backend import db
from backend.models import *


SHOPIFY_API_KEY="02cfc71482e6552378bc7d11e3885bd6"
SHOPIFY_PASSWORD="e7b9cf6de401f56e47c5d6e2f2c92511"
SHOPIFY_SECRET="0e22d2e9b9ab59497a2c34e8419caf19"
SHOP_URL="descubre-belleza.myshopify.com"

def connect_to_shopify():
    # logger = logging.basicConfig(level=logging.INFO,
    #                              format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    shop_url = "https://{api_key}:{password}@{shopurl}/admin".format(api_key=SHOPIFY_API_KEY,
                                                                 password=SHOPIFY_PASSWORD,
                                                                 shopurl=SHOP_URL)
    shopify.ShopifyResource.set_site(shop_url)

def get_max_id_from_file():
    f = open("max_id.txt","r")
    max_id = f.read()[:-1]
    f.close()
    os.system('rm max_id.txt')
    return max_id


def get_orders_from_shopify():
    max_id = 592801169459#get_max_id_from_file()
    page = 1
    orders_to_enter = []

    while True:
        orders = shopify.Order.find(limit=250, page=page, since_id=max_id)
        if len(orders) > 0:
            orders_to_enter.extend(orders)
            page += 1
        else:
            break

    print('Fetch {0} orders...'.format(len(orders_to_enter)))
    return orders_to_enter


def update_order_table(orders):
    if len(orders):
        for order in orders:
            print('-------------------------- Begin Order --------------------------')
            print(order.to_dict()['billing_address'])
            if order.to_dict()['billing_address']['phone'] is None:
                continue
            user_client_id = db.session.query(User.id).filter_by(
                            cellphone=order.to_dict()['billing_address'].get('phone', 1234).replace(' ', '')).first()
            if user_client_id is not None:
                user_client_id = user_client_id[0]
            seller_id = db.session.query(Seller.id).filter_by(
                            code=order.to_dict()['discount_applications'][0]['code']).first()
            print(seller_id)
            print('Processing order {0}'.format(order.to_dict()['id']))
            print('-------------------------- End Order --------------------------')
            print("Before if user_client_id is None")
            if user_client_id is None:
                u = User(
                    first_name = order.to_dict()['first_name']
                    , last_name = order.to_dict()['last_name']
                    , cellphone = order.to_dict()['billing_address'].get('phone', 1234).replace(' ', '')
                    , password_hash = ''
                )
                db.session.add(u)
                db.session.commit()

                c = Client(
                    old_consumer = False
                    , user_id = u.id
                    , profile_id = 1
                    , seller_id = seller_id
                )
                db.session.add(c)
                db.session.commit()
                client_id = c.id
            else:
                client_id = db.session.query(Client.id).filter_by(user_id=user_client_id).first()[0]
            print('Client_ID {0}'.format(client_id))
            order_ = Order(
                    seller_id = seller_id
                    , client_id = client_id
                    , date = order.to_dict()['updated_at']
                    , status = 0
                    , order_number = order.to_dict()['order_number']
                    , total = order.to_dict()['total_price']
                    , tax = order.to_dict()['total_tax']
                    , shipping = order.to_dict()['shipping_lines'][0]['price']
            )
            print('Saving order: ')
            print(order_)
            db.session.add(order_)
            db.session.commit()
        # Creates new file with the last max_id into orders.
        f = open("max_id.txt","w")
        max_id = order.to_dict()['id']
        f.write(str(max_id) + '\n')
        f.close()
    else:
        print('The list passed by param is empty!')


connect_to_shopify()
orders = get_orders_from_shopify()
print(orders)
print()
update_order_table(orders)