# Consul Service Discovery

A microservices service discovery project built using Consul, Docker Compose, Node.js, and an API Gateway.

## Overview

This project demonstrates how service discovery works in a microservices architecture. Three independent services register themselves with Consul on startup, while an API Gateway dynamically discovers and routes requests to the appropriate service.

Instead of relying on hardcoded IP addresses, the API Gateway queries Consul to discover healthy services at runtime.

## Architecture

```text
                    +------------------+
                    |   API Gateway    |
                    +---------+--------+
                              |
                       Consul Lookup
                              |
      +-----------------------+-----------------------+
      |                       |                       |
      v                       v                       v
+-------------+       +-------------+       +-------------+
| Service A   |       | Service B   |       | Service C   |
|   /info     |       |   /info     |       |   /info     |
+------+------+       +------+------+       +------+------+
       |                     |                     |
       +---------- Register with Consul ----------+
                             |
                             v
                      +-------------+
                      |   Consul    |
                      +-------------+
```

## Features

* Dynamic service registration
* Service discovery using Consul
* Health checks for registered services
* API Gateway request routing
* Dockerized deployment
* Microservices architecture

## Technologies Used

* Node.js
* Express.js
* Docker
* Docker Compose
* Consul
* REST APIs

## Running the Project

Build and start the services:

```bash
docker compose up --build
```

Open the Consul dashboard:

```text
http://localhost:8500
```

Test the services:

```bash
curl http://localhost:8080/service-a/info
curl http://localhost:8080/service-b/info
curl http://localhost:8080/service-c/info
```

## Results

* Successfully registered Service A, Service B, and Service C with Consul
* Implemented service discovery through the Consul API
* Routed requests dynamically through an API Gateway
* Verified service health checks and container communication

## Skills Demonstrated

* Microservices Architecture
* Service Discovery
* Docker Networking
* REST API Development
* Containerization
* Infrastructure Design
* Distributed Systems Fundamentals

## Author

Tyler

Cybersecurity Student | TryHackMe Top 1%

