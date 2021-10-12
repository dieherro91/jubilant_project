//hacer la importacion de express tradicional
//const express = require('express');

//Importacion de librerias
import Express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

//Conexion de usuario con mongo
const stringConexion = 
'mongodb+srv://admin:murillo12345678@proyectosicabulla.obypw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient (stringConexion,{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});
//variable global
let conexion;


const app = Express();

app.use(Express.json());

//Consultas a la base de datos archivo ventas
app.get('/ventas',(req,res)=>{
    console.log('Alguien hizo get en la ruta /Ventas');
    conexion
    .collection('ventas')
    .find({})
    //limite de datos implementados
    .limit(50)
    .toArray((err,result)=>{
        if (err){
            res.status(500).send("Error consultando los vehiculos");
        }
        else{
            res.json(result);
        }
    });
});

app.post('/ventas/nuevo',(req,res)=>{
    //mostrar llaves
    const datosVentas = req.body;
    console.log('Llaves:', Object.keys(datosVentas));
    try{
        if (
        Object.keys(datosVentas).includes('id_venta')&&
        Object.keys(datosVentas).includes('id_vendedor')&&
        Object.keys(datosVentas).includes('nombre_cliente')&&
        Object.keys(datosVentas).includes('fecha')&&
        Object.keys(datosVentas).includes('valor_venta')&&
        Object.keys(datosVentas).includes('iva')
        ){
        //implementar codigo para crear vehiculo en la BD
        conexion.collection('ventas').insertOne(datosVentas,(err,result)=>{
            if (err){
            console.error(err)
            res.sendStatus(500);
        }else{
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
app.patch('/ventas/editar',(req,res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroVenta = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set:edicion,
    }
    conexion
    .collection('ventas')
    .findOneAndUpdate(
        filtroVenta,
        operacion,
        { upsert: true, returnOriginal: true},(err, result)=>{
            if(err){
                console.error('Error actualizando la venta: ', err);
                res.sendStatus(500);
            }else{
                console.log('Actualizado con exito');
                res.sendStatus(200);
            }
        }
    );
});
app.delete('/ventas/eliminar',(req,res) =>{
    const filtroVenta = {_id: new ObjectId(req.body.id)};
    conexion.collection('ventas').deleteOne(filtroVenta,(err,result)=>{
        if (err){
            console.error(err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });
});
//Metodo para conectar a la base de datos
const main = ()=>{
    client.connect((err,db)=>{
        if(err){
            console.error('Error de conexion a la base de datos');
        }
        conexion = db.db('MaestroDeVentas');
        console.log('Conexion exitosa');
        return app.listen(5000,() =>{
            console.log('Escuchando puerto 5000');
        }); 
    });
};

//Consultas a la base de datos archivo servicios
app.get('/servicios',(req,res)=>{
    console.log('Alguien hizo get en la ruta /Servicios');
    conexion
    .collection('servicios')
    .find({})
    //limite de datos implementados
    .limit(50)
    .toArray((err,result)=>{
        if (err){
            res.status(500).send("Error consultando los servicios");
        }
        else{
            res.json(result);
        }
    });
});

app.post('/servicios/nuevo',(req,res)=>{
    //mostrar llaves
    const datosServicios = req.body;
    console.log('Llaves:', Object.keys(datosServicios));
    try{
        if (
        Object.keys(datosServicios).includes('id_Servicio')&&
        Object.keys(datosServicios).includes('servicio')&&
        Object.keys(datosServicios).includes('fecha')&&
        Object.keys(datosServicios).includes('descripcion')&&
        Object.keys(datosServicios).includes('valor_unitario')&&
        Object.keys(datosServicios).includes('estado')

        ){
        //implementar codigo para crear servicio en la BD
        conexion.collection('servicios').insertOne(datosServicios,(err,result)=>{
            if (err){
            console.error(err)
            res.sendStatus(500);
        }else{
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
app.patch('/servicios/editar',(req,res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroServicios = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set:edicion,
    }
    conexion
    .collection('servicios')
    .findOneAndUpdate(
        filtroServicios,
        operacion,
        { upsert: true, returnOriginal: true},(err, result)=>{
            if(err){
                console.error('Error actualizando el servicio: ', err);
                res.sendStatus(500);
            }else{
                console.log('Actualizado con exito');
                res.sendStatus(200);
            }
        }
    );
});
app.delete('/servicios/eliminar',(req,res) =>{
    const filtroServicios = {_id: new ObjectId(req.body.id)};
    conexion.collection('servicios').deleteOne(filtroServicios,(err,result)=>{
        if (err){
            console.error(err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });
});

//Consultas a la base de datos archivo usuarios
app.get('/usuarios',(req,res)=>{
    console.log('Alguien hizo get en la ruta /Usuarios');
    conexion
    .collection('usuarios')
    .find({})
    //limite de datos implementados
    .limit(50)
    .toArray((err,result)=>{
        if (err){
            res.status(500).send("Error consultando los usuarios");
        }
        else{
            res.json(result);
        }
    });
});

app.post('/usuarios/nuevo',(req,res)=>{
    //mostrar llaves
    const datosUsuarios = req.body;
    console.log('Llaves:', Object.keys(datosUsuarios));
    try{
        if (
        Object.keys(datosUsuarios).includes('id')&&
        Object.keys(datosUsuarios).includes('nombre')&&
        Object.keys(datosUsuarios).includes('email')&&
        Object.keys(datosUsuarios).includes('nickname')&&
        Object.keys(datosUsuarios).includes('rol')&&
        Object.keys(datosUsuarios).includes('estado')

        ){
        //implementar codigo para crear usuario en la BD
        conexion.collection('usuarios').insertOne(datosUsuarios,(err,result)=>{
            if (err){
            console.error(err)
            res.sendStatus(500);
        }else{
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
app.patch('/usuarios/editar',(req,res)=>{
    const edicion = req.body;
    console.log(edicion);
    const filtroUsuarios = {_id: new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion = {
        $set:edicion,
    }
    conexion
    .collection('usuarios')
    .findOneAndUpdate(
        filtroUsuarios,
        operacion,
        { upsert: true, returnOriginal: true},(err, result)=>{
            if(err){
                console.error('Error actualizando el usuario: ', err);
                res.sendStatus(500);
            }else{
                console.log('Actualizado con exito');
                res.sendStatus(200);
            }
        }
    );
});
app.delete('/usuarios/eliminar',(req,res) =>{
    const filtroUsuarios = {_id: new ObjectId(req.body.id)};
    conexion.collection('usuarios').deleteOne(filtroServicios,(err,result)=>{
        if (err){
            console.error(err);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });
});
main();