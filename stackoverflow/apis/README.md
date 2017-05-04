# README #

This README document provides steps necessary to get the API application up and running.

## Build ##

We use maven to build. Running 'mvn clean install' will compile, test and build the project. The fat jar will be placed under the target.

## API documentation ##

- Please refer to https://cmad-nard.restlet.io for the REST API documentation.
- TODO : We are planning to expose Swagger UI which can work as both documentation as well as for show casing the status of the project.

## TODO to complete base setup of project ##

- Logging: Configure JUL
- Error handling: Test and enhance handler conditions in ExceptionHandler.js
- Verticle:
  - For authentication.
- Authentication: Configure JWT Auth.
- API:
  - Write one API to test
- Testing:
  - Create client jar.
  - Create classes to start embedded mongodb for integration testing.
  - Write a sample integration test case.