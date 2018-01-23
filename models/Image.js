'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('debug')('aws: Image Resource');

const imageSchema = new Schema({
  caption: {type: String, required: false},
  url: {type: String, unique: true, required: true},
  fileType: {type: String, required: true, unique: false},
  size: {type: Number, required: true, unique: false},
  dateUploaded: {type: Date, default: Date.now}
});

module.exports = mongoose.model('image', imageSchema);
