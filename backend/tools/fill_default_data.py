import sys
sys.path.append("../..")
from backend import app, db
from backend.models import *


"""
This script creates defined models and try to setup the default
data based on the bussiness logic.

Script's Commands:
drop    =>      Delete all tables from database (SQLAlchemy command: db.drop_all())
"""

commands = ['drop']
commands_description = { 'drop': 'Delete all tables from database (SQLAlchemy command: db.drop_all())' }

if len(sys.argv) > 1:
    if sys.argv[1] in commands:
        if sys.argv[1] == 'drop': db.drop_all()
    else:
        print('Unrecognized comand, please try one of below:')
        print('---------------------------------------------')
        for command in commands:
            print('{0}: {1}'.format(command, commands_description[command]))
        print('---------------------------------------------')
        exit()


# Initialize the model's into database
try:
    db.create_all()
except Exception as e:
    print(e)

# Setup the default Client's profiles:
#  id |          created_at           | created_by |          updated_at           | updated_by |   name
# ----+-------------------------------+------------+-------------------------------+------------+-----------
#   1 | 2018-09-13 01:55:58.250186+00 |          1 | 2018-09-13 01:55:58.250202+00 |          0 | General
#   2 | 2018-09-14 22:35:07.306633+00 |          1 | 2018-09-14 22:35:07.306686+00 |          0 | Autentica
#   3 | 2018-09-14 22:35:38.210851+00 |          1 | 2018-09-14 22:35:38.210898+00 |          0 | Naturalia
#   4 | 2018-09-14 22:35:38.394097+00 |          1 | 2018-09-14 22:35:38.394146+00 |          0 | Trendy

try:
    seller_default = Profile(name="Seller Default")
    general_profile = Profile(name="General")
    autentica_profile = Profile(name="Autentica")
    naturalia_profile = Profile(name="Naturalia")
    trendy_profile = Profile(name="Trendy")
    db.session.add(seller_default)
    db.session.add(general_profile)
    db.session.add(autentica_profile)
    db.session.add(naturalia_profile)
    db.session.add(trendy_profile)
    db.session.commit()
except Exception as e:
    db.session.rollback()
    print(e)

try:
    # Setup the Descubre default's Seller:
    u = User(first_name="Descubre",
            last_name="Belleza",
            identification="99999999",
            cellphone=3999999999,
            email="admin@descubrebelleza.com")
    db.session.add(u)
    db.session.commit()

    s = Seller(user_id=u.id, code="DESCUBRE_DEFAULT")
    db.session.add(s)
    db.session.commit()
except Exception as e:
    db.session.rollback()
    print(e)

####################################
# Setup default Seller's Task
####################################
#Setup default mediums (socialnetworks)
#  id |          created_at           | created_by |          updated_at          | updated_by |   name
# ----+-------------------------------+------------+------------------------------+------------+----------
#   1 | 2018-09-17 19:40:36.288694+00 |          1 | 2018-09-17 19:40:36.28872+00 |          0 | Facebook

try:
    facebook = SocialNetwork(name="Facebook")
    whatsapp = SocialNetwork(name="WhatsApp")
    instagram = SocialNetwork(name="Instagram")
    email = SocialNetwork(name="Email")
    other = SocialNetwork(name="Other")

    db.session.add(facebook)
    db.session.add(whatsapp)
    db.session.add(instagram)
    db.session.add(email)
    db.session.add(other)

    db.session.commit()
except Exception as e:
    db.session.rollback()
    print(e)

# Setup Topics:
#  id |          created_at           | created_by |          updated_at           | updated_by |    name
# ----+-------------------------------+------------+-------------------------------+------------+------------
#   1 | 2018-09-13 02:27:56.57424+00  |          1 | 2018-09-13 02:27:56.574257+00 |          0 | Inspira
#   2 | 2018-09-17 20:25:14.38997+00  |          1 | 2018-09-17 20:25:14.390015+00 |          0 | Aprende
#   3 | 2018-09-17 20:25:14.488038+00 |          1 | 2018-09-17 20:25:14.488053+00 |          0 | Socializa
#   4 | 2018-09-17 20:25:14.622627+00 |          1 | 2018-09-17 20:25:14.622642+00 |          0 | Diviertete
#   5 | 2018-09-17 20:25:14.715401+00 |          1 | 2018-09-17 20:25:14.715421+00 |          0 | Catalogo


try:
    inspira = Topic(name="Inspira")
    aprende = Topic(name="Aprende")
    socializa = Topic(name="Socializa")
    diviertete = Topic(name="Diviertete")
    catalogo = Topic(name="Catalogo")

    db.session.add(inspira)
    db.session.add(aprende)
    db.session.add(socializa)
    db.session.add(diviertete)
    db.session.add(catalogo)
    db.session.commit()

except Exception as e:
    db.session.rollback()
    print(e)



# Setup default Seller's content
try:
    celebridades_naturalia = Content(name="Celebridades Naturalia",
                description="Comparte este contenido",
                url="https://s3.us-east-2.amazonaws.com/descubre-content/celebridades/celebradidas+como+tu-LauraTobon-1.jpg",
                thumbnailUrl="https://s3.us-east-2.amazonaws.com/descubre-content/thumbnails/thumbnails5.jpg",
                media_type="imagen",
                topic_id=1,
                profile_id=1)
    celebridades_autentica = Content(name="Celebridades Autentica",
                description="Comparte este contenido",
                url="https://s3.us-east-2.amazonaws.com/descubre-content/celebridades/celebradidas+como+tu-caro-1.jpg",
                thumbnailUrl="https://s3.us-east-2.amazonaws.com/descubre-content/thumbnails/thumbnails4.jpg",
                media_type="imagen",
                topic_id=1,
                profile_id=1)
    celebridades_trendy = Content(name="Celebridades Trendy",
                description="Comparte este contenido",
                url="https://s3.us-east-2.amazonaws.com/descubre-content/celebridades/celebradidas+como+tu-Goyo-1.jpg",
                thumbnailUrl="https://s3.us-east-2.amazonaws.com/descubre-content/thumbnails/thumbnails3.jpg",
                media_type="imagen",
                topic_id=1,
                profile_id=1)
    meme_rostro = Content(name="Meme Rostro",
                description="Comparte este contenido",
                url="https://s3.us-east-2.amazonaws.com/descubre-content/memes/MEME+2.jpg",
                thumbnailUrl="https://s3.us-east-2.amazonaws.com/descubre-content/thumbnails/thumbnails8.jpg",
                media_type="imagen",
                topic_id=1,
                profile_id=1)
    meme_labial = Content(name="Meme Labial",
                description="Comparte este contenido",
                url="https://s3.us-east-2.amazonaws.com/descubre-content/memes/MEME+3.jpg",
                thumbnailUrl="https://s3.us-east-2.amazonaws.com/descubre-content/thumbnails/thumbnails7.jpg",
                media_type="imagen",
                topic_id=1,
                profile_id=1)
    meme_pestanina = Content(name="Meme Pestañina",
                description="Comparte este contenido",
                url="https://s3.us-east-2.amazonaws.com/descubre-content/memes/MEME+1.jpg",
                thumbnailUrl="https://s3.us-east-2.amazonaws.com/descubre-content/thumbnails/thumbnails6.jpg",
                media_type="imagen",
                topic_id=2,
                profile_id=1)
    video = Content(name="Video",
                description="¡Tengo una noticia GENIAL!, Te cuento que ahora hago parte de Descubre Cosméticos, que me ayuda a mejorar tu experiencia de compra de productos de belleza, Te invito a descubrir una nueva manera de comprar los productos de Ésika, Cyzone y L'Bel en www.descubrecosmeticos.com\r",
                url="https://youtu.be/_ILVgDVitew",
                thumbnailUrl="https://s3.us-east-2.amazonaws.com/descubre-content/thumbnails/thumbnails2.jpg",
                media_type="video",
                topic_id=1,
                profile_id=1)
    quiz = Content(name="Quiz",
                description="¡Ayúdame a descubrir cual es tu estilo para poder enviarte recomendaciones y productos ideales para ti!\r",
                url="https://descubre.typeform.com/to/ovbWS1",
                thumbnailUrl="https://s3.us-east-2.amazonaws.com/descubre-content/thumbnails/thumbnails1.jpg",
                media_type="quiz",
                topic_id=1,
                profile_id=1)

    db.session.add(celebridades_naturalia)
    db.session.add(celebridades_autentica)
    db.session.add(celebridades_trendy)
    db.session.add(meme_rostro)
    db.session.add(meme_labial)
    db.session.add(meme_pestanina)
    db.session.add(video)
    db.session.add(quiz)
    db.session.commit()
except Exception as e:
    db.session.rollback()
    print(e)



# Setup Default Parent Product's Categories:
try:
    cosmetico = Category(name="Cosmeticos y Maquillaje");
    cuidado_piel = Category(name="Cuidado de la piel", parentID=1)
    fragancia = Category(name="Fragancia", parentID=1)
    maquillaje_ojos = Category(name="Maquillaje para ojos", parentID=1)
    maquillaje_labios = Category(name="Maquillaje para labios", parentID=1)
    maquillaje_rostro = Category(name="Maquillaje para rostro", parentID=1)

    db.session.add(cosmetico)
    db.session.add(cuidado_piel)
    db.session.add(fragancia)
    db.session.add(maquillaje_ojos)
    db.session.add(maquillaje_labios)
    db.session.add(maquillaje_rostro)
    db.session.commit()
except Exception as e:
    db.session.rollback()
    print(e)
    raise


# Create one client for testing
try:
    u = User(first_name="Tesging",
            last_name="Client",
            identification="8888888888",
            cellphone=3888888888,
            email="client@descubrebelleza.com")
    db.session.add(u)
    db.session.commit()
    c = Client(user_id = u.id, old_consumer=False, seller_id = 1)
    db.session.add(c)
    db.session.commit()
except Exception as e:
    db.session.rollback()
    print(e)
    raise
