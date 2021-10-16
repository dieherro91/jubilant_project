import React from 'react'
import './AboutUs.css'
import { useAuth0 } from "@auth0/auth0-react";

function AboutUs() {
    const {isAuthenticated}=useAuth0();
    if(!isAuthenticated){
        return (
            <div>
                <h3>Sin credenciales</h3>
            </div>
    )
    }
    return (
        isAuthenticated &&(
        <div>
            <div className="container" id="about_us">
                <h1>Integrantes equipo sicabulla: </h1>
                <br></br>
                <br></br>
                <h3>1. IVONNE ROCIO CALPA JEREZ</h3>
                <h3>2. DIEGO HERNANDO ROMERO</h3>
                <h3>3. JESUS REDONDO</h3>
                <h3>4. FRANCISCO AVENDANO</h3>
                <h3>5. JHON MURILLO</h3>
            </div>
        </div>
        )
    )
}

export default AboutUs

