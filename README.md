# Backend Coding Challenge
Set up a simple web service to implement a calculator. The service offers an endpoint that reads a string input and parses it. It should return either an HTTP error code, or a solution to the calculation in JSON form. Furthermore, the service should offer the possibility to return the last 5 calculations with their results.
Supported mathematical symbols are `+, -, *, /, (, )`

An example calculus query:
```
query: 2 * (23/(3*3))- 23 * (2*3)
encoded: MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=
```

## API Description

**Endpoints:**
```
GET /calculus?query=[input]
```

The input can be expected to be UTF-8 with BASE64 encoding

**Result** 
* On success: JSON response of format: `{ "error": false, "result": number }`
* On error: Either a HTTP error code or: `{ "error": true, "message": "string" }`
<br />

```
GET /calculus/history
```

**Result**
* On success: ___Find a suitable scheme yourself___
* On error: Either a HTTP error code or: `{ "error": true, "message": "string" }`

<br />
<br />

## Setup
```
yarn
```

## Lint
```
yarn lint
```

## Test
```
yarn test
```

## Development
```
yarn dev
```

## Rules
- [x] Ideally use TypeScript
- [x] Ideally use Docker to run node.js
- [x] Add unit tests where it makes sense
- [x] Add integration tests where it makes sense
- [x] When writing your code, imagine the service is meant to be released to production (with a low-to-moderate expected load)
- [x] Come up with a deployment strategy to a Cloud provider
  - In using cloud for a low-budget production service, our obvious deployment model is Public cloud. In using Public cloud deployment, we have several service providers with different offerings and products that might be extremely easy to provision  and manage, to mention a few Google Cloud, Azure, AWS, etc. In my experience, using AWS seems very cheap initially but over time certain costs acrue and are almost unavoidable eventually; and this is why from a cost point of view, especially targeting our current usecase project, we must also have concerns for cost; now, this is where [DigitalOcean Dockerized Droplets]() comes in.

  - For our AWS alternative, a few of the products and tools we might use include: AWS CloudFormation, Amazon ECR and AWS Lambda OR AWS ECS.


## Development utilities:
* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.