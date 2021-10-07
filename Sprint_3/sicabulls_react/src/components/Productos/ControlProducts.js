import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import './ControlProducts.css'
import TableUserSearch from './TableProductSearch/TableProductSearch.js'
import TableUserEdit from './TableProductEdit/TableProductEdit.js'



function ControlProducts() {
    const { isAuthenticated } = useAuth0();
    const [active, setActive] = useState("buscar_user");
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
                <div className="container" id="titulo_funcion_Products">
                    <div className="row">
                        <div className="col-md-4">
                            <h2 id="titulo_app_Products">Registro de Productos</h2>
                        </div>
                        <div className="col-md-4 offset-md-4">
                            <nav id="nav_buttons_Products">
                                <button onClick={() => setActive("buscar_user")} type="button" className="btn btn-primary">buscar</button>
                                <button onClick={() => setActive("actualizar_user")} type="button" className="btn btn-primary">actualizar</button>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        {active === "buscar_user" && <h4>Buscar: </h4>}
                        {active === "actualizar_user" && <h4>Actualizar: </h4>}
                    </div>
                </div>

                <div className="container">
                    <div className="card" id="table_display_users">
                        <div className="card-body">
                            <div>
                                {active === "buscar_user" && <TableUserSearch></TableUserSearch>}
                                {active === "actualizar_user" && <TableUserEdit></TableUserEdit>}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    )

}

export default ControlProducts;