from backend import db
from backend.models import *

ts = Task.query.filter_by(
    task_description="Mandar contenido de celebridad autentica a 5 clientes (potenciales)")
print(len(ts.all()))
ts.delete()
db.session.commit()

ts = Task.query.filter_by(
    task_description="Haz una orden de prueba con tu codigo de descuento")
print(len(ts.all()))
ts.delete()
db.session.commit()

sellers = Seller.query.all()

for seller in sellers:
    db.session.add(Task(type_of_task="share-general", seller_id=seller.id,
                        task_description="Manda el contenido 📄 de campaña actual a tus clientes 👯",
                        medium_id=1,
                        planned_date=datetime.datetime(2018, 9, 19)
                        ))
