import React, { useState } from 'react'

import './ControlProductos.css'
import TableProductoSearch from './TableProductoSearch/TableProductoSearch.js'
import TableProductoEdit from './TableProductoEdit/TableProductoEdit.js'
import { Tooltip } from '@material-ui/core';
import PrivateRoute from '../Login/PrivateRoute.js'
import PrivateComponent from '../Login/PrivateComponent.js'

function ControlProductos() {

    const [active, setActive] = useState("buscar_Producto");

    return (
        <PrivateRoute>
            <div>
                <div className="container" >
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded" id="titulo_funcion_Productos">
                        <div className="card-body">
                            <div className="row justify-content-between">
                                <div className="col-md-4">
                                    <h2 id="titulo_app_Productos">Registro de servicios</h2>
                                </div>
                                <div className="col-md-4">
                                    <nav id="nav_buttons_Productos">
                                        <Tooltip title="App de busqueda" arrow>
                                            <button onClick={() => setActive("buscar_Producto")} type="button" className="btn btn-primary">buscar</button>
                                        </Tooltip>
                                        <Tooltip title="App de edición" arrow>
                                            <PrivateComponent roleList={['administrador']}>
                                                <button onClick={() => setActive("actualizar_Producto")} type="button" className="btn btn-primary">actualizar</button>
                                            </PrivateComponent>

                                        </Tooltip>
                                    </nav>
                                </div>
                            </div>
                            <div className="row">
                                {active === "buscar_Producto" && <h4>Buscar: </h4>}
                                {active === "actualizar_Producto" && <h4>Actualizar: </h4>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded" id="table_display_Productos">
                        <div className="card-body">
                            <div>
                                {active === "buscar_Producto" && <TableProductoSearch></TableProductoSearch>}
                                {active === "actualizar_Producto" && <TableProductoEdit></TableProductoEdit>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PrivateRoute>
    )

}

export default ControlProductos;