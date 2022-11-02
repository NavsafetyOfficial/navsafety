import React, {Component} from 'react';
//Axios for get request
import axios from 'axios';
import {Button, Col, Container,Form, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

//Imagens Icones
import direction from '../../imgs/icones/iconesInfo/direction.png';
import windGusts from '../../imgs/icones/iconesInfo/windGusts.png';
import temperature from '../../imgs/icones/iconesInfo/temperature.png';
import thermometerMax from '../../imgs/icones/iconesInfo/thermometerMax.png';
import thermometerMin from '../../imgs/icones/iconesInfo/thermometerMin.png';

import precipitation from '../../imgs/icones/iconesInfo/precipitation.png';
import cloudiness from '../../imgs/icones/iconesInfo/cloudiness.png';
import loading from "../../imgs/icones/loading.gif";

/*----Weather----*/
import sol from '../../imgs/icones/iconesInfo/weather/sol.png';
import sol_com_nuvens from '../../imgs/icones/iconesInfo/weather/sol_com_nuvens.png';
import nuvens from '../../imgs/icones/iconesInfo/weather/nuvens.png';
import chuva_fraca from '../../imgs/icones/iconesInfo/weather/chuva_fraca.png';
import chuva_forte from '../../imgs/icones/iconesInfo/weather/chuva_forte.png';
import neve from '../../imgs/icones/iconesInfo/weather/neve.png';
import nevoeiro from '../../imgs/icones/iconesInfo/weather/nevoeiro.png';
import trovoada from '../../imgs/icones/iconesInfo/weather/trovoada.png';
import granizo from '../../imgs/icones/iconesInfo/weather/granizo.png';
import noInfo from '../../imgs/icones/iconesInfo/weather/noInfo.png';


const divStyle = {
    position: 'absolute',
    top: '100px',
}


class InfoGeral_Weather extends Component {
    //initialize an object's state in a class
    constructor(props) {
        super(props)
        this.state = {
            locaisDataID: [],
            locaisDataNome: [],
            idZonaCosteiraFigueira: 0,
            idEstacaoFigueira: 0,
            dataWeatherFigueira: [],
            arrayIdVento: ["sem rumo", "N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"],
            idDistritoFigueira: 0,
            dataWeatherTypeClassifications: [],
            dataPrecipitation: [],
            chosenDay: 0,
            arrayChosenDay: ["Today", "1 Day from now", "2 Days from now", "3 Days from now", "4 Days from now"],
            showLoading: false,
        }
    }

    getInfoWeather() {
        this.setState({showLoading: true});
        const urlLocais = 'https://geo-navsafety.ua.pt:443/local'+this.props.city;
        ////console.log(urlLocais);
        const idFigueira = 1;
        //get request
        //vou ter de ir à bd buscar as infos sobre a figueira, para ter os IDS do IPMA, para poder ir buscar a informação
        let arrayTeste = [];
        fetch(urlLocais)
            .then(
                response => response.json()
            )
            .then(
                locais => {
                    // locaisData=locais.map((locais)=>locais);
                    for (var i = 0; i < locais.length; i++) {
                        arrayTeste.push(locais[i])
                    }
                    //console.log(arrayTeste);
                }
            )
            .then(locais => {
                this.setState({locaisDataID: arrayTeste});
                this.setState({idZonaCosteiraFigueira: arrayTeste[0].zonaCosteiraIPMA_ID});
                this.setState({idEstacaoFigueira: arrayTeste[0].estacaoIPMA_ID});
                this.setState({idDistritoFigueira: arrayTeste[0].distritoIPMA_ID});

                let ArrayDados = [];
                let urlLogin = 'https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/'+this.state.idDistritoFigueira+'.json';

                axios.get(urlLogin).then((response) => {
                    //para mostrar a resposta da api da bd
                    ////console.log('response from then', response);

                    //console.log('response from then111', response.data.data[this.state.chosenDay]);

                    const infoCompletaData = response.data.data[this.state.chosenDay];

                    //console.log('!!!!++', infoCompletaData);
                    this.setState({showLoading: false})
                    this.setState({dataWeatherFigueira: infoCompletaData})
                });
            }).catch(error => console.log(error));

        let arrayTeste2 = [];
        const urlLoginWeatherType = 'https://api.ipma.pt/open-data/weather-type-classe.json'
        axios.get(urlLoginWeatherType).then((response) => {
            //para mostrar a resposta da api da bd
            console.log('response from then+++', response.data.data);
            for (let i = 0; i < response.data.data.length; i++) {
               // console.log(response.data.data[i].descWeatherTypeEN);
                arrayTeste2.push(response.data.data[i].descWeatherTypeEN);
               
            }
            console.log("",arrayTeste2);

        }).then(response => {
            this.setState({dataWeatherTypeClassifications: arrayTeste2});
            //console.log('+++2', this.state.dataWeatherTypeClassifications);
        });

        let arrayTeste3 = [];
        const urlLoginPrecipitation = 'https://api.ipma.pt/open-data/precipitation-classe.json';
        axios.get(urlLoginPrecipitation).then((response) => {
            //para mostrar a resposta da api da bd
            //console.log('response from thenAAAAAAAAA', response.data.data);
            for (let i = 0; i < response.data.data.length; i++) {
                arrayTeste3.push(response.data.data[i].descClassPrecIntEN)
            }
            //console.log('+++3', arrayTeste3);
        }).then(response => {
            this.setState({dataPrecipitation: arrayTeste3});
        });
    }

    mudarData(event) {
        //console.log('hey', event);
        //alert(event)
        this.setState({chosenDay: event});
        this.getInfoWeather();
    }

    //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
    componentDidMount() {
        this.getInfoWeather()
    }


    render() {
        /*//console.log(this.state.idZonaCosteiraFigueira);
        //console.log(this.state.idEstacaoFigueira);*/
        //console.log('STATE RESPONSE ON RENDER', this.state.dataWeatherFigueira);
        ////console.log(this.state.dataWeatherTypeClassifications);

        let idWeatherTypePos = this.state.dataWeatherFigueira.idWeatherType + 1;
        if (this.state.dataWeatherFigueira.idWeatherType == -99) {
            idWeatherTypePos = 0;
        }

        var iconWeather;

        if(idWeatherTypePos==2){
            iconWeather=sol;
        }else if(idWeatherTypePos==3 || idWeatherTypePos==4 || idWeatherTypePos==26 || idWeatherTypePos==28){
            iconWeather=sol_com_nuvens;
        }else if(idWeatherTypePos==5 || idWeatherTypePos==6){
            iconWeather=nuvens;
        }else if(idWeatherTypePos==7 || idWeatherTypePos==8 || idWeatherTypePos==11 || idWeatherTypePos==14 || idWeatherTypePos==16){
            iconWeather=chuva_fraca;
        }else if(idWeatherTypePos==9 || idWeatherTypePos==10 || idWeatherTypePos==12 || idWeatherTypePos==13 || idWeatherTypePos==15){
            iconWeather=chuva_forte;
        }else if(idWeatherTypePos==19 || idWeatherTypePos==23){
            iconWeather=neve;
        }else if(idWeatherTypePos==17 || idWeatherTypePos==18 || idWeatherTypePos==25 || idWeatherTypePos==27){
            iconWeather=nevoeiro;
        }else if(idWeatherTypePos==20 || idWeatherTypePos==21 || idWeatherTypePos==24){
            iconWeather=trovoada;
        }else if(idWeatherTypePos==22){
            iconWeather=granizo;
        }else {
            iconWeather = noInfo;
        }

        let weatherState;
        if(idWeatherTypePos>1 && idWeatherTypePos<28){
            weatherState=this.state.dataWeatherTypeClassifications[idWeatherTypePos];
            console.log(idWeatherTypePos);
        }else{
            weatherState='No Information'
        }
        ////console.log('Aqui',this.state.dataPrecipitation);
        ////console.log('Aqui2',this.state.dataPrecipitation.classPrecInt + 1);
        let idPrec = this.state.dataWeatherFigueira.classPrecInt + 1;
        if (this.state.dataPrecipitation.classPrecInt == -99) {
            idPrec = 0;
        }

        // //console.log('aqui4',this.state.dataPrecipitation[idPrec]);
        let showDiv = {}
        let showDivInfo = {}
        if (this.state.showLoading) {
            showDiv = {
                margin: "auto",
                display: "block",
                height: "100px",
            }
            showDivInfo = {
                display: "none"
            }
        } else {
            showDiv = {
                margin: "auto",
                display: "none",
                height: "100px",
            }
            showDivInfo = {
                display: "block"
            }
        }
        return (
            <div className="maincontainer mainContainerInfo" style={divStyle}>
                <Container>
                    <Row className="pt-3">
                        <Button id="backBtnInfoGeral" className="voltarBtn" href="/figueiraFoz/"></Button>
                    </Row>

                    <Row className="SubTitles pt-3 valueInfo">{this.state.arrayChosenDay[this.state.chosenDay]}</Row>
                    <Row className='pr-0 pt-2 sliderContainer'>
                        <Form className='sliderContainer'>
                            <Form.Group controlId="formBasicRange ">
                                <Form.Label className='sliderText pb-2'>Use the slider to see waves info for the next
                                    days</Form.Label>
                                <Form.Control type="range" min={0} max={4} defaultValue={this.state.chosenDay}
                                              className="sliderBackground5 slider"
                                              onChange={(event) => {
                                                  ////console.log(event.nativeEvent.target.value);
                                                  this.mudarData(event.nativeEvent.target.value);
                                              }}/>
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row className="sliderText">
                        <Col className='slider5Legenda1'>Today</Col>
                        <Col className='slider5Legenda2'>+1</Col>
                        <Col className='slider5Legenda3'>+2</Col>
                        <Col className='slider5Legenda4'>+3</Col>
                        <Col className='slider5Legenda5'>+4</Col>
                    </Row>
                    <Row> <img src={loading} style={showDiv}/></Row>
                    <div style={showDivInfo}>
                        <Row className="SubTitles pt-3">Current Weather</Row>
                        <Row className='pr-0 pt-3'>
                            {/*<img className="iconInfo" src={cloudiness}/>*/}
                            <img className="iconInfo" src={iconWeather}/>
                            <span
                                className="valueInfoExtra pl-2">{weatherState}</span>
                        </Row>
                        <Row className="SubTitles pt-3">Temperature</Row>
                        <Row className='pr-0 pt-3'>
                            <img className="iconInfo" src={thermometerMin}/>
                            <span className="valueInfo pl-2">{this.state.dataWeatherFigueira.tMin} º C</span>
                            <span className="extraText pl-2">(Minimum)</span>
                        </Row>
                        <Row className='pr-0 pt-3'>
                            <img className="iconInfo" src={thermometerMax}/>
                            <span className="valueInfoExtra pl-2">{this.state.dataWeatherFigueira.tMax} º C</span>
                            <span className="extraText pl-2">(Maximum)</span>
                        </Row>

                        <Row className="SubTitles pt-3">Precipitation</Row>
                        <Row className='pr-0 pt-3 pb-3'>
                            <img className="iconInfo" src={precipitation}/>
                            <span
                                className="valueInfoExtra pl-2">{this.state.dataWeatherFigueira.precipitaProb} %</span>
                            <span
                                className="extraText pl-2 pt-1">{this.state.dataPrecipitation[idPrec] ? '(' + this.state.dataPrecipitation[idPrec] + ')' : ''}</span>
                        </Row>
                        <Row className="pt-3 pb-3">
                            <span className="sliderText">Source:  IPMA </span>
                        </Row>
                    </div>
                </Container>
            </div>
        )
    };
}

export default InfoGeral_Weather;
