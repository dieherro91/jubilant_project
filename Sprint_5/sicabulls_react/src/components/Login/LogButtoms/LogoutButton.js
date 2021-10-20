import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {NavLink} from "react-router-dom"


export const LogoutButton=()=>{
    const {logout}=useAuth0();
    return <NavLink 
    activeClassName="active" 
    className="btn btn-secondary" 
    to="/" 
    id="logout_button"
    onClick={()=>{logout({returnTo: window.location.origin});
                    localStorage.setItem('token',null)}
                }
    >Logout</NavLink>
}
