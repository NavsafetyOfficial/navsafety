import React from 'react';
import {Button, Container, Row, Table} from "react-bootstrap";
import '../App.css';
import {
    useParams
  } from "react-router-dom";

const divStyle = {
    position: 'absolute',
}

const Camara = (props) => {
    console.log("city");
    console.log(props.city);
    const urlFigueira="https://rtsp.me/embed/adfyARfd/";
    const urlEriceira="https://rtsp.me/embed/SfdFr6Q2/";

    return (
        <div className="maincontainer mainContainerCamera" style={divStyle}>
            <Container>
                <Row className="pt-3">
                    <Button id="backBtnInfoGeral" className="voltarBtn" href="/"/>
                </Row>
                <Row className="SubTitles pt-3 valueInfo">Camera Stream</Row>
                <Row className="SubTitles pt-3 sliderText">
                    <span className="sliderText pb-3">
                        Here you can have acess to the camera streaming located in {props.city == "Figueira" ? "Figueira da Foz" : "Ericeira"}.
                    </span>
                </Row>
                <Row className="sliderText pb-4">
                    <iframe className='cameraResponsive' allowfullscreen='allowfullscreen' width="100%" height="100%" src={props.city == "Figueira" ? urlFigueira: urlEriceira} frameborder="0" marginWidth="0" marginHeight="0" scrolling="no" >
                    </iframe>
                </Row>


            </Container>
        </div>

    );
}

export default Camara;

