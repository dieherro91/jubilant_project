import React from 'react'
import './AboutUs.css'
import PrivateRoute from '../Login/PrivateRoute.js'

function AboutUs() {

    return (
        <PrivateRoute>
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
        </PrivateRoute>
    )
}

export default AboutUs

