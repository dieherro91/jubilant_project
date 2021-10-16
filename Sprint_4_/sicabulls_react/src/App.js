import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";



import Sidebar from './components/Sidebar/Sidebar.js'
import Topbar from './components/Topbar/Topbar.js'

import Login from './components/Login/Login.js'
import Homes from './components/Homes/Homes.js';
import ControlVentas from './components/Ventas/ControlVentas.js'
import ControlProductos from './components/Productos/ControlProductos.js'
import ControlUsers from './components/Usuarios/ControlUsers.js'
import AboutUs from './components/AboutUs/AboutUs.js';



function App() {
  
  return (
    <div className="App">

        <Router>
          
          
          <Switch>
            
            <Route path="/Home" >
            
              
              <Homes></Homes>
              <Sidebar></Sidebar>
              <Topbar></Topbar>
              
            </Route>

            <Route path="/Productos">
              
              <ControlProductos></ControlProductos>
              <Sidebar></Sidebar>
              <Topbar></Topbar>
              
            </Route>
            <Route path="/Ventas">
              
              <ControlVentas></ControlVentas>
              <Sidebar></Sidebar>
              <Topbar></Topbar>
              
            </Route>
            <Route path="/Usuarios">
              
              <ControlUsers></ControlUsers>
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
        


    </div>
  );
}

export default App;
