import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import './ControlUsers.css'
import TableUserSearch from './TableUserSearch/TableUserSearch.js'
import TableUserEdit from './TableUserEdit/TableUserEdit.js'
import { Tooltip } from '@material-ui/core';


function ControlUsers() {
    const { isAuthenticated } = useAuth0();
    const [active, setActive] = useState("buscar_Usuario");
    if (!isAuthenticated) {
        return (
            <div>
                <h3>Sin credenciales</h3>
            </div>
        )
    }
    return (
        isAuthenticated && (
            <div>
                <div className="container" id="titulo_funcion_Usuarios">
                    <div className="row">
                        <div className="col-md-4">
                            <h2 id="titulo_app_Usuarios">Registro de Usuarios</h2>
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <nav id="nav_buttons_Usuarios">
                                <Tooltip title="App de busqueda" arrow>
                                    <button onClick={() => setActive("buscar_Usuario")} type="button" className="btn btn-primary">buscar</button>
                                </Tooltip>
                                <Tooltip title="App de edición" arrow>
                                    <button onClick={() => setActive("actualizar_Usuario")} type="button" className="btn btn-primary">actualizar</button>
                                </Tooltip>
                                
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        {active === "buscar_Usuario" && <h4>Buscar: </h4>}
                        {active === "actualizar_Usuario" && <h4>Actualizar: </h4>}
                    </div>
                </div>

                <div className="container">
                    <div className="card" id="table_display_Usuarios">
                        <div className="card-body">
                            <div>
                                {active === "buscar_Usuario" && <TableUserSearch></TableUserSearch>}
                                {active === "actualizar_Usuario" && <TableUserEdit></TableUserEdit>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    )

}

export default ControlUsers;