

import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently , loginWithRedirect} = useAuth0();
    
    useEffect(()=>{
        const fetchAuth0Token= async ()=>{
            /*  este pedazo es para pedir de nuevo
            if(localStorage.getItem("token")){
                //validar fecha
            }else{
                // dar token osea funcion de abajo
            }
            */
            const accessToken= await getAccessTokenSilently({
                audience:'api-autenticacion-mintic'
            });
            localStorage.setItem('token',accessToken)
        };
        if (isAuthenticated){
            
            fetchAuth0Token();
        }
    },[isAuthenticated,getAccessTokenSilently]);


 
    if (isLoading) {
        return (<div>
                    Cargando.... Espere un momento....
                </div>)
    }

    if (!isAuthenticated){
        return loginWithRedirect();
    }


    return isAuthenticated ? (
        <>{children}</>

    )
        : (
            <div>
                <div>Sin credenciales No esta autorizado a pasar</div>
                <Link to='/'>
                    <span> Llevame al inicio</span>
                </Link>
            </div>
        );
};

export default PrivateRoute;