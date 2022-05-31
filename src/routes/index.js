const express = require('express');
const router = express.Router();
const rides = require('./rides.route');
const health = require('./health.route');

router.use(rides);
router.use(health);

module.exports = router;