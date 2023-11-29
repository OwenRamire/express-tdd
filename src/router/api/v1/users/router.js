const express = require('express');
const usersControllers = require('./controller');

const router = express.Router();

router.get('/', usersControllers.getUsers);
router.post('/', usersControllers.createUsers);

module.exports = router;
