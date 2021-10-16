import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import './ControlProductos.css'
import TableProductoSearch from './TableProductoSearch/TableProductoSearch.js'
import TableProductoEdit from './TableProductoEdit/TableProductoEdit.js'
import { Tooltip } from '@material-ui/core';


function ControlProductos() {
    const { isAuthenticated } = useAuth0();
    const [active, setActive] = useState("buscar_Producto");
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
                <div className="container" id="titulo_funcion_Productos">
                    <div className="row">
                        <div className="col-md-4">
                            <h2 id="titulo_app_Productos">Registro de servicios</h2>
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <nav id="nav_buttons_Productos">
                                <Tooltip title="App de busqueda" arrow>
                                    <button onClick={() => setActive("buscar_Producto")} type="button" className="btn btn-primary">buscar</button>
                                </Tooltip>
                                <Tooltip title="App de edición" arrow>
                                    <button onClick={() => setActive("actualizar_Producto")} type="button" className="btn btn-primary">actualizar</button>
                                </Tooltip>
                                
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        {active === "buscar_Producto" && <h4>Buscar: </h4>}
                        {active === "actualizar_Producto" && <h4>Actualizar: </h4>}
                    </div>
                </div>

                <div className="container">
                    <div className="card" id="table_display_Productos">
                        <div className="card-body">
                            <div>
                                {active === "buscar_Producto" && <TableProductoSearch></TableProductoSearch>}
                                {active === "actualizar_Producto" && <TableProductoEdit></TableProductoEdit>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    )

}

export default ControlProductos;