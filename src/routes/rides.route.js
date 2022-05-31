const express = require('express');
const router = express.Router();
const ridesService = require('../services/rides.service');
const validations = require('./validations/rides.validation');
router.post('/rides', validations.createNewRide, (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;
    const values = [startLatitude, startLongitude, endLatitude, endLongitude, riderName, driverName, driverVehicle];

    ridesService.createNewRide(values).then(ride => res.send(ride));
});

router.get('/rides', (req, res) => {
    ridesService.listRides().then(rows => res.send(rows));
});

router.get('/rides/:id', (req, res) => {
    ridesService.getRideById(req.params.id).then(rows => res.send(rows));
});

module.exports = router;