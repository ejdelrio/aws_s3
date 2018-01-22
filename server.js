'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const debug = require('debug')('aws:server');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, () => {
	debug('Server Active on Port: ', PORT);
});

