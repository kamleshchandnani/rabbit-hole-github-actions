const http = require('http');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const slashes = require('connect-slashes');
const chalk = require('chalk');
const packageJson = require('../package.json');
const config = require('../config');

const STAGE = process.env.STAGE;

const makeApp = ({ name, version }) => {
  const app = express();

  // get client ip in req.ip
  app.set('trust proxy', true);

  // set headers for security
  app.use(helmet({ dnsPrefetchControl: false }));

  // increase data limits to 50mb
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // attach cookies in req.cookies
  app.use(cookieParser());

  // check if the browser supports ES module

  // health check
  app.use('/health', (req, res) =>
    res.send({
      name,
      version,
    }),
  );

  // force trailing slashes with a 301 redirect
  app.use(slashes(true));
  app.use('*', (req, res) =>
    res.send({
      data: 'Simple express server app',
    }),
  );

  return app;
};

const app = makeApp({ name: packageJson.name, version: packageJson.version });
const httpServer = http.createServer(app);

httpServer.listen(config[STAGE].port, () => {
  console.log(chalk.green(`server is listening at http://localhost:${config[STAGE].port}`));
});
