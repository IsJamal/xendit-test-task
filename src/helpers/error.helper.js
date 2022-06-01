class AppError extends Error {
    constructor(status, code, message) {
        super(message);
        this.status = status;
        this.error_code = code;
    }

    json() {
        return {
            error_code: this.error_code,
            message: this.message
        };
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(422, 'VALIDATION_ERROR', message);
    }
}

class ServerError extends AppError {
    constructor(message) {
        super(500, 'SERVER_ERROR', message);
    }
}

class RidesNotFoundError extends AppError {
    constructor(message) {
        super(400, 'RIDES_NOT_FOUND_ERROR', message);
    }
}

module.exports = { AppError, ValidationError, ServerError, RidesNotFoundError };