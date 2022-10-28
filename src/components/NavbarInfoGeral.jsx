import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import InfoGeralFigueira_Waves from "./InfoCities/InfoGeralFigueira_Waves"



class NavbarInfoGeral extends Component {
    
    //é só preciso saber qual é o prop que vem, se souber fica essa com cor dourada e com borda no fundo


    render() {
        const pageName=this.props.city;
        const currentTab = this.props.currentTab;
        console.log("hey");
        /*switch (this.props.currentTab){
            case 'tides':

        }*/
        let showInfo;
        let LinksInfoGeral;
        let classNavbarWaves="col-3 nav-link pt-2 linkNavbar activeNavbar";
        let classNavbarTides="col-3 nav-link pt-2 linkNavbar";
        let classNavbarWind="col-3 nav-link pt-2 linkNavbar";
        let classNavbarWeather="col-3 nav-link pt-2 linkNavbar";

        showInfo = <InfoGeralFigueira_Waves/>;
        return (
            <div>
                <nav className="navbarInfo navbar-expand navbar-light">
                    <div className="navbar-nav row">
                        <Link className={classNavbarWaves} to="/InfoGeralFF_Waves">Waves</Link>
                        <Link className={classNavbarTides} to="/InfoGeralFF_Waves">Tides</Link>
                        <Link className={classNavbarWind} to="InfoGeralFF_Waves">Wind</Link>
                        <Link className={classNavbarWeather} to="InfoGeralFF_Waves">Weather</Link>
                    </div>

                </nav>
                {showInfo}
            </div>

        );
    
    }
}

export default NavbarInfoGeral;
