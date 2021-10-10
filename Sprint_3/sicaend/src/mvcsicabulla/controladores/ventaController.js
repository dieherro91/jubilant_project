import { getDB } from '../../mvcsicabulla/bdsica.js';
import { ObjectId } from 'mongodb';

const getAllSales = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').find().limit(50).toArray(callback);
};

const createSale = async (datosVenta, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').insertOne(datosVenta, callback);
};

const editSale = async (saleId, data, callback) => {
  const filtroVenta = { _id: new ObjectId(saleId) };
  const operacion = {
    $set: data,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('ventas')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const deleteSale = async (saleId, callback) => {
  const filtroVenta = { _id: new ObjectId(saleId) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('ventas').deleteOne(filtroVenta, callback);
};

export { getAllSales, createSale, editSale, deleteSale };