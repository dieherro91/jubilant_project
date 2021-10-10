// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import - mediante el archivo .env se define globalmente el puerto y la url de la bd
import dotenv from 'dotenv';
import Express from 'express';
import Cors from 'cors';
// se llama la definicion realizada en el bdsica.js
import { connectServer } from './mvcsicabulla/bdsica.js';
import rutasServicios from './vistas/servicios/rutas.js';
import rutasUsuario from './vistas/ususario/rutas.js';
import rutasVenta from './vistas/ventas/rutas.js';

dotenv.config({ path: './.env' });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasServicios);
app.use(rutasUsuario);
app.use(rutasVenta);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
};

connectServer(main);
Terms
Privacy
Security
