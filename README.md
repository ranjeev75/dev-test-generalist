# Full Stack Dev Task

Here's a back-end oriented assessment that we'd like you to complete in approx one week.

## The task
We estimate that this task will take about **6-10 hours** of contiguous development.  Feel free to develop in a non-contiguous manner.
If you start to go way over time then just submit what you have and create a list in your project's **README.md** of anything else that would have liked to add/do given the time.


### Assignment Details
To complete this task, you must:

- Read the user story below and create an API framework and code to fulfil the requirements of the story
- Fork this Github repository for the task where you will **continuously** commit your code
- Create a project **README.md** where you'll put your project description, project setup, notes, assumptions etc...
- When finished send over the GitHub repo and any other links
- You will need to install docker on your machine to get your database working, it is suggested that you use the latest beta version of docker with it's native hosting features for OSX and Windows users.
- Provide CURL based examples on how to interact with your API (GET and POST)
- The database layer is provided to you via Mongo in a Docker container, the instructions below will start the Mongo 3.3 database on your machine and populate it with sample bike data for your api
- Use any modern language you see fit to get the job done, obviously it will have to work with Mongo 3.3

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

#### Sample Bike schema
To give you an idea of the documents (records) of what's in the Mongo `bike` collection in the `test` db.  This is a sample schema for bikes, you can add/modify fields as you see fit:

```
{
  "id": 1,
  "name": "Litening C:68 super trike",
  "description": "The trike for professional 4 year old cyclists.  Full carbon frame, complete with novelty horn",
  "price": "5006.33"
}
```

### Database instructions

Follow these instructions to get the test database working on your machine:

1. Ensure you have the latest version of Docker installed on your machine (Native Docker for Windows, and Docker for Mac that no longer use docker-machine) [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/):
2. Ensure the docker service is running on your machine and you can connect to it using the `docker info` command
3. Get Mongo running as a service on your machine by typing this command into a new console window.  We'll remove any old containers called jlmongo first, don't worry if this errors 
```
docker rm --force jlmongo
docker run -d --name jlmongo -p 27017:27017 jujhars13/dev-test-generalist-mongo:latest
```
4. Once the container is up and running. Import the bike schema by running this command in
```
docker exec jlmongo mongoimport --collection bike /schema/bike.json --jsonArray
```
5. Test your mongo db works by showing all the records in the `bike` collection in the default `test` db:
```
docker exec jlmongo mongo --eval "db.getCollection('bike').find({})"
```

**Notes**
- If you shutdown your machine or do something bad to your database, simply trash your db and follow instructions 3-4
- There is no username and password for your local db
- The default database is `test`, the default collection is `bike` with the data in it
- The local Mongo instance sits on the default **TCP:27017** port you may have to tweak this if you're already running a local Mongo instance of your own
- We suggest you use a Mongo db browser tool like [Robomongo](https://robomongo.org/)


### Assumptions:
- Your api must output JSON in it's response
- You must include installation and setup instructions in your **README.md**
- You must include the usage instructions for GET, POST and DELETE as CURL based examples
- Please list any other assumptions you may have made
- Feel free to a micro-framework such as Flask (Python),Express (Node), Sinatra (Ruby), Slim (PHP), Goji (Go)

### Assessment Criteria
Your application will be assessed on the following criteria (in order of importance):

- Approach
- Code organisation, commenting and use of GitHub
- Quality of setup instructions in your **README.md**
- Quality of api documentation in your **README.md**
- Maintainability
- *bonus points* if you unit test your models and include test instructions
- *bonus points* if you can host the api code in a docker container and link it to the Mongo Docker container

We're trying to see your thought processes with this task. What's more important to us is how you approach the task, rather than the actual final output itself.

Looking forward to seeing your project :-)
