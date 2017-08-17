### Example App with a Spring backend and a React frontend using redux and react-router v4

__Install [Yarn](https://yarnpkg.com/en/)(a better npm) if not already there:__

1. Run `npm install -g yarn` to install Yarn globally

__Setup project:__

1. Clone the repo using `git clone`
2. `cd` into the new project

__Run front-end for development__

1. `cd frontend`
2. Run `yarn run start` to startup the front-end with a mock back-end using json-server
3. Navigate to localhost:3000

__Build and run full stack__

1. Run `./gradlew` or just `gradle` if installed to build, run all tests, and start the app
2. Navigate to localhost:8080

__Helpful Links__
- [Link](https://reacttraining.com/react-router/web/example/basic) to react-router example used

__Files that need to be changed for each new application:__

- build.grade
- codeQuality.gradle *****change code quality values back to 95 from 50*****
- jenkinsfile.groovy
- application-dev.properties
- application-uat.properties
- exampleServiceApplication.java
- util/JsonConverterUtil.java
- repository/ExampleRepository.java
- domain/Example.java
- controller/ExampleController.java
- constant/RESTConstants.java
- test/util/JsonConverterUtilTest.java
- test/controller/ExampleControllerTest
- test/resources/application-dev.properties
