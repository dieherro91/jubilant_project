import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {NavLink} from "react-router-dom"


export const LoginButton=()=>{
    const {loginWithRedirect}=useAuth0();
    return <NavLink 
    activeClassName="active" 
    className="btn btn-primary" 
    
    id="login_button"

    to="/"
    
    onClick={()=>loginWithRedirect()}
     
    >Login</NavLink>
}