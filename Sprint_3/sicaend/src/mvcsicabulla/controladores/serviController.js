import { getDB } from '../../bdsica.js';
import { ObjectId } from 'mongodb';

// dependiendo de los parametros de busqueda del front se debe cambiar el codigo para pasarlos en la funcion find
// por ejemplo find({"estado": 'activo'})
const getAllServicios = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('servicios').find().limit(50).toArray(callback);
};

// se debe verificar si incluir campos adicionales
const createServicio = async (datosServicio, callback) => {
  const baseDeDatos = getDB();
  console.log('llaves: ', Object.keys(datosServicio));
  if (
    Object.keys(datosServicio).includes('descripcion') &&
    Object.keys(datosServicio).includes('estado') &&
    Object.keys(datosServicio).includes('valor_unitario')
  ) {
    await baseDeDatos.collection('servicios').insertOne(datosServicio, callback);
  } else {
    return { err: 'conditions not met', result: '' };
  }
};

const consultarServicio = async (callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('servicios').findone({_id: new ObjectId(id)}, callback);
  };

const editServicio = async (ServicioId, data, callback) => {
  const filtroServicio = { _id: new ObjectId(ServicioId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('servicios')
    .findOneAndUpdate(filtroServicio, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteServicio = async (ServicioId, callback) => {
  const filtroServicio = { _id: new ObjectId(ServicioId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('servicios').deleteOne(filtroServicio, callback);
};

// falta exportar la consulta de un solo servicio
export { getAllServicios, createServicio, editServicio, deleteServicio };