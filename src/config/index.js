const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
dotenv.config({ path: '.secret.env' });

module.exports = {
    appName: process.env.APP_NAME || 'Xendit App',
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 8010,
    logFile: process.env.LOG_FILE_PATH || 'logs/app.log',
};