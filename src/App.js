import logo from './logo.svg';
import './App.css';
import MyMap from './components/MyMap';
import Camara from './components/Camara';
import HomeMap from './components/HomeMap';
import Header from './components/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarInfoGeral from './components/NavbarInfoGeral';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation, useParams
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";



function App() {
  let showHeader2 = false;
  let [rootname, setRootname]=useState(useLocation().pathname);
  const headerElement = <Header pageName={rootname} />;
  const location = useLocation().pathname;
  if (!(location.includes("login") || location.includes("register"))) {
    //console.log("nao é login nem registo");
    showHeader2 = true;
  }


  return (
    <div id="appContainer2">
      {showHeader2 && headerElement}
      <Switch>
        {/* FIGUEIRA */}
        <Route path="/figueiraFoz" >
          <MyMap city="Figueira" /> 
        </Route>
        <Route path="/camaraFigueira" >
          <Camara city="Figueira" /> 
        </Route>
        <Route path="/InfoGeralFigueira_Waves" >
          <NavbarInfoGeral city="Figueira" currentTab="waves"/>
        </Route>
        <Route path="/InfoGeralFigueira_Tides" >
          <NavbarInfoGeral city="Figueira" currentTab="tides"/>
        </Route>
        <Route path="/InfoGeralFigueira_Wind" >
          <NavbarInfoGeral city="Figueira" currentTab="wind"/>
        </Route>
        <Route path="/InfoGeralFigueira_Weather" >
          <NavbarInfoGeral city="Figueira" currentTab="weather"/>
        </Route>  
        {/* ERICEIRA */}
        <Route path="/camaraEriceira" >
          <Camara city="Ericeira" /> 
        </Route>
        <Route path="/InfoGeralEriceira_Waves" >
          <NavbarInfoGeral city="Ericeira" currentTab="waves"/>
        </Route>

        {/* Home, login, registo */}
        <Route path="/">
          <MyMap />
        </Route>    
      </Switch>
    </div>
  );
}
export default App;
