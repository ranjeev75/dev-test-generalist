# Completed Full Stack Dev Task

As per the provided instructions and the **User story** requirements the task has been completed to enable the user to follow the RESTful endpoints to GET, POST and DELETE items from and/or to the provided 'bike' collection.

Please refer to the User story below as a reference to the completed task. To run the application on your machine refer to the installation and setup instructions below.

#### The User story
As a front-end dev user, or as a command line dev user
Assuming that all authentication and security has been handled by another layer in the application
I would like API endpoints that models bikes (see Sample Bike Schema)
- I would like to be able to see all bikes (GET the entire collection)
- I would like to see an individual bike (GET an item) given its `bikeId`
- I would like to add a new bike (POST to collection) 
- I would like the interface to the API to be RESTful
- I would like to interact with the API using [curl](https://curl.haxx.se/) or [postman](https://www.getpostman.com/)
- I am not concerned DELETE and PUT at this time

#Assumptions
- The application is built in Node.js using the Express framework. Can be [installed here](https://nodejs.org/en/download/).
- Used the Mocha/Chai framework for testing the application.
- Project can be run in both development or test mode.
- Interaction with the application via **curl** 
- Database connection settings are held in a local .env file to hide credentials from public. 

##Installation and setup

###1. Database instructions

Follow these instructions to get the test database working on your machine:

1. Ensure you have the latest version of Docker installed on your machine (Native Docker for Windows, and Docker for Mac that no longer use docker-machine) [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/).
2. Ensure the docker service is running on your machine and you can connect to it using the `docker info` command
3. Get Mongo running as a service on your machine by typing the following commands below into a console window.
4. Use a Mongo GUI tool like [Robomongo](https://robomongo.org/) to view test collection and documents. 

```
#A. remove the old instance of the db if it exists, don't worry if this errors 
docker rm --force jlmongo

#B. start the Mongo container as a service
docker run -d --name jlmongo -p 27017:27017 jujhars13/dev-test-generalist-mongo:latest

#C. Once the container is up and running. Import the bike schema by running this command in
docker exec jlmongo mongoimport --collection bike /schema/bike.json --jsonArray

```

**Notes**
- You can test if your db works by running `docker exec jlmongo mongo --eval "db.getCollection('bike').find({})"` 
- If you shutdown your machine or do something bad to your database, simply trash your db and follow the instructions again in part 3
- There is no username and password for your local db
- The default database is `test`, the default collection is `bike` with the data in it
- The local Mongo instance sits on the default **TCP:27017** port you may have to tweak this if you're already running a local Mongo instance of your own
 
###2. Install Application

- Either fork or clone the repo onto your local machine.    
- With node.js installed onto your machine run the command ```npm install``` from the app directory in a console.
    - This will install all listed dependencies from the **package.json** file into the project locally.
    - If this is not successful then **dependencies** will have to be installed manually using the ```npm install **packageName** --save``` command. 
    Similarly all **devDependencies** will have to be installed with the ```npm install **packageName** --save-dev``` command.   
- The Express framework and relevant modules should be installed onto your machine. All node modules will be installed into the **node_modules** folder.
- To run the app via curl it can be downloaded [here](https://curl.haxx.se/). 
       
###3. Setup Application    

- set up the database connection with environment variables from an **.env** file.
- In the root of the app directory create a file named ".env".    
 - Populate the file with the following:
 ```
 DB_HOST = 'mongodb://192.168.99.100:27017/'
 COLLECTION = 'test'
 ```

- This file will remain local as it will be included in .gitignore. 

##Run Application

1. To run the application, run an instance of the server by running the command ```npm run dev```. The console should show the server is running as **Server is alive on port 9999....**.
2. Open up another console to run **CURL** commands.
3. To see the app's api endpoint GET all bikes from the **test collection** run command:
    - ```curl localhost:9999/allbikes```
4. To see the app's api endpoint GET a specific bike by ```bikeId``` from the **test collection** run command:
      - ```curl localhost:9999/allbikes/:id```. Here```:id``` is the ```bikeId``` e.g. bikeId=4
5. To see the app's api endpoint POST a new bike document to the **test collection** run command:
      - ```curl --data "name=New Bike&price=99999&description=Mountain bike"  http://localhost:9999/addbike```. All three fields (name, description and price) must be populated in order to insert a new document into the collection.  
6. To see the app's api endpoint DELETE a specific bike by ```bikeId``` from the **test collection** run command:
      - ```curl -X "DELETE" localhost:9999/deletebike/:id```. Here```:id``` is the ```bikeId``` e.g. bikeId=3     

##Test Application

A testing framework (mocha/chai) has been included in the ```test/unitTests.js``` folder, running unit tests on each of the GET, POST and DELETE commands running on the server. To run these tests:

  1. Kill off any live servers.
  2. In a console run command ```npm run test```
  3. Check console to see all tests have passed.
 
 





