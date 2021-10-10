import Express from 'express';
import {
  createServicio,
  deleteServicio,
  editServicio,
  getAllServicios,
} from '../../controladores/serviController.js';

const rutasServicios = Express.Router();

// enviar respuestas genericas de lo que devuelve mongo - aqui parece se debe hacer la restriccion 
// de lo que el rol de usuario puede o no hacer - codificar otros tipos de callback
const genericCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.json(result);
  }
};

rutasServicios.route('/servicios').get((req, res) => {
  getAllServicios(genericCallback(res));
});

rutasServicios.route('/servicios').post((req, res) => {
  createServicio(req.body, genericCallback(res));
});

// obtener un solo servicio
rutasServicios.route('/servicios:id').get((req, res) => {
    consultarServicio(req.params.id, genericCallback(res));
  });

rutasServicios.route('/servicios/:id').patch((req, res) => {
  editServicio(req.params.id, req.body, genericCallback(res));
});

// se debe verificar si el id se debe usar tal como esta en la definicion del campo de mongo

rutasServicios.route('/servicios/:id_Servicio').delete((req, res) => {
  deleteServicio(req.params.id, genericCallback(res));
});

export default rutasServicios;