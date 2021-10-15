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
                    <div className="card shadow-lg bg-white rounded" id="sidebar">
                        <div className="card-body">

                            <nav className="nav">
                                <div id="user_block">
                                    <img id="user_image" className="img-resp" src={user.picture} alt={user.name} />
                                    <h5 className="user_tag" id="user_name">{user.name}</h5>
                                    <h6 id="status_name">admin</h6>
                                </div>

                                <nav className="nav" id="link_sidebar">
                                    <div className="card shadow-lg bg-white rounded" id="link_sidebar_2">
                                        <NavLink activeClassName="active" className="btn btn-light" to="/Home" >Home</NavLink>
                                        <NavLink activeClassName="active" className="btn btn-light" to="/Ventas">Ventas</NavLink>
                                        <NavLink activeClassName="active" className="btn btn-light" to="/Productos">Productos</NavLink>
                                        <NavLink activeClassName="active" className="btn btn-light" to="/Usuarios">Usuarios</NavLink>
                                        <NavLink activeClassName="active" className="btn btn-light" to="/About_us">About us</NavLink>
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
