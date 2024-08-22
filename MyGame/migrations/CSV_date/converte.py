# import csv 
# import json

# with open('C:\\Projects\\MyGame\\migrations\\CSV_date\\npc.csv', 'r') as csvfile:
#     reader = csv.DictReader(csvfile)
#     data = [row for row in reader]
# with open("csv.json", "w") as jsonfile:
#     json.dump(data, jsonfile, indent=4)
def main(MonsterLvl,MonsterStrnght, PlayerLvl):
    Exp = (MonsterLvl * MonsterStrnght )/ (PlayerLvl +1)
    return Exp
print("Exp: ",main(10, 50, 8), "    ")