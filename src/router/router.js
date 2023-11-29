const express = require('express');
const apiRouter = require('./api/router');

const router = express.Router();

router.use('/api', apiRouter);

module.exports = router;
