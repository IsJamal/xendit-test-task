const ridesService = require('../src/services/rides.service');
const { expect } = require('chai');
describe('SERVICE tests', () => {

    describe('create new ride', () => {
        it('should throw an error', (done) => {
            ridesService.createNewRide([1]).catch(err=>{
                expect(err).instanceOf(Error);
                done();
            });
        });
    });

    describe('get ride by id', () => {
        it('should throw an error', (done) => {
            ridesService.getRideById('').catch(err=>{
                expect(err).instanceOf(Error);
                done();
            });
        });
    });
});