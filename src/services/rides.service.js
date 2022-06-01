const { db } = require('../models');
const { ServerError, RidesNotFoundError } = require('../helpers/error.helper');
function createNewRide(values) {
    const insertQuery = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const selectQuery = 'SELECT * FROM Rides WHERE rideID = ?';
    return new Promise((resolve, reject) => {
        db.run(insertQuery, values, function (err) {
            if (err) return reject(new ServerError('Unknown error'));
            db.all(selectQuery, this.lastID, function (err, rows) {
                if (err) return reject(new ServerError('Unknown error'));
                resolve(rows);
            });
        });
    });
}

function listRides() {
    const selectQuery = 'SELECT * FROM Rides';
    return new Promise((resolve, reject) => {
        db.all(selectQuery, function (err, rows) {
            if (err) return reject(new ServerError('Unknown error'));
            if (rows.length === 0) return reject(new RidesNotFoundError('Could not find any rides'));
            resolve(rows);
        });
    });
}


function getRideById(id) {
    const selectQuery = 'SELECT * FROM Rides WHERE rideID=?';
    return new Promise((resolve, reject) => {
        db.all(selectQuery, id, function (err, rows) {
            if (err) return reject(new ServerError('Unknown error'));
            if (rows.length === 0) return reject(new RidesNotFoundError('Could not find any rides'));
            resolve(rows);
        });
    });
}


module.exports = { createNewRide, listRides, getRideById };