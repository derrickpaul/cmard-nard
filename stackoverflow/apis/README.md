# README #
This README document provides steps necessary to get the API application up and running.

## Build ##
We use maven to build. Running 'mvn clean install' will compile, test and build the project. The fat jar will be placed under the 'target' folder.

## Run ## 
From the 'apis' folder, run the application using 'java -jar stackoverflow-apis-fat.jar'.
Optionally, you can pass a config file using '-conf <file_name>'. Refer to configuration/config.json for attribute details.
Assumptions: You have java 8 and mongodb instance running.

## API documentation ##
- Please refer to https://cmad-nard.restlet.io for the REST API documentation.
- If you have the application running locally, you can use http://localhost:8080/static/swagger-ui/index.html to try out the APIs.

## Work in progress ##
Questions : Derrick
Users : Nandan
Answers : Arun

## TODO ##
- Schema validation: Generic implementation.
- Logging: Configure JUL to write to file.
- Error handling: Test and enhance handler conditions in ExceptionHandler.js
- Authentication: Configure JWT Auth - token generation and validation.
- Configuration: Update code to pick all the configurations from file (in classpath or external folder).
- Testing:
  - Setup embedded mongodb for integration testing.
  - Setup to start Vert.x and run the application.
  - Create client jar from swagger definition.
  - Write a sample integration test case.
- Implementation:
  - Questions
  - Answers
  - Users
  - Comments
- Documentation 
  - Update swagger json to remove unwanted models.
  - Update swagger javascript to pick the host & port from the running instance. Currently, this is hard-coded to localhost:8080.
- CI / CD:
  - Define based on classroom session.
