'use strict';

const request = require('supertest');

const { db } = require('../src/models');

const app = require('../src/app');
const buildSchemas = require('../src/schemas');

const ridePayload = {
    "start_lat": 40.39080707999529,
    "start_long": 49.820242671837995,
    "end_lat": 40.39393261968511,
    "end_long": 49.831156580485874,
    "rider_name": "Jamal Ismayilzade",
    "driver_name": "John Doe",
    "driver_vehicle": "Tayota Prius"
};


const ridePayloadForValidation = {
    "start_lat": 90.39080707999529,
    "start_long": 49.820242671837995,
    "end_lat": 40.39393261968511,
    "end_long": 49.831156580485874,
    "rider_name": "",
    "driver_name": "John Doe",
    "driver_vehicle": null
};

const ridePayloadForSQLi = {
    "start_lat": 40.39080707999529,
    "start_long": 49.820242671837995,
    "end_lat": 40.39393261968511,
    "end_long": 49.831156580485874,
    "rider_name": "1' or '1'='1",
    "driver_name": "1' or '1'='1",
    "driver_vehicle": "1' or '1'='1"
};


describe('API tests', async () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);
            done();
        });
    });

    describe('GET /health', () => {
        it('should return health', (done) => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('GET /rides', () => {
        it('should return rides not found error', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });

    describe('POST /rides', () => {
        it('should create new ride', (done) => {
            request(app)
                .post('/rides')
                .send(ridePayload)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return validation error', (done) => {
            request(app)
                .post('/rides')
                .send(ridePayloadForSQLi)
                .expect('Content-Type', /json/)
                .expect(422, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error message', (done) => {
            request(app)
                .post('/rides')
                .send(ridePayloadForValidation)
                .expect('Content-Type', /json/)
                .expect(422, done);
        });
    });



    describe('GET /rides', () => {
        it('should return rides', (done) => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return ride by id', (done) => {
            request(app)
                .get('/rides/1')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });
    describe('GET /rides/:id', () => {
        it('should return error', (done) => {
            request(app)
                .get('/rides/10')
                .expect('Content-Type', /json/)
                .expect(400, done);
        });
    });

    describe('GET /rides/:id', () => {
        it('should return validation error', (done) => {
            request(app)
                .get("/rides/1' or '1'='1")
                .expect('Content-Type', /json/)
                .expect(422, done);
        });
    });

});