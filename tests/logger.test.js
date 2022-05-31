const logger = require('../src/helpers/logger');

describe('LOGGER tests', () => {
    describe('LOGGING', () => {
        it('should log simple test', (done) => {
            logger.info('TEST');
            done();
        });
    });
});