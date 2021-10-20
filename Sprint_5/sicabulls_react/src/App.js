import './App.css';
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';


import Sidebar from './components/Sidebar/Sidebar.js'
import Topbar from './components/Topbar/Topbar.js'

import Login from './components/Login/Login.js'
import Homes from './components/Homes/Homes.js';
import ControlVentas from './components/Ventas/ControlVentas.js'
import ControlProductos from './components/Productos/ControlProductos.js'
import ControlUsers from './components/Usuarios/ControlUsers.js'
import AboutUs from './components/AboutUs/AboutUs.js';
import { UserContext } from './components/context/UserContext';
import PrivateComponent from './components/Login/PrivateComponent.js'


function App() {
  const [userData, setUserData] = useState({})
  return (
    <Auth0Provider
        domain="misiontic-sicabulla.us.auth0.com"
        clientId="Bhbs7GkVqmyBPH6GYm8kLX20aEV6s6BI"
        redirectUri='http://localhost:3000/Home'
        audience='api-autenticacion-mintic'
        scope="read:current_user update:current_user_metadata">
          
      <div className="App">
        <UserContext.Provider value={{ userData, setUserData }}>
          <Router>
            <Switch>
              <Route path="/Home" >
                <Homes></Homes>
                <Sidebar></Sidebar>
                <Topbar></Topbar>
              </Route>

              <Route path="/Productos">
              <PrivateComponent roleList={['administrador','vendedor']}>
                <ControlProductos></ControlProductos>
              </PrivateComponent>
                
              
                
                <Sidebar></Sidebar>
                <Topbar></Topbar>
              </Route>

              <Route path="/Ventas">
                <PrivateComponent roleList={['administrador','vendedor']}>
                    <ControlVentas></ControlVentas>
                </PrivateComponent>
                
                <Sidebar></Sidebar>
                <Topbar></Topbar>
              </Route>

              <Route path="/Usuarios">
              <PrivateComponent roleList={['administrador','vendedor']}>
                <ControlUsers></ControlUsers>
              </PrivateComponent>
                
                <Sidebar></Sidebar>
                <Topbar></Topbar>
              </Route>

              <Route path="/About_us">
                <Sidebar></Sidebar>
                <Topbar></Topbar>
                <AboutUs></AboutUs>
              </Route>

              <Route path="" exact>
                <Login></Login>
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </div>
    </Auth0Provider>
  );
}

export default App;
