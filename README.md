# Problem statement

1. Call third party weather API with city as an input.
2. Display its weather

# Solution Description

As it's not mentioned that city name will be input how (command line argument or rest api parameter). So i made this code to work on both parts

## 1. for getting the weather details by inputting city name as command line argument
i. run the application as node index.js cityName (for ex: node index.js ambala)

## 2. for getting the weather details by inputting city name as API parameter
i. run the application as npm start
ii. access the application on localhost as http://localhost:8080
iii. input city name in either query string format or API param format
for ex: http://localhost:8080/?cityName=delhi
or http://localhost:8080/delhi