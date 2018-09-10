import ssl

from backend import app

context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.load_cert_chain('ssl/server.crt', 'ssl/server.key')

app.run(threaded=True, ssl_context=context)
