import logo from "../imgs/logo/logo.png";
import '../App.css';

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Profile from './Profile';
import "bootstrap/dist/css/bootstrap.min.css";



class Header extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let pageName="Home";
        let text=this.props.pageName;
        let name=text.split("/");
    
        return (
            <Row className="p-0 m-0 App-header">
                <Col xs={3} sm={2} md={2} lg={2}>
                    <img src={logo} className="App-logo" alt="logo" />
                </Col>
                <Col className="titlePageCol d-flex align-items-center justify-content-center" xs={6} sm={8} md={8} lg={8}>
                    <span id="titlePage">{pageName}</span>
                </Col>
                <Col xs={3} sm={2} md={2} lg={2} className="col-profile pr-0">
                    <Profile />
                </Col>
            </Row>
        );
    }

}

export default Header;
