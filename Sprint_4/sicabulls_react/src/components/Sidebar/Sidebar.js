import React from 'react'
import './Sidebar.css'
import { NavLink } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

function Sidebar() {
    const { user, isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
        return (
            <div>
                
            </div>
        )
    }
    return (
        
        isAuthenticated && (
            <div>
                <div className="container">
                    <div className="card shadow-lg p-3 mb-5 bg-white rounded" id="sidebar">
                        <div className="card-body">

                            <nav className="nav">
                                <div id="user_block">
                                    <img id="user_image" className="img-resp" src={user.picture} alt={user.name} />
                                    <h5 className="user_tag" id="user_name">{user.name}</h5>
                                    <br></br>
                                </div>

                                <nav className="navbar navbar-light bg-light justify-content-between" id="link_sidebar">
                                    <div className="card shadow-lg bg-white rounded btn-group-vertical" id="link_sidebar_2">
                                        <NavLink  className="btn btn-secondary" to="/Home" >Home</NavLink>
                                        <NavLink  className="btn btn-secondary" to="/Ventas">Ventas</NavLink>
                                        <NavLink  className="btn btn-secondary" to="/Productos">Productos</NavLink>
                                        <NavLink  className="btn btn-secondary" to="/Usuarios">Usuarios</NavLink>
                                        <NavLink  className="btn btn-secondary" to="/About_us">About us</NavLink>
                                    </div>
                                </nav>

                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        )
    )
}

export default Sidebar
