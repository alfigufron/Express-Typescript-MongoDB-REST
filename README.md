# RESTful API Node with Express Typescript

You will get a production-ready node js application already installed and fully configured. Some of the features already provided are authentication using JWT, Request Validation, Unit and Integration Testing, Logger, Linter, etc.
For more details, check the feature list below.

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Validation**: request data validation using [exporess-validator](https://express-validator.github.io/)
- **Logging**: using [winston](https://github.com/winstonjs/winston)
- **Testing**: unit and integration tests using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/)
- **Error handling**: error handling middleware
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Commands

Running locally:

```bash
npm install
npm run dev
```

Running in production:

```bash
npm install
npm run build
npm start
```

Run unit and integration testing:

```bash
npm install
npm test
```

Run linting:

```bash
npm install
npm run lint
```
