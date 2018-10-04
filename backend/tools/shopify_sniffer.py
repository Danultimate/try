import shopify
import datetime
import logging
import traceback
import time
import re

# Aggregated Postgresql functions
from sqlalchemy import func

import sys
sys.path.append("../..")
from backend import db
from backend.models import *


SHOPIFY_API_KEY = "02cfc71482e6552378bc7d11e3885bd6"
SHOPIFY_PASSWORD = "e7b9cf6de401f56e47c5d6e2f2c92511"
SHOPIFY_SECRET = "0e22d2e9b9ab59497a2c34e8419caf19"
SHOP_URL = "descubre-belleza.myshopify.com"
SECONDS_TO_FETCH = 10


def connect_to_shopify():
    print('Conecting to shopify store...')
    # logger = logging.basicConfig(level=logging.INFO,
    #                              format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    shop_url = "https://{api_key}:{password}@{shopurl}/admin".format(api_key=SHOPIFY_API_KEY,
                                                                     password=SHOPIFY_PASSWORD,
                                                                     shopurl=SHOP_URL)
    shopify.ShopifyResource.set_site(shop_url)
    print('Conected')


def order_exists(order_number):
    orders = db.session.query(Order).filter_by(order_number=order_number).all()
    if len(orders) > 1:
        print('There are {0} duplicated orders for order_number: {1}'.format(
            len(orders), order_number))
    print('Order alredy exists...' if len(orders) else 'Order not exists...')
    return True if len(orders) else False


def create_user(order):
    u = None
    try:
        u = User(
            first_name=order['customer']['first_name'],
            last_name=order['customer']['last_name'],
            cellphone=norm_cellphone(
                order['customer']['default_address']['phone'])
        )
        db.session.add(u)
        db.session.commit()
        print('New Users was created!')
    except Exception as e:
        db.session.rollback()
        print('Is not possible to save a new user into database!')
        print(e)
    return u


def create_client(user_id, seller_id):
    c = None
    try:
        c = Client(
            old_consumer=False, user_id=user_id, profile_id=1, seller_id=seller_id
        )
        db.session.add(c)
        db.session.commit()
        print('New Client was created!')
    except Exception as e:
        db.session.rollback()
        print('Is not possible to save a new client into database!')
        print(e)
    return c


def norm_cellphone(phone):
    if phone.startswith('+57'):
        return phone[3:].replace(' ', '')
    else:
        return phone.replace(' ', '')

def norm_code(seller_code):
    return seller_code.lower().replace(' ', '')

def get_max_id_from_file():
    print('-------------------------------------------------------')
    f = open("./backend/tools/max_id.txt", "r")
    max_id = f.read()[:-1]
    f.close()
    # Delete file, afeter the orders iteration will be write again
    print('Get the max_id value stored in file: max_id = {0}'.format(max_id))
    return max_id


def create_new_max_id_file(max_id):
    f = open("./backend/tools/max_id.txt", "w")
    f.write(str(max_id) + '\n')
    print('Saving the max_id value in file: max_id = {0}'.format(max_id))
    f.close()


def get_orders_from_shopify():
    max_id = get_max_id_from_file()
    page = 1
    orders_to_enter = []

    while True:
        print('Checking for new orders into shopify store...')
        orders = shopify.Order.find(limit=250, page=page, since_id=max_id)
        if len(orders) > 0:
            orders_to_enter.extend(orders)
            page += 1
        else:
            break

    print('Fetched {0} new orders...'.format(len(orders_to_enter)))
    return orders_to_enter


def save_trouble_order(order_id, message):
    # Read the file:
    f = open("./backend/tools/trouble_orders.txt", "r")
    lines = f.readlines()
    f.close()
    f = open("./backend/tools/trouble_orders.txt", "w")
    f.write(str(order_id) + "," + message + "\n")
    for line in lines:
        f.write(line)
    print('Saved into trouble_orders.txt...')
    f.close()


def create_orders(orders):
    # TODO: Control exceptions and keep the file with max_id
    if len(orders):
        for order in orders:
            order = order.to_dict()

            if order_exists(str(order['order_number'])):
                create_new_max_id_file(order['id'])
                continue

            # Check if phone is empty
            if order['customer']['default_address']['phone'] is None:
                save_trouble_order(
                    order['id'], 'Not phone found into customer-> default_address -> phone')
                create_new_max_id_file(order['id'])
                continue

            # Check if phone contains only numbers
            regex = re.compile("^[0-9]+$")
            phone = norm_cellphone(
                order['customer']['default_address']['phone'])
            match = regex.match(phone)
            if match is None:
                print('The phone number into order is not a valid number!')
                print('Is not possible to store this order!')
                save_trouble_order(
                    order['id'], 'The phone number into order is not a valid number')
                create_new_max_id_file(order['id'])
                continue

            user_client_id = None
            u = db.session.query(User).filter_by(
                cellphone=norm_cellphone(order['customer']['default_address']['phone'])).first()
            if u is not None:
                user_client_id = u.id

            # Seller 1 it's descubre's seller, is used for orders without a seller disccount code
            seller_id = 1
            for attribute in order['note_attributes']:
                if attribute['name'] == "Código de tu vendedora":
                    seller = Seller.query.filter_by(
                        code=norm_code(attribute['value'])).first()
                    if seller:
                        seller_id = seller.id
                    break

            print('Processing order {0}...'.format(order['id']))

            if user_client_id is None:
                u = create_user(order)
                c = create_client(u.id, seller_id)
            else:
                c = db.session.query(Client).filter_by(user_id=user_client_id).first() \
                    if db.session.query(Client).filter_by(user_id=user_client_id).first() else None
                if c is None:
                    c = create_client(u.id, seller_id)
            client_id = c.id

            # Create the order:
            try:
                order_ = Order(
                    seller_id=seller_id,
                    client_id=client_id,
                    date=order['updated_at'],
                    order_number=order['order_number'],
                    total=order['total_price'],
                    tax=order['total_tax'],
                    shipping=order['shipping_lines'][0]['price']
                )
                db.session.add(order_)
                db.session.commit()
                print(
                    '-------------------------- Begin Order --------------------------')
                print('Order Created. ID: {0}, NAME: {1}, TOTAL: {2}, EMAIL: {3}, PHONE: {4}'
                      .format(order['id'], order['name'], order['total_price'], order['customer']['email'], order['customer']['default_address']['phone']))
                print('-------------------------- End Order --------------------------')
            except Exception as e:
                db.session.rollback()
                print('Is not possible to save the Orders into database')
                save_trouble_order(order['id'], str(e))
                print(e)
            else:
                # Order sucessful -> verify if first order and referral system
                if seller_id != 1 and len(Order.query.filter_by(seller_id=seller_id).all()) == 1:
                    if seller.referred_by is not None:
                        print('First order and part of referral system')
                        referral = Referral(referred_by_id=seller.referred_by_id, 
                                            referred_id=seller.id)
                        db.session.add(referral)
                        db.session.commit()

            create_new_max_id_file(order['id'])
    else:
        print('Nothing to do...')


def main():
    connect_to_shopify()
    while True:
        orders = get_orders_from_shopify()
        print('Orders List: {0}'.format(orders))
        create_orders(orders)
        time.sleep(SECONDS_TO_FETCH)
