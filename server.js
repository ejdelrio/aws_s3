'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug')('aws:server');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

const errorMiddleware = require('./lib/error.js');
const mediaRouter = require('./routes/media-router.js');

mongoose.connect(process.env.MONGO_URI);

app.use(morgan('DEV'));
app.use(cors());
app.use(mediaRouter);
app.use(errorMiddleware);

app.listen(PORT, function() {
	debug(`Server active on port: ${PORT}`);
});
