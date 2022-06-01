const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes');
const swagger = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const errorHandler = require('./middlewares/error.middleware');
const helmet = require("helmet");
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(routes);
app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use(errorHandler);

module.exports = app;