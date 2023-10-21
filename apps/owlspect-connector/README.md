# OwlSpect Connector

The OwlSpect Connector is a RESTful API developed using the NestJS framework and TypeScript. This API is engineered to expose hardware information of the operating system, such as CPU utilization, memory status, and disk space among others. The API is designed for easy integration and high performance, ideal for system monitoring and diagnostic applications. It includes a comprehensive Swagger documentation which can be accessed at the /api endpoint, making it simple to understand and interact with the API's various functionalities.

## Installation

To install the dependencies of the OwlSpect you need to run this command inside the ```./apps/owlspect-connector``` directory:

```bash
$ npm install
```
> **Hint:** It could be, that you also need to run this command in the root directory of the project.
## Running the app

To run the app you can run the following command in the root-directory of the project:

```bash
# development
$ npm run dev:connector
```

This will start the connector on localhost on port 3000. You can now open http://localhost:3000/api in your Browser.