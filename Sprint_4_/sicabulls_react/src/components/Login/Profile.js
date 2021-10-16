import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css"

const Profile=()=>{
    const {user,isAuthenticated,isLoging}=useAuth0();
    if(isLoging){
        //load message
        return (<div>Loading...</div>)  
    }
    return (
    isAuthenticated &&(
        <div>
            <div>
                <img src={user.picture} alt={user.name}></img>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
            <div>
                <JSONPretty data={user}/>;
                
            </div>
        </div>
        
        )
    );

}
export default Profile