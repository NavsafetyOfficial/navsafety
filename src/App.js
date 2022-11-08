import logo from "./logo.svg";
import "./App.css";

import MyMap from "./components/MyMap";
import Camara from "./components/Camara";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarInfoGeral from "./components/NavbarInfoGeral";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import EditUserProfile from "./components/EditUserProfile.jsx";

function App() {
  let showHeader2 = false;
  let [rootname, setRootname] = useState(useLocation().pathname);
  const headerElement = <Header pageName={rootname} />;
  const location = useLocation().pathname;
  // if (!(location.includes("login") || location.includes("register"))) {
  //   //console.log("nao é login nem registo");
  //   showHeader2 = true;
  // }

  return (
    <div id="appContainer2">
      {showHeader2 && headerElement}
      <Switch>
        {/* FIGUEIRA */}
        <Route path="/figueiraFoz">
          <Header pageName="Figueira" />
          <MyMap city="Figueira" />
        </Route>
        <Route path="/camaraFigueira">
          <Header pageName="Figueira" />
          <Camara city="Figueira" />
        </Route>
        <Route path="/InfoGeralFigueira_Waves">
          <Header pageName="Figueira" />
          <NavbarInfoGeral city="Figueira" currentTab="waves" />
        </Route>
        <Route path="/InfoGeralFigueira_Tides">
          <Header pageName="Figueira" />
          <NavbarInfoGeral city="Figueira" currentTab="tides" />
        </Route>
        <Route path="/InfoGeralFigueira_Wind">
          <Header pageName="Figueira" />
          <NavbarInfoGeral city="Figueira" currentTab="wind" />
        </Route>
        <Route path="/InfoGeralFigueira_Weather">
          <Header pageName="Figueira" />
          <NavbarInfoGeral city="Figueira" currentTab="weather" />
        </Route>
        {/* ERICEIRA */}
        <Route path="/camaraEriceira">
          <Header pageName="Ericeira" />
          <Camara city="Ericeira" />
        </Route>
        <Route path="/InfoGeralEriceira_Waves">
          <Header pageName="Ericeira" />
          <NavbarInfoGeral city="Ericeira" currentTab="waves" />
        </Route>

        {/* Home, login, registo, edit profile */}
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/editProfile">
          <Header pageName="Edit profile" />
          <EditUserProfile />
        </Route>
        <Route path="/">
          <Header pageName="Home" />
          <MyMap />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
