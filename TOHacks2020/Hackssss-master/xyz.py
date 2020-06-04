import requests
from bs4 import BeautifulSoup
import pandas as pd

# URL = 'https://www.monster.com/jobs/search/?q=Software-Developer&where=Australia'

URL = 'https://covid-19-apis.postman.com/covid-19-testing-locations/arizona/'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
results = soup.find(class_='css-1dbjc4n')
# print(results.prettify())
job_elems = results.find_all('div')
print (len(job_elems))
 
for job_elem in job_elems:
    # Each job_elem is a new BeautifulSoup object.
    # You can use the same methods on it as you did before.
    title_elem = job_elem.find('div', class_='css-901oao css-cens5h r-1khnkhu r-1jn44m2 r-ubezar r-29m4ib r-rjixqe r-kc8jnq r-fdjqy7 r-13qz1uu')
    company_elem = job_elem.find('div', class_='css-901oao r-1jn44m2 r-evnaw r-b88u0q r-ttdzmv')
    location_elem = job_elem.find('div', class_='css-901oao r-15k6nva r-1jn44m2 r-1b43r93 r-14gqq1x')
    if None in (title_elem, company_elem, location_elem):
        continue
    print("Title-----")
    print(title_elem.text.strip())
    print("Company-----")
    print(company_elem.text.strip())
    print("Location-----")
    print(location_elem.text.strip())
    print()
    df = pd.DataFrame({'Product Name':title_elem.text.strip(),'Price':title_elem.text.strip(),'Rating':title_elem.text.strip()}, index=[0])
    df.to_csv('products.csv', index=False, encoding='utf-8')

python_jobs = results.find_all('h2', string='Python Developer')
python_jobs = results.find_all('h2',
                               string=lambda text: 'python' in text.lower())
for p_job in python_jobs:
    link = p_job.find('a')['href']
    print(p_job.text.strip())
