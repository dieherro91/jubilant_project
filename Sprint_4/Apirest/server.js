//hacer la importacion de express tradicional
//const express = require('express');

//Importacion de librerias
import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors'

//Conexion de usuario con mongo
const stringConexion =
    'mongodb+srv://admin:murillo12345678@proyectosicabulla.obypw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// se importan las librerias para la autenticacion
// var jwt = require('express-jwt');
// var jwks = require('jwks-rsa');
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import jwt_decode from 'jwt-decode'
const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//variable global
let conexion;
//qweqweq

const app = Express();

app.use(Express.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

// se trae el codigo del quickstart de la pagina auth0
// https://manage.auth0.com/dashboard/us/misiontic-sicabulla/apis/61679f016bde8b004026c63a/quickstart
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://misiontic-sicabulla.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'api-autenticacion-mintic',
    issuer: 'https://misiontic-sicabulla.us.auth0.com/',
    algorithms: ['RS256']
});
///dasdasdasdasdasadasdadadsda

app.use(jwtCheck);




//Metodo para conectar a la base de datos
const main = () => {
    client.connect((err, db) => {
        if (err) {
            console.error('Error de conexion a la base de datos');
        }
        conexion = db.db('MaestroDeVentas');
        console.log('Conexion exitosa');
        return app.listen(5000, () => {
            console.log('Escuchando puerto 5000');
        });
    });
};


//middleware para usuario inactivo
app.use(async (req, res, next) => {
    console.log('hallo')
    try {
        const token = req.headers.authorization.split('Bearer ')[1];
        const user = jwt_decode(token)['http://localhost/userData']
        await conexion.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
            //console.log("respuesta es:", response)
            if (response) {
                if (response.estado === 'inactivo') {
                    console.log("errorcito")
                    res.sendStatus(401);
                } else {
                    console.log("hallooosdaskdaks")
                }

            }
        });
    } catch {
        console.log("something happend")
    }

    next()
});





//Consultas a la base de datos archivo ventas
app.get('/ventas', (req, res) => {
    console.log('Alguien hizo get en la ruta /Ventas');
    conexion
        .collection('ventas')
        .find({})
        .toArray((err, result) => {
            if (err) {
                res.status(500).send("Error consultando los vehiculos");
            }
            else {
                res.json(result);
            }
        });
});

app.post('/ventas/nuevo', (req, res) => {
    //mostrar llaves
    const datosVentas = req.body;
    console.log('Llaves:', Object.keys(datosVentas));
    try {
        if (
            Object.keys(datosVentas).includes('id_venta') &&
            Object.keys(datosVentas).includes('id_vendedor') &&
            Object.keys(datosVentas).includes('nombre_cliente') &&
            Object.keys(datosVentas).includes('fecha') &&
            Object.keys(datosVentas).includes('valor_venta') &&
            Object.keys(datosVentas).includes('iva')
        ) {
            //implementar codigo para crear vehiculo en la BD

            conexion.collection('ventas').insertOne(datosVentas, (err, result) => {
                if (err) {
                    console.error(err)
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});
app.patch('/ventas/editar', (req, res) => {
    const edicion = req.body;
    console.log(edicion);

    const filtroVenta = { _id: new ObjectId(edicion._id) };
    delete edicion._id;
    const operacion = {
        $set: edicion,
    }
    conexion
        .collection('ventas')
        .findOneAndUpdate(
            filtroVenta,
            operacion,
            { upsert: true, returnOriginal: true }, (err, result) => {
                if (err) {
                    console.error('Error actualizando la venta: ', err);
                    res.sendStatus(500);
                } else {
                    console.log('Actualizado con exito');
                    res.sendStatus(200);
                }
            }
        );
});
app.delete('/ventas/eliminar', (req, res) => {
    const filtroVenta = { _id: new ObjectId(req.body.id) };
    console.log("borrando")
    //console.log(req)
    console.log(req.body.id)
    conexion.collection('ventas').deleteOne(filtroVenta, (err, result) => {

        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});




//Consultas a la base de datos archivo servicios
app.get('/servicios', (req, res) => {
    console.log('Alguien hizo get en la ruta /Servicios');
    conexion
        .collection('servicios')
        .find({})
        .toArray((err, result) => {
            if (err) {
                res.status(500).send("Error consultando los servicios");
            }
            else {
                res.json(result);
            }
        });
});

app.post('/servicios/nuevo', (req, res) => {
    //mostrar llaves
    const datosServicios = req.body;
    console.log('Llaves:', Object.keys(datosServicios));
    try {
        if (
            Object.keys(datosServicios).includes('id_Servicio') &&
            Object.keys(datosServicios).includes('servicio') &&
            Object.keys(datosServicios).includes('fecha') &&
            Object.keys(datosServicios).includes('descripcion') &&
            Object.keys(datosServicios).includes('valor_unitario') &&
            Object.keys(datosServicios).includes('estado')

        ) {
            //implementar codigo para crear servicio en la BD
            conexion.collection('servicios').insertOne(datosServicios, (err, result) => {
                if (err) {
                    console.error(err)
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});
app.patch('/servicios/editar', (req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroServicios = { _id: new ObjectId(edicion._id) };
    delete edicion._id;
    const operacion = {
        $set: edicion,
    }
    conexion
        .collection('servicios')
        .findOneAndUpdate(
            filtroServicios,
            operacion,
            { upsert: true, returnOriginal: true }, (err, result) => {
                if (err) {
                    console.error('Error actualizando el servicio: ', err);
                    res.sendStatus(500);
                } else {
                    console.log('Actualizado con exito');
                    res.sendStatus(200);
                }
            }
        );
});
app.delete('/servicios/eliminar', (req, res) => {
    const filtroServicios = { _id: new ObjectId(req.body.id) };
    conexion.collection('servicios').deleteOne(filtroServicios, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});



app.get('/usuarios/self', async (req, callback) => {
    console.log('Alguien hizo get en la ruta /Usuarios/self');
    //6.1 obtener datos del ususario    desde el token
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData']
    //console.log("token", user)
    //buecar el correo en la base de datos/* */
    await conexion.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
        //console.log("respuesta es:", response)
        if (response) {
            // si el usuario esta en la base de datos devolver info de usuariow
            console.log("usuario ya creado:  ")
            callback.json(response)
        } else {
            // si no esta en base de datos
            user.auth0ID = user._id;
            delete user._id;
            user.rol = 'pendiente'
            user.estado = 'pendiente'
            user.nombre = user.name;
            delete user.name;
            await conexion.collection('usuarios').insertOne(user, (err, respuesta) => callback.json(err));
            ////////////////////////////////////////////////////////
        }
    });
})



//Consultas a la base de datos archivo usuarios
app.get('/usuarios', (req, res) => {
    console.log('Alguien hizo get en la ruta /Usuarios');
    conexion
        .collection('usuarios')
        .find({})
        .toArray((err, result) => {
            if (err) {
                res.status(500).send("Error consultando los usuarios");
            }
            else {
                res.json(result);
            }
        });
});

app.post('/usuarios/nuevo', (req, res) => {
    //mostrar llaves
    const datosUsuarios = req.body;
    console.log('Llaves:', Object.keys(datosUsuarios));
    try {
        if (
            Object.keys(datosUsuarios).includes('id') &&
            Object.keys(datosUsuarios).includes('nombre') &&
            Object.keys(datosUsuarios).includes('email') &&
            Object.keys(datosUsuarios).includes('nickname') &&
            Object.keys(datosUsuarios).includes('rol') &&
            Object.keys(datosUsuarios).includes('estado')

        ) {
            //implementar codigo para crear usuario en la BD
            conexion.collection('usuarios').insertOne(datosUsuarios, (err, result) => {
                if (err) {
                    console.error(err)
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.sendStatus(200);
                }
            });
        } else {
            res.sendStatus(500);
        }
    } catch {
        res.sendStatus(500);
    }
});
app.patch('/usuarios/editar', (req, res) => {
    const edicion = req.body;
    console.log(edicion);
    const filtroUsuarios = { _id: new ObjectId(edicion._id) };
    delete edicion._id;
    const operacion = {
        $set: edicion,
    }
    conexion
        .collection('usuarios')
        .findOneAndUpdate(
            filtroUsuarios,
            operacion,
            { upsert: true, returnOriginal: true }, (err, result) => {
                if (err) {
                    console.error('Error actualizando el usuario: ', err);
                    res.sendStatus(500);
                } else {
                    console.log('Actualizado con exito');
                    res.sendStatus(200);
                }
            }
        );
});
app.delete('/usuarios/eliminar', (req, res) => {
    const filtroServicios = { _id: new ObjectId(req.body.id) };
    conexion.collection('usuarios').deleteOne(filtroServicios, (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});
main();