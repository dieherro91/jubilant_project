'use strict';
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sicabulla');

module.exports = mongoose;