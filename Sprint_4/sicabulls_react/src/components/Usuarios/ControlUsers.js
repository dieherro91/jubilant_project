import React, { useState } from 'react'

import './ControlUsers.css'
import TableUserSearch from './TableUserSearch/TableUserSearch.js'
import TableUserEdit from './TableUserEdit/TableUserEdit.js'
import { Tooltip } from '@material-ui/core';
import PrivateRoute from '../Login/PrivateRoute.js'
import PrivateComponent from '../Login/PrivateComponent.js'


function ControlUsers() {

    const [active, setActive] = useState("buscar_Usuario");

    return (
        <PrivateRoute>
            <div>
                <div className="container" >
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded" id="titulo_funcion_Usuarios">
                        <div className="card-body">

                            <div className="row justify-content-between">
                                <div className="col">
                                    <h2 id="titulo_app_Usuarios">Registro de Usuarios</h2>
                                </div>
                                <div className="col">
                                    <nav id="nav_buttons_Usuarios">
                                        <Tooltip title="App de busqueda" arrow>
                                            <button onClick={() => setActive("buscar_Usuario")} type="button" className="btn btn-primary">buscar</button>
                                        </Tooltip>
                                        <Tooltip title="App de edición" arrow>
                                            <PrivateComponent roleList={['administrador']}>
                                            <button onClick={() => setActive("actualizar_Usuario")} type="button" className="btn btn-primary">actualizar</button>
                                            </PrivateComponent>
                                        </Tooltip>

                                    </nav>
                                </div>
                            </div>

                            <div className="row">
                                {active === "buscar_Usuario" && <h4>Buscar: </h4>}
                                {active === "actualizar_Usuario" && <h4>Actualizar: </h4>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded" id="table_display_Usuarios">
                        <div className="card-body">
                            <div>
                                {active === "buscar_Usuario" && <TableUserSearch></TableUserSearch>}
                                {active === "actualizar_Usuario" && <TableUserEdit></TableUserEdit>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PrivateRoute>
    )

}

export default ControlUsers;

//,'pendiente'