import React, { Component } from "react";
//Axios for get request
import axios from "axios";
import {
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { Chart } from "react-google-charts";

//Imagens icones
import highTide from "../../imgs/icones/iconesInfo/mareAlta.png";
import lowTide from "../../imgs/icones/iconesInfo/mareBaixa.png";
import sunrise from "../../imgs/icones/iconesInfo/nascerSol.png";
import sunset from "../../imgs/icones/iconesInfo/porSol.png";
import loading from "../../imgs/icones/loading.gif";

import { getSunrise, getSunset } from "sunrise-sunset-js";

const divStyle = {
  position: "absolute",
  top: "100px",
};

class InfoGeral_Tides extends Component {
  //initialize an object's state in a class
  constructor(props) {
    super(props);
    this.state = {
      locaisDataID: [],
      id: 0,
      idMareHidrografico: 0,
      arrayDataGraph: [],
      arrayMaxMin: [],
      showGraph: false,
      dateTime: "",
      checkArrayMinMax: false,
      coordLat: "",
      coordLon: "",
      sunriseTimeState: "",
      sunsetTimeState: "",
      chosenDay: 0,
      arrayChosenDay: ["Today", "1 Day from now", "2 Days from now"],
      valor1Min: 0,
      hora1Min: "",
      valor1Max: 0,
      hora1Max: "",
      valor2Min: 0,
      hora2Min: "",
      valor2Max: 0,
      hora2Max: "",
      showLoading: false,
      firstTideMin: false,
      stateReferencial: "NMM",
    };
  }

  getInfoTides(eventData) {
    let dateCurrent = new Date();
    let result = new Date(dateCurrent);

    this.setState({ arrayDataGraph: [] });

    if (eventData == 0) {
      result.setDate(result.getDate() + 0);
    } else if (eventData == 1) {
      result.setDate(result.getDate() + 1);
    } else if (eventData == 2) {
      result.setDate(result.getDate() + 2);
    }

    this.setState({ showLoading: true });
    let urlLocais="https://geo-navsafety.ua.pt:443/local"+this.props.city;
   
    // console.log(urlLocais);
    //get request
    //vou ter de ir à bd buscar as infos sobre a ericeira, para ter os IDS do IPMA, para poder ir buscar a informação
    let arrayTeste = [];
    fetch(urlLocais)
      .then((response) => response.json())
      .then((locais) => {
        //console.log(locais);
        // locaisData=locais.map((locais)=>locais);
        for (let i = 0; i < locais.length; i++) {
          arrayTeste.push(locais[i]);
        }
      })
      .then((locais) => {
        this.setState({ locaisDataID: arrayTeste });
        this.setState({ id: arrayTeste[0].id_local });
        this.setState({
          idMareHidrografico: arrayTeste[0].maresHidrografico_ID,
        });
        this.setState({ coordLat: arrayTeste[0].coordLat });
        this.setState({ coordLon: arrayTeste[0].coordLon });
        this.setState({ checkArrayMinMax: false });

        let dia = result.getDate();
        let mes = result.getMonth();
        mes += 1;
        let year = result.getFullYear();
        //console.log("dia - mes - ano", dia, mes, year);

        if (dia < 10) {
          dia = "0" + dia;
        }
        if (
          mes == 1 ||
          mes == 3 ||
          mes == 5 ||
          mes == 7 ||
          mes == 8 ||
          mes == 10 ||
          mes == 12
        ) {
          //mes tem 31 dias:
          //se o dia for 30 e eventData=2 ou dia 31 e eventData
          if (dia == 30 && eventData == 2) {
            //andou dois dias, mudou o mes e o dia
            dia = 1;
            mes += 1;
          } else if (dia == 31 && (eventData == 1 || eventData == 2)) {
            dia = eventData;
            mes += 1;
          }
        } else if (mes == 4 || mes == 6 || mes == 9 || mes == 11) {
          //mes tem 30 dias:
          if (dia == 29 && eventData == 2) {
            //andou dois dias, mudou o mes e o dia
            dia = 1;
            mes += 1;
          } else if (dia == 30 && (eventData == 1 || eventData == 2)) {
            dia = eventData;
            mes += 1;
          }
        } else if (mes == 2) {
          //é fevereiro - 28/29 dias consoante o ano
          //se ano for bissexto, entao fev tem 29 dias, senao tem 28;
          if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
            //ano bisexto
            if (dia === 28 && eventData === 2) {
              //andou dois dias, mudou o mes e o dia
              dia = 1;
              mes += 1;
            } else if (dia === 29 && (eventData === 1 || eventData === 2)) {
              dia = eventData;
              mes += 1;
            }
          } else {
            //nao é ano bissexto
            if (dia === 27 && eventData === 2) {
              //andou dois dias, mudou o mes e o dia
              dia = 1;
              mes += 1;
            } else if (dia === 28 && (eventData === 1 || eventData === 2)) {
              dia = eventData;
              mes += 1;
            }
          }
        } else {
          //mes 12
          //mes tem 31 dias:
          //se o dia for 30 e eventData=2 ou dia 31 e eventData
          if (dia === 30 && eventData === 2) {
            //andou dois dias, mudou o mes e o dia e o ano
            dia = 1;
            mes = 1;
            year += 1;
          } else if (dia === 31 && (eventData === 1 || eventData === 2)) {
            dia = eventData;
            mes = 1;
            year += 1;
          }
        }
        if (mes < 10) {
          ////console.log(mes + 1);
          mes = "0" + mes;
        }

        const diaCompleto = year + "-" + mes + "-" + dia;
        //console.log("DiaCompleto", diaCompleto);
        const fullDate = dia + "-" + mes + "-" + year;
        this.setState({ dateTime: fullDate });

        //console.warn(diaCompletoTeste);
        this.getInfoTidesHidrografico(
          diaCompleto,
          arrayTeste[0].maresHidrografico_ID
        );
      })
      .catch((error) => console.log(error));
  }

  getInfoTidesHidrografico(dataMare, idMare) {
    //console.log("Data e id:",dataMare, idMare);

    const url_test =
      "https://www.hidrografico.pt/json/mare.graph.val.php?po=" +
      idMare +
      "&dd=" +
      dataMare +
      "&nd=0"; // site that doesn’t send Access-Control-*
    //console.log(url_test);
    if (this.state.stateReferencial == "NMM") {
      this.setState({ arrayDataGraph: [["time", "NMM (m)"]] });
    } else {
      this.setState({ arrayDataGraph: [["time", "ZH (m)"]] });
    }
    /*o que tava no fetch */
    let data
     = [
      { SDATA: "2022-10-31 06:26", ALT: 3 },
      { SDATA: "2022-10-31 12:50", ALT: 1.2 },
      { SDATA: "2022-10-31 19:15", ALT: 2.7 },
    ];
    const obj = data; 
    var result = [];

    for (var i in obj) {
      result.push([i, obj[i].SDATA]);

      let sDataObj = obj[i].SDATA;
      let altObj;
      if (this.state.stateReferencial == "NMM") {
        altObj = obj[i].ALT;
      } else {
        altObj = obj[i].ALT - 2;
      }

      altObj = altObj.toFixed(2);
      altObj = parseFloat(altObj);

      let hoursDataObj = sDataObj.split(" ");

      this.state.arrayDataGraph.push([hoursDataObj[1], altObj]);

      if (i == obj.length - 1) {
        this.setState({ showGraph: true });
        this.setState({ showLoading: false });
      }
    }

    //////console.log(this.state.arrayDataGraph);
    if (this.state.arrayDataGraph[1][1] > this.state.arrayDataGraph[2][1]) {
      this.setState({ firstTideMin: false });

      //primeiro valor É MAXIMO
      this.setState({ valor1Max: this.state.arrayDataGraph[1][1] });
      this.setState({ hora1Max: this.state.arrayDataGraph[1][0] });

      //segundo valor É MINIMO
      this.setState({ valor1Min: this.state.arrayDataGraph[2][1] });
      this.setState({ hora1Min: this.state.arrayDataGraph[2][0] });

      //terceiro valor É MAXIMO
      this.setState({ valor2Max: this.state.arrayDataGraph[3][1] });
      this.setState({ hora2Max: this.state.arrayDataGraph[3][0] });

      //quarto valor - se existir É MINIMO
      if (this.state.arrayDataGraph[4]) {
        this.setState({ valor2Min: this.state.arrayDataGraph[4][1] });
        this.setState({ hora2Min: this.state.arrayDataGraph[4][0] });
      } else {
        this.setState({ valor2Min: 0 });
        this.setState({ hora2Min: "" });
      }

      this.setState({ checkArrayMinMax: true });
      this.setState({ checkArrayMinMax: true });
      this.getSunrise(this.state.coordLat, this.state.coordLon, dataMare);
    } else {
      this.setState({ firstTideMin: true });
      //primeiro valor É MINIMO
      this.setState({ valor1Min: this.state.arrayDataGraph[1][1]});
      this.setState({ hora1Min: this.state.arrayDataGraph[1][0]});

      //segundo valor É MAXIMO
      this.setState({ valor1Max: this.state.arrayDataGraph[2][1] });
      this.setState({ hora1Max: this.state.arrayDataGraph[2][0] });

      //terceiro valor É MINIMO
      this.setState({ valor2Min: this.state.arrayDataGraph[3][1] });
      this.setState({ hora2Min: this.state.arrayDataGraph[3][0] });

      //quarto valor - se existir É MAXIMO
      if (this.state.arrayDataGraph[4]) {
        this.setState({ valor2Max: this.state.arrayDataGraph[4][1] });
        this.setState({ hora2Max: this.state.arrayDataGraph[4][0] });
      } else {
        this.setState({ valor2Max: 0 });
        this.setState({ hora2Max: "" });
      }

      this.setState({ checkArrayMinMax: true });
      this.getSunrise(this.state.coordLat, this.state.coordLon, dataMare);
    }

    // fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url_test)}`)
    //       .then(response => {
    //          if (response.ok) return response.json();
    //          //throw new Error('Network response was not ok.')
    //        })
    //       .then(data => {
    //         data=[{"SDATA":"2022-10-31 06:26","ALT":3},{"SDATA":"2022-10-31 12:50","ALT":1.2},{"SDATA":"2022-10-31 19:15","ALT":2.7}]
    //         //console.log(data.contents);
    //         //console.log(typeof(data.contents));
    //         const obj = JSON.parse(data.contents);
    //         //console.log(obj);

    //         var result = [];

    //         for(var i in obj){
    //             result.push([i, obj[i].SDATA]);

    //             let sDataObj=obj[i].SDATA;
    //             let altObj;
    //             if(this.state.stateReferencial=='NMM'){
    //                 //console.log('NMM');
    //                 altObj=obj[i].ALT;

    //             }else{
    //                 //console.log('NMM');
    //                 altObj=(obj[i].ALT)-2;
    //                 /*altObj=altObj.toFixed(2);
    //                 altObj = parseFloat(altObj);*/
    //             }

    //             altObj=altObj.toFixed(2);
    //             altObj = parseFloat(altObj);

    //             let hoursDataObj=sDataObj.split(' ');

    //             //console.log('---'+i+'-----');
    //             //console.log('sdata: '+sDataObj);
    //             //console.log('hour:'+hoursDataObj[1]);
    //             //console.log('alt: '+altObj);
    //             //console.log(obj.length);

    //             this.state.arrayDataGraph.push([hoursDataObj[1], altObj]);

    //             if(i==(obj.length-1)){
    //                 this.setState({showGraph: true});
    //                 this.setState({showLoading: false});
    //             }
    //         }

    //         //console.log(this.state.arrayDataGraph);
    //         if(this.state.arrayDataGraph[1][1]>this.state.arrayDataGraph[2][1]){
    //             this.setState({firstTideMin:false});

    //             //primeiro valor É MAXIMO
    //             this.setState({valor1Max: this.state.arrayDataGraph[1][1]});
    //             this.setState({hora1Max: this.state.arrayDataGraph[1][0]});

    //             //segundo valor É MINIMO
    //             this.setState({valor1Min: this.state.arrayDataGraph[2][1]});
    //             this.setState({hora1Min: this.state.arrayDataGraph[2][0]});

    //             //terceiro valor É MAXIMO
    //             this.setState({valor2Max: this.state.arrayDataGraph[3][1]});
    //             this.setState({hora2Max: this.state.arrayDataGraph[3][0]});

    //             //quarto valor - se existir É MINIMO
    //             if(this.state.arrayDataGraph[4]){
    //                 this.setState({valor2Min: this.state.arrayDataGraph[4][1]});
    //                 this.setState({hora2Min: this.state.arrayDataGraph[4][0]});
    //             }else{
    //                this.setState({valor2Min: 0});
    //                this.setState({hora2Min: ''});
    //             }

    //             this.setState({checkArrayMinMax: true});
    //             this.setState({checkArrayMinMax: true});
    //             this.getSunrise(this.state.coordLat, this.state.coordLon, dataMare);
    //         }else{
    //             this.setState({firstTideMin:true});
    //             //primeiro valor É MINIMO
    //             this.setState({valor1Min: this.state.arrayDataGraph[1][1]});
    //             this.setState({hora1Min: this.state.arrayDataGraph[1][0]});

    //             //segundo valor É MAXIMO
    //             this.setState({valor1Max: this.state.arrayDataGraph[2][1]});
    //             this.setState({hora1Max: this.state.arrayDataGraph[2][0]});

    //             //terceiro valor É MINIMO
    //             this.setState({valor2Min: this.state.arrayDataGraph[3][1]});
    //             this.setState({hora2Min: this.state.arrayDataGraph[3][0]});

    //             //quarto valor - se existir É MAXIMO
    //             if(this.state.arrayDataGraph[4]){
    //                 this.setState({valor2Max: this.state.arrayDataGraph[4][1]});
    //                 this.setState({hora2Max: this.state.arrayDataGraph[4][0]});
    //             }else{
    //                this.setState({valor2Max: 0});
    //                this.setState({hora2Max: ''});
    //             }

    //             this.setState({checkArrayMinMax: true});
    //             this.getSunrise(this.state.coordLat, this.state.coordLon, dataMare);
    //         }
    //       }).catch(error=>{
    //         console.log(error);
    //       });
  }

  getSunrise(lat, long, dataMares) {
    const diaCompleto = dataMares;
    //console.log("DataSunrise", diaCompleto);

    lat = lat.replace(/,/g, ".");
    long = long.replace(/,/g, ".");

    const sunrise = String(getSunrise(lat, long, new Date(diaCompleto)));
    const sunset = String(getSunset(lat, long, new Date(diaCompleto)));

    let sunriseTime = sunrise.substr(16, 8);
    let sunsetTime = sunset.substr(16, 8);
    //console.log(sunriseTime);
    //console.log(sunsetTime);

    this.setState({ sunriseTimeState: sunriseTime });
    this.setState({ sunsetTimeState: sunsetTime });
  }

  mudarData(event) {
    this.setState({ chosenDay: event });
    this.getInfoTides(event);
  }

  //ComponentDidMount is use to Connect a React app to external applications, such as web APIs or JavaScript functions
  componentDidMount() {
    this.getInfoTides(this.state.chosenDay);
    //this.getInfoTidesHidrografico('2021-11-23',73);
  }

  checkReferencial(event) {
    let eventValue = event.target.attributes.value.nodeValue;
    //console.log(eventValue);
    this.setState({ stateReferencial: eventValue });
    this.getInfoTides(this.state.chosenDay);
  }

  render() {
    //console.log("city", this.props.city);
    const options = {
      curveType: "function",
      hAxis: {
        title: "Time (hh:mm)",
      },
      vAxis: {
        title: "Tide Level (m)",
      },
      legend: { position: "bottom" },
      //selectionMode: 'multiple',
      tooltip: { trigger: "selection" },
      backgroundColor: {
        fill: "#E3E7E9",
      },
    };
    const showInfo2 = (
      <Chart
        className={"graficoTeste"}
        height={"350px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.state.arrayDataGraph}
        options={options}
      />
    );

    let showDiv = {};
    let showDivInfo = {};
    if (this.state.showLoading) {
      showDiv = {
        margin: "auto",
        display: "block",
        height: "100px",
        width: "auto",
      };
      showDivInfo = {
        display: "none",
      };
    } else {
      showDiv = {
        margin: "auto",
        display: "none",
        height: "100px",
        width: "auto",
      };
      showDivInfo = {
        display: "block",
      };
    }

    let maxTide1;
    let minTide1;
    let maxTide2;
    let minTide2;
    let firstRow;
    let secondRow;

    //(this.state.checkArrayMinMax && this.state.hora2Min!='')
    if (this.state.checkArrayMinMax) {
      if (this.state.hora1Min != "") {
        minTide1 = (
          <Col className="ps-0 pt-2" xs={12} sm={5} md={5}>
            <img className="iconInfo" src={lowTide} />
            <span className="valueInfo ps-2">{this.state.valor1Min} m</span>
            <span className="extraText ps-2">({this.state.hora1Min}) </span>
          </Col>
        );
      }
      if (this.state.hora2Min != "") {
        minTide2 = (
          <Col className="ps-0 pt-2" xs={12} sm={5} md={5}>
            <img className="iconInfo" src={lowTide} />
            <span className="valueInfo ps-2">{this.state.valor2Min} m</span>
            <span className="extraText ps-2">({this.state.hora2Min}) </span>
          </Col>
        );
      }
      if (this.state.hora1Max != "") {
        maxTide1 = (
          <Col className="ps-0 pt-2" xs={12} sm={5} md={5}>
            <img className="iconInfo" src={highTide} />
            <span className="valueInfo ps-2">{this.state.valor1Max} m</span>
            <span className="extraText ps-2">({this.state.hora1Max}) </span>
          </Col>
        );
      }
      if (this.state.hora2Max != "") {
        maxTide2 = (
          <Col className="ps-0 pt-2" xs={12} sm={5} md={5}>
            <img className="iconInfo" src={highTide} />
            <span className="valueInfo ps-2">{this.state.valor2Max} m</span>
            <span className="extraText ps-2">({this.state.hora2Max}) </span>
          </Col>
        );
      }
      if (this.state.firstTideMin) {
        //primeiro valor apresentado tem de ser min
        firstRow = (
          <Row className="pe-0">
            {minTide1}
            {maxTide1}
          </Row>
        );
        secondRow = (
          <Row className="pe-0 pb-3">
            {minTide2}
            {maxTide2}
          </Row>
        );
      } else {
        //primeiro valor apresentado tem de ser max
        firstRow = (
          <Row className="pe-0">
            {maxTide1}
            {minTide1}
          </Row>
        );
        secondRow = (
          <Row className="pe-0 pb-3">
            {maxTide2}
            {minTide2}
          </Row>
        );
      }
    }

    return (
      <div className="maincontainer mainContainerInfo" style={divStyle}>
        <Container>
          <Row className="pt-3">
            <Button
              id="backBtnInfoGeral"
              className="voltarBtn"
              href="/ericeira/"
            ></Button>
          </Row>
          <Row className="SubTitles pt-3 valueInfo">
            <Col xs={12} className="p-0">
            {this.state.arrayChosenDay[this.state.chosenDay]}{" "}
            <span className="sliderText">{this.state.dateTime}</span>
            </Col>
          </Row>
          <Row className="pe-0 ps-0 pt-2 sliderContainer">
            <Form className="pe-0 ps-0 sliderContainer">
              <Form.Group controlId="formBasicRange ">
                <Form.Label className="sliderText pb-2">
                  Use the slider to see tides and sun info for the next days
                </Form.Label>
                <Form.Control
                  type="range"
                  min={0}
                  max={2}
                  defaultValue={this.state.chosenDay}
                  className="sliderBackground3 slider"
                  onChange={(event) => {
                    this.mudarData(event.nativeEvent.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Row>
          <Row className="sliderText pt-2">
            <Col className="slider3Legenda1">Today</Col>
            <Col className="slider3Legenda2">+1</Col>
            <Col className="slider3Legenda3">+2</Col>
          </Row>
          <Row>
            {" "}
            <img src={loading} style={showDiv} />
          </Row>
          <div style={showDivInfo}>
            <Row className="pt-3">
              <Col className="p-0" xs={12} sm={8} md={8}>
                <span className="SubTitles">High and Low Tides</span>
              </Col>
              <Col
                className="my-2 my-sm-0 p-0 d-sm-flex flex-sm-row-reverse"
                xs={12}
                sm={4}
                md={4}
              >
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  defaultValue={this.state.stateReferencial}
                >
                  <ToggleButton
                    id="toggleBtnNMM"
                    variant="outline-primary"
                    value="NMM"
                    onChange={(event) => this.checkReferencial(event)}
                  >
                    NMM
                  </ToggleButton>
                  <ToggleButton
                    id="toggleBtnZH"
                    variant="outline-primary"
                    value="ZH"
                    onChange={(event) => this.checkReferencial(event)}
                  >
                    ZH
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
            </Row>
            <Row className="pt-2 ">
              <span className="sliderText">
                Tides and sun info for this day: {this.state.dateTime}
              </span>
            </Row>
            {firstRow}
            {secondRow}

            {this.state.showGraph ? showInfo2 : ""}
            <Row className="SubTitles pt-3">Sunset and Sunrise Time</Row>
            <Row className="pe-0 pb-3">
              <Col className="ps-0 pt-2" xs={12} sm={5} md={5}>
                <img className="iconInfo" src={sunrise} />
                <span className="valueInfo ps-2">
                  {this.state.sunriseTimeState}
                </span>
                <span className="extraText ps-2">(Sunrise)</span>
              </Col>
              <Col className="ps-0 pt-2" xs={12} sm={5} md={5}>
                <img className="iconInfo" src={sunset} />
                <span className="valueInfo ps-2">
                  {this.state.sunsetTimeState}{" "}
                </span>
                <span className="extraText ps-2">(Sunset)</span>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default InfoGeral_Tides;
