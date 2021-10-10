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

//Consultas a la base de datos
app.get('/ventas',(req,res)=>{
    console.log('Alguien hizo get en la ruta /Ventas');
    conexion
    .collection('venta')
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
        Object.keys(datosVentas).includes('nombre')&&
        Object.keys(datosVentas).includes('factura')&&
        Object.keys(datosVentas).includes('categoria')
        ){
        //implementar codigo para crear vehiculo en la BD
        conexion.collection('venta').insertOne(datosVentas,(err,result)=>{
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
    const operacion = {
        $set:edicion,
    }
    conexion
    .collection('venta')
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
    conexion.collection('venta').deleteOne(filtroVenta,(err,result)=>{
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

main();