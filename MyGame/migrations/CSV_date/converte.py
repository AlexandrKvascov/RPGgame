import csv 
import json

with open('C:\\Projects\\MyGame\\migrations\\CSV_date\\npc.csv', 'r') as csvfile:
    reader = csv.DictReader(csvfile)
    data = [row for row in reader]
with open("csv.json", "w") as jsonfile:
    json.dump(data, jsonfile, indent=4)