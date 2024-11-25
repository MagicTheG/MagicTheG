import requests
category = 'money'
api_url = 'https://api.api-ninjas.com/v1/quotes?category={}'.format(category)
response = requests.get(api_url, headers={'X-Api-Key': 'cY5eb2ZW0+vU4L4T0l2Jmg==YzmNfsxnguZmjgAD'})
if response.status_code == requests.codes.ok:
    print(response.text)
else:
    print("Error:", response.status_code, response.text)
