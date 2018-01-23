'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('debug')('aws: Media Resource');

const mediaSchema = new Schema({
  caption: {type: String, required: false},
  url: {type: String, unique: true, required: true},
  fileType: {type: String, required: true, unique: false},
  size: {type: Number, required: true, unique: false},
  dateUploaded: {type: Date, default: Date.now},
  mediaType: {type: String, required: true, unique: false}
});

module.exports = mongoose.model('media', mediaSchema);
