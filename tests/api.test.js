'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../src/app')(db);
const buildSchemas = require('../src/schemas');
const logger = require('../src/logger');

const ridePayload = {
    "start_lat": 40.39080707999529,
    "start_long": 49.820242671837995,
    "end_lat": 40.39393261968511,
    "end_long": 49.831156580485874,
    "rider_name": "Jamal Ismayilzade",
    "driver_name": "John Doe",
    "driver_vehicle": "Tayota Prius"
};

const ridePayload2 = {
    "start_lat": 40.39080707999529,
    "start_long": 49.820242671837995,
    "end_lat": 40.39393261968511,
    "end_long": 49.831156580485874,
    "driver_name": "John Doe",
    "driver_vehicle": "Tayota Prius"
};

const ridePayload3 = {
    "start_lat": 40.39080707999529,
    "start_long": 49.820242671837995,
    "end_lat": 40.39393261968511,
    "end_long": 49.831156580485874,
    "rider_name": "Jamal Ismayilzade",
    "driver_vehicle": "Tayota Prius"
};

const ridePayload4 = {
    "start_lat": 90.3908070799952,
    "start_long": -90.82024267183799,
    "end_lat": 40.39393261968511,
    "end_long": 49.831156580485874,
    "rider_name": "Jamal Ismayilzade",
    "driver_vehicle": "Tayota Prius"
};

const ridePayload5 = {
    "start_lat": 40.39080707999529,
    "start_long": 49.820242671837995,
    "end_lat": 90.3939326196851,
    "end_long": -90.83115658048587,
    "rider_name": "Jamal Ismayilzade",
    "driver_vehicle": "Tayota Prius"
};

describe('API tests', () => {
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

    describe('POST /rides', () => {
        it('should new ride', (done) => {
            request(app)
                .post('/rides')
                .send(ridePayload)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error message', (done) => {
            request(app)
                .post('/rides')
                .send(ridePayload2)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

   

    describe('POST /rides', () => {
        it('should return error message', (done) => {
            request(app)
                .post('/rides')
                .send(ridePayload3)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error message', (done) => {
            request(app)
                .post('/rides')
                .send(ridePayload4)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        it('should return error message', (done) => {
            request(app)
                .post('/rides')
                .send(ridePayload5)
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('LOGGING',()=>{
        it('should log simple test', (done)=>{
            logger.info('TEST');
            done();
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
});