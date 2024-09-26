import json


def load_json(filename):
    with open(filename, 'r') as file:
        data=json.load(file)
    return data
    
    # JSON-Datei speichern
def save_json(data, filename):
    with open(filename, 'w') as file:
        json.dump(data, file, indent=4)

    
    
def main():
    filename = "master-db_03.json"
    
    data = load_json(filename)
    #print("orginal data:", data)
    
    #add element
    #ädata[key] = value
   
    #remove element
    #    if key in data:
    #    del data[key]
   
   
    
   
   
   
        # JSON speichern
    save_json(data, filename)
    print("Changes saved to", filename)

    
if __name__ == "__main__":
    main()