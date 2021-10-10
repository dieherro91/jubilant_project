// Los esquemas son la estructura de una colección, con estructura me refiero 
// a los atributos que tenga cada colección que vayas a crear (coleccion es tabla)
'use strict';
const mongoose = require('../../config/mongoose'),
      Schema = mongoose.Schema;

const schemas = {

    userSchema: new Schema({
        username: {type: String},
        password: {type: String},
    })

};

module.exports = schemas;