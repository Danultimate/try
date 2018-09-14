# Import models from backend
print("Importing backend models...")
sys.path.append("../..")
import csv

from backend import db
from backend.models import *

print("Loading csv file in {0}".format(sys.argv[1]))

model_list = [Content]

    
    with open(filepath, 'r', encoding="utf-8") as csvfile:
        data = csv.reader(csvfile, delimiter=',')
        for i, row in enumerate(data):
            if i==0:
                colum_names = row
                continue
            data_dict = {}
            for j, column in enumerate(row):
                if column == '':
                    continue
                data_dict[colum_names[j]] = column
            print(data_dict)
            db_element = modelDB(**data_dict)
            db_element.save()


# For sales and others it has to be personalized
