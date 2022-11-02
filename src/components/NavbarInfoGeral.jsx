import React, { Component } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import InfoGeral_Waves from "./InfoCities/InfoGeral_Waves";
import InfoGeral_Tides from "./InfoCities/InfoGeral_Tides";
import InfoGeral_Wind from "./InfoCities/InfoGeral_Wind";
import InfoGeral_Weather from "./InfoCities/InfoGeral_Weather";

class NavbarInfoGeral extends Component {
  render() {
    const pageName = this.props.city;
    const currentTab = this.props.currentTab;
    
    let showInfo;
    let LinksInfoGeral;
    let classNavbarWaves = "col-3 nav-link pt-2 linkNavbar";
    let classNavbarTides = "col-3 nav-link pt-2 linkNavbar";
    let classNavbarWind = "col-3 nav-link pt-2 linkNavbar";
    let classNavbarWeather = "col-3 nav-link pt-2 linkNavbar";
    console.log("currentTab",this.props.currentTab);
    if (currentTab == "waves") {
      classNavbarWaves += " activeNavbar";
      showInfo = <InfoGeral_Waves city={pageName} />;
    } else if (currentTab == "tides") {
      classNavbarTides += " activeNavbar";
      showInfo = <InfoGeral_Tides city={pageName} />;
    } else if (currentTab == "wind") {
      showInfo = <InfoGeral_Wind city={pageName} />;
      classNavbarWind += " activeNavbar";
    } else {
      classNavbarWeather += " activeNavbar";
      showInfo = <InfoGeral_Weather city={pageName} />;
    }
    
    return (
      <div>
        <nav className="navbarInfo navbar-expand navbar-light">
          <div className="navbar-nav row">
            <Link
              className={classNavbarWaves}
              to={
                pageName == "Figueira"
                  ? "/InfoGeralFigueira_Waves"
                  : "/InfoGeralEriceira_Waves"
              }
            >
              Waves
            </Link>
            <Link
              className={classNavbarTides}
              to={
                pageName == "Figueira"
                  ? "/InfoGeralFigueira_Tides"
                  : "/InfoGeralEriceira_Tides"
              }
            >
              Tides
            </Link>
            <Link
              className={classNavbarWind}
              to={
                pageName == "Figueira"
                  ? "/InfoGeralFigueira_Wind"
                  : "/InfoGeralEriceira_Wind"
              }
            >
              Wind
            </Link>
            <Link
              className={classNavbarWeather}
              to={
                pageName == "Figueira"
                  ? "/InfoGeralFigueira_Weather"
                  : "/InfoGeralEriceira_Weather"
              }
            >
              Weather
            </Link>
          </div>
        </nav>
        {showInfo}
      </div>
    );
  }
}

export default NavbarInfoGeral;
