'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('debug')('aws: Image Resource');

const imageSchema = new Schema({
  caption: {type: String, required: false}
});

module.exports = mongoose.model('image', imageSchema);
