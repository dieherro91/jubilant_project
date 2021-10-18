import React, { useState } from 'react'

import './ControlVentas.css'
import TableVentaSearch from './TableVentaSearch/TableVentaSearch.js'
import TableVentaEdit from './TableVentaEdit/TableVentaEdit.js'
import { Tooltip } from '@material-ui/core';
import PrivateRoute from '../Login/PrivateRoute.js'
import PrivateComponent from '../Login/PrivateComponent.js'

function ControlVentas() {

    const [active, setActive] = useState("buscar_Venta");

    return (
        <PrivateRoute>
            <div>
                <div className="container" >
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded" id="titulo_funcion_Ventas">
                        <div className="card-body">
                            <div className="row justify-content-between">
                                <div className="col">
                                    <h2 id="titulo_app_Ventas">Registro de Ventas</h2>
                                </div>
                                <div className="col">
                                    <nav className="navbar navbar-expand-lg navbar-light" id="nav_buttons_Ventas">
                                        <Tooltip title="App de busqueda" arrow>
                                            <button onClick={() => setActive("buscar_Venta")} type="button" className="btn btn-primary">buscar</button>
                                        </Tooltip>
                                        <Tooltip title="App de edición" arrow>
                                            <PrivateComponent roleList={['administrador','vendedor']}>
                                                <button onClick={() => setActive("actualizar_Venta")} type="button" className="btn btn-primary">actualizar</button>
                                            </PrivateComponent>
                                        </Tooltip>

                                    </nav>
                                </div>
                            </div>
                            <div className="row">
                                {active === "buscar_Venta" && <h4>Buscar: </h4>}
                                {active === "actualizar_Venta" && <h4>Actualizar: </h4>}
                            </div>

                        </div>
                    </div>

                </div>

                <div className="container">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded" id="table_display_Ventas">
                        <div className="card-body">
                            <div>
                                {active === "buscar_Venta" && <TableVentaSearch></TableVentaSearch>}
                                {active === "actualizar_Venta" && <TableVentaEdit></TableVentaEdit>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PrivateRoute>
    )

}

export default ControlVentas;