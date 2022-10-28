import logo from './logo.svg';
import './App.css';
import MyMap from './components/MyMap';
import HomeMap from './components/HomeMap';
import Header from './components/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";



function App() {
  let showHeader2 = false;
  const headerElement = <Header pageName="Home" />;
  const location = useLocation().pathname;
  if (!(location.includes("login") || location.includes("register"))) {
    console.log("nao é login nem registo");
    showHeader2 = true;
  }


  return (
    <div id="appContainer2">
      {showHeader2 && headerElement}
      <Switch>
        <Route path="">
          <MyMap />
        </Route>
        
        
      </Switch>
    </div>
  );
}
export default App;
