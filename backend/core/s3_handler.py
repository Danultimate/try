from backend import app
import urllib
from flask import jsonify, request, abort
import time
import base64
import hmac
from hashlib import sha1

@app.route('/api/sign')
def sign_s3():
    AWS_ACCESS_KEY = app.config['S3_ACCESS_KEY_ID']
    AWS_SECRET_KEY = app.config['S3_SECRET_ACCESS_KEY']
    S3_BUCKET = app.config['S3_DOCUMENT_BUCKET_NAME']

    object_name = urllib.parse.quote_plus(request.args.get('name'))
    mime_type = request.args.get('type')

    try:
        #check_mime(mime_type, request.args.get('for'))
        pass
    except ValueError as e:
        return jsonify(dict(error=str(e)))

    expires = int(time.time() + 60 * 60 * 24)
    amz_headers = "x-amz-acl:public-read"

    string_to_sign = "PUT\n\n%s\n%d\n%s\n/%s/%s" % (
        mime_type, expires, amz_headers, S3_BUCKET, object_name)

    signature = base64.encodestring(
        hmac.new(AWS_SECRET_KEY.encode(), string_to_sign.encode('utf8'), sha1).digest())
    signature = urllib.parse.quote(signature.strip())

    url = 'https://%s.s3.amazonaws.com/%s' % (S3_BUCKET, object_name)
    signed_request = '%s?AWSAccessKeyId=%s&Expires=%s&Signature=%s' % (
        url, AWS_ACCESS_KEY, expires, signature)

    return jsonify(dict(url=url, signed_request=signed_request, object_name=object_name))
