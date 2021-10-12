import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";



import Sidebar from './components/Sidebar/Sidebar.js'
import Topbar from './components/Topbar/Topbar.js'

import Login from './components/Login/Login.js'
import Homes from './components/Homes/Homes.js';
import ControlVentas from './components/Ventas/ControlVentas.js'
import ControlProducts from './components/Productos/ControlProducts.js'
import ControlUsers from './components/Usuarios/ControlUsers.js'
import AboutUs from './components/AboutUs/AboutUs';


function App() {
  
  return (
    <div className="App">

        <Router>
          
          
          <Switch>
            
            <Route path="/Home" >
              <Sidebar></Sidebar>
              <Topbar></Topbar>
              <Homes></Homes>
              
            </Route>

            <Route path="/Productos">
              <Sidebar></Sidebar>
              <Topbar></Topbar>
              <ControlProducts></ControlProducts>
              
              
            </Route>
            <Route path="/Ventas">
              <Sidebar></Sidebar>
              <Topbar></Topbar>
              <ControlVentas></ControlVentas>
              
              
            </Route>
            <Route path="/Usuarios">
              <Sidebar></Sidebar>
              <Topbar></Topbar>
              <ControlUsers></ControlUsers>

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
