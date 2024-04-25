FROM mongo:latest

COPY productsData.json /productsData.json
COPY ordersData.json /ordersData.json
COPY staffData.json /staffData.json
COPY categoriesData.json /categoriesData.json

CMD mongoimport --host mongo --db db --collection products  --file /productsData.json --jsonArray\ 
  && mongoimport --host mongo --db db --collection orders  --file /ordersData.json --jsonArray\
  && mongoimport --host mongo --db db --collection staff  --file /staffData.json --jsonArray\
  && mongoimport --host mongo --db db --collection categories  --file /categoriesData.json --jsonArray