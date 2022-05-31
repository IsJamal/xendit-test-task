const { db } = require('../models');
function createNewRide(values) {
    const insertQuery = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const selectQuery = 'SELECT * FROM Rides WHERE rideID = ?';
    return new Promise((resolve, reject) => {
        db.run(insertQuery, values, function (err) {
            if (err) return reject(err);
            db.all(selectQuery, this.lastID, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    });
}

function listRides() {
    const selectQuery = 'SELECT * FROM Rides';
    return new Promise((resolve, reject) => {
        db.all(selectQuery, function (err, rows) {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}


function getRideById(id) {
    const selectQuery = `SELECT * FROM Rides WHERE rideID=${id}`;
    return new Promise((resolve, reject) => {
        db.all(selectQuery, function (err, rows) {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}


module.exports = { createNewRide, listRides, getRideById };