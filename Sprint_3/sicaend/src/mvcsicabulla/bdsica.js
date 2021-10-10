import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;

const client = new MongoClient(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const connectServer = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('sicabulla');
    console.log('baseDeDatos exitosa');
    return callback();
  });
};

const getDB = () => {
  return baseDeDatos;
};
// se exporta la funcion que hace la conexion con la base de datos
export { connectServer, getDB };