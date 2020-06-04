# -*- coding: utf-8 -*-
"""
Created on Sat May  2 22:29:47 2020

@author: bhanu
"""

import requests
from bs4 import BeautifulSoup
import time
from time import sleep
from random import randint
import pandas as pd
from IPython.core.display import clear_output
from warnings import warn
from selectorlib import Extractor
import csv


req=0

# URL = 'https://www.monster.com/jobs/search/?q=Software-Developer&where=Australia'
pages = [str(i) for i in range(1,3)]

dic = []

proxies = {"https":"191.252.196.160:8080",
           "http":"191.252.196.160:8080"}
headers = {
        'authority': 'www.amazon.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-dest': 'document',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }


for page in pages:
    print(page)
    
    if page != '1':
        URL = "https://www.amazon.com/s?k=hand+sanitizer&s=relevanceblender&page="+page+"&crid=60MVQM6QJ8UL&qid=1588483072&sprefix=hand%2Caps%2C271&ref=sr_pg_"+page
        #URL = "https://www.cvs.com/search?page=2"
    else:
        URL = "https://www.amazon.com/s?k=hand+sanitizer&s=relevanceblender&crid=60MVQM6QJ8UL&qid=1588485163&sprefix=hand%2Caps%2C271&ref=sr_pg_1"
        #URL = "https://www.cvs.com/search?searchTerm=hand%20sanitizer"
    #print(URL)
    start_time = time.time()
    response = requests.get(URL,headers=headers)
    #print(response)
    
    sleep(randint(8,10))
    
    #monitor requests
    req+=1
    elapsed_time = time.time() - start_time
    print('Request:{}; Frequency: {} requests/s'.format(requests, req/elapsed_time))
    clear_output(wait=True)
    
    #print("Status Code")
    #print(response.status_code)
    # Throw a warning for non-200 status codes
    if response.status_code != 200:
        warn('Request: {}; Status code: {}'.format(requests, response.status_code))
    # Break the loop if the number of requests is greater than expected
    if req > 72:
        warn('Number of requests was greater than expected.')
        print('in if')
        break
    # Parse the content of the request with BeautifulSoup
    page_html = BeautifulSoup(response.content, features = "lxml")
    #print(page_html)

    # Select all the 50 movie containers from a single page
    job_elems = page_html.find_all('div', class_ = 'a-section a-spacing-medium')
    
    for job_elem in job_elems:
        # Each job_elem is a new BeautifulSoup object.
        # You can use the same methods on it as you did before.
        title_elem = job_elem.find('img',class_='s-image')['alt']
        print('Title')
        print(title_elem)
        ae =job_elem.find('div',class_='a-row a-size-small')
        link = job_elem.find('div',class_='a-section a-spacing-none a-spacing-top-small')
        if link!= None:
            lnk = link.find('a',class_='a-link-normal a-text-normal')['href']
            print(lnk)
        if ae!= None:
            aele = ae.find('a',class_='a-popover-trigger a-declarative')
            print('Stars')
            #print(aele)
            if aele!= None:
                avail_elem = aele.find('i')
                #avail_elem = ae.find('span','aria-label')
                
                #print(avail_elem)
                if avail_elem != None:
                    s = avail_elem.find('span',class_='a-icon-alt')
                    if s!= None:
                        #print(s.text)
                        rate = s.text
                        rate=rate[0:3]
                        rate=float(rate)
                        print(rate)
                        if rate >= 3.0:
                            dic.append([title_elem,rate,lnk])
            
      
        #print(av)
       
#        print("Title-----")
#        print(title_elem)
#        print("Available")
#        if avail!= None:
#            print(avail.text)
        
    #print(dic)
        
    df = pd.DataFrame(dic,columns = ['Product Name','Rating','Link'])  
    #print(df)
    df.to_csv('products.csv', index=False, encoding='utf-8')
    
        
#        if title_elem == None:
#            continue

       
#    python_jobs = results.find_all('h2', string='Python Developer')
#    python_jobs = results.find_all('h2', string=lambda text: 'python' in text.lower())
#    
#    for p_job in python_jobs:
#        link = p_job.find('a')['href']
#        print(p_job.text.strip())