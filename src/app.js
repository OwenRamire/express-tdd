const express = require('express');

const indexRouter = require('./router/router');

const app = express();
app.use(express.json());
app.use('/', indexRouter);

module.exports = app;
