import React from 'react'
import './Header.css'
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';

function Header() {
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
            <>
                <div>
                    <JSONPretty id="json-pretty" data={user}></JSONPretty>
                </div>

            </>

        )
    )
}

export default Header
