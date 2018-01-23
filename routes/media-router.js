'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const debug = require('debug')('aws: Image Router');
const jsonParser = require('body-parser').json();

const Media = require('../models/media.js');

const mediaRouter = module.exports = new Router();

mediaRouter.get('/api/:mediaType/', function(req, res, next) {
  debug('GET /api/:mediaType');

  let {mediaType} = req.params;

  Media.find({mediaType})
  .then(mediaArr => res.json(mediaArr))
  .catch(err => next(createError(400, err)));
});

mediaRouter.post('/api/:mediaType/', jsonParser, function(req, res, next) {
  debug('POST /api/:mediaType/');


});
