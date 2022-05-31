const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, json } = format;

const logFileOptions = {
    level: 'info',
    filename: `logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
};

const logger = createLogger({
    format: combine(
        label({ label: 'module_name' }),
        timestamp(),
        json()
    ),
    transports: [
        new transports.File(logFileOptions)
    ],
    exitOnError: false
});

module.exports = logger;

