import React, { Component } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  InputGroup,
  Form,
} from "react-bootstrap";
import logo from "../imgs/logo/logo.png";
import envelope from "../imgs/icones/envelope.png";
import password from "../imgs/icones/password.png";
import axios from "axios";
import {checkSession} from "../functions/checkSession";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailLogin: "",
      passwordLogin: "",
      loggedIn: false,
      showModalErr: false,
      errorMessage: "",
    };
  }
  
  handleClose() {
    //console.log('Fechar Modal');
    this.setState({ showModalErr: false });
  }
  handleShow() {
    //console.log(this.state.showModalErr);
    this.setState({ showModalErr: true });
  }
  login(e) {
    e.preventDefault();
    
    // On submit of the form, send a POST request with the data to the server.
    //console.log('cheguei aqui');
    //console.log(this.state.emailLogin);
    //console.log(this.state.passwordLogin);
    const stateEmailUser = this.state.emailLogin;
    const statePasswordUser = this.state.passwordLogin;
    console.log(stateEmailUser);
    console.log(statePasswordUser);
    
    const urlLogin = "https://geo-navsafety.ua.pt:443/login";
    //const urlLogin2 = 'http://localhost:443/login';

    //username_db, email_db, password_db
    var teste1 = false;
    axios.post(urlLogin, {
        emailDB: stateEmailUser,
        passwordDB: statePasswordUser,
      })
      .then((response) => {
        //para mostrar a resposta da api da bd
        //console.log('response from then', response);
        console.log("data.length", response.data.length);
        if (response.data.message) {
          console.log("message", response.data.message);
          this.setState({ errorMessage: response.data.message });
          this.handleShow();
        } else if (response.data.err) {
          console.log("erro", response.data.err);
          this.setState({
            errorMessage: "Something went wrong!/n please try again",
          });
          this.handleShow();
        } else {
          console.log("não ha mensagem de erro");

          localStorage.setItem("idUser", response.data[0].id_user);
          localStorage.setItem("typeUsers_id", response.data[0].typeUsers_id);
          localStorage.setItem("username", response.data[0].username);
          localStorage.setItem("userImgSrc", response.data[0].userImgSrc);

          window.location.href = "/home/";
        }
      });
  }

  render() {

    checkSession("login");
    return (
      <div
        id="containerBackground"
        className="backgroundGradiente backgroundResponsiveHeight"
      >
        <Container id="containerLogin">
          <div id="login">
            <Row>
              <img
                src={logo}
                className="App-logo logoLogin"
                alt="logo Navsafety"
              />
            </Row>
            <Row>
              <h3>Login</h3>
            </Row>
            <Form className="px-3"
              onSubmit={(e) => {
                this.login(e);
              }}
            >
              <Form.Group as={Row} className="mb-3" controlId="emailUser">
                <Form.Label column xs="1">
                  <img src={envelope} className="iconsLogin" />
                </Form.Label>
                <Col xs="11" className="ps-0">
                  <Form.Control
                    required
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="emailUser"
                    type="email"
                    onChange={(e) =>
                      this.setState({ emailLogin: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="passwordUser">
                <Form.Label column xs="1">
                  <img src={password} className="iconsLogin" />
                </Form.Label>
                <Col xs="11" className="ps-0">
                  <Form.Control
                    required
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      this.setState({ passwordLogin: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>

              {/* Botoes Login e Registo */}
              <Row className="text-center mb-3">
                <Button
                  className="btnLogin specialBtnLogin ms-auto me-auto"
                  variant="outline-primary"
                  type="submit"
                  disabled={this.state.buttonActive}
                >
                  Login
                </Button>
              </Row>
              <Row className="text-center">
                <NavLink to="/register/">
                  <Button className="btnLogin" variant="outline-primary">
                    Register
                  </Button>
                </NavLink>
              </Row>
            </Form>
            <Modal
              className=""
              show={this.state.showModalErr}
              onHide={() => this.handleClose()}
            >
              <Modal.Header closeButton>
                <Modal.Body>{this.state.errorMessage}</Modal.Body>
              </Modal.Header>
            </Modal>
          </div>
        </Container>
      </div>
    );
  }
}

export default Login;
