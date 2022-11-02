import React, {Component} from 'react';
//Axios for get request
import axios from 'axios';
import {Button, Col, Container, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

//Imagens Icones
import direction from '../../imgs/icones/iconesInfo/direction.png';
import windGusts from '../../imgs/icones/iconesInfo/windGusts.png';
import windSpeed from '../../imgs/icones/iconesInfo/windSpeed.png';
import chronometer from "../../imgs/icones/iconesInfo/chronometer.png";
import loading from "../../imgs/icones/loading.gif";


const divStyle = {
    position: 'absolute',
    top: '100px',
}

class InfoGeral_Wind extends Component {
    //initialize an object's state in a class
    constructor(props) {
        super(props)
        this.state = {
            locaisDataID: [],
            locaisDataNome: [],
            idZonaCosteira: 0,
            idEstacao: 0,
            data: [],
            dataWind: [],
            arrayIdVento: ["No data", "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"],
            lastUpdateData: "",
            showLoading: false,
        }
    }

    getInfoWind() {
        const urlLocais = 'https://geo-navsafety.ua.pt:443/local'+this.props.city;
        console.log(urlLocais);
        this.setState({showLoading: true})

        //get request
        //vou ter de ir à bd buscar as infos sobre a figueira, para ter os IDS do IPMA, para poder ir buscar a informação
        let arrayTeste = [];
        fetch(urlLocais)
            .then(
                response => response.json()
            )
            .then(
                locais => {
                    console.warn(locais);
                    console.warn(locais.length);
                    // locaisData=locais.map((locais)=>locais);
                    for (var i = 0; i < locais.length; i++) {
                        arrayTeste.push(locais[i])
                    }
                    //console.log(arrayTeste);
                }
            )
            .then(locais => {
                this.setState({locaisDataID: arrayTeste});
                this.setState({idZonaCosteira: arrayTeste[0].zonaCosteiraIPMA_ID});
                this.setState({idEstacao: arrayTeste[0].estacaoIPMA_ID});
                let urlLogin = 'https://api.ipma.pt/open-data/observation/meteorology/stations/observations.json';
                //console.log(urlLogin);
                axios.get(urlLogin).then((response) => {
                    var timestamp = new Date().getTime();
                    console.log(timestamp);
                    var date = new Date();
                    var dia = date.getDate();
                    var mes = date.getMonth();
                    var year = date.getFullYear();
                    var hora = date.getHours();
                    var hora2 = hora - 2;
                    //console.log(year+'-'+mes+'-'+dia+'T'+hora2+':00');
                    var mes2 = mes;
                    var hora3 = hora2;
                    var dia2 = dia;
                    if (dia < 10) {
                        dia2 = "0" + dia;
                    }
                    
                    if (mes < 9) {
                        mes = mes + 1;
                        mes2 = "0" + mes;
                        console.log('mes'+mes);
                    }else{
                        mes2=mes+1;
                        console.log('!mes'+mes);
                    }

                    if (hora2 < 10) {
                        hora3 = "0" + hora2;
                    }
                    var dataDireita = dia2 + '-' + mes2 + '-' + year + ' ' + hora3 + ':00';
                    this.setState({lastUpdateData: dataDireita})

                    var dataCompleta = year + '-' + mes2 + '-' + dia2 + 'T' + hora3 + ':00';
                    console.log('DataCompleta'+dataCompleta);
                    const infoCompletaData = response.data[dataCompleta][this.state.idEstacao];
                    // console.log(response.data[dataCompleta]);

                    this.setState({dataWind: infoCompletaData})
                    this.setState({showLoading: false})
                });
            }).catch(error => console.log(error));
    }

    //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
    componentDidMount() {
        this.getInfoWind();
    }

    render() {
        //console.log('STATE RESPONSE ON RENDER', this.state.dataWind);
        let showDiv = {}
        let showDivInfo = {}
        if (this.state.showLoading) {
            showDiv = {
                margin: "auto",
                display: "block",
                height: "100px",
                width: "auto",
            }
            showDivInfo = {
                display: "none"
            }
        } else {
            showDiv = {
                margin: "auto",
                display: "none",
                height: "100px",
                width: "auto",
            }
            showDivInfo = {
                display: "block"
            }
        }
        return (
            <div className="maincontainer mainContainerInfo" style={divStyle}>
                <Container>
                    <Row className="pt-3">
                        <Button id="backBtnInfoGeral" className="voltarBtn" href={this.props.city=="Figueira" ? "/figueiraFoz" : "/ericeira"}></Button>
                    </Row>
                    <Row> <img src={loading} style={showDiv}/></Row>
                    <div style={showDivInfo}>
                        <Row className="SubTitles pt-3">Wind direction</Row>
                        <Row className='pr-0 pt-2'>
                            <img className="iconInfo" src={direction}/>
                            <span
                                className="valueInfo pl-2">{this.state.arrayIdVento[this.state.dataWind.idDireccVento]}</span>
                        </Row>
                        <Row className="SubTitles pt-3">Wind speed</Row>
                        <Row className='pr-0 pb-3'>
                            <Col className='pl-0 pt-2' xs={12} sm={5} md={5}>
                                <img className="iconInfo" src={windSpeed}/>
                                <span
                                    className="valueInfoExtra pl-2">{this.state.dataWind.intensidadeVento} m/s</span>
                            </Col>
                            <Col className='pl-0 pt-2' xs={12} sm={5} md={5}>
                                <img className="iconInfo" src={windSpeed}/>
                                <span
                                    className="valueInfoExtra pl-2">{this.state.dataWind.intensidadeVentoKM} km/h</span>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3">
                            <span className="sliderText">Source:  IPMA</span>
                        </Row>
                    </div>

                    {/*<Row className="SubTitles pt-3">Wind gusts</Row>
                    <Row className='pr-0 pt-2'>
                        <img className="iconInfo" src={windGusts}/><span className="valueInfoExtra pl-2">FALTA ESTA INFO</span>
                    </Row>*/}
                </Container>
            </div>
        )
    };
}

export default InfoGeral_Wind;

