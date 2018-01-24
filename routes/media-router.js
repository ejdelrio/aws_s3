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
    console.log('processing');
    s3.upload(params, (err, s3data) => {
      if(err) reject(err);
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
  .then(next)
  .catch(err => next(createError(400, err)));
});

mediaRouter.post('/api/:mediaType/', jsonParser, upload.single('media'), function(req, res, next) {
  debug('POST /api/:mediaType/');

  if (!req.file) return next(createError(400, 'no file found'));
  if (!req.file.path) return next(createError(500, 'no file saved'));

  let ext = path.extname(req.file.originalname);

  let params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_BUCKET,
    Key: `${req.file.filename}.${ext}`,
    Body: fs.createReadStream(req.file.path)
  };

  s3Prom(params)
  .then(data => {

    del([`${dataDir}/*`]);
    let uploadBody = {
      caption: req.body.caption,
      awsKey: data.Key,
      awsURI: data.Location,
      mediaType: req.params.mediaType
    };
    return uploadBody;
  })
  .then(body => new Media(body).save())
  .then(mediaUpload => res.json(mediaUpload))
  .then(next)
  .catch(err => next(createError(400, err.message)));

});
