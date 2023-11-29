const express = require('express');
const v1Router = require('./v1/router');

const router = express.Router();

router.use('/1.0', v1Router);


module.exports = router;
