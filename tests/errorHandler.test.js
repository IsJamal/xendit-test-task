const { expect } = require('chai');
const errorHandlerMiddleware = require('../src/middlewares/error.middleware');
const { ValidationError } = require('../src/helpers/error.helper');
class FakeResponse {
    status(statusCode) {
        this.statusCode = statusCode;
        return this;
    }
    send(body) {
        this.body = body;
        return this;
    }
}
describe('error handler test cases', () => {
    describe('with known error', () => {
        it('should set status and json', (done) => {
            const err = new ValidationError('test message');
            const mockRequest = {};
            const mockResponse = new FakeResponse();
            const nextFn = () => { };
            errorHandlerMiddleware(err, mockRequest, mockResponse, nextFn);
            expect(mockResponse.statusCode).eq(err.status);
            expect(mockResponse.body).to.deep.equal(err.json());
            done();
        });
    });

    describe('with unknown error', () => {
        it('should set status and json', (done) => {
            const generalError = {
                error_code: 'SERVER_ERROR',
                message: 'Unknown error'
            };
            const err = new Error('test message');
            const mockRequest = {};
            const mockResponse = new FakeResponse();
            const nextFn = () => { };
            errorHandlerMiddleware(err, mockRequest, mockResponse, nextFn);
            expect(mockResponse.statusCode).eq(500);
            expect(mockResponse.body).to.deep.equal(generalError);
            done();
        });
    });

});