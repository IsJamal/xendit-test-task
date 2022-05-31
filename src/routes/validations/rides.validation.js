const { body, param } = require('express-validator');
const checker = require('../../middlewares/validation.middleware');
const startLat = body('start_lat')
    .exists().withMessage('Start latitude must provide')
    .isFloat({ min: -90, max: 90 }).withMessage('Start latitude must be between -90 to 90 respectively');

const startLong = body('start_long')
    .exists().withMessage('Start longitude must provide')
    .isFloat({ min: -180, max: 180 }).withMessage('Start longitude must be between -180 to 180 respectively');

const endLat = body('end_lat')
    .exists().withMessage('End latitude must provide')
    .isFloat({ min: -90, max: 90 }).withMessage('End latitude must be between -90 to 90 respectively');

const endLong = body('end_long')
    .exists().withMessage('End longitude must provide')
    .isFloat({ min: -180, max: 180 }).withMessage('End longitude must be between -180 to 180 respectively');

const riderName = body('rider_name')
    .exists().withMessage('Rider name must provide')
    .isString().withMessage('Rider name must be string')
    .isLength({ min: 1, max: 255 }).withMessage('Rider name must be a non empty string');


const driverName = body('driver_name')
    .exists().withMessage('Driver name must provide')
    .isString().withMessage('Driver name must be string')
    .isLength({ min: 1, max: 255 }).withMessage('Driver name must be a non empty string');


const driverVehicle = body('driver_vehicle')
    .exists().withMessage('Driver vehicle must provide')
    .isString().withMessage('Driver vehicle must be string')
    .isLength({ min: 1, max: 255 }).withMessage('Driver vehicle must be a non empty string');


const id = param('id')
    .exists().withMessage('id must provide')
    .isInt().withMessage('id must be a number');
const validations = {
    createNewRide: [
        startLat,
        startLong,
        endLat,
        endLong,
        riderName,
        driverName,
        driverVehicle,
        checker
    ],
    getRideById: [id, checker]
};
module.exports = validations;