// Un modelo es la abstracción que vamos a utilizar para realizar operación en la BD, un modelo esta definido por un esquema
// Siempre que queramos realizar operaciones (insertar, eliminar, actualizar, etc) a MongoDB, debemos hacerlo a travez del modelo

'use strict';
const mongoose = require('../../config/mongoose'),
  userSchema = require('./schemas').userSchema;

const models = {

User: mongoose.model('user', userSchema)

};

module.exports = models;