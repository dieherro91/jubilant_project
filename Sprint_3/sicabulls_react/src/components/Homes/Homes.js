import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../assets/sica_blue.png'
import './Homes.css'

function Homes() {
    const {isAuthenticated,isLoging}=useAuth0();
    if(isLoging){
        //load message
        return (<div>Loading...</div>) 
    }

    return (
        isAuthenticated &&(
            <div>
                <div className="homes-container">
                    <img id="logo_sica" className="img-resp" src={logo} alt="logo"/>
                    <h3>Soluciones para la industria</h3>
                    <p>La aplicación permite obtener la mejor experiencia de usuario referente
                        al seguiento de las ventas realizadas por nuestros clientes
                    </p>
                </div>
            </div>
            
            )
        )
}

export default Homes
