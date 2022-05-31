'use strict';

const config = require('./src/config');

const logger = require('./src/helpers/logger');
const { db } = require('./src/models');
const app = require('./src/app');


const buildSchemas = require('./src/schemas');

db.serialize(() => {
    buildSchemas(db);
    app.listen(config.port, () => logger.info(`App started and listening on port ${config.port}`));
});