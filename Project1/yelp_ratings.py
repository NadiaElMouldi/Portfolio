import requests
import csv

API_KEY = 'UsBzmdb02pyaDVQ1Q2oPSG2cGLDqi-A4Kq_ZK-2a8ecOGL8_amQ3zPfj2AJpEP5e35mq_37K5ADHwK-Ly9NVT08HFXBwKFQJpZIDS1K4QOF0qlbQoa-5z0POWF2XnYx'

API_HOST = 'https://api.yelp.com'
BUSINESS_PATH = '/v3/businesses/matches'




def get_business_match(name, address1, city, state, country, latitude, longitude):
    url = API_HOST + BUSINESS_PATH
    params = {'name': name, 'address1': address1, 'city':city, 'state': state,
    'country': country, 'latitude': latitude, 'longitude': longitude}
    headers = {'Authorization': 'Bearer 9UsBzmdb02pyaDVQ1Q2oPSG2cGLDqi-A4Kq_ZK-2a8ecOGL8_amQ3zPfj2AJpEP5e35mq_37K5ADHwK-Ly9NVT08HFXBwKFQJpZIDS1K4QOF0qlbQoa-5z0POWF2XnYx'}

    response = requests.get(url, headers=headers, params=params)

    return response.json()

def get_business_rating(id):
    headers = {'Authorization': 'Bearer 9UsBzmdb02pyaDVQ1Q2oPSG2cGLDqi-A4Kq_ZK-2a8ecOGL8_amQ3zPfj2AJpEP5e35mq_37K5ADHwK-Ly9NVT08HFXBwKFQJpZIDS1K4QOF0qlbQoa-5z0POWF2XnYx'}
    response = requests.get("https://api.yelp.com/v3/businesses/"+id, headers=headers)
    return response.json()


with open('latest_grade.csv') as csvfile:
    lines = csv.DictReader(csvfile)
    x = 0
    for line in lines :  
        x = x+1
        if x>12955:
                results = get_business_match(line['DBA'],line['BUILDING']+' '+line['STREET'],'New York City','NY','US',line['Latitude'],line['Longitude'])
                print(results)
                if "businesses" in results and len(results["businesses"])>0 and line["Latitude"] != "NA" and line["Latitude"] != 0 and line["Longitude"] != "NA" and line["Longitude"] != 0:
                    result = results["businesses"][0]['id']
                    rate = get_business_rating(result)
                    if 'rating' in rate: 
                        rating = rate['rating']
                    else: rating = "none"
                    print(result)
                else: 
                    result = "none"
                    rating = "none"
                with open('rating.csv', mode='a') as rating_file:
                        rating_writer = csv.writer(rating_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
                        print (str(line['DBA'])+" "+ str(result)+ " "+ str(rating))
                        rating_writer.writerow([line['DBA'],result,rating])
            

            
