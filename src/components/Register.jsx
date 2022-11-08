import React, { Component } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { Button, Col, Container, Modal, Row, Form } from "react-bootstrap";
import logo from "../imgs/logo/logo.png";
import envelope from "../imgs/icones/envelope.png";
import password from "../imgs/icones/password.png";
import userPic from "../imgs/icones/user.png";
import {} from "react-bootstrap";
import axios from "axios";
import { QuestionCircleFill } from "react-bootstrap-icons";

const divStyle = {
  fontSize: "0.9rem",
  color: "white!important",
  textAlign: "end",
  display: "block",
};

const divStyle2 = {
  display: "block",
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeUser: "",
      emailUser: "",
      password: "",
      checkPassword: "",
      errorMsg: "",
      buttonActive: "disabled",
      responseFrom: "",
      typeUser: "0",
      showModal: false,
      showModalTypeUser: false,
      errorMessage: "",
    };
  }
  checkSession() {
    const cookieUser = localStorage.getItem("username");
    /*console.log('username',cookieUser);*/
    if (cookieUser) {
      console.log("Existe sessão aberta - redirecionar");
      window.location.href = "/";
    } else {
      console.log("Não existe sessão aberta");
    }
  }
  handleSubmit(e) {
    e.preventDefault();

    const stateNomeUser = this.state.nomeUser;
    const stateEmailUser = this.state.emailUser;
    const statePasswordUser = this.state.password;
    const statetypeUser = this.state.typeUser;
    const userImageDB = "../icones/user4.jpg";

    const urlRegistoUA = "https://geo-navsafety.ua.pt:443/registerUsers1";

    axios
      .post(urlRegistoUA, {
        usernameDB: stateNomeUser,
        emailDB: stateEmailUser,
        passwordDB: statePasswordUser,
        typeUserDB: statetypeUser,
        userImageDB: userImageDB,
      })
      .then((response) => {
        //para mostrar a resposta da api da bd
        //console.log('response from then', response);
        //console.log('response from then', response.data.message);
        /*if(response.status===200){
                console.log('status 200');*/
        if (response.data.message) {
          console.log("erro", response.data.message);
          this.setState({ errorMessage: response.data.message });
          this.handleShow();
        } else {
          //console.log('boa, não ha mensagem de erro, podemos avançar');

          //console.log('username', stateNomeUser);
          //console.log('typeUsers_id', statetypeUser);
          //console.log('Id_user', response.data.insertId);

          localStorage.setItem("idUser", response.data.insertId);
          localStorage.setItem("typeUsers_id", statetypeUser);
          localStorage.setItem("username", stateNomeUser);
          localStorage.setItem("userImgSrc", "null");

          window.location.href = "/";
        }
      });
  }
  checkPassword1(event) {
    //verificar se as duas passes sao iguais
    //console.log('password', event.target.value);
    //console.log('checkPassword', this.state.checkPassword);
    var passUser = event.target.value;
    var checkpassUser = this.state.checkPassword;
    if (passUser == checkpassUser) {
      //console.log('1 - passes estao iguais');
      this.setState({ buttonActive: "" });
      this.setState({ errorMsg: "Passwords Match!" });
    } else {
      //console.log('1 - passes estao diferentes');
      this.setState({ buttonActive: "disabled" });
      this.setState({ errorMsg: "Passwords Don't Match!" });
    }
  }

  checkPassword2(event) {
    //verificar se as duas passes sao iguais
    //console.log('password', this.state.password);
    //console.log('checkPassword', event.target.value);
    var passUser = this.state.password;
    var checkpassUser = event.target.value;
    if (passUser == checkpassUser) {
      //console.log('2-passes estao iguais');
      this.setState({ buttonActive: "" });
      this.setState({ errorMsg: "Passwords Match!" });
    } else {
      //console.log('2-passes estao diferentes');
      this.setState({ buttonActive: "disabled" });
      this.setState({ errorMsg: "Passwords Don't Match!" });
    }
  }

  handleClose() {
    //console.log('Vamos fechar a modal Sucesso');
    this.setState({ showModal: false });
  }
  handleShow() {
    //console.log(this.state.showModal);
    //console.log('Temos de redirecionar porque foi feito com sucesso');

    this.setState({ showModal: true });
  }

  handleCloseTypeUser() {
    //console.log('Vamos fechar a Modal type user');
    this.setState({ showModalTypeUser: false });
  }

  handleShowTypeUser() {
    //console.log('Mostrar Modal type user');
    this.setState({ showModalTypeUser: true });
  }

  render() {
    //verificar se já existe sessão
    this.checkSession();
    return (
      <div
        id="containerBackground"
        className="backgroundGradiente backgroundResponsiveHeight"
      >
        <Container id="containerLogin">
          <div id="registo">
            <Row>
              <img
                src={logo}
                className="App-logo logoLogin"
                alt="logo Navsafety"
              />
            </Row>
            <Row>
              <h3>Register</h3>
            </Row>
            <Form
              className="px-3"
              onSubmit={(e) => {
                this.login(e);
              }}
            >
              {/* Username */}
              <Form.Group as={Row} className="mb-3" controlId="nameUser">
                <Form.Label column xs="1">
                  <img src={userPic} className="iconsLogin iconMenor" />
                </Form.Label>
                <Col xs="11" className="ps-0">
                  <Form.Control
                    required
                    placeholder="Username"
                    aria-label="nameUser"
                    aria-describedby="nameUser"
                    type="text"
                    onChange={(e) =>
                      this.setState({ nomeUser: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>
              {/* EmailUser */}
              <Form.Group as={Row} className="mb-3" controlId="emailUser">
                <Form.Label column xs="1">
                  <img src={envelope} className="iconsLogin " />
                </Form.Label>
                <Col xs="11" className="ps-0">
                  <Form.Control
                    required
                    placeholder="Email"
                    aria-label="emailUser"
                    aria-describedby="emailUser"
                    type="email"
                    onChange={(e) =>
                      this.setState({ emailUser: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>
               {/* Password */}
              <Form.Group as={Row} className="mb-3" controlId="passwordUser">
                <Form.Label column xs="1">
                  <img src={password} className="iconsLogin" />
                </Form.Label>
                <Col xs="11" className="ps-0">
                  <Form.Control
                    required
                    placeholder="Insert password"
                    aria-label="passwordUser"
                    aria-describedby="passwordUser"
                    type="password"
                    onChange={(e) =>{
                      const eventTargetValue = e.target.value;
                      this.setState({ password: eventTargetValue });
                      // console.log('esta é a password',this.state.password);
                      this.checkPassword1(e);
                    }
                    }
                  />
                </Col>
              </Form.Group>
              {/* CheckPassword */}
              <Form.Group as={Row} className="mb-3" controlId="checkPasswordUser">
                <Form.Label column xs="1">
                  <img src={password} className="iconsLogin" />
                </Form.Label>
                <Col xs="11" className="ps-0">
                  <Form.Control
                    required
                    placeholder="Insert password again"
                    aria-label="checkPasswordUser"
                    aria-describedby="checkPasswordUser"
                    type="password"
                    onChange={(e) =>{
                       //console.log(e.target.value);
                       this.setState({ checkPassword: e.target.value });
                       //console.log('esta é a checkPassword',this.state.checkPassword);
                       this.checkPassword2(e);
                    }
                    }
                  />
                </Col>
              </Form.Group>
              <Row style={divStyle2}>
                <div id="erroPassword" style={divStyle}>
                  {this.state.errorMsg}
                </div>
              </Row>
              <Form.Group as={Row} className="mb-3" controlId="typeUser divSelectBold">
                <Form.Label column xs="12" className="divSelect1">
                  <div>
                        Type of User{" "}
                        <Button
                          className="btnTypeUser p-0"
                          onClick={() => {
                            this.handleShowTypeUser();
                          }}
                        >
                          <QuestionCircleFill color="#ced4da" size={20} className="btnTypeUser"/>
                        </Button>
                    </div>
                </Form.Label>
                <Col xs="12" className="ps-0">
                  <Form.Control
                    className="borderSelect"
                    required
                    aria-describedby="typeUser"
                    as="select"
                    id="selectUser"
                    onChange={(e) => {
                      //console.log('Select' + e.target.value);
                      this.setState({ typeUser: e.target.value });
                    }}
                  >
                  <option className="optionSelect" value={"0"}>
                      Amateur
                    </option>
                    <option className="optionSelect" value={"1"}>
                      Professional
                    </option>
                    <option className="optionSelect" value={"2"}>
                      Academic
                    </option>
                    </Form.Control>
                </Col>
              </Form.Group>
              {/* Botoes Login e Registo */}
              <Row className="text-center">
                <Button
                  className="btnLogin specialBtnLogin ms-auto me-auto"
                  variant="outline-primary"
                  type="submit"
                  disabled={this.state.buttonActive}
                >
                  Register
                </Button>
              </Row>
              <Row className="text-center mb-2 pb-5">
                <NavLink to="/login/">
                  <Button className="btnLogin" variant="outline-primary">
                    Back to Login
                  </Button>
                </NavLink>
              </Row>
            </Form>
            {/*Modal Erro*/}
            <Modal
              className=""
              show={this.state.showModal}
              onHide={() => this.handleClose()}
            >
              <Modal.Header closeButton>
                <Modal.Body>
                  <p>{this.state.errorMessage}</p>
                  <p>Please try again!</p>
                </Modal.Body>
              </Modal.Header>
            </Modal>

            {/*Modal Type User*/}
            <Modal
              className=""
              show={this.state.showModalTypeUser}
              onHide={() => this.handleCloseTypeUser()}
            >
              <Modal.Header closeButton>
                <Modal.Title>Type of Users </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>There are 3 types of user for you to choose:</p>
                <p>
                  <span className="font-weight-bold colorAmateur">
                    Amateur:{" "}
                  </span>{" "}
                  users with specific interests in the information presented
                  (eg. sea state, waves, etc.){" "}
                </p>
                <p>
                  <span className="font-weight-bold colorProfissional">
                    Professional:{" "}
                  </span>{" "}
                  users with special information needs (eg. port management
                  entities){" "}
                </p>
                <p>
                  <span className="font-weight-bold colorAcademico">
                    Academic:{" "}
                  </span>{" "}
                  academic users with a scientific interest in analyzing the
                  collected data
                </p>
              </Modal.Body>
            </Modal>
          </div>
        </Container>
      </div>
    );
  }
}

export default Register;
