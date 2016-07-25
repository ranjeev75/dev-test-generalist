# Full Stack Dev Task

Here's a back-end oriented assessment that we'd like you to complete in approx one week.

## The task
We estimate that this task will take about **6-10 hours** of contiguous development.  Feel free to develop in a non-contiguous manner.  
If you start to go way over time then just submit what you have and create a list in your project's **README.md** of anything else that would have liked to add/do given the time.


### Assignment Details
To complete this task, you must:

- read the user story below and create an API framework and code to fulfil the requirements of the story
- Fork this Github repository for the task where you will **continuously** commit your code
- Create a project **README.md** where you'll put your project description, project setup, notes, assumptions etc...
- When finished send over the GitHub repo and any other links
- You will need to install docker on your machine to get your database working, it is suggested that you use the latest beta version of docker with it's native hosting features for OSX and Windows users.
- Provide CURL based examples on how to interact with your API (GET, POST and DELETE)
- The database layer is provided to you via Mongo in a Docker container, the instructions below will start the Mongo 3.3 database on your machine and populate it with sample bike data for your api
- Use any modern language you see fit to get the job done, obviously it will have to work with Mongo 3.3

#### The User story
As a front-end dev user, or as a command line dev user
Assuming that all authentication and security has been handled by another layer in the application
I would like API endpoints that models bikes (see Sample Bike Schema)
- I would like to be able to see all bikes (GET the entire collection)
- I would like to see an individual bike (GET an item)
- I would like to delete an individual bike (DELETE from collection)
- I would like to add a new bike (POST to collection)
- I would like the interface to the API to be restful
- I would like to interact with the API using CURL or postman

#### Sample Bike schema
To give you an idea of what's in the mongo collection.  This is a sample schema for bikes, you can add/modify fields as you see fit.

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

1. Ensure you have the latest version of Docker installed on your machine (Docker for Windows, and Docker for Mac that no longer use docker-machine).  [https://docs.docker.com/engine/installation/](https://docs.docker.com/engine/installation/)

2. Ensure the docker service is running on your machine and you can connect to it using the `docker info` command

3. Get Mongo running on your machine by typing this command into a new console window (leave the window running, closing the window will close the db)
```
docker run -it --name jlmongo -p 27017:27017 jujhars13/dev-test-generalist-mongo
```

4. Import the test bike schema by running this command in
```
docker exec jlmongo mongoimport --db local --collection bike /schema/bike.json --jsonArray
```

If you shutdown your machine simply follow instructions 3 -4

**NB** If you get an error from docker saying that the container name is already in use simply run this command to blat it and start again with a fresh instance `docker rm --force jlmongo`


### Assumptions:
- Your api must output JSON in it's response
- You must include installation and setup instructions in your **README.md**
- You must include the usage instructions for GET, POST and DELETE as CURL based examples
- Please list any other assumptions you may have made
- Feel free to a micro-framework such as Flask/Express/Sinatra/Slim/Goji

### Assessment Criteria
Your application will be assessed on the following criteria (in order of importance):

- Approach
- Code organisation, commenting and use of GitHub
- Quality of setup instructions in your **README.md**
- Quality of api documentation in your **README.md**
- Maintainability
- *bonus points* if you unit test your models
- *bonus points* if you can host the api code in a docker container and link it to the mongo docker container

We're trying to see your thought processes with this task. What's more important to us is how you approach the task, rather than the actual final output itself.

Looking forward to seeing your project :-)
