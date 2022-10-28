import React, {Component} from 'react';
//Axios for get request
import axios from 'axios';
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import waveMedia from '../../imgs/icones/iconesInfo/waveMedia.png';
import bigWave from '../../imgs/icones/iconesInfo/bigWave.png';
import direction from '../../imgs/icones/iconesInfo/direction.png';
import chronometerMax from '../../imgs/icones/iconesInfo/chronometerMax.png';
import chronometerMin from '../../imgs/icones/iconesInfo/chronometerMin.png';
import loading from "../../imgs/icones/loading.gif";


const divStyle = {
    position: 'absolute',
    top: '100px',
}


class InfoGeralFigueira_Waves extends Component {
    //initialize an object's state in a class
    constructor(props) {
        super(props)
        this.state = {
            locaisDataID: [],
            locaisDataNome: [],
            idZonaCosteiraFigueira:0,
            idEstacaoFigueira:0,
            dataFigueira:[],
            chosenDay:0,
            arrayChosenDay:["Today", "1 Day from now", "2 Days from now"]
        }

    }
    getInfoWaves(){
        this.setState({showLoading: true});
        const urlLocais = 'https://geo-navsafety.ua.pt:443/localFigueira';
        console.log(urlLocais);

        let arrayTeste = [];
        fetch(urlLocais)
            .then(
                response => response.json()
            )
            .then(
                locais => {
                    console.log(locais);
                    console.log(locais.length);
                    // locaisData=locais.map((locais)=>locais);
                    for (var i = 0; i < locais.length; i++) {
                        arrayTeste.push(locais[i])
                    }
                    console.log(arrayTeste);
                }
            ).then(locais => {
            this.setState({locaisDataID: arrayTeste});
            this.setState({idZonaCosteiraFigueira: arrayTeste[0].zonaCosteiraIPMA_ID});
            this.setState({idEstacaoFigueira: arrayTeste[0].estacaoIPMA_ID});

            let ArrayDados=[];
            console.warn('!!!'+this.state.chosenDay);
            let urlLogin='https://api.ipma.pt/open-data/forecast/oceanography/daily/hp-daily-sea-forecast-day'+this.state.chosenDay+'.json';
            console.log(urlLogin);
            axios.get(urlLogin).then((response) => {
                //para mostrar a resposta da api da bd
                console.log('response from then', response);
                console.log('data.data.length', response.data.data.length);

                console.log('DATA HERE',response.data.data);
                for(let i=0; i<response.data.data.length;i++){
                    if(response.data.data[i].globalIdLocal===arrayTeste[0].zonaCosteiraIPMA_ID){
                        console.log('RESPONSE FROM FIGUEIRA', response.data.data[i]);
                        ArrayDados=response.data.data[i];
                        console.log('qual é o array de dados???',ArrayDados);
                        this.setState({dataFigueira: ArrayDados});
                        this.setState({showLoading: false});
                    }else{
                        console.log('dammm');
                    }
                }
            });
        }).catch(error=>console.log(error));
    }

    mudarData(event){
        console.log('hey',event);
        //alert(event)
        this.setState({chosenDay: event});
        this.getInfoWaves();
    }

    //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
    componentDidMount() {
        this.getInfoWaves();

    }

    render() {
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
        //console.log(this.state.idZonaCosteiraFigueira);
       // console.log(this.state.idEstacaoFigueira);
        console.log('STATE RESPONSE ON RENDER', this.state.dataFigueira);

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
                                <Form.Label className='sliderText pb-2'>Use the slider to see waves info for the next days</Form.Label>
                                <Form.Control type="range" min={0} max={2} defaultValue={this.state.chosenDay} className="sliderBackground3 slider "
                                              onChange={(event)=>{
                                                  console.warn(event.nativeEvent.target.value);
                                                  this.mudarData(event.nativeEvent.target.value)
                                              }}/>
                            </Form.Group>
                        </Form>
                    </Row>
                    {/*<Row>
                        <Col className='p-0'>
                            <img src={barra3_text}/>
                        </Col>
                    </Row>*/}
                    <Row className="sliderText">
                        <Col className='slider3Legenda1'>Today</Col>
                        <Col className='slider3Legenda2'>+1</Col>
                        <Col className='slider3Legenda3'>+2</Col>
                    </Row>
                    <Row> <img src={loading} style={showDiv}/></Row>
                    <div style={showDivInfo}>
                    <Row className="SubTitles pt-2">Waves Height</Row>
                    <Row className='pr-0'>
                        <Col className='pl-0 pt-2' xs={12} sm={5} md={5}>
                            <img className="iconInfo" src={waveMedia}/>
                            <span className="valueInfo pl-2">{this.state.dataFigueira.totalSeaMin} m</span>
                            <span className="extraText pl-2">(Lower wave)</span>
                        </Col>
                        <Col className='pl-0 pt-2' xs={12} sm={5} md={5}>
                            <img className="iconInfo" src={bigWave}/>
                            <span className="valueInfo pl-2">{this.state.dataFigueira.totalSeaMax} m </span>
                            <span className="extraText pl-2">(Higher wave)</span>
                        </Col>
                    </Row>
                    <Row className="SubTitles pt-3">Waves Direction</Row>
                    <Row className='pr-0 pt-2'>
                        <img className="iconInfo" src={direction}/><span className="valueInfo pl-2">{this.state.dataFigueira.predWaveDir}</span>
                    </Row>
                    <Row className="SubTitles pt-3">Waves Period</Row>
                    <Row className='pr-0 pb-3'>
                        <Col className='pl-0 pt-2' xs={12} sm={5} md={5}>
                            <img className="iconInfo" src={chronometerMin}/>
                            <span className="valueInfo pl-2">{this.state.dataFigueira.wavePeriodMin} s</span>
                            <span className="extraText pl-2">(Minimum)</span>
                        </Col>
                        <Col className='pl-0 pt-2' xs={12} sm={5} md={5}>
                            <img className="iconInfo" src={chronometerMax}/>
                            <span className="valueInfo pl-2">{this.state.dataFigueira.wavePeriodMax} s</span>
                            <span className="extraText pl-2">(Maximum)</span>
                        </Col>
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

export default InfoGeralFigueira_Waves;

