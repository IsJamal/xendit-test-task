const express = require('express');
const router = express.Router();
const ridesService = require('../services/rides.service');
const validations = require('./validations/rides.validation');
const asyncHandler = require('express-async-handler');
router.post('/rides', validations.createNewRide, asyncHandler(async (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;
    const values = [startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle];

    const rows = await ridesService.createNewRide(values);
    res.send(rows);
}));

router.get('/rides', asyncHandler(async (req, res) => {
    const rows = await ridesService.listRides();
    res.send(rows);

}));

router.get('/rides/:id', validations.getRideById, asyncHandler(async (req, res) => {
    const rows = await ridesService.getRideById(req.params.id);
    res.send(rows);

}));

module.exports = router;