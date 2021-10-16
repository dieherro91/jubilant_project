import React from 'react'
import logo from '../assets/sica_blue.png'
import './Homes.css'
import PrivateRoute from '../Login/PrivateRoute.js'




function Homes() {
    
    return (
        <PrivateRoute>
            <div>
                <div className="homes-container">
                    <img id="logo_sica" className="img-resp" src={logo} alt="logo"/>
                    <h3>Soluciones para la industria</h3>
                    <p>La aplicación permite obtener la mejor experiencia de usuario referente
                        al seguiento de las ventas realizadas por nuestros clientes
                    </p>
                </div>
            </div>
        </PrivateRoute>
            )
        
}

export default Homes
