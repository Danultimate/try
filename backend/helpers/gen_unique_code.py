import unicodedata
from hashids import Hashids

hashids = Hashids(salt='descubre', min_length=3,
                  alphabet='abcdefghijklmnopqrstuvwxyz1234567890')


def normalize_string(text):
    text = text.split(' ')[0].lower()
    try:
        text = unicode(text, 'utf-8')
    except (TypeError, NameError):
        pass
    text = unicodedata.normalize('NFD', text)
    text = text.encode('ascii', 'ignore')
    text = text.decode("utf-8")
    return str(text)


def generate_unique_code(name, _id):
    norm_name = normalize_string(name)
    id_encoded = hashids.encode(_id)

    return '%s-%s' % (norm_name, id_encoded)
