import React from 'react'
import './Topbar.css'
import logo from '../assets/sica_blue.png'
import { LogoutButton } from '../Login/LogButtoms/LogoutButton.js'
import { useAuth0 } from "@auth0/auth0-react";
import { Tooltip } from '@material-ui/core';

function Topbar() {
    const { user, isAuthenticated } = useAuth0();
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
                <div className="container">
                    <div className="card shadow-lg bg-white rounded" id="navbar">
                        <div className="card-body" id="card_body_topbar">

                            <div className="row">
                                <div className="col align-self-center">
                                    <h1 id="titulo">App registros</h1>
                                </div>
                                <div className="col align-self-center">
                                    <img id="logo_image" className="img-resp" src={logo} alt="logo" />
                                </div>
                                <div className="col align-self-center">
                                    <div id="logout_box">
                                        <h5 className="user_tag" id="user_name">{user.name}</h5>
                                        <Tooltip title="Desconectar tu cuenta">
                                            <LogoutButton></LogoutButton>
                                        </Tooltip>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Topbar
