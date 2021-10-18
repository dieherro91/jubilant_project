

import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from "react-router-dom";
import {obtenertUsuario} from '../utils/api.js'
import {useUser} from '../context/UserContext.js';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently , loginWithRedirect,logout} = useAuth0();
    const {setUserData}=useUser();
    useEffect(()=>{
        const fetchAuth0Token= async ()=>{
            /*  este pedazo es para pedir de nuevo
            if(localStorage.getItem("token")){
                //validar fecha
            }else{
                // dar token osea funcion de abajo
            }
            */

            //1 pedir el token a auth0 
            const accessToken= await getAccessTokenSilently({
                audience:'api-autenticacion-mintic'
            });
            //2. recibir el token
            localStorage.setItem('token',accessToken) //mejor usar cookies por que es mas seguro o usar un contexto context
            //console.log(accessToken)
            //3. enviar el token al backend
            await obtenertUsuario(
                (response)=>{
                    setUserData(response.data)
                    
                },
                (err)=>{
                    console.log("error is: ",err)
                    logout({returnTo: window.location.origin});
                    localStorage.setItem('token',null);
                });
            
        };
        if (isAuthenticated){
            
            fetchAuth0Token();
        }
    },[isAuthenticated,getAccessTokenSilently,setUserData,logout]);   


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

