const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, json } = format;
const config = require('../config');

const logFileOptions = {
    level: 'info',
    filename: config.logFile,
    handleExceptions: false,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
};

const logger = createLogger({
    format: combine(
        label({ label: config.appName }),
        timestamp(),
        json()
    ),
    transports: [
        new transports.File(logFileOptions)
    ],
    exitOnError: false
});

module.exports = logger;

