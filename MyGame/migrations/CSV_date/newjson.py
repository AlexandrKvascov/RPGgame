import json

# Открываем файл csv.json и читаем его содержимое
with open('C:\\Projects\\MyGame\\migrations\\CSV_date\\csv.json', 'r') as f:
    data = json.load(f)

# Переводим цифровые значения в int и заменяем 'f' на False
for item in data:
    item['id'] = int(item['id'])
    item['lvl'] = int(item['lvl'])
    item['health'] = int(item['health'])
    item['strength'] = int(item['strength'])
    item['dead'] = item['dead'] == 'f' and False or True

# Выводим результат
print(json.dumps(data, indent=4))
with open("npc.json", "w") as jsonfile:
    json.dump(data, jsonfile, indent=4)