'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('debug')('aws: Image Resource');

const imageSchema = new Schema({

});

module.export = mongoose.model('image', imageSchema);
