'use strict';

const config = require('./src/config');

const logger = require('./src/helpers/log.helper');
const { db } = require('./src/models');
const app = require('./src/app');


const buildSchemas = require('./src/helpers/schema.helper');

db.serialize(() => {
    buildSchemas(db);
    app.listen(config.port, () => logger.info(`App started and listening on port ${config.port}`));
});