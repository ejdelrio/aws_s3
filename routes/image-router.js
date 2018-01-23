'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const debug = require('debug')('aws: Image Router');
const jsonParser = require('body-parser').json();

const Image = require('../models/image.js');

const imageRouter = module.exports = new Router();

imageRouter.get('/api/image/', function(req, res, next) {
  debug('GET /api/image');

  Image.find({})
  .then(imageArr => {
    res.json(imageArr);
  })
  .catch(err => next(createError(400, err)));
});
