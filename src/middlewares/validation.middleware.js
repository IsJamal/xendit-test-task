const { validationResult } = require('express-validator');
module.exports = (req, res, next) => {
    let errors = validationResult(req).errors.map(error => {
        return {
            error_code: 'VALIDATION_ERROR',
            message: error.msg,
            param: error.param
        };
    });
    if (errors.length) return res.status(422).send(errors);
    next();
};