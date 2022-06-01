const { AppError } = require('../helpers/errors');
const logger = require('../helpers/logger');

module.exports = (err, req, res, next) => {
    logger.error(err.message);
    if (err instanceof AppError) {
        res.status(err.status).send(err.json());
    } else {
        res.status(500).send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error'
        });
    }
    next();
};