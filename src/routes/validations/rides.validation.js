const { body } = require('express-validator');
const checker = require('../../middlewares/validation.middleware');
const startLat = body('start_lat')
    .exists().withMessage('Start latitude must provide');

const validations = {
    createNewRide: [startLat, checker]
};
module.exports = validations;