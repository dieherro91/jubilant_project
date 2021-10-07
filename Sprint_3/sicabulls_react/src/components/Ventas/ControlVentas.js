import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import './ControlVentas.css'
import TableVentaSearch from './TableVentaSearch/TableVentaSearch.js'
import TableVentaEdit from './TableVentaEdit/TableVentaEdit.js'



function ControlVentas() {
    const { isAuthenticated } = useAuth0();
    const [active, setActive] = useState("buscar_Venta");
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
                <div className="container" id="titulo_funcion_Ventas">
                    <div className="row">
                        <div className="col-md-4">
                            <h2 id="titulo_app_Ventas">Registro de Ventas</h2>
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <nav id="nav_buttons_Ventas">
                                <button onClick={() => setActive("buscar_Venta")} type="button" className="btn btn-primary">buscar</button>
                                <button onClick={() => setActive("actualizar_Venta")} type="button" className="btn btn-primary">actualizar</button>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        {active === "buscar_Venta" && <h4>Buscar: </h4>}
                        {active === "actualizar_Venta" && <h4>Actualizar: </h4>}
                    </div>
                </div>

                <div className="container">
                    <div className="card" id="table_display_Ventas">
                        <div className="card-body">
                            <div>
                                {active === "buscar_Venta" && <TableVentaSearch></TableVentaSearch>}
                                {active === "actualizar_Venta" && <TableVentaEdit></TableVentaEdit>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    )

}

export default ControlVentas;