# os-monitor

os-monitor is a comprehensive system monitoring solution designed to fetch and display vital system information,
including processor details, memory statistics, network insights, and much more. The project is divided into two main
components: the os-monitor-connector and the os-monitor-app.

> This project is more of a personal project and not for production use.

## os-monitor-connector

The os-monitor-connector serves as the backbone of the system, gathering essential system metrics and making them
accessible. Built using NodeJS and ExpressJS, this component exposes a RESTful API, ensuring seamless and structured
data retrieval for the front-end application or any third-party service.

### Key Features:

* **Dynamic Data Collection**: Collects real-time data from the system for various metrics.
* **RESTful API Endpoints**: Facilitates easy access to system metrics in a structured format.
* **Scalability**: Designed with scalability in mind to accommodate future metrics and data sources.

### Setup and Installation:

1. Ensure you have NodeJS installed.
2. Install dependencies using:

```bash 
$ npm install
```

Start the server using:

```bash 
$ npm run dev:connector
```

> You can configure on which port the os-monitor-connector will run by changing the port in the ".env"-file in the
> project root.

### Logging

The os-monitor-connector uses [Winston](https://github.com/winstonjs/winston) as logging engine. It writes different
logs on your system. You can change the log level by changing the _MODE_-Variable in the ".env"-file.

## os-monitor-app

os-monitor-app is a mobile-first dashboard designed to visually present system metrics fetched from the
os-monitor-connector. With its responsive design, it ensures optimal viewing and interaction experience across a wide
range of devices.

### Key Features:

* **Mobile-first Design**: Optimized for mobile devices without compromising the desktop experience.
* **Real-time Data Visualization**: Displays system metrics in real-time, ensuring you always have up-to-date
  information.
* **User-friendly Interface**: Intuitive design, making it easier to understand and analyze system performance.

### Setup and Usage:

1. Ensure you have NodeJS installed.
2. Install dependencies using:

```bash 
$ npm install
```

Start the server using:

```bash 
$ npm run dev:app
```

I am are continuously working to enhance the capabilities of os-monitor. Future updates aim to incorporate additional
system metrics, improve data visualization techniques, and refine user experience.