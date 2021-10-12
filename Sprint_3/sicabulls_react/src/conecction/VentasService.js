import http from "./http-requets.js";



const getAllVentas = () => {
    return http.get("/ventas");
};
const create = (data) => {
  return http.post("/ventas/nuevo", data);
};
const editando=(data)=>{
  return http.patch("/ventas/editar", data);
};
const remove = (id) => {
  return http.delete("/ventas/eliminar",id);
};
/*
  const get = (id) => {
    return http.get(`/tutorials/${id}`);
  };
  
  const create = (data) => {
    return http.post("/tutorials", data);
  };
  
  const update = (id, data) => {
    return http.put(`/tutorials/${id}`, data);
  };
  
  
  
  const removeAll = () => {
    return http.delete(`/tutorials`);
  };
  
  const findByTitle = (title) => {
    return http.get(`/tutorials?title=${title}`);
  };
*/
export const VentasService = {
    getAllVentas,
    create,
    editando,
    remove,
}
export default VentasService;