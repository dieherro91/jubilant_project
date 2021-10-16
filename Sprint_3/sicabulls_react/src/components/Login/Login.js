import React from 'react'
import './Login.css'
import logo from '../assets/sica_blue.png'
import {LoginButton} from './LogButtoms/LoginButton.js'
import {LogoutButton} from './LogButtoms/LogoutButton.js'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'

function Login() {
    const {isAuthenticated}=useAuth0();

    if(!isAuthenticated){
        return (
            <div>
                <div className="login-container">
                        <img id="logo_image_icon" className="img-resp" src={logo} alt="logo"/>
                        <h3>Soluciones para la industria</h3>
                        <LoginButton></LoginButton>
                        <LogoutButton></LogoutButton>
                </div>
            </div>
        )

    }
    return (
        isAuthenticated &&(
            <div>
                <div className="login-container">
                        <img id="logo_image_icon" className="img-resp" src={logo} alt="logo"/>
                        
                        <h3>Soluciones para la industria</h3>
                        <Link
                        className="btn btn-success" 
                        id="login_button"
                        to="/Home">Entrar</Link>
                </div>
            </div>
        ))
    
}
export default Login