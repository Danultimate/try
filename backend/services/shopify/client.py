from backend import app
import shopify
#TODO: Put some logs...
# import logging


class shopifyClient():
    # By agreement, we put the Seller's code (shopify's discoutn code) in this Shopify's Price Rule
    DEFAULT_PRICE_RULE_ID = 319568281667


    def connect_to_shopify():
        print('Conecting to shopify store...')
        shop_url = "https://{0}:{1}@{2}/admin".format(app.config['SHOPIFY_API_KEY'],
                                                        app.config['SHOPIFY_PASSWORD'],
                                                        app.config['SHOP_URL'])
        shopify.ShopifyResource.set_site(shop_url)
        print('Conected')


    def discount_code_exists(code):
        """
        This function check if the Seller's code already exists.

        :param code: The Seller's unique code.
        :type code: str.
        :returns:  boolean -- True if exists
        """
        found = False
        price_rule = shopify.PriceRule.find(shopifyClient.DEFAULT_PRICE_RULE_ID)
        discount_codes = price_rule.discount_codes()
        for dc in discount_codes:
            if dc.to_dict()['code'] == code: found = True
        return found


    def create_discount_code(code):
        """
        This function put the Seller's code into Shopify's discount codes.

        :param code: The Seller's unique code.
        :type code: str.
        :returns:  int -- Seller's code id in Shopify's Store.
        """
        shopifyClient.connect_to_shopify()
        if (shopifyClient.discount_code_exists(code)):
            print('Discount code already craeted!')
            return None

        try:
            discount_code = {
                    'code': code,
                    'price_rule_id': shopifyClient.DEFAULT_PRICE_RULE_ID
            }
            discount_code = shopify.DiscountCode.create(discount_code)
            if discount_code.id:
                print('New discount code created in Shopify\'s Store: {0}'.format(code))
        except Exception as e:
            print('[ERROR]: Fail to craeted discount code into Shopify\'s store.')
        return discount_code.id if discount_code.id else None
