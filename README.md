# Crypto

## Prerequisites

- Java 23
- Maven 3.6+
- Node.js 22.12.0
- NPM 10.9.0

## How to run 

Run `npm i`

Run `npm run start:all` to start BE with FE

There are issues with CORS, easiest way to try app is:
Run Chrome Browser with disabled web security from termilal MacOS `open /Applications/Google\ Chrome.app --args --disable-web-security --user-data-dir="/tmp/chrome_dev"`

Navigate to `http://localhost:4200/`

To Run BE and FE separatelly: 
- Run `npm run start:java` for BE
- Run `npm run start:angular` for FE

Notes: 

There some issues with Intervals of BE side. Checked variations: 1 is working for every entity, 5 is working for Minutes.

