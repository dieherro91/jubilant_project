

import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently , loginWithRedirect} = useAuth0();
    
    useEffect(()=>{
        const fetchAuth0Token= async ()=>{
            const accessToken= await getAccessTokenSilently({
                audience:'api-autenticacion-mintic'
            });
            console.log("accessToken")
            console.log(accessToken                     );

        };
        fetchAuth0Token();
    },[]);


 
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