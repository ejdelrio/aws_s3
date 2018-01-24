'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const debug = require('debug')('aws: Image Router');
const jsonParser = require('body-parser').json();
const path = require('path');
const del = require('del');
const fs = require('fs');
const multer = require('multer');
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const s3 = new AWS.S3();
const dataDir = `${__dirname}/../data`;
const upload = multer({ dest: dataDir });

function s3Prom(params) {
  return new Promise((resolve, reject) => {
    console.log('processing')
    s3.upload(params, (err, s3data) => {
      if(err) console.log(err);
      resolve(s3data);
    });
  });
}

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
