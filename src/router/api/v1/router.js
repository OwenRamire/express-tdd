const express = require('express');
const usersRoutes = require('./users/router');

const router = express.Router();

router.use('/users', usersRoutes);


module.exports = router;
