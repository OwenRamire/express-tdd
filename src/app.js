const express = require('express');
const middleware = require('i18next-http-middleware');

const i18nextConfig = require('../i18next');
const indexRouter = require('./router/router');

const app = express();
app.use(middleware.handle(i18nextConfig));
app.use(express.json());
app.use('/', indexRouter);

module.exports = app;
