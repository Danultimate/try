import csv
import datetime
import sys

"""
Parametros: ruta del archivo (sys.argv[1])
Se puede ejecutar con el siguiente comando:
    SETTINGS=config.Development python bulk_tasks_create.py task.csv
Ejecuta el script en la ruta descubre-server/backend/tools/ del proyecto
Debes tener venv con python3.5

The csv file struct, is based on fieldnames list:
    fieldnames=["type_of_task","seller_id","task_description","content_id","planned_date"]
"""

# Loading the csv file:
print("Loading csv file in {0}".format(sys.argv[1]))
reader = csv.DictReader(
    open(sys.argv[1]),
    fieldnames=["type_of_task","seller_id","task_description","content_id","planned_date"])

# Importar modelos y bd de backend-descubre
print("Importing backend models...")
sys.path.append("../..")
from backend import db
from backend.models import *

for row in reader:
    if row['type_of_task'] != 'type_of_task': # Excluir el header
        print('Creating task: {0}'.format(row))

        seller = db.session.query(Seller).filter_by(id=row['seller_id']).first()
        seller_clients = db.session.query(Client).filter_by(seller_id=seller.id).all()


        year = int(row['planned_date'][:4])
        month = int(row['planned_date'][-5:-3])
        day = int(row['planned_date'][8:])
        # For now, the num_of_clients are the total of clients for this seller
        task = Task(
            type_of_task = "share",
            seller_id = row['seller_id'],
            num_of_clients = len(seller_clients), # Count the quantity of clients for this seller
            task_description = row['task_description'],
            content_id = row['content_id'],
            medium_id = 1,
            planned_date = datetime.datetime(year,month,day),
            done = False
        )
        db.session.add(task)
        db.session.commit()

        print("Creating client suggestions...")
        for sc in seller_clients:
            client_suggestion = ClientSuggestions(
                                task_id=task.id
                                , client_id=sc.id
                                , sent=False
                                , text_content=task.task_description)
            db.session.add(client_suggestion)
        db.session.commit()
print("Finish...")
